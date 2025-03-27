'use client';

import { motion } from 'framer-motion';
import { IconChevronDown } from './icons';

export function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        repeatType: "reverse",
      }}
    >
      <IconChevronDown 
        className="w-8 h-8 text-gray-600 dark:text-gray-400" 
        aria-hidden="true"
      />
    </motion.div>
  );
}
