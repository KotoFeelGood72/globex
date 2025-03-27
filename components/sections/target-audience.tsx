'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

const targetAudienceData = [
  {
    id: 'delays',
    title: 'Компаниям, сталкивающимся с задержками платежей',
    content: 'Если ваши транзакции занимают слишком много времени, мы обеспечим завершение операций в течение двух рабочих дней, независимо от сложности.'
  },
  {
    id: 'fees',
    title: 'Бизнесам, которые хотят сократить расходы на комиссии',
    content: 'Если вы теряете значительные суммы на переводах, наши решения помогут минимизировать издержки за счет выгодных тарифов и оптимизации маршрутов платежей.'
  },
  {
    id: 'transparency',
    title: 'Тем, кто устал от скрытых комиссий и непрозрачности',
    content: 'Если вам важно знать точный статус платежа и быть уверенными в отсутствии дополнительных сборов, мы предоставим полную прозрачность операций.'
  },
  {
    id: 'regulatory',
    title: 'Компаниям, испытывающим трудности с регуляторными требованиями',
    content: 'Если соблюдение стандартов AML/KYC или других норм вызывает сложности, наши специалисты помогут вам соответствовать всем международным правилам.'
  },
  {
    id: 'multicurrency',
    title: 'Бизнесам, работающим с несколькими валютами',
    content: 'Если вы проводите операции в USD, EUR, RUB, CNY, AED или других валютах, мы упрощаем мультивалютные расчеты, снижая риск от колебаний курса.'
  },
  {
    id: 'jurisdictions',
    title: 'Тем, кто работает с партнерами в сложных юрисдикциях',
    content: 'Если ваши транзакции ограничиваются из-за санкций или местных финансовых правил, мы предложим надежные решения для работы с более чем 160 странами.'
  },
  {
    id: 'international',
    title: 'Компаниям, начинающим внешнеэкономическую деятельность (ВЭД)',
    content: 'Если вы только выходите на международный рынок, мы поможем избежать ошибок и оптимизировать процесс платежей и документооборота.'
  },
  {
    id: 'support',
    title: 'Бизнесам, ценящим профессиональную поддержку',
    content: 'Если вы хотите получить персональный подход и консультации по нестандартным задачам, наша команда обеспечит оперативную и квалифицированную помощь.'
  },
  {
    id: 'automation',
    title: 'Тем, кто хочет автоматизировать процессы',
    content: 'Если вам нужно минимизировать время на оформление документов и контроль операций, наша интеллектуальная система автоматизации сделает это за вас.'
  },
  {
    id: 'reputation',
    title: 'Компаниям, для которых важна репутация',
    content: 'Если срывы сроков и проблемы с платежами недопустимы, мы обеспечим стабильность и скорость, укрепляющие доверие ваших партнеров.'
  }
];

export function TargetAudience() {
  return (
    <section className="py-16 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">
              Кому необходимы наши услуги
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Наша экспертиза — ваш ключ к эффективным международным платежам. 
              Узнайте, подходят ли наши решения вашему бизнесу.
            </p>
          </div>

          <Card className="p-6">
            <Accordion type="single" collapsible className="w-full">
              {targetAudienceData.map((item) => (
                <AccordionItem key={item.id} value={item.id}>
                  <AccordionTrigger className="text-left">
                    {item.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">{item.content}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
