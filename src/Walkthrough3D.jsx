import React,{Suspense,useEffect,useRef,useState} from 'react';
import {Canvas,useFrame} from '@react-three/fiber';
import {Environment,ContactShadows} from '@react-three/drei';
import * as THREE from 'three';
import {useReducedMotion} from 'framer-motion';
import './Walkthrough3D.css';

const mat={stone:'#c8bca6',cream:'#e8dbc4',gold:'#b8955a',dark:'#29241e',wood:'#493426',leaf:'#44583c'};
function Block({position,scale,color,roughness=.65,metalness=0,...props}){return <mesh position={position} castShadow receiveShadow {...props}><boxGeometry args={scale}/><meshStandardMaterial color={color} roughness={roughness} metalness={metalness}/></mesh>}
function Pillar({x,z,height=6}){return <group position={[x,0,z]}><Block position={[0,height/2,0]} scale={[.52,height,.52]} color={mat.cream}/><Block position={[0,.23,0]} scale={[.82,.46,.82]} color={mat.stone}/><Block position={[0,height-.25,0]} scale={[.8,.5,.8]} color={mat.gold} metalness={.6}/></group>}
function GateLeaf({side,progress}){const pivot=useRef();useFrame(()=>{if(pivot.current){const t=THREE.MathUtils.smoothstep(progress.current,.18,.42);pivot.current.rotation.y=THREE.MathUtils.lerp(pivot.current.rotation.y,(side==='left'?1:-1)*t*1.58,.11)}});return <group ref={pivot} position={[side==='left'?-2.3:2.3,0,1.6]}>
 <group position={[side==='left'?1.15:-1.15,0,0]}>
  <Block position={[0,3.15,0]} scale={[2.3,6.3,.22]} color={mat.wood}/>
  {[0,1].map(i=><group key={i}><Block position={[0,1.8+i*2.8,.14]} scale={[1.85,2.28,.055]} color="#654b31"/><Block position={[0,1.8+i*2.8,.19]} scale={[1.5,1.98,.025]} color="#35281e"/><Block position={[0,1.8+i*2.8,.22]} scale={[1.3,1.75,.02]} color="#735535"/></group>)}
  <Block position={[side==='left'?.82:-.82,3.1,.27]} scale={[.09,.56,.12]} color={mat.gold} metalness={.85}/>
 </group></group>}
function Arch({z=1.6}){return <group><Pillar x={-5.1} z={z} height={7.7}/><Pillar x={5.1} z={z} height={7.7}/><Block position={[0,7.5,z]} scale={[10.6,1.1,.9]} color={mat.stone}/><Block position={[0,8.25,z]} scale={[11.5,.5,1.25]} color={mat.gold} metalness={.55}/><Block position={[0,8.68,z]} scale={[12,.35,1.5]} color={mat.cream}/></group>}
function Chandelier({z}){return <group position={[0,6.4,z]}><mesh><cylinderGeometry args={[.035,.035,1.5,8]}/><meshStandardMaterial color={mat.gold} metalness={.8} roughness={.2}/></mesh><mesh position={[0,-.9,0]}><torusGeometry args={[1.25,.07,8,40]}/><meshStandardMaterial color={mat.gold} metalness={.8} roughness={.25}/></mesh>{Array.from({length:12},(_,i)=>{const a=i*Math.PI/6;return <mesh key={i} position={[Math.cos(a)*1.25,-1.08,Math.sin(a)*1.25]}><sphereGeometry args={[.105,8,8]}/><meshStandardMaterial color="#ffe9b6" emissive="#ffdb91" emissiveIntensity={1.6}/></mesh>})}<pointLight position={[0,-1.1,0]} intensity={9} distance={10} color="#ffcd8c"/></group>}
function Planter({x,z}){return <group position={[x,0,z]}><mesh position={[0,.5,0]} castShadow><cylinderGeometry args={[.44,.32,1,12]}/><meshStandardMaterial color="#c2a36c" metalness={.35} roughness={.4}/></mesh>{Array.from({length:7},(_,i)=>{const a=i*2.4;return <mesh key={i} position={[Math.cos(a)*.33,1.55+(i%3)*.25,Math.sin(a)*.33]} castShadow><sphereGeometry args={[.45,9,8]}/><meshStandardMaterial color={i%3===0?'#c9b39e':mat.leaf} roughness={.85}/></mesh>})}</group>}
function World({progress}){return <group>
 <color attach="background" args={['#151a1b']}/>
 <fog attach="fog" args={['#151a1b',18,62]}/>
 <ambientLight intensity={.65} color="#b9c5d1"/>
 <hemisphereLight intensity={1.1} color="#fff1d9" groundColor="#34302b"/>
 <directionalLight position={[-6,12,10]} intensity={2.2} color="#f6d9ad" castShadow shadow-mapSize={[1024,1024]} shadow-camera-left={-16} shadow-camera-right={16} shadow-camera-top={16} shadow-camera-bottom={-16}/>
 <Block position={[0,-.22,-12]} scale={[22,.4,62]} color="#b6ab98" roughness={.4}/>
 <Block position={[0,-.01,-12]} scale={[4.2,.025,61]} color="#e5d6bc" roughness={.4}/>
 {Array.from({length:15},(_,i)=><group key={i}><Block position={[-7,.02,10-i*3]} scale={[.045,.035,2.4]} color={mat.gold}/><Block position={[7,.02,10-i*3]} scale={[.045,.035,2.4]} color={mat.gold}/></group>)}
 <Arch z={1.6}/>
 <GateLeaf side="left" progress={progress}/><GateLeaf side="right" progress={progress}/>
 <Block position={[-6,4.2,-15]} scale={[.7,8.4,31]} color={mat.stone}/>
 <Block position={[6,4.2,-15]} scale={[.7,8.4,31]} color={mat.stone}/>
 <Block position={[0,8.5,-15]} scale={[12.8,.65,31]} color={mat.cream}/>
 {[-5.3,5.3].map(x=>Array.from({length:7},(_,i)=><Pillar key={x+'-'+i} x={x} z={-1.5-i*4.2} height={7.6}/>))}
 {[-5,-12,-19,-26].map(z=><Chandelier key={z} z={z}/>)}
 {[-3,-10,-17,-24].map(z=><React.Fragment key={z}><Planter x={-4.1} z={z}/><Planter x={4.1} z={z}/></React.Fragment>)}
 <Block position={[0,4,-31]} scale={[12,8,.65]} color="#55473a"/>
 <Block position={[0,4,-30.62]} scale={[5,6.5,.06]} color={mat.gold} metalness={.4}/>
 <Block position={[0,4,-30.56]} scale={[4.6,6.1,.05]} color="#1b2421"/>
 <pointLight position={[0,6,2]} intensity={12} distance={18} color="#f7d1a0"/>
 <pointLight position={[0,5,-16]} intensity={11} distance={16} color="#f9d8a6"/>
 </group>}
function CameraRig({progress}){const v=useRef(new THREE.Vector3());useFrame(({camera},dt)=>{const p=progress.current;const smooth=THREE.MathUtils.smoothstep(p,0,1);const z=THREE.MathUtils.lerp(14,-21,smooth);const x=Math.sin(p*Math.PI)*.25;const y=THREE.MathUtils.lerp(2.25,2.65,p);v.current.set(x,y,z);camera.position.lerp(v.current,Math.min(1,dt*3));camera.lookAt(Math.sin(p*Math.PI)*.14,2.35,z-10)});return null}
function Fallback(){return <div className="walk-fallback"><span>ÉVORA</span><p>A WORLD BEYOND THE ORDINARY</p><a href="#home">EXPLORE OUR EVENTS ↗</a></div>}
function Scene({progress}){return <Canvas shadows dpr={[1,1.65]} gl={{antialias:true,powerPreference:'high-performance'}} camera={{position:[0,2.25,14],fov:65,near:.1,far:90}} fallback={<Fallback/>} onCreated={({gl})=>{gl.setClearColor('#151a1b')}}><Suspense fallback={null}><World progress={progress}/><CameraRig progress={progress}/></Suspense></Canvas>}
export default function Walkthrough3D(){const section=useRef(null),progress=useRef(0),reduce=useReducedMotion(),[supported,setSupported]=useState(true),[stage,setStage]=useState(0);
 useEffect(()=>{try{const c=document.createElement('canvas');setSupported(!!(c.getContext('webgl2')||c.getContext('webgl')))}catch{setSupported(false)}},[]);
 useEffect(()=>{if(reduce)return;let raf=0;const update=()=>{raf=0;const el=section.current;if(!el)return;const rect=el.getBoundingClientRect();const total=Math.max(1,el.offsetHeight-window.innerHeight);const p=Math.max(0,Math.min(1,-rect.top/total));progress.current=p;setStage(v=>{const n=p<.18?0:p<.45?1:2;return v===n?v:n})};const onScroll=()=>{if(!raf)raf=requestAnimationFrame(update)};update();window.addEventListener('scroll',onScroll,{passive:true});window.addEventListener('resize',onScroll);return()=>{window.removeEventListener('scroll',onScroll);cancelAnimationFrame(raf)}},[reduce]);
 return <section className={'walk3d '+(reduce?'walk3d-reduced':'')} ref={section} aria-label="Interactive 3D ÉVORA venue walkthrough"><div className="walk3d-sticky">
 {supported&&!reduce?<Scene progress={progress}/>:<Fallback/>}
 <div className="walk3d-gradient" aria-hidden="true"/>
 <div className="walk3d-ui"><p className="walk3d-eyebrow">ÉVORA / AN IMMERSIVE ARRIVAL</p><h1>{stage===0?<>Every story<br/><em>begins somewhere.</em></>:stage===1?<>The doors to<br/><em>extraordinary.</em></>:<>Step into<br/><em>the remarkable.</em></>}</h1><p>{stage===0?'Scroll to approach the grand entrance':stage===1?'Keep scrolling to open the doors':'Continue through the illuminated corridor'}</p></div>
 <div className="walk3d-bottom"><span>01 / THE GRAND ENTRANCE</span><span>SCROLL TO EXPLORE ↓</span></div>
 <a className="walk3d-skip" href="#home">SKIP EXPERIENCE ↗</a>
 </div></section>}
