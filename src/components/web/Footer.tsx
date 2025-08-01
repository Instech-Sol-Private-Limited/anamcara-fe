// import { useNavigate } from "react-router-dom";
// import { FaRobot, FaCube, FaBrain } from "react-icons/fa";
// import { lock } from "../../../public";

// const Footer = () => {
//     const navigate = useNavigate();

//     const updateStatus = (index: number) => {
//         if (index === 0) navigate("/home");
//     };

//     const data = [
//         {
//             id: 1,
//             title: "AI",
//             desc: "Cognitive Evolution",
//             hasLock: false,
//             icon: <FaBrain size={40} className="text-pink-500" />,
//         },
//         {
//             id: 2,
//             title: "Metaverse",
//             desc: "Immersive Realities",
//             hasLock: true,
//             icon: <FaCube size={40} className="text-pink-500" />,
//         },
//         {
//             id: 3,
//             title: "Robotics",
//             desc: "Revolutionary Automation",
//             hasLock: true,
//             icon: <FaRobot size={40} className="text-pink-500" />,
//         },
//         {
//             id: 4,
//             title: "Quantum",
//             desc: "Infinite Possibilities",
//             hasLock: true,
//             icon: <FaCube size={40} className="text-pink-500" />,
//         },
//     ];

//     return (
//         <div className="w-full flex justify-center items-center gap-4 z-10 p-4">
//             {data.map((item, index) => (
//                 <div
//                     key={item.id}
//                     onClick={() => updateStatus(index)}
//                     className={`relative flex flex-col items-center justify-center text-center gap-2 px-6 py-4 rounded-lg  backdrop-blur-xl max-w-[340px] w-full ${item.hasLock ? 'pointer-events-none bg-white/0' : 'bg-white/10 cursor-pointer'} `}
//                 >

//                     <span className={item.hasLock ? 'opacity-60' : ''}>{item.icon}</span>
//                     <h1 className={`text-xl font-bold ${item.hasLock ? 'opacity-60' : ''}`}>{item.title}</h1>
//                     <p className={`text-lg ${item.hasLock ? 'opacity-60' : ''}`}>{item.desc}</p>

//                     {item.hasLock && (
//                         <div className="absolute top-2 right-2 opacity-70 brightness-0 invert-100">
//                             <img src={lock} alt="lock" className="w-5" />
//                         </div>
//                     )}
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default Footer;

// import { FC } from "react";
// import { logo, Ai_bottom, metaverse, robotics } from "../../../public";
// import metaverseTabAnimation from "../../assets/lotties/metaverseTab.json";
// import Lottie from "react-lottie";
// import { useNavigate } from "react-router-dom";

// const Footer: FC = () => {
//   const navigate = useNavigate();

//   const updateStatus = (index: number) => {
//     if (index === 0) navigate("/");
//   };

//   const defaultOptions = [
//     { loop: true, autoplay: true, animationData: "" },
//     { loop: true, autoplay: true, animationData: metaverseTabAnimation },
//     { loop: true, autoplay: true, animationData: metaverseTabAnimation },
//     { loop: true, autoplay: true, animationData: metaverseTabAnimation },
//   ];

//   const data = [
//     { id: 1, title: "AI", desc: "Cognitive Evolution", hasLock: false, img: logo },
//     { id: 2, title: "Metaverse", desc: "Immersive Realities", hasLock: true, img: Ai_bottom },
//     { id: 3, title: "Robotics", desc: "Revolutionary Automation", hasLock: true, img: metaverse },
//     { id: 4, title: "Quantum", desc: "Infinite Possibilities", hasLock: true, img: robotics },
//   ];

//   return (
//     <div className="w-full absolute bottom-0 left-1/2 -translate-x-1/2 z-50 backdrop-filter-none bg-transparent py-[5px]">
//       <div className="flex flex-nowrap gap-2 px-4 justify-center items-center md:gap-[5px] md:px-2 sm:justify-center sm:px-[5px]">
//         {data.map((item, index) => (
//           <div
//             key={index}
//             onClick={() => updateStatus(index)}
//             className={`relative flex flex-row items-center justify-center text-center gap-2 px-3 py-3 rounded transition-all duration-300 ease-in-out shadow-[0_4px_12px_rgba(0,0,0,0.9)] bg-[rgba(158,240,26,0)] w-[18%] min-w-[120px] shrink-0 opacity-50 hover:bg-[#ADFF00] hover:opacity-100 hover:scale-105 hover:text-white hover:border-b-[5px] hover:border-r-[5px] hover:border-[#ADFF00] md:w-[22%] md:p-2 sm:min-w-[100px] sm:p-2 max-[480px]:min-w-[90px] max-[480px]:p-[6px]
//             `}
//           >
//             <div className="relative flex justify-center items-center">
//               <img
//                 src={item.img}
//                 alt={`img${item.title}`}
//                 className="w-[50px] h-[35px] object-cover rounded 
//                   sm:w-[40px] sm:h-[25px] 
//                   max-[480px]:w-[35px] max-[480px]:h-[20px]"
//               />
//             </div>

//             <div className="flex flex-col items-center justify-center">
//               <h1 className="text-[0.9em] font-bold text-white 
//                 md:text-[0.8em] 
//                 sm:text-[0.7em] 
//                 max-[480px]:text-[0.6em]
//               ">
//                 {item.title}
//               </h1>
//               <p className="text-[0.8em] text-white 
//                 md:text-[0.7em] 
//                 sm:text-[0.6em] 
//                 max-[480px]:text-[0.5em]
//               ">
//                 {item.desc}
//               </p>
//             </div>

//             {item.hasLock && (
//               <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
//                 <Lottie
//                   options={defaultOptions[1]}
//                   key={item.id}
//                   height={30}
//                   width={30}
//                   isClickToPauseDisabled={true}
//                 />
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Footer;


// import { useNavigate } from "react-router-dom";
// import { FaRobot, FaCube, FaBrain } from "react-icons/fa";
// import { lock } from "../../../public";
// const Footer = () => {
//     const navigate = useNavigate();
//     const updateStatus = (index: number) => {
//         if (index === 0) navigate("/home");
//     };
//     const data = [
//         {
//             id: 1,
//             title: "AI",
//             desc: "Cognitive Evolution",
//             hasLock: false,
//             icon: <FaBrain size={40} className="text-pink-500" />,
//         },
//         {
//             id: 2,
//             title: "Metaverse",
//             desc: "Immersive Realities",
//             hasLock: true,
//             icon: <FaCube size={40} className="text-pink-500" />,
//         },
//         {
//             id: 3,
//             title: "Robotics",
//             desc: "Revolutionary Automation",
//             hasLock: true,
//             icon: <FaRobot size={40} className="text-pink-500" />,
//         },
//         {
//             id: 4,
//             title: "Quantum",
//             desc: "Infinite Possibilities",
//             hasLock: true,
//             icon: <FaCube size={40} className="text-pink-500" />,
//         },
//     ];
//     return (
//         <div className="w-full flex justify-center items-center gap-4 z-10 p-4">
//             {data.map((item, index) => (
//                 <div
//                     key={item.id}
//                     onClick={() => updateStatus(index)}
//                     className={`relative flex flex-col items-center justify-center text-center gap-2 px-6 py-4 rounded-lg  backdrop-blur-xl max-w-[340px] w-full ${item.hasLock ? 'pointer-events-none bg-white/0' : 'bg-white/10 cursor-pointer'} `}
//                 >
//                     <span className={item.hasLock ? 'opacity-60' : ''}>{item.icon}</span>
//                     <h1 className={`text-xl font-bold ${item.hasLock ? 'opacity-60' : ''}`}>{item.title}</h1>
//                     <p className={`text-lg ${item.hasLock ? 'opacity-60' : ''}`}>{item.desc}</p>
//                     {item.hasLock && (
//                         <div className="absolute top-2 right-2 opacity-70 brightness-0 invert-100">
//                             <img src={lock} alt="lock" className="w-5" />
//                         </div>
//                     )}
//                 </div>
//             ))}
//         </div>
//     );
// };
// export default Footer;













import { FC } from "react";
import { logo, Ai_bottom, metaverse, robotics } from "../../../public";
import metaverseTabAnimation from "../../assets/lotties/metaverseTab.json";
import Lottie from "react-lottie";
import { useNavigate } from "react-router-dom";
const Footer: FC = () => {
  const navigate = useNavigate();
  const updateStatus = (index: number) => {
    if (index === 0) navigate("/");
  };
  const defaultOptions = [
    { loop: true, autoplay: true, animationData: "" },
    { loop: true, autoplay: true, animationData: metaverseTabAnimation },
    { loop: true, autoplay: true, animationData: metaverseTabAnimation },
    { loop: true, autoplay: true, animationData: metaverseTabAnimation },
  ];
  const data = [
    { id: 1, title: "AI", desc: "Cognitive Evolution", hasLock: false, img: logo },
    { id: 2, title: "Metaverse", desc: "Immersive Realities", hasLock: true, img: Ai_bottom },
    { id: 3, title: "Robotics", desc: "Revolutionary Automation", hasLock: true, img: metaverse },
    { id: 4, title: "Quantum", desc: "Infinite Possibilities", hasLock: true, img: robotics },
  ];
  return (
    <div className="w-full absolute bottom-0 left-1/2 -translate-x-1/2 z-50 backdrop-filter-none bg-transparent py-1 sm:py-[5px]">
      <div className="flex flex-nowrap gap-1 xs:gap-2 px-2 xs:px-3 sm:px-4 justify-center items-center md:gap-[5px] md:px-2">
        {data.map((item, index) => (
          <div
            key={index}
            onClick={() => updateStatus(index)}
            className={`relative flex flex-row items-center justify-center text-center gap-1 xs:gap-2 px-2 xs:px-3 py-2 xs:py-3 rounded transition-all duration-300 ease-in-out shadow-[0_4px_12px_rgba(0,0,0,0.9)] bg-[rgba(158,240,26,0)] w-[22%] xs:w-[20%] sm:w-[18%] min-w-[70px] xs:min-w-[85px] sm:min-w-[100px] md:min-w-[120px] lg:min-w-[140px] xl:min-w-[160px] shrink-0 opacity-50 hover:bg-[#ADFF00] hover:opacity-100 hover:scale-105 hover:text-white hover:border-b-[5px] hover:border-r-[5px] hover:border-[#ADFF00] md:p-2 lg:px-4 lg:py-3 xl:px-5 xl:py-4
            `}
          >
            <div className="relative flex justify-center items-center">
              <img
                src={item.img}
                alt={`img${item.title}`}
                className="w-[25px] h-[18px] xs:w-[30px] xs:h-[22px] sm:w-[35px] sm:h-[25px] md:w-[40px] md:h-[28px] lg:w-[45px] lg:h-[32px] xl:w-[50px] xl:h-[35px] 2xl:w-[55px] 2xl:h-[38px] object-cover rounded"
              />
            </div>
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-[0.5rem] xs:text-[0.6rem] sm:text-[0.7rem] md:text-[0.8rem] lg:text-[0.9rem] xl:text-base 2xl:text-lg font-bold text-white">
                {item.title}
              </h1>
              <p className="text-[0.4rem] xs:text-[0.5rem] sm:text-[0.6rem] md:text-[0.7rem] lg:text-[0.8rem] xl:text-sm 2xl:text-base text-white hidden xs:block">
                {item.desc}
              </p>
            </div>
            {item.hasLock && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                <Lottie
                  options={defaultOptions[1]}
                  key={item.id}
                  height={20}
                  width={20}
                  isClickToPauseDisabled={true}
                  // @ts-ignore
                  className="xs:!h-[25px] xs:!w-[25px] sm:!h-[30px] sm:!w-[30px] lg:!h-[35px] lg:!w-[35px] xl:!h-[40px] xl:!w-[40px]"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Footer;