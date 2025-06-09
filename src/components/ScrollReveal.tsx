import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  delay = 0,
  direction = 'up',
  distance = 50
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();
  
  // Determinar la dirección inicial del movimiento
  const getInitialDirection = () => {
    switch (direction) {
      case 'up': return { opacity: 0, y: distance };
      case 'down': return { opacity: 0, y: -distance };
      case 'left': return { opacity: 0, x: distance };
      case 'right': return { opacity: 0, x: -distance };
      default: return { opacity: 0, y: distance };
    }
  };
  
  useEffect(() => {
    if (isInView) {
      controls.start({ opacity: 1, x: 0, y: 0, transition: { duration: 0.8, delay } });
    }
  }, [isInView, controls, delay]);
  
  return (
    <motion.div
      ref={ref}
      initial={getInitialDirection()}
      animate={controls}
      className="will-change-transform"
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;