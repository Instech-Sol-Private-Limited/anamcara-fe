import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./AuthProvider";
import { getActiveStreams } from "../utils/streams";
import { toast } from "react-toastify";
import { uploadToStreamSupabase } from "../utils/supabaseStreamBucket";

const socket = io(`${import.meta.env.VITE_APP_SOCKET_URL}`);

interface StreamInfo {
  id: string;
  email: string;
  createdAt: string;
  viewerCount: number;
  thumbnailUrl?: string | null;
}

interface StreamContextType {
  currentStream: StreamInfo | null;
  activeStreams: StreamInfo[];
  isCreator: boolean;
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  isSharingScreen: boolean;
  videoActive: boolean;
  micActive: boolean;
  viewers: number;
  chatMessages: Array<{
    id: string;
    user: string;
    text: string;
    isSystem: boolean;
    timestamp: Date;
  }>;
  startStream: () => Promise<void>;
  stopStream: () => void;
  joinStream: (id: string) => Promise<void>;
  leaveStream: () => void;
  toggleMic: () => void;
  toggleVideo: () => void;
  startScreenShare: () => Promise<void>;
  stopScreenShare: () => void;
  sendChatMessage: (message: string) => void;
  toggleFullscreen: (element: HTMLElement | null) => void;
  localVideoRef: React.RefObject<HTMLVideoElement | null>;
  remoteVideoRef: React.RefObject<HTMLVideoElement | null>;
  cameraBubbleRef: React.RefObject<HTMLVideoElement | null>;
}

const StreamContext = createContext<StreamContextType | undefined>(undefined);

export const useStreaming = () => {
  const context = useContext(StreamContext);
  if (!context) throw new Error("useStream must be used within StreamProvider");
  return context;
};

export const StreamingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { userData } = useAuth();
  const [currentStream, setCurrentStream] = useState<StreamInfo | null>(null);
  const [activeStreams, setActiveStreams] = useState<StreamInfo[]>([]);
  const [isCreator, setIsCreator] = useState(false);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null);
  const [isSharingScreen, setIsSharingScreen] = useState(false);
  const [videoActive, setVideoActive] = useState(true);
  const [micActive, setMicActive] = useState(true);
  const [viewers, setViewers] = useState(0);
  const [chatMessages, setChatMessages] = useState<StreamContextType['chatMessages']>([]);

  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const cameraBubbleRef = useRef<HTMLVideoElement | null>(null);
  const viewerConnections = useRef<Record<string, RTCPeerConnection>>({});
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);

  useEffect(() => {
    if (localVideoRef.current) {
      if (isSharingScreen && screenStream) {
        localVideoRef.current.srcObject = screenStream;
      } else if (localStream) {
        localVideoRef.current.srcObject = localStream;
      }
    }
  }, [screenStream, localStream, isSharingScreen]);

  useEffect(() => {
    if (cameraBubbleRef.current && localStream && isSharingScreen) {
      cameraBubbleRef.current.srcObject = localStream;
      cameraBubbleRef.current.play().catch(console.error);
    }
  }, [localStream, isSharingScreen, videoActive]);

  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  useEffect(() => {
    // Socket event listeners
    socket.on("streams_updated", (streams: StreamInfo[]) => {
      setActiveStreams(streams);
    });

    socket.on("viewer_count_update", ({ viewerCount }: { viewerCount: number }) => {
      setViewers(viewerCount);
    });

    socket.on("stream_message", ({ from, message, timestamp }: { from: string; message: string; timestamp: string }) => {
      const newMessage = {
        id: `${timestamp}-${from}`,
        user: from,
        text: message,
        isSystem: false,
        timestamp: new Date(timestamp),
      };
      setChatMessages(prev => [...prev, newMessage]);
    });

    socket.on("chatMessage", ({ id, user, text, isSystem, timestamp }: {
      id: string;
      user: string;
      text: string;
      isSystem: boolean;
      timestamp: string;
    }) => {
      const newMessage = {
        id,
        user,
        text,
        isSystem,
        timestamp: new Date(timestamp),
      };
      setChatMessages(prev => [...prev, newMessage]);
    });

    socket.on("newParticipant", ({ email, viewerCount }: { email: string; viewerCount: number }) => {
      setViewers(viewerCount);
      // Add system message for new participant
      setChatMessages(prev => [...prev, {
        id: `system-${Date.now()}`,
        user: 'System',
        text: `${email} joined the stream`,
        isSystem: true,
        timestamp: new Date(),
      }]);
    });

    socket.on("stream_ended", ({ streamId }: { streamId: string }) => {
      console.log(`Stream ${streamId} has ended`);
      // Clean up and reset state
      cleanupStream();
      toast.info("The stream has ended!");
    });

    socket.on("streamError", ({ message }: { message: string }) => {
      console.error("Stream error:", message);
      alert(`Stream error: ${message}`);
    });

    socket.on("signal", async ({ from, data }) => {
      if (!isCreator && peerConnectionRef.current) {
        if (data.type === "offer") {
          await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(data));
          const answer = await peerConnectionRef.current.createAnswer();
          await peerConnectionRef.current.setLocalDescription(answer);
          socket.emit("signal", { to: from, data: answer });
        } else if (data.type === "answer") {
          await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(data));
        } else if (data.candidate) {
          try {
            await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(data));
          } catch (err) {
            console.error("Error adding ICE candidate", err);
          }
        }
      }

      if (isCreator && viewerConnections.current[from]) {
        const pc = viewerConnections.current[from];
        if (data.type === "answer") {
          await pc.setRemoteDescription(new RTCSessionDescription(data));
        } else if (data.candidate) {
          try {
            await pc.addIceCandidate(new RTCIceCandidate(data));
          } catch (err) {
            console.error("Error adding ICE candidate", err);
          }
        }
      }
    });

    return () => {
      socket.off("streams_updated");
      socket.off("viewer_count_update");
      socket.off("stream_message");
      socket.off("chatMessage");
      socket.off("newParticipant");
      socket.off("stream_ended");
      socket.off("streamError");
      socket.off("signal");
    };
  }, [isCreator]);

  const cleanupStream = useCallback(() => {
    // Stop local camera/mic
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
      setLocalStream(null);
    }

    // Stop screen share stream if active
    if (screenStream) {
      screenStream.getTracks().forEach(track => track.stop());
      setScreenStream(null);
    }

    // Close all connections to viewers (if creator)
    Object.values(viewerConnections.current).forEach(pc => pc.close());
    viewerConnections.current = {};

    // Close viewer peer connection (if viewer)
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }

    // Reset remote stream (viewer mode)
    setRemoteStream(null);

    // Reset flags and states
    setIsCreator(false);
    setCurrentStream(null);
    setIsSharingScreen(false);
    setViewers(0);
    setChatMessages([]);
  }, [localStream, screenStream]);

  const startStream = useCallback(async () => {
    if (!userData.email) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      const streamId = `stream_${Date.now()}`;

      let thumbnailUrl: string | undefined = '/default-stream-thumbnail.jpg';
      try {
        const videoTrack = stream.getVideoTracks()[0];
        if (videoTrack) {
          const imageCapture = new (window as any).ImageCapture(videoTrack);
          const bitmap = await imageCapture.grabFrame();

          // Convert bitmap to blob
          const canvas = document.createElement('canvas');
          canvas.width = bitmap.width;
          canvas.height = bitmap.height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(bitmap, 0, 0);
            const blob = await new Promise<Blob | null>((resolve) => {
              canvas.toBlob(resolve, 'image/jpeg', 0.8);
            });

            if (blob) {
              const file = new File([blob], `${streamId}.jpg`, { type: 'image/jpeg' });
              thumbnailUrl = await uploadToStreamSupabase(file);

              if (!thumbnailUrl) {
                console.warn('Failed to upload thumbnail, using default');
              }
            }
          }
        }
      } catch (error) {
        console.error('Error capturing thumbnail:', error);
      }

      const streamInfo: StreamInfo = {
        id: streamId,
        email: userData.email,
        createdAt: new Date().toISOString(),
        viewerCount: 1,
        thumbnailUrl
      };

      setCurrentStream(streamInfo);
      setLocalStream(stream);
      setIsCreator(true);
      setVideoActive(true);
      setMicActive(true);

      socket.emit("create_stream", {
        streamId,
        email: userData.email,
        thumbnailUrl
      });

      // Add system message
      setChatMessages(prev => [...prev, {
        id: `system-${Date.now()}`,
        user: 'System',
        text: `${userData.email} started streaming`,
        isSystem: true,
        timestamp: new Date(),
      }]);
    } catch (error) {
      console.error("Failed to get media:", error);
      alert("Could not access camera/mic. Check permissions.");
    }
  }, [userData]);

  const joinStream = useCallback(async (id: string) => {
    if (!userData.email) return;

    const streamInfo = activeStreams.find(s => s.id === id);
    if (!streamInfo) return;

    setCurrentStream(streamInfo);
    setIsCreator(false);

    const pc = new RTCPeerConnection();
    peerConnectionRef.current = pc;

    pc.ontrack = (event) => {
      setRemoteStream(event.streams[0]);
    };

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("signal", { to: id, data: event.candidate.toJSON() });
      }
    };

    socket.emit("join_stream", { streamId: id, email: userData.email });
  }, [userData, activeStreams]);

  const leaveStream = useCallback(() => {
    if (!currentStream) return;
    socket.emit("leave_stream", { streamId: currentStream.id });
    cleanupStream();
  }, [currentStream, cleanupStream]);

  const stopStream = useCallback(() => {
    if (!currentStream || !isCreator) return;

    socket.emit("stop_stream", { streamId: currentStream.id });
    cleanupStream();
  }, [currentStream, isCreator, cleanupStream]);

  const toggleMic = useCallback(() => {
    if (localStream) {
      const audioTracks = localStream.getAudioTracks();
      if (audioTracks.length > 0) {
        audioTracks[0].enabled = !audioTracks[0].enabled;
        setMicActive(audioTracks[0].enabled);
      }
    }
  }, [localStream]);

  const toggleVideo = useCallback(() => {
    if (localStream) {
      const videoTracks = localStream.getVideoTracks();
      if (videoTracks.length > 0) {
        videoTracks[0].enabled = !videoTracks[0].enabled;
        setVideoActive(videoTracks[0].enabled);
      }
    }
  }, [localStream]);

  const startScreenShare = useCallback(async () => {
    try {
      const screen = await navigator.mediaDevices.getDisplayMedia({ video: true });
      setScreenStream(screen);
      setIsSharingScreen(true);

      // Replace video track for all viewers
      Object.values(viewerConnections.current).forEach(pc => {
        const sender = pc.getSenders().find(s => s.track?.kind === "video");
        if (sender) {
          sender.replaceTrack(screen.getVideoTracks()[0]);
        }
      });

      screen.getVideoTracks()[0].onended = () => {
        stopScreenShare();
      };
    } catch (error) {
      console.error("Screen share error:", error);
    }
  }, []);

  const stopScreenShare = useCallback(() => {
    if (screenStream) {
      screenStream.getTracks().forEach(track => track.stop());
      setScreenStream(null);
    }
    setIsSharingScreen(false);

    // Switch back to camera for all viewers
    Object.values(viewerConnections.current).forEach(pc => {
      const sender = pc.getSenders().find(s => s.track?.kind === "video");
      if (sender && localStream?.getVideoTracks()[0]) {
        sender.replaceTrack(localStream.getVideoTracks()[0]);
      }
    });
  }, [screenStream, localStream]);

  const sendChatMessage = useCallback((message: string) => {
    if (!message.trim() || !userData.email || !currentStream) return;

    const newMessage = {
      id: `${Date.now()}-${Math.random()}`,
      user: userData.email,
      text: message,
      isSystem: false,
      timestamp: new Date().toISOString(),
    };

    socket.emit("chatMessage", {
      ...newMessage,
      streamId: currentStream.id
    });
  }, [userData, currentStream]);

  const toggleFullscreen = useCallback((element: HTMLElement | null) => {
    if (!element) return;

    if (!document.fullscreenElement) {
      element.requestFullscreen().catch(err => console.error('Error entering fullscreen:', err));
    } else {
      document.exitFullscreen().catch(err => console.error('Error exiting fullscreen:', err));
    }
  }, []);

  useEffect(() => {
    const fetchActiveStreams = async () => {
      try {
        const response = await getActiveStreams()
        if (response.success) {
          setActiveStreams(response.data.streams)
        }
      } catch (error) {
        console.error('Error fetching active streams:', error)
      }
    }

    fetchActiveStreams()
  }, [])

  useEffect(() => {
    if (isCreator && localStream && currentStream) {
      socket.on("viewer-joined", async ({ viewerSocketId }) => {
        const pc = new RTCPeerConnection();

        // Add audio tracks
        localStream.getAudioTracks().forEach(track => {
          pc.addTrack(track, localStream);
        });

        // Add video track (screen share takes priority)
        const videoTrack = isSharingScreen && screenStream
          ? screenStream.getVideoTracks()[0]
          : localStream.getVideoTracks()[0];

        if (videoTrack) {
          pc.addTrack(videoTrack, isSharingScreen ? screenStream! : localStream);
        }

        pc.onicecandidate = (event) => {
          if (event.candidate) {
            socket.emit("signal", { to: viewerSocketId, data: event.candidate.toJSON() });
          }
        };

        viewerConnections.current[viewerSocketId] = pc;

        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        socket.emit("signal", { to: viewerSocketId, data: offer });
      });

      socket.on("viewer-left", ({ viewerSocketId }) => {
        if (viewerConnections.current[viewerSocketId]) {
          viewerConnections.current[viewerSocketId].close();
          delete viewerConnections.current[viewerSocketId];
        }
      });
    }

    return () => {
      socket.off("viewer-joined");
      socket.off("viewer-left");
    };
  }, [isCreator, localStream, currentStream, isSharingScreen, screenStream]);

  return (
    <StreamContext.Provider
      value={{
        currentStream,
        activeStreams,
        isCreator,
        localStream,
        remoteStream,
        isSharingScreen,
        videoActive,
        micActive,
        viewers,
        chatMessages,
        startStream,
        stopStream,
        joinStream,
        leaveStream,
        toggleMic,
        toggleVideo,
        startScreenShare,
        stopScreenShare,
        sendChatMessage,
        toggleFullscreen,
        localVideoRef,
        remoteVideoRef,
        cameraBubbleRef,
      }}
    >
      {children}
    </StreamContext.Provider>
  );
};