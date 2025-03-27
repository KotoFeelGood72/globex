"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ContactModal } from "../ui/contact-modal";

export function Hero() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center w-full mt-16 z-10">
      <div className="w-full relative">
        <div className="lg:max-w-7xl mx-auto sm:max-w-2xl md:max-w-3xl px-4 sm:px-6 lg:px-8">
          <div id="row" className="flex items-center justify-center gap-7">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide mb-6 sm:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                Экспертный консалтинг международных платежей
              </h1>

              <p className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-foreground/80 font-medium max-w-prose mx-auto mb-7">
                Помогаем бизнесу выстроить эффективные платёжные решения для
                работы с Китаем, Европой, США и другими странами. Оптимизируем
                процессы и снижаем издержки.
              </p>

              <Button
                variant="default"
                size="lg"
                onClick={() => setIsOpen(true)}
              >
                Получить консультацию
              </Button>
            </div>
            <div className="w-full">
              <img src="/images/hero.png" alt="" />
            </div>
          </div>
        </div>
      </div>


      <ContactModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </section>
  );
}
