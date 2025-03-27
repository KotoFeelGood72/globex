'use client';

import { motion } from 'framer-motion';
import { ExchangeCalculator } from '@/components/calculator/exchange-calculator';
import { RateBook } from '@/components/calculator/rate-book';

export function Calculator() {
  return (
    <section id="calculator" className="scroll-mt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
          Калькулятор обмена валют
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
          Рассчитайте стоимость обмена валют с учетом актуального курса и комиссий
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ExchangeCalculator />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <RateBook />
        </motion.div>
      </div>
    </section>
  );
}
