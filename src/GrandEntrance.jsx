import React,{useRef} from 'react';
import {motion,useScroll,useTransform,useReducedMotion} from 'framer-motion';
import {ChevronDown,ArrowDown} from 'lucide-react';
import './GrandEntrance.css';

export default function GrandEntrance(){
 const section=useRef(null);
 const reduced=useReducedMotion();
 const {scrollYProgress}=useScroll({target:section,offset:['start start','end end']});
 const left=useTransform(scrollYProgress,[0,.72],['0%','-104%']);
 const right=useTransform(scrollYProgress,[0,.72],['0%','104%']);
 const glow=useTransform(scrollYProgress,[.2,.75],[.1,1]);
 const scale=useTransform(scrollYProgress,[0,1],[1,1.22]);
 const titleOpacity=useTransform(scrollYProgress,[0,.14,.36],[1,1,0]);
 const hintOpacity=useTransform(scrollYProgress,[0,.12,.3],[1,1,0]);
 return <section className="grand-entrance" ref={section} aria-label="Scroll to enter the ÉVORA experience">
   <div className="grand-stage">
    <motion.div className="grand-venue" style={reduced?{}:{scale}} aria-hidden="true"/>
    <motion.div className="grand-light" style={reduced?{}:{opacity:glow}} aria-hidden="true"/>
    <div className="grand-arch" aria-hidden="true"><div className="grand-arch-top"/></div>
    <div className="grand-doors" aria-hidden="true">
      <motion.div className="grand-door grand-door-left" style={reduced?{transform:'translateX(-104%)'}:{x:left}}><div className="grand-door-inset"/><div className="grand-handle"/></motion.div>
      <motion.div className="grand-door grand-door-right" style={reduced?{transform:'translateX(104%)'}:{x:right}}><div className="grand-door-inset"/><div className="grand-handle"/></motion.div>
    </div>
    <motion.div className="grand-welcome" style={reduced?{}:{opacity:titleOpacity}}>
      <span className="grand-kicker">THE ÉVORA EXPERIENCE</span>
      <h2>Every entrance<br/><em>begins a story.</em></h2>
      <span className="grand-monogram">É</span>
    </motion.div>
    <motion.div className="grand-scroll" style={reduced?{}:{opacity:hintOpacity}}><span>SCROLL TO OPEN THE GATES</span><ChevronDown size={18}/></motion.div>
    <a href="#home" className="grand-skip">SKIP INTRO <ArrowDown size={14}/></a>
    <span className="grand-corner">ÉVORA / THE GRAND ENTRANCE</span>
   </div>
 </section>
}