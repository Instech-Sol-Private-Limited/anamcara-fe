
const AiGurus = () => {
  return (
    <div>AiGurus</div>
  )
}

export default AiGurus

// import React, { useState, useRef, useEffect, Suspense } from 'react';
// import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
// import { OrbitControls, Environment, Html } from '@react-three/drei';
// import { AnimationMixer } from 'three';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import * as THREE from 'three';
// import { Flame, Users, Sword, Shield, Wand2, Star, Settings, Target, ThumbsUp, X } from 'lucide-react';

// // Character data with lock status (first one unlocked, rest locked)
// const characters = [
//     { name: 'Warrior', file: 'warrior.glb', animationFile: 'warrior_animated.glb', class: 'Warrior', description: 'The warrior is one of the most powerful tanks, wielding a greatsword and using a robust armor set. Despite their heroic stout, they support allies and aim for larger damage directed at the team!', unlocked: true, lockColor: '#ff4444' },
//     { name: 'Mage', file: 'mage.glb', class: 'Mage', description: 'This is a famous gaming role: someone gaining and using magic spells to either damage foes or support allies.', unlocked: false, lockColor: '#4444ff' },
//     { name: 'Archer', file: 'archer.glb', class: 'Archer', description: 'Swift ranged combatant with deadly precision and agility in combat situations.', unlocked: false, lockColor: '#44ff44' },
//     { name: 'Paladin', file: 'paladin.glb', class: 'Paladin', description: 'Holy warrior with divine power, protecting allies while dealing righteous damage.', unlocked: false, lockColor: '#ffff44' },
//     { name: 'Rogue', file: 'rogue.glb', class: 'Rogue', description: 'Stealthy assassin who strikes from shadows with critical damage and evasion.', unlocked: false, lockColor: '#ff44ff' },
//     { name: 'Cleric', file: 'cleric.glb', class: 'Cleric', description: 'Divine healer and support specialist, keeping the team alive in battles.', unlocked: false, lockColor: '#44ffff' },
//     { name: 'Barbarian', file: 'barbarian.glb', class: 'Barbarian', description: 'Fierce berserker warrior with raw strength and devastating melee attacks.', unlocked: false, lockColor: '#ff8844' },
//     { name: 'Wizard', file: 'wizard.glb', class: 'Wizard', description: 'Ancient spellcaster with powerful elemental magic and arcane knowledge.', unlocked: false, lockColor: '#8844ff' },
//     { name: 'Ranger', file: 'ranger.glb', class: 'Ranger', description: 'Nature guardian and tracker with bow mastery and wilderness survival skills.', unlocked: false, lockColor: '#44ff88' },
//     { name: 'Monk', file: 'monk.glb', class: 'Monk', description: 'Master of martial arts combining physical prowess with spiritual energy.', unlocked: false, lockColor: '#ff4488' },
//     { name: 'Necromancer', file: 'necromancer.glb', class: 'Necromancer', description: 'Dark magic wielder who commands death magic and undead minions.', unlocked: false, lockColor: '#8844ff' },
//     { name: 'Bard', file: 'bard.glb', class: 'Bard', description: 'Musical inspiration and magic user who buffs allies and debuffs enemies.', unlocked: false, lockColor: '#ffaa44' }
// ];

// const classIcons = {
//     Warrior: Shield,
//     Mage: Wand2,
//     Archer: Target,
//     Paladin: Star,
//     Rogue: Sword,
//     Cleric: Star,
//     Barbarian: Sword,
//     Wizard: Wand2,
//     Ranger: Target,
//     Monk: Users,
//     Necromancer: Wand2,
//     Bard: Users
// };

// function getVFormationWithCenterUnlocked(characters, spacing = 2.5, depth = 2) {
//     const positions = [];
//     const unlockedIndex = characters.findIndex(c => c.unlocked);
//     const locked = characters.filter((c, i) => i !== unlockedIndex);

//     // Place unlocked character at the front center
//     positions[unlockedIndex] = [0, 0, 0];

//     // Place locked characters alternating left/right, moving back each row
//     let row = 1;
//     let side = -1; // start left
//     for (let i = 0; i < locked.length; i++) {
//         const x = side * spacing * row;
//         const z = -depth * row;
//         // Find the next available index in positions
//         const lockedIdx = characters.findIndex((c, idx) => !c.unlocked && positions[idx] === undefined);
//         positions[lockedIdx] = [x, 0, z];
//         // Alternate side, increment row every two
//         if (side === 1) row++;
//         side *= -1;
//     }
//     return positions;
// }

// const teamPositions = getVFormationWithCenterUnlocked(characters, 2.5, 2);

// // Enhanced magical particles
// function MagicalParticles({ count = 120 }) {
//     const mesh = useRef();
//     const dummy = new THREE.Object3D();

//     const particles = Array.from({ length: count }, (_, i) => ({
//         position: [
//             (Math.random() - 0.5) * 30,
//             Math.random() * 15,
//             (Math.random() - 0.5) * 30
//         ],
//         speed: Math.random() * 0.015 + 0.005,
//         phase: Math.random() * Math.PI * 2,
//         scale: Math.random() * 0.1 + 0.05
//     }));

//     useFrame((state) => {
//         particles.forEach((particle, i) => {
//             particle.phase += particle.speed;
//             dummy.position.set(
//                 particle.position[0] + Math.sin(particle.phase) * 0.8,
//                 particle.position[1] + Math.sin(particle.phase * 1.5) * 0.5,
//                 particle.position[2] + Math.cos(particle.phase) * 0.8
//             );
//             dummy.scale.setScalar(particle.scale * (0.8 + Math.sin(particle.phase * 4) * 0.2));
//             dummy.updateMatrix();
//             mesh.current.setMatrixAt(i, dummy.matrix);
//         });
//         mesh.current.instanceMatrix.needsUpdate = true;
//     });

//     return (
//         <instancedMesh ref={mesh} args={[null, null, count]}>
//             <sphereGeometry args={[0.03, 8, 8]} />
//             <meshBasicMaterial color="#60a5fa" transparent opacity={0.7} />
//         </instancedMesh>
//     );
// }

// // Enhanced campfire with better flames and lighting
// function EnhancedCampfire() {
//     const flameRef = useRef();
//     const innerFlameRef = useRef();
//     const sparkRef = useRef();

//     useFrame((state) => {
//         const time = state.clock.elapsedTime;

//         if (flameRef.current) {
//             flameRef.current.scale.y = 1.2 + Math.sin(time * 3) * 0.3;
//             flameRef.current.rotation.y = Math.sin(time * 2) * 0.15;
//             flameRef.current.scale.x = 1 + Math.sin(time * 4) * 0.1;
//             flameRef.current.scale.z = 1 + Math.cos(time * 3.5) * 0.1;
//         }

//         if (innerFlameRef.current) {
//             innerFlameRef.current.scale.y = 1 + Math.sin(time * 5) * 0.2;
//             innerFlameRef.current.rotation.y = Math.sin(time * 3) * 0.2;
//         }

//         if (sparkRef.current) {
//             sparkRef.current.position.y = 1.2 + Math.sin(time * 6) * 0.3;
//             sparkRef.current.rotation.y = time * 2;
//         }
//     });

//     return (
//         <group position={[0, 0, 0]}>

//             <mesh position={[0, -0.05, 0]} rotation={[0, 0, 0]}>
//                 <cylinderGeometry args={[0.12, 0.15, 1.4]} />
//                 <meshStandardMaterial color="#654321" roughness={0.8} />
//             </mesh>
//             <mesh position={[0, -0.05, 0]} rotation={[0, Math.PI / 2, 0]}>
//                 <cylinderGeometry args={[0.1, 0.13, 1.2]} />
//                 <meshStandardMaterial color="#8B4513" roughness={0.8} />
//             </mesh>
//             <mesh position={[0, -0.05, 0]} rotation={[0, Math.PI / 4, 0]}>
//                 <cylinderGeometry args={[0.11, 0.14, 1]} />
//                 <meshStandardMaterial color="#5D4037" roughness={0.8} />
//             </mesh>
//             <mesh position={[0, -0.05, 0]} rotation={[0, -Math.PI / 4, 0]}>
//                 <cylinderGeometry args={[0.09, 0.12, 0.9]} />
//                 <meshStandardMaterial color="#795548" roughness={0.8} />
//             </mesh>

//             {/* Enhanced stone circle */}r
//             {Array.from({ length: 12 }).map((_, i) => {
//                 const angle = (i / 12) * Math.PI * 2;
//                 const x = Math.cos(angle) * 1;
//                 const z = Math.sin(angle) * 1;
//                 const size = 0.08 + Math.random() * 0.06;
//                 return (
//                     <mesh key={i} position={[x, -0.12, z]} rotation={[0, angle, 0]}>
//                         <boxGeometry args={[size, 0.15, size * 1.2]} />
//                         <meshStandardMaterial color="#424242" roughness={0.9} />
//                     </mesh>
//                 );
//             })}

//             {/* Multi-layered flames */}
//             <mesh ref={flameRef} position={[0, 0.6, 0]}>
//                 <coneGeometry args={[0.5, 1.4, 8]} />
//                 <meshBasicMaterial color="#ff4500" transparent opacity={0.85} />
//             </mesh>

//             <mesh ref={innerFlameRef} position={[0, 0.8, 0]}>
//                 <coneGeometry args={[0.3, 1, 6]} />
//                 <meshBasicMaterial color="#ffa500" transparent opacity={0.9} />
//             </mesh>

//             <mesh position={[0, 1, 0]}>
//                 <coneGeometry args={[0.15, 0.6, 5]} />
//                 <meshBasicMaterial color="#ffff00" transparent opacity={0.95} />
//             </mesh>

//             {/* Animated sparks */}
//             <group ref={sparkRef}>
//                 {Array.from({ length: 6 }).map((_, i) => {
//                     const angle = (i / 6) * Math.PI * 2;
//                     const x = Math.cos(angle) * 0.3;
//                     const z = Math.sin(angle) * 0.3;
//                     return (
//                         <mesh key={i} position={[x, 0, z]}>
//                             <sphereGeometry args={[0.02, 6, 6]} />
//                             <meshBasicMaterial color="#ff6b35" transparent opacity={0.8} />
//                         </mesh>
//                     );
//                 })}
//             </group>

//             {/* Enhanced lighting */}
//             <pointLight position={[0, 0.8, 0]} color="#ff4500" intensity={4} distance={15} decay={2} />
//             <pointLight position={[0, 1.2, 0]} color="#ffa500" intensity={2} distance={10} decay={2} />
//             <pointLight position={[0, 0.3, 0]} color="#ff6b35" intensity={1.5} distance={8} decay={1.5} />
//         </group>
//     );
// }


// function InteractiveCharacterModel({ character, position, scale = 0.04, onClick, isSelected, isForward }) {
//     const gltf = useLoader(
//         GLTFLoader,
//         `/characters/${isSelected && character.animationFile ? character.animationFile : character.file}`
//     );
//     const modelRef = useRef();
//     const glowRef = useRef();
//     const platformRef = useRef();
//     const lockRef = useRef();
//     const groupRef = useRef();
//     const mixerRef = useRef();

//     useEffect(() => {
//         if (isSelected && gltf.animations && gltf.animations.length > 0) {
//             const mixer = new AnimationMixer(gltf.scene);
//             mixer.clipAction(gltf.animations[0]).play();
//             mixerRef.current = mixer;
//             return () => mixer.stopAllAction();
//         }
//     }, [isSelected, gltf]);

//     useFrame((state, delta) => {
//         mixerRef.current?.update(delta);

//         const time = state.clock.elapsedTime;
//         // Smooth position transition
//         if (groupRef.current) {
//             groupRef.current.position.x = THREE.MathUtils.lerp(
//                 groupRef.current.position.x,
//                 isForward ? 0 : position[0],
//                 0.05
//             );
//             groupRef.current.position.y = THREE.MathUtils.lerp(
//                 groupRef.current.position.y,
//                 position[1],
//                 0.05
//             );
//             groupRef.current.position.z = THREE.MathUtils.lerp(
//                 groupRef.current.position.z,
//                 isForward ? 5 : position[2],
//                 0.05
//             );
//         }
//         if (modelRef.current) {
//             modelRef.current.rotation.y = Math.sin(time * 0.5) * 0.05;
//         }

//         // Enhanced glow effect for selected character
//         if (glowRef.current && isSelected && character.unlocked) {
//             glowRef.current.scale.setScalar(1.3 + Math.sin(time * 4) * 0.15);
//             glowRef.current.rotation.y = time * 0.5;
//         }

//         // Platform glow
//         if (platformRef.current) {
//             platformRef.current.rotation.y = time * 0.3;
//         }

//         if (lockRef.current && !character.unlocked) {
//             lockRef.current.rotation.y = time * 2;
//             lockRef.current.position.y = 3.5 + Math.sin(time * 3) * 0.1; // <-- was 1.8, now 3.5
//             lockRef.current.scale.setScalar(0.8 + Math.sin(time * 4) * 0.1);
//         }
//     });

//     const handleClick = () => {
//         onClick();
//     };

//     return (
//         <group ref={groupRef} position={position} onClick={handleClick}>
//             {/* Character platform */}
//             <mesh ref={platformRef} position={[0, -0.1, 0]}>
//                 <cylinderGeometry args={[0.8, 0.8, 0.1]} />
//                 <meshStandardMaterial
//                     color={character.unlocked ? "#2d3748" : "#1a1a1a"}
//                     transparent
//                     opacity={character.unlocked ? 0.6 : 0.3}
//                     emissive="#1a202c"
//                     emissiveIntensity={character.unlocked ? 0.2 : 0.05}
//                 />
//             </mesh>

//             {/* Selection glow for unlocked characters only */}
//             {isSelected && character.unlocked && (
//                 <group>
//                     <mesh ref={glowRef} position={[0, 1.5, 0]}>
//                         <cylinderGeometry args={[1.2, 0.1, 3]} />
//                         <meshBasicMaterial color="#60a5fa" transparent opacity={0.15} />
//                     </mesh>
//                     <mesh position={[0, 1.5, 0]}>
//                         <torusGeometry args={[1.1, 0.05, 8, 32]} />
//                         <meshBasicMaterial color="#3b82f6" transparent opacity={0.8} />
//                     </mesh>
//                 </group>
//             )}

//             {/* Character model with conditional opacity */}
//             <group>
//                 <primitive
//                     ref={modelRef}
//                     object={gltf.scene}
//                     scale={scale}
//                 />
//                 {/* Darkening overlay for locked characters */}

//             </group>

//             {/* 3D unique color lock for locked characters */}
//             {!character.unlocked && (
//                 <group ref={lockRef} position={[0, 3.5, 0]}>
//                     {/* Lock body: rounded rectangle */}
//                     <mesh>
//                         <capsuleGeometry args={[0.13, 0.18, 8, 16]} /> {/* capsule for rounded body */}
//                         <meshStandardMaterial color={character.lockColor} metalness={0.4} roughness={0.3} />
//                     </mesh>
//                     {/* Lock shackle: tall, thin, metallic */}
//                     <mesh position={[0, 0.19, 0]}>
//                         <torusGeometry args={[0.13, 0.025, 16, 32, Math.PI]} />
//                         <meshStandardMaterial color="#cccccc" metalness={0.8} roughness={0.2} />
//                     </mesh>
//                     {/* Keyhole: black circle */}
//                     <mesh position={[0, -0.05, 0.09]}>
//                         <circleGeometry args={[0.025, 16]} />
//                         <meshStandardMaterial color="#111" />
//                     </mesh>
//                     {/* Keyhole slot: black rectangle */}
//                     <mesh position={[0, -0.07, 0.09]}>
//                         <boxGeometry args={[0.01, 0.025, 0.01]} />
//                         <meshStandardMaterial color="#111" />
//                     </mesh>
//                     {/* Optional: subtle glow */}
//                     <mesh>
//                         <sphereGeometry args={[0.22, 16, 16]} />
//                         <meshBasicMaterial color={character.lockColor} transparent opacity={0.09} />
//                     </mesh>
//                 </group>
//             )}
//             {/* Character name HTML overlay (no emoji lock) */}
//             <Html position={[0, 2.8, 0]} center>
//                 <div className={`text-center transition-all duration-500 ${isSelected && character.unlocked ? 'scale-125 -translate-y-2' : 'hover:scale-110'
//                     } cursor-pointer`}>
//                     <div className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 backdrop-blur-sm ${character.unlocked
//                         ? isSelected
//                             ? 'bg-gradient-to-r from-blue-500/90 to-purple-500/90 text-white shadow-lg shadow-blue-400/50 border border-blue-300/50'
//                             : 'bg-slate-800/90 text-slate-200 hover:bg-slate-700/90 border border-slate-600/50'
//                         : 'bg-red-900/90 text-red-200 border border-red-500/50'
//                         }`}>
//                         {character.name}
//                     </div>
//                 </div>
//             </Html>
//         </group>
//     );
// }

// // Enhanced loading placeholder
// function CharacterPlaceholder({ position, name }) {
//     const ref = useRef();

//     useFrame((state) => {
//         if (ref.current) {
//             ref.current.rotation.y = state.clock.elapsedTime;
//         }
//     });

//     return (
//         <group position={position}>
//             <mesh>

//                 <meshStandardMaterial color="#4a5568" transparent opacity={0.3} wireframe />
//             </mesh>
//             <mesh ref={ref} position={[0, 1, 0]}>
//                 <torusGeometry args={[0.3, 0.05, 8, 16]} />
//                 <meshBasicMaterial color="#60a5fa" />
//             </mesh>
//             <Html center position={[0, 3, 0]}>
//                 <div className="text-slate-300 text-sm bg-slate-900/80 px-3 py-1 rounded-full backdrop-blur-sm border border-slate-600/50">
//                     Loading {name}...
//                 </div>
//             </Html>
//         </group>
//     );
// }

// // Background environment with mystical elements
// function MysticalBackground() {
//     return (
//         <group>





//             {/* Mysterious fog/mist near ground */}
//             <mesh position={[0, 0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
//                 <planeGeometry args={[25, 25]} />
//                 <meshBasicMaterial color="#4a5568" transparent opacity={0.1} />
//             </mesh>
//         </group>
//     );
// }

// // Character Details Component
// function CharacterDetails({ character, onClose }) {
//     return (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
//   <div className="
//     relative
//     w-full max-w-2xl max-h-[90vh] overflow-y-auto
//     rounded-2xl
//     border-2 border-cyan-400/60
//     bg-gradient-to-br from-cyan-900/60 via-indigo-900/40 to-slate-900/70
//     shadow-[0_0_40px_10px_rgba(0,255,255,0.15)]
//     backdrop-blur-2xl
//     p-8
//     before:content-[''] before:absolute before:inset-0 before:rounded-2xl
//     before:border-2 before:border-cyan-400/30 before:blur-[6px] before:pointer-events-none
//     after:content-[''] after:absolute after:inset-0 after:rounded-2xl
//     after:border after:border-purple-500/20 after:blur-[2px] after:pointer-events-none
//     "
//     style={{
//       boxShadow: '0 0 60px 10px rgba(0,255,255,0.12), 0 0 0 2px #00fff7 inset'
//     }}
//   >
//     <div className="flex items-center justify-between mb-8">
//       <div className="flex items-center space-x-6">
//         <div className="p-4 bg-cyan-400/20 rounded-full border border-cyan-400/40 shadow-[0_0_16px_2px_rgba(0,255,255,0.25)]">
//           {React.createElement(classIcons[character.class] || Users, {
//             className: "w-12 h-12 text-cyan-400 drop-shadow-[0_0_8px_cyan]"
//           })}
//         </div>
//         <div>
//           <h2 className="text-4xl font-extrabold text-cyan-300 mb-2 tracking-widest drop-shadow-[0_0_8px_cyan]">
//             {character.class.toUpperCase()}
//           </h2>
//           <p className="text-lg text-cyan-100 uppercase tracking-wide font-mono">
//             {character.name}
//           </p>
//         </div>
//       </div>
//       <button
//         onClick={onClose}
//         className="text-cyan-300 hover:text-white transition-colors p-3 hover:bg-cyan-700/30 rounded-lg border border-cyan-400/30 shadow"
//       >
//         <X className="w-8 h-8" />
//       </button>
//     </div>

//     <div className="border-t border-cyan-400/30 pt-8 mb-8">
//       <h3 className="text-xl font-semibold text-cyan-300 mb-4 tracking-widest">INTRODUCTION</h3>
//       <p className="text-cyan-100 leading-relaxed text-lg font-mono">
//         {character.description}
//       </p>
//     </div>

//     {/* Enhanced stats visualization */}
//     <div className="mb-8">
//       <h3 className="text-xl font-semibold text-cyan-300 mb-6 tracking-widest">ATTRIBUTES</h3>
//       <div className="space-y-4">
//         {[
//           { name: 'STR', value: 332, color: 'bg-cyan-400' },
//           { name: 'DEX', value: 274, color: 'bg-pink-400' },
//           { name: 'INT', value: 245, color: 'bg-purple-400' },
//           { name: 'VIT', value: 298, color: 'bg-yellow-400' }
//         ].map((stat, i) => (
//           <div key={i} className="flex items-center justify-between">
//             <span className="text-sm text-cyan-200 uppercase tracking-widest w-12 font-bold font-mono">
//               {stat.name}
//             </span>
//             <div className="flex-1 mx-4 h-3 bg-cyan-900/40 rounded-full overflow-hidden border border-cyan-400/20">
//               <div
//                 className={`h-full ${stat.color} rounded-full transition-all duration-1000 shadow-[0_0_8px_2px_rgba(0,255,255,0.2)]`}
//                 style={{ width: `${(stat.value / 400) * 100}%` }}
//               ></div>
//             </div>
//             <span className="text-lg text-cyan-100 w-16 text-right font-bold font-mono">{stat.value}</span>
//           </div>
//         ))}
//       </div>
//     </div>

//     {/* Class-specific abilities */}
//     <div className="border-t border-cyan-400/30 pt-6">
//       <h4 className="text-cyan-300 font-semibold mb-4 text-lg uppercase tracking-widest font-mono">
//         Special Abilities
//       </h4>
//       <div className="flex flex-wrap gap-3">
//         {['Combat Master', 'Team Support', 'Critical Strike', 'Battle Fury'].map((ability, i) => (
//           <span
//             key={i}
//             className="px-4 py-2 bg-cyan-700/30 text-sm rounded-full text-cyan-200 border border-cyan-400/30 shadow-[0_0_8px_2px_rgba(0,255,255,0.15)] font-mono tracking-widest"
//           >
//             {ability}
//           </span>
//         ))}
//       </div>
//     </div>

//     {/* Select button */}
//     <div className="mt-8 pt-6 border-t border-cyan-400/30">
//       <button className="
//         w-full
//         bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500
//         hover:from-cyan-300 hover:to-pink-400
//         text-white font-extrabold py-4 px-8 rounded-lg text-lg
//         transition-all duration-300 transform hover:scale-105
//         shadow-[0_0_24px_4px_rgba(0,255,255,0.25)]
//         tracking-widest font-mono
//       ">
//         SELECT
//       </button>
//     </div>
//   </div>
// </div>
//     );
// }

// export default function CharacterShowcase() {
//     const [selectedCharacter, setSelectedCharacter] = useState(null);
//     const [likes, setLikes] = useState(87);
//     const [showDetails, setShowDetails] = useState(false);
//     const [isTransitioning, setIsTransitioning] = useState(false);

//     const handleCharacterClick = (index) => {
//         if (characters[index].unlocked) {
//             if (selectedCharacter === index) {
//                 // Close if same character clicked
//                 setIsTransitioning(true);
//                 setTimeout(() => {
//                     setSelectedCharacter(null);
//                     setShowDetails(false);
//                     setIsTransitioning(false);
//                 }, 200);
//             } else {
//                 // Select new character
//                 setIsTransitioning(true);
//                 setSelectedCharacter(index);
//                 setTimeout(() => {
//                     setShowDetails(true);
//                     setIsTransitioning(false);
//                 }, 500);
//             }
//         } else {
//             // Show lock message for locked characters
//             console.log('Character locked! Complete previous challenges to unlock.');
//         }
//     };

//     const handleCloseDetails = () => {
//         setIsTransitioning(true);
//         setShowDetails(false);
//         setTimeout(() => {
//             setSelectedCharacter(null);
//             setIsTransitioning(false);
//         }, 300);
//     };

//     return (
//         <div className="w-full h-screen bg-gradient-to-b from-slate-900 via-indigo-900 to-slate-900 relative overflow-hidden">

//             <div className="absolute inset-0 opacity-60">
//                 {Array.from({ length: 200 }).map((_, i) => (
//                     <div
//                         key={i}
//                         className="absolute bg-white rounded-full animate-pulse"
//                         style={{
//                             width: `${1 + Math.random() * 2}px`,
//                             height: `${1 + Math.random() * 2}px`,
//                             left: `${Math.random() * 100}%`,
//                             top: `${Math.random() * 100}%`,
//                             animationDelay: `${Math.random() * 5}s`,
//                             animationDuration: `${2 + Math.random() * 3}s`
//                         }}
//                     />
//                 ))}
//             </div>


//             {/* 3D Scene */}
//             <Canvas
//                 style={{ marginTop: '10rem' }} // Adjust '10rem' as needed
//                 camera={{ position: [0, 2, 12], fov: 40 }}
//                 gl={{ antialias: true, alpha: true }}
//             >
//                 <ambientLight intensity={0.7} color="#ffffff" />
//                 <directionalLight position={[5, 10, 7]} intensity={1.2} color="#ffffff" castShadow />




//                 {/* Environment and background */}
//                 <Environment preset="night" />
//                 <MysticalBackground />

//                 {/* Enhanced magical particles */}
//                 <MagicalParticles />

//                 {/* Characters arranged in V-formation */}
//                 {characters.map((character, index) => (
//                     <Suspense
//                         key={index}
//                         fallback={<CharacterPlaceholder position={teamPositions[index]} name={character.name} />}
//                     >
//                         <InteractiveCharacterModel
//                             character={character}
//                             position={teamPositions[index]}
//                             scale={0.04}
//                             isSelected={selectedCharacter === index}
//                             isForward={selectedCharacter === index && showDetails}
//                             onClick={() => handleCharacterClick(index)}
//                         />
//                     </Suspense>
//                 ))}


//             </Canvas>

//             {/* Enhanced character details panel - only show for unlocked characters */}
//             {selectedCharacter !== null && characters[selectedCharacter].unlocked && (
//                 <div className="absolute top-20 right-4 w-96 bg-gradient-to-br from-slate-900/95 via-indigo-900/90 to-slate-800/95 backdrop-blur-md rounded-xl border border-blue-400/30 p-6 text-white shadow-2xl shadow-blue-400/20">
//                     <div className="flex items-center justify-between mb-6">
//                         <div className="flex items-center space-x-4">
//                             <div className="p-3 bg-blue-500/20 rounded-full border border-blue-400/30">
//                                 {React.createElement(classIcons[characters[selectedCharacter].class] || Users, {
//                                     className: "w-8 h-8 text-blue-400"
//                                 })}
//                             </div>
//                             <div>
//                                 <h2 className="text-2xl font-bold text-blue-400 mb-1">
//                                     {characters[selectedCharacter].class.toUpperCase()}
//                                 </h2>
//                                 <p className="text-sm text-slate-300 uppercase tracking-wide">
//                                     {characters[selectedCharacter].name}
//                                 </p>
//                             </div>
//                         </div>
//                         <button
//                             onClick={() => setSelectedCharacter(null)}
//                             className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-700/50 rounded-lg"
//                         >
//                             ✕
//                         </button>
//                     </div>

//                     <div className="border-t border-slate-600/50 pt-6 mb-6">
//                         <p className="text-slate-300 leading-relaxed text-sm">
//                             {characters[selectedCharacter].description}
//                         </p>
//                     </div>

//                     {/* Enhanced stats visualization */}
//                     <div className="space-y-3 mb-6">
//                         {[
//                             { name: 'Strength', value: 85, color: 'bg-red-400' },
//                             { name: 'Dexterity', value: 70, color: 'bg-green-400' },
//                             { name: 'Intelligence', value: 60, color: 'bg-blue-400' },
//                             { name: 'Vitality', value: 75, color: 'bg-purple-400' }
//                         ].map((stat, i) => (
//                             <div key={i} className="flex items-center justify-between">
//                                 <span className="text-xs text-slate-400 uppercase tracking-wide w-20">
//                                     {stat.name}
//                                 </span>
//                                 <div className="flex-1 mx-3 h-2 bg-slate-700/50 rounded-full overflow-hidden">
//                                     <div
//                                         className={`h-full ${stat.color} rounded-full transition-all duration-1000`}
//                                         style={{ width: `${stat.value}%` }}
//                                     ></div>
//                                 </div>
//                                 <span className="text-xs text-slate-300 w-8 text-right">{stat.value}</span>
//                             </div>
//                         ))}
//                     </div>

//                     {/* Class-specific abilities placeholder */}
//                     <div className="border-t border-slate-600/50 pt-4">
//                         <h4 className="text-blue-400 font-semibold mb-2 text-sm uppercase tracking-wide">
//                             Special Abilities
//                         </h4>
//                         <div className="flex flex-wrap gap-2">
//                             {['Combat Master', 'Team Support', 'Critical Strike'].map((ability, i) => (
//                                 <span key={i} className="px-2 py-1 bg-slate-700/50 text-xs rounded-full text-slate-300 border border-slate-600/30">
//                                     {ability}
//                                 </span>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             )}







//         </div>
//     );
// }