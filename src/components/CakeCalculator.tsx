import React, { useState, useMemo } from 'react';
import { Calculator, Users, Sparkles, ArrowRight, Check, HelpCircle, Utensils } from 'lucide-react';

interface CakeCalculatorProps {
  onSelectRecommendedSize: (targetSection: string) => void;
}

export const CakeCalculator: React.FC<CakeCalculatorProps> = ({ onSelectRecommendedSize }) => {
  const [adults, setAdults] = useState<number>(20);
  const [children, setChildren] = useState<number>(5);
  const [eventType, setEventType] = useState<'infantil' | 'casamento' | 'almoco' | 'cafe'>('infantil');
  const [hasOtherSweets, setHasOtherSweets] = useState<boolean>(true);

  // Calculation logic
  const calculation = useMemo(() => {
    // Grams per person based on event and sweets
    let gramsPerAdult = 100;
    let gramsPerChild = 60;

    if (!hasOtherSweets) {
      gramsPerAdult += 35;
      gramsPerChild += 20;
    }

    if (eventType === 'casamento') {
      // In weddings guests eat slightly less cake due to dinner and buffet
      gramsPerAdult -= 10;
    } else if (eventType === 'cafe') {
      // In coffee gatherings cake is the star
      gramsPerAdult += 20;
    }

    const totalGrams = adults * gramsPerAdult + children * gramsPerChild;
    const totalKg = Math.max(1.0, Math.round((totalGrams / 1000) * 10) / 10);
    const estimatedSlices = Math.round(totalGrams / 90);

    let suggestedFormat = '';
    if (totalKg <= 1.8) {
      suggestedFormat = '1 Bolo Tamanho P (Aro 16cm ou Aro 18cm)';
    } else if (totalKg <= 2.8) {
      suggestedFormat = '1 Bolo Tamanho M (Aro 20cm ou Aro 22cm)';
    } else if (totalKg <= 4.0) {
      suggestedFormat = '1 Bolo Tamanho G (Aro 24cm a 26cm)';
    } else {
      suggestedFormat = '1 Bolo de 2 Andares (Festa Luxo) ou 2 Bolos Médios';
    }

    return {
      totalKg,
      estimatedSlices,
      suggestedFormat,
      totalPeople: adults + children,
    };
  }, [adults, children, eventType, hasOtherSweets]);

  return (
    <section id="calculadora" className="py-20 bg-stone-900 text-stone-100 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-800 border border-stone-700 text-amber-400 text-xs font-semibold mb-3">
            <Calculator className="w-3.5 h-3.5 text-amber-400" />
            <span>Ferramenta de Planejamento de Festas</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Calculadora de Bolo para seu Evento
          </h2>
          <p className="mt-3 text-stone-300 text-sm sm:text-base">
            Nunca mais erre na quantidade de bolo! Descubra o peso exato em quilos e a quantidade de fatias recomendadas para que não falte nem sobre bolo.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Controls Form */}
          <div className="lg:col-span-7 bg-stone-800/80 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-stone-700 space-y-7">
            
            {/* Guest Count Sliders */}
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="calculator-adults-input" className="text-xs sm:text-sm font-semibold text-stone-200 flex items-center gap-2">
                    <Users className="w-4 h-4 text-amber-400" />
                    Número de Adultos:
                  </label>
                  <span className="text-base font-bold text-amber-400 bg-stone-900 px-3 py-1 rounded-lg border border-stone-700">
                    {adults} adultos
                  </span>
                </div>
                <input
                  id="calculator-adults-input"
                  type="range"
                  min="2"
                  max="100"
                  value={adults}
                  onChange={(e) => setAdults(Number(e.target.value))}
                  className="w-full h-2 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="calculator-children-input" className="text-xs sm:text-sm font-semibold text-stone-200 flex items-center gap-2">
                    <Users className="w-4 h-4 text-amber-400" />
                    Número de Crianças (acima de 2 anos):
                  </label>
                  <span className="text-base font-bold text-amber-400 bg-stone-900 px-3 py-1 rounded-lg border border-stone-700">
                    {children} crianças
                  </span>
                </div>
                <input
                  id="calculator-children-input"
                  type="range"
                  min="0"
                  max="50"
                  value={children}
                  onChange={(e) => setChildren(Number(e.target.value))}
                  className="w-full h-2 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>
            </div>

            {/* Event Type Selector */}
            <div>
              <span className="text-xs font-bold text-stone-300 uppercase tracking-wider block mb-3">
                Tipo de Comemoração
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'infantil', label: 'Festa Infantil' },
                  { id: 'casamento', label: 'Casamento / 15 Anos' },
                  { id: 'almoco', label: 'Almoço / Jantar' },
                  { id: 'cafe', label: 'Café da Tarde' },
                ].map((type) => (
                  <button
                    key={type.id}
                    id={`calc-event-type-${type.id}`}
                    type="button"
                    onClick={() => setEventType(type.id as any)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer text-center ${
                      eventType === type.id
                        ? 'bg-amber-500 text-stone-950 border-amber-400 font-bold shadow-xs'
                        : 'bg-stone-900/60 text-stone-300 border-stone-700 hover:border-stone-500'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Has Other Sweets Toggle */}
            <div className="p-4 rounded-2xl bg-stone-900/60 border border-stone-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Utensils className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-white">
                    Haverá mesa de docinhos tradicionais ou sobremesas?
                  </p>
                  <p className="text-[11px] text-stone-400">
                    Com docinhos, a porção de bolo recomendada é de 100g por pessoa. Sem docinhos, cerca de 135g.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  id="calc-sweets-yes-btn"
                  onClick={() => setHasOtherSweets(true)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    hasOtherSweets ? 'bg-amber-500 text-stone-950' : 'bg-stone-800 text-stone-400'
                  }`}
                >
                  Sim
                </button>
                <button
                  type="button"
                  id="calc-sweets-no-btn"
                  onClick={() => setHasOtherSweets(false)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    !hasOtherSweets ? 'bg-amber-500 text-stone-950' : 'bg-stone-800 text-stone-400'
                  }`}
                >
                  Não
                </button>
              </div>
            </div>

          </div>

          {/* Results Summary Card */}
          <div className="lg:col-span-5 bg-gradient-to-b from-stone-800 to-stone-850 p-6 sm:p-8 rounded-3xl border border-amber-500/30 flex flex-col justify-between shadow-2xl relative">
            
            <div className="space-y-6">
              <div className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-semibold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" /> Recomendação Personalizada
              </div>

              {/* Big Metric Display */}
              <div className="grid grid-cols-2 gap-4 pb-6 border-b border-stone-700">
                <div className="bg-stone-900/80 p-4 rounded-2xl border border-stone-750">
                  <span className="text-[11px] uppercase tracking-wider text-stone-400 block font-medium">
                    Peso Ideal de Bolo
                  </span>
                  <span className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-serif-display mt-1 block">
                    {calculation.totalKg} kg
                  </span>
                  <span className="text-[10px] text-stone-400 mt-1 block">
                    Para {calculation.totalPeople} convidados
                  </span>
                </div>

                <div className="bg-stone-900/80 p-4 rounded-2xl border border-stone-750">
                  <span className="text-[11px] uppercase tracking-wider text-stone-400 block font-medium">
                    Fatias Estimadas
                  </span>
                  <span className="text-3xl sm:text-4xl font-extrabold text-white font-serif-display mt-1 block">
                    {calculation.estimatedSlices}
                  </span>
                  <span className="text-[10px] text-stone-400 mt-1 block">
                    Corte padrão buffet
                  </span>
                </div>
              </div>

              {/* Recommended Format */}
              <div className="space-y-2">
                <span className="text-xs text-stone-400 uppercase tracking-wider block font-semibold">
                  Estrutura Recomendada:
                </span>
                <p className="text-sm sm:text-base font-bold text-amber-200">
                  {calculation.suggestedFormat}
                </p>
              </div>

              {/* Practical Cake Cutting Tip */}
              <div className="bg-amber-950/40 border border-amber-500/20 p-3.5 rounded-xl text-xs text-stone-300">
                <p>
                  <strong>Dica de Corte da Chef:</strong> Para bolos redondos altos, faça um corte circular concêntrico a 5cm da borda e fatie primeiro o anel externo. Rende até 25% mais fatias elegantes e retinhas!
                </p>
              </div>

            </div>

            {/* CTAs */}
            <div className="pt-6 mt-6 border-t border-stone-700 space-y-2.5">
              <button
                id="calc-cta-custom-builder"
                type="button"
                onClick={() => onSelectRecommendedSize('monte-seu-bolo')}
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm transition-all shadow-md cursor-pointer"
              >
                <span>Montar Bolo com essa Medida</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="calc-cta-menu"
                type="button"
                onClick={() => onSelectRecommendedSize('cardapio')}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-stone-700/60 hover:bg-stone-700 text-stone-200 font-semibold text-xs transition-all cursor-pointer"
              >
                <span>Ver Bolos Prontos do Cardápio</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
