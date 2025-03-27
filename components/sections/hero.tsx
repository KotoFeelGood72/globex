"use client"

import { ChevronDown } from "lucide-react"
import { Link as ScrollLink } from "react-scroll"

export function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center w-full mt-16 -z-10">
      <div className="w-full relative">
        <div className="container mx-auto max-w-[90%] sm:max-w-2xl md:max-w-3xl lg:max-w-4xl text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide mb-6 sm:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            Экспертный консалтинг международных платежей
          </h1>
          
          <p className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-foreground/80 font-medium max-w-prose mx-auto">
            Помогаем бизнесу выстроить эффективные платёжные решения
            для работы с Китаем, Европой, США и другими странами.
            Оптимизируем процессы и снижаем издержки.
          </p>
        </div>

        <ScrollLink
          to="about"
          smooth={true}
          duration={500}
          spy={true}
          offset={-100}
          className="mt-12 flex justify-center cursor-pointer group"
        >
          <ChevronDown className="w-8 h-8 animate-bounce text-primary transition-transform group-hover:scale-110" />
        </ScrollLink>
      </div>
    </section>
  )
}
