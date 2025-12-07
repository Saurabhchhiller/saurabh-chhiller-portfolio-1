import React, { useEffect, useRef, useState } from 'react';
import { AnimationVariant } from '../types';

interface RevealProps {
  children: React.ReactNode | ((isVisible: boolean) => React.ReactNode);
  variant?: AnimationVariant;
  delay?: number;
  className?: string;
  threshold?: number;
}

const Reveal: React.FC<RevealProps> = ({ 
  children, 
  variant = 'fade-up', 
  delay = 0, 
  className = "",
  threshold = 0.15
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: threshold,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  const getTransformStyle = () => {
    switch (variant) {
      case 'fade-up':
        return isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0';
      case 'fade-in':
        return isVisible ? 'opacity-100' : 'opacity-0';
      case 'slide-left':
        return isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0';
      case 'slide-right':
        return isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0';
      case 'scale-in':
        return isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0';
      case 'rotate-fade':
        return isVisible ? 'rotate-0 opacity-100' : 'rotate-2 opacity-0';
      case 'blur-in':
        return isVisible ? 'blur-0 opacity-100 scale-100' : 'blur-md opacity-0 scale-95';
      default:
        return isVisible ? 'opacity-100' : 'opacity-0';
    }
  };

  const transitionStyle = {
    transitionDuration: '1000ms',
    transitionDelay: isVisible ? `${delay}ms` : '0ms',
    transitionProperty: 'transform, opacity, filter',
    // Spring-like bezier curve for iOS feel
    transitionTimingFunction: 'cubic-bezier(0.25, 0.8, 0.25, 1)' 
  };

  return (
    <div 
      ref={ref} 
      className={`${className} ${getTransformStyle()} will-change-transform`}
      style={transitionStyle}
    >
      {typeof children === 'function' ? children(isVisible) : children}
    </div>
  );
};

export default Reveal;