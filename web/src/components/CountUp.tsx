import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

interface CountUpProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

const CountUp: React.FC<CountUpProps> = ({ 
  end, 
  duration = 2, 
  prefix = '', 
  suffix = '' 
}) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true });
  
  useEffect(() => {
    if (isInView) {
      let start = 0;
      const increment = end / (duration * 60);
      const timer = setInterval(() => {
        start += increment;
        if (start > end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16.7); // Aproximadamente 60fps
      
      return () => clearInterval(timer);
    }
  }, [isInView, end, duration]);
  
  return <span ref={nodeRef}>{prefix}{count}{suffix}</span>;
};

export default CountUp;