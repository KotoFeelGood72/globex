"use client"

import { Accordion, AccordionItem } from "@nextui-org/react"

const faqs = [
  {
    title: "Как быстро я смогу начать проводить платежи по новой схеме?",
    content: "После консультации и анализа вашей ситуации мы предложим готовое решение в течение 2-3 дней. Внедрение новой схемы обычно занимает от 1 до 2 недель, включая подготовку всех необходимых документов и настройку процессов."
  },
  {
    title: "Какие документы нужны для начала работы?",
    content: "Для начала работы нам потребуются учредительные документы вашей компании, информация о планируемых объемах платежей и основных направлениях. Полный список документов мы предоставим после консультации, когда будет выбрана оптимальная схема работы."
  },
  {
    title: "Насколько безопасны предлагаемые схемы?",
    content: "Мы работаем только с проверенными банками и платежными системами, имеющими все необходимые лицензии. Каждая схема проходит тщательную юридическую проверку и соответствует требованиям законодательства."
  },
  {
    title: "Какие валюты вы поддерживаете?",
    content: "Мы работаем со всеми основными мировыми валютами, включая USD, EUR, CNY, а также поддерживаем работу с цифровыми активами. Конкретные варианты зависят от выбранной схемы работы."
  }
]

export function FAQ() {
  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-primary">
          Часто задаваемые вопросы
        </h2>
        <div className="w-full max-w-[872px] mx-auto">
          <Accordion 
            variant="splitted"
            itemClasses={{
              base: "mb-2 bg-content1",
              title: "font-medium text-base sm:text-lg text-primary pr-12 sm:pr-16 leading-tight",
              trigger: "px-4 sm:px-6 py-3 hover:bg-content1 w-full",
              indicator: "right-4 sm:right-6 text-primary font-bold",
              content: "px-4 sm:px-6 text-sm sm:text-base text-foreground/60 leading-snug"
            }}
          >
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                aria-label={faq.title}
                title={faq.title}
              >
                <p className="pb-3">
                  {faq.content}
                </p>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
