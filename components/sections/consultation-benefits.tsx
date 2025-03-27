"use client"

const benefits = [
  {
    title: "Разбор вашей ситуации",
    description: "Оценим объемы, каналы платежей и потенциальные «узкие места»."
  },
  {
    title: "Рекомендации по снижению комиссий и рисков",
    description: "Конкретные шаги, адаптированные под ваш бизнес."
  },
  {
    title: "Ответы на острые вопросы",
    description: "Вы узнаете о доступных инструментах, опциях эскроу, стратегиях обхода санкционных ограничений."
  },
  {
    title: "Прогнозируемые сроки и бюджеты",
    description: "Понимание сроков транзакций и возможной экономии."
  }
]

export function ConsultationBenefits() {
  return (
    <section className="py-16 bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Что вы получите от консультации
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Мы не обещаем чудес – мы даём чёткие и практические советы, подкреплённые нашим многолетним опытом в международных финансах.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-gray-950 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-400">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
