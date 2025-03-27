"use client"

const steps = [
  {
    title: "Бесплатная консультация",
    duration: "30 минут",
    description: "Обсудим вашу текущую ситуацию с платежами, основные проблемы и цели. Определим, какие варианты оптимизации подойдут именно вам.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    )
  },
  {
    title: "Анализ и разработка стратегии",
    duration: "1-2 дня",
    description: "Наши эксперты проанализируют ваши транзакции, банковские отношения и бизнес-процессы. Подготовим детальный план оптимизации.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )
  },
  {
    title: "Подготовка решения",
    duration: "2-3 дня",
    description: "Разработаем пошаговую инструкцию по внедрению оптимизированных схем платежей. Подготовим все необходимые документы и инструкции.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  },
  {
    title: "Внедрение и поддержка",
    duration: "От 1 недели",
    description: "Поможем внедрить новые схемы платежей, проведем первые транзакции вместе с вами. Обеспечим поддержку на всех этапах.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  }
]

export function HowWeWork() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-primary">
          Как мы работаем
        </h2>
        <div className="max-w-4xl mx-auto space-y-8">
          {steps.map((step, index) => (
            <div key={index} className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  {step.icon}
                </div>
              </div>
              <div className="flex-grow">
                <div className="flex items-baseline gap-3 mb-2">
                  <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
                  <span className="text-sm text-primary">Длительность: {step.duration}</span>
                </div>
                <div className="p-4 bg-content1 rounded-lg text-foreground/80">
                  {step.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
