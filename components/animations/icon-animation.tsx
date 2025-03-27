'use client';

import { motion } from 'framer-motion';

interface IconAnimationProps {
  children: React.ReactNode;
  delay?: number;
}

export function IconAnimation({ children, delay = 0 }: IconAnimationProps) {
  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
        delay: delay,
      }}
      className="w-12 h-12 flex items-center justify-center text-primary"
    >
      {children}
    </motion.div>
  );
}
