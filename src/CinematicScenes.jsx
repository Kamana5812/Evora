import React,{useRef,useState} from 'react';
import {motion,useScroll,useTransform,useReducedMotion,AnimatePresence} from 'framer-motion';
import {ArrowUpRight,ChevronDown} from 'lucide-react';
import './CinematicScenes.css';

const venue='https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1800&q=85';
const flowers='https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1800&q=85';
const gala='https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1800&q=85';
const petals=Array.from({length:17},(_,i)=>({id:i,x:(i*37+13)%100,delay:(i*0.63)%8,duration:7+(i%5)*1.3,size:5+(i%4)*3}));

export function CameraWalkthrough(){
 const ref=useRef(null),reduce=useReducedMotion();
 const {scrollYProgress:p}=useScroll({target:ref,offset:['start end','end start']});
 const scale=useTransform(p,[0,.5,1],[1,1.22,1.38]);
 const y=useTransform(p,[0,1],['-5%','7%']);
 const opacity=useTransform(p,[0,.2,.7,.95],[0,1,1,0]);
 return <section className="cine-walk" ref={ref} aria-label="Cinematic venue walkthrough">
  <motion.div className="cine-walk-image" style={reduce?{}:{scale,y}} aria-hidden="true"/>
  <div className="cine-walk-shade"/>
  <motion.div className="cine-walk-copy" style={reduce?{}:{opacity}}>
   <p className="cine-eyebrow">SCENE 02 / STEP INSIDE</p><h2>Enter a world<br/><em>of wonder.</em></h2><p>Every detail sets the stage for something unforgettable.</p>
  </motion.div><div className="cine-scroll-hint"><ChevronDown size={17}/> THE JOURNEY CONTINUES</div>
 </section>;
}

export function LightsReveal(){
 const ref=useRef(null),reduce=useReducedMotion();
 const {scrollYProgress:p}=useScroll({target:ref,offset:['start start','end end']});
 const darkness=useTransform(p,[0,.25,.78,1],[.93,.8,.05,0]);
 const spotlight=useTransform(p,[0,.4,.8],[.02,.35,1]);
 const text=useTransform(p,[0,.4,.72],[.15,.5,1]);
 return <section className="cine-lights" ref={ref} aria-label="Ballroom lights illuminate as you scroll">
  <div className="cine-lights-sticky">
   <div className="cine-lights-photo" role="img" aria-label="Elegant ballroom with event lighting" />
   <motion.div className="cine-lights-spotlight" style={reduce?{opacity:1}:{opacity:spotlight}}/>
   <motion.div className="cine-lights-darkness" style={reduce?{opacity:.12}:{opacity:darkness}}/>
   <motion.div className="cine-lights-copy" style={reduce?{}:{opacity:text}}><p className="cine-eyebrow">SCENE 03 / LET THERE BE LIGHT</p><h2>Watch the magic<br/><em>come alive.</em></h2></motion.div>
   <span className="cine-lights-count">LIGHTS / ON</span>
  </div>
 </section>;
}

export function VenueTransformation(){
 const ref=useRef(null),reduce=useReducedMotion();
 const {scrollYProgress:p}=useScroll({target:ref,offset:['start start','end end']});
 const first=useTransform(p,[.1,.47],[0,1]);
 const second=useTransform(p,[.48,.88],[0,1]);
 const labels=useTransform(p,[0,.2,.5,.85],[.4,.7,.8,1]);
 return <section className="cine-transform" ref={ref} aria-label="Venue transformation from an idea to a celebration">
  <div className="cine-transform-sticky">
   <div className="cine-transform-layer base" style={{backgroundImage:`url("${gala}")`}}/>
   <motion.div className="cine-transform-layer decorated" style={{backgroundImage:`url("${venue}")`,opacity:reduce?1:first}}/>
   <motion.div className="cine-transform-layer final" style={{backgroundImage:`url("${flowers}")`,opacity:reduce?1:second}}/>
   <div className="cine-transform-vignette"/>
   <motion.div className="cine-transform-copy" style={reduce?{}:{opacity:labels}}><p className="cine-eyebrow">SCENE 04 / THE TRANSFORMATION</p><h2>From a vision<br/><em>to a feeling.</em></h2><p>Every extraordinary celebration begins with an idea.</p></motion.div>
   <div className="cine-transform-steps"><span>THE IDEA</span><span>THE DETAILS</span><span>THE MAGIC</span></div>
  </div>
 </section>;
}

export function PetalInterlude(){
 const reduce=useReducedMotion();
 return <section className="cine-petals" aria-label="A poetic moment with floating petals">
  <div className="cine-petal-bg" aria-hidden="true"/>
  {!reduce&&<div className="cine-petal-field" aria-hidden="true">{petals.map(v=><span key={v.id} className="cine-petal" style={{left:`${v.x}%`,width:v.size,height:v.size*1.5,animationDelay:`-${v.delay}s`,animationDuration:`${v.duration}s`}}/>)}</div>}
  <motion.div className="cine-petals-copy" initial={reduce?false:{opacity:0,y:35}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.4}} transition={{duration:.8}}>
   <p className="cine-eyebrow">SCENE 05 / THE LITTLE THINGS</p><h2>Beauty lives<br/><em>in every detail.</em></h2><p>It's the moments between the moments that stay with us.</p>
  </motion.div>
 </section>;
}

export function InvitationReveal(){
 const ref=useRef(null),reduce=useReducedMotion();
 const {scrollYProgress:p}=useScroll({target:ref,offset:['start end','end start']});
 const lift=useTransform(p,[.18,.48,.72],[45,0,-65]);
 const rotate=useTransform(p,[.18,.55],[0,-10]);
 const flap=useTransform(p,[.15,.5],[0,-165]);
 const [copied,setCopied]=useState(false);
 const copy=async()=>{const value='ÉVORA — I would love to plan an extraordinary event. Please contact me about an event concept.';try{await navigator.clipboard.writeText(value);setCopied(true)}catch{window.prompt('Copy your inquiry:',value)}};
 return <section className="cine-invitation" ref={ref} id="cinematic-invitation" aria-label="Opening invitation">
  <div className="cine-invitation-copy"><p className="cine-eyebrow">SCENE 06 / YOU'RE INVITED</p><h2>Your story<br/><em>starts here.</em></h2><p>Every unforgettable moment begins with an invitation.</p></div>
  <div className="cine-envelope-scene">
   <div className="cine-envelope" aria-label="Decorative invitation envelope">
    <motion.div className="cine-invite-card" style={reduce?{y:-45,rotate:-8}:{y:lift,rotate}}><span>ÉVORA</span><small>YOU ARE CORDIALLY INVITED</small><strong>To Something<br/>Extraordinary</strong><small>EVERY MOMENT, EXCEPTIONALLY CRAFTED</small></motion.div>
    <motion.div className="cine-envelope-flap" style={reduce?{rotateX:-165}:{rotateX:flap}}/>
    <div className="cine-envelope-front"><span>É</span></div>
   </div>
  </div>
  <a className="cine-invite-cta" href="#atelier">DESIGN YOUR MOMENT <ArrowUpRight size={17}/></a>
 </section>;
}

export function GrandFinale(){
 const ref=useRef(null),reduce=useReducedMotion();
 const {scrollYProgress:p}=useScroll({target:ref,offset:['start end','end start']});
 const scale=useTransform(p,[0,1],[1.12,1]);
 return <section className="cine-finale" ref={ref} aria-label="ÉVORA grand finale">
  <motion.div className="cine-finale-bg" style={reduce?{}:{scale}} aria-hidden="true"/>
  <div className="cine-finale-shade"/>
  {!reduce&&<div className="cine-finale-sparks" aria-hidden="true">{petals.slice(0,12).map(v=><span key={v.id} style={{left:`${v.x}%`,animationDelay:`-${v.delay}s`,animationDuration:`${v.duration+4}s`}}/>)}</div>}
  <motion.div className="cine-finale-content" initial={reduce?false:{opacity:0,y:45}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.35}} transition={{duration:1}}>
   <p className="cine-eyebrow">THE FINALE / THE BEGINNING</p><h2>Your story deserves<br/><em>an extraordinary beginning.</em></h2><a href="#atelier" className="cine-finale-button">BEGIN YOUR STORY <ArrowUpRight size={18}/></a>
  </motion.div>
 </section>;
}
