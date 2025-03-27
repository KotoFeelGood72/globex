"use client"

import { Card, CardBody } from "@nextui-org/react"
import { IconBank, IconFast, IconShield, IconPiggy } from "../icons"
import { Counter } from "../animations/counter"
import { IconAnimation } from "../animations/icon-animation"
import { motion } from "framer-motion"

const stats = [
  { value: 1000, suffix: "+", label: "успешных транзакций" },
  { value: 160, suffix: "+", label: "стран-партнёров" },
  { value: 40, suffix: "%", label: "экономия на комиссиях" },
  { value: [12, 24], suffix: "ч", label: "среднее время перевода" }
]

const features = [
  {
    icon: IconBank,
    title: "Экспертиза в ВЭД",
    description: "Более 10 лет опыта работы с международными платежами и глубокое понимание специфики работы с китайскими банками"
  },
  {
    icon: IconFast,
    title: "Быстрые решения",
    description: "Оптимизация процессов и снижение издержек при работе с зарубежными партнерами"
  },
  {
    icon: IconShield,
    title: "Безопасность",
    description: "Все схемы проходят тщательную юридическую проверку и соответствуют требованиям законодательства"
  },
  {
    icon: IconPiggy,
    title: "Экономия",
    description: "Разработка эффективных схем для снижения комиссий и ускорения переводов"
  }
]

export function About() {
  return (
    <section className="py-16 sm:py-24 bg-background" id="about">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-foreground">
            О нас
          </h2>
          <p className="text-foreground/60 max-w-2xl mx-auto text-base sm:text-lg">
            Мы помогаем компаниям оптимизировать международные платежи и развивать бизнес
            в глобальном масштабе
          </p>
        </motion.div>

        {/* Статистика */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="border-none bg-default-100 shadow-sm w-full overflow-visible">
                <CardBody className="text-center p-4">
                  <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-2">
                    {Array.isArray(stat.value) ? (
                      <span>{stat.value[0]}-{stat.value[1]}{stat.suffix}</span>
                    ) : (
                      <Counter 
                        key={`counter-${index}`}
                        value={stat.value} 
                        suffix={stat.suffix} 
                        duration={2} 
                      />
                    )}
                  </p>
                  <p className="text-sm sm:text-base text-foreground/60">
                    {stat.label}
                  </p>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Преимущества */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            >
              <Card className="p-4 sm:p-6">
                <div className="flex flex-col items-center text-center">
                  <IconAnimation delay={index * 0.1}>
                    <feature.icon className="w-10 h-10 sm:w-12 sm:h-12 text-primary mb-4" />
                  </IconAnimation>
                  <h3 className="text-lg sm:text-xl font-semibold mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-foreground/60">
                    {feature.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
