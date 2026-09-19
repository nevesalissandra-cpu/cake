import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { FAQS } from '../data/cakes';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
            <span>Tire Suas Dúvidas</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            Perguntas Frequentes
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base">
            Tudo o que você precisa saber antes de fazer sua encomenda conosco.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                id={`faq-accordion-item-${index}`}
                className="border border-stone-200 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  id={`faq-toggle-btn-${index}`}
                  type="button"
                  onClick={() => toggleIndex(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 bg-stone-50/50 hover:bg-amber-50/50 transition-colors cursor-pointer"
                >
                  <span className="font-serif-display text-base sm:text-lg font-bold text-stone-900">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-white border border-stone-200 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-amber-100 border-amber-300' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4 text-stone-700" />
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-panel-${index}`}
                    className="p-5 sm:p-6 pt-2 bg-white text-stone-600 text-sm sm:text-base leading-relaxed border-t border-stone-100 animate-fade-in"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Help Banner */}
        <div className="mt-12 p-6 rounded-3xl bg-amber-50 border border-amber-200 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="font-bold text-stone-900 text-base">Ainda tem alguma dúvida específica?</h4>
            <p className="text-xs text-stone-600">Nossa equipe de confeitaria atende você com todo o carinho pelo WhatsApp.</p>
          </div>
          <a
            id="faq-whatsapp-direct-btn"
            href="https://wa.me/5511999999999?text=Ol%C3%A1!%20Estou%20com%20uma%20d%C3%BAvida%20sobre%20as%20encomendas%20de%20bolos."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold transition-colors shrink-0 shadow-xs"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Falar com Atendimento</span>
          </a>
        </div>

      </div>
    </section>
  );
};
