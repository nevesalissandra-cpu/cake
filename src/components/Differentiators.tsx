import React from 'react';
import { Sparkles, ShieldCheck, Heart, Award, Truck, Coffee } from 'lucide-react';

export const Differentiators: React.FC = () => {
  const items = [
    {
      icon: Award,
      title: 'Ingredientes Nobres & Puros',
      description:
        'Utilizamos chocolate belga Callebaut autêntico, manteiga de primeira linha, ovos caipiras frescos e frutas da estação. Banimos gordura vegetal hidrogenada e misturas prontas industriais.',
      tag: 'Qualidade Inegociável',
    },
    {
      icon: Heart,
      title: 'Massas Fofas & Muito Recheio',
      description:
        'A proporção perfeita entre massa úmida e camadas abundantes de recheio aveludado cozido lentamente na panela. Doçura equilibrada para que todos possam repetir sem enjoar.',
      tag: 'Equilíbrio e Textura',
    },
    {
      icon: Truck,
      title: 'Embalagem Rígida & Transporte Seguro',
      description:
        'Seu bolo viaja protegido em caixas reforçadas de alta gramatura sobre cakeboards de MDF rígido antiderrapante, garantindo que chegue impecável ao local da sua celebração.',
      tag: 'Segurança Total',
    },
    {
      icon: ShieldCheck,
      title: 'Produção Feita no Dia do Evento',
      description:
        'Nada de bolos congelados por semanas. Nossas montagens e finalizações ocorrem na véspera ou na manhã da entrega para assegurar o aroma, maciez e o frescor máximo.',
      tag: 'Frescor Absoluto',
    },
  ];

  return (
    <section id="diferenciais" className="py-20 bg-amber-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Nosso Compromisso com o Sabor</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
            Por Que Nossos Bolos São Tão Amados?
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base">
            Combinamos a tradição dos cadernos de receitas de família com as técnicas mais modernas da confeitaria fina mundial.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                id={`differentiator-card-${index}`}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-amber-900/10 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-amber-100/80 text-amber-900 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] uppercase font-bold text-amber-800 tracking-wider block mb-1.5">
                    {item.tag}
                  </span>
                  <h3 className="font-serif-display text-lg font-bold text-stone-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
