"use client";

import { Card, CardBody } from "@nextui-org/react";
import { IconAnimation } from "../animations/icon-animation";
import { motion } from "framer-motion";
import { FileText, Shield, Clock, PiggyBank } from "lucide-react";

const benefits = [
  {
    title: "Разбор вашей ситуации",
    description:
      "Оценим объемы, каналы платежей и потенциальные «узкие места».",
    icon: FileText,
  },
  {
    title: "Рекомендации по снижению комиссий и рисков",
    description: "Конкретные шаги, адаптированные под ваш бизнес.",
    icon: Shield,
  },
  {
    title: "Ответы на острые вопросы",
    description:
      "Вы узнаете о доступных инструментах, опциях эскроу, стратегиях обхода санкционных ограничений.",
    icon: Clock,
  },
  {
    title: "Прогнозируемые сроки и бюджеты",
    description: "Понимание сроков транзакций и возможной экономии.",
    icon: PiggyBank,
  },
];

export function Benefits() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold mb-6 text-foreground"
          >
            Что вы получите от консультации
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-foreground/60"
          >
            Мы не обещаем чудес – мы даём чёткие и практические советы,
            подкреплённые нашим многолетним опытом в международных финансах.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  isPressable
                  className="bg-content1 hover:bg-content2 transition-all cursor-pointer overflow-hidden h-full"
                >
                  <CardBody className="p-8">
                    <div className="flex items-start gap-4">
                      <IconAnimation delay={index * 0.2}>
                        <div className="p-3 rounded-xl bg-primary/10">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                      </IconAnimation>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                          {benefit.title}
                        </h3>
                        <p className="text-foreground/60 text-base">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
