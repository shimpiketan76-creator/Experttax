import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

interface LogoProps {
  className?: string;
  size?: number;
}

export default function Logo({ className, size = 48 }: LogoProps) {
  return (
    <motion.div 
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={cn("relative flex items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Shield Background */}
        <path
          d="M50 5L15 20V50C15 70 30 85 50 95C70 85 85 70 85 50V20L50 5Z"
          fill="#1e3a8a"
        />
        
        {/* Shield Gradient Accent */}
        <path
          d="M50 5L85 20V50C85 70 70 85 50 95V5L50 5Z"
          fill="#0f172a"
          fillOpacity="0.1"
        />

        {/* Digital Circuit Lines */}
        <g stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" opacity="0.6">
          <path d="M40 30L30 40M30 40H25" />
          <path d="M40 70L30 60M30 60H25" />
          <path d="M60 30L70 40M70 40H75" />
          <path d="M60 70L70 60M70 60H75" />
          <circle cx="23" cy="40" r="1.5" fill="#10b981" />
          <circle cx="23" cy="60" r="1.5" fill="#10b981" />
          <circle cx="77" cy="40" r="1.5" fill="#10b981" />
          <circle cx="77" cy="60" r="1.5" fill="#10b981" />
        </g>

        {/* Checkmark and Growth Arrow Combo */}
        <path
          d="M35 55L45 65L75 35M75 35H60M75 35V50"
          stroke="white"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
}
