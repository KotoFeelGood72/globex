'use client';

import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { Benefits } from '@/components/sections/benefits';
import { HowWeWork } from '@/components/sections/how-we-work';
import { FAQ } from '@/components/sections/faq';
import { ContactForm } from '@/components/sections/contact-form';
import { Calculator } from '@/components/sections/calculator';
import { TargetAudience } from '@/components/sections/target-audience';

export default function Home() {
  return (
    <div className="flex flex-col">
      <div id="hero" className="relative">
        <Hero />
      </div>
      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 gap-16 lg:gap-24">
          <div id="about">
            <About />
          </div>
          <div id="calculator">
            <Calculator />
          </div>
          <div id="benefits">
            <Benefits />
          </div>
          <div id="target-audience">
            <TargetAudience />
          </div>
          <div id="how-we-work">
            <HowWeWork />
          </div>
          <div id="faq">
            <FAQ />
          </div>
          <div id="contact">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
