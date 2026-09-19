import React from 'react';
import { Sparkles, ArrowRight, Star, Heart, Clock, ShieldCheck } from 'lucide-react';
import { HERO_IMAGE } from '../data/cakes';

interface HeroProps {
  onScrollTo: (target: string) => void;
  onOpenCustomBuilder: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollTo, onOpenCustomBuilder }) => {
  return (
    <section id="hero-section" className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-gradient-to-b from-amber-100/40 via-amber-50/20 to-transparent">
      {/* Background Decorative Warm Accents */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-radial from-amber-200/25 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography & Call to Actions */}
          <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 border border-amber-300/60 text-amber-900 text-xs font-semibold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Confeitaria Afetiva & Festas Especiais</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-stone-900 tracking-tight leading-[1.12]">
              Bolos artesanais com sabor de{' '}
              <span className="text-amber-800 italic underline decoration-amber-300 decoration-wavy decoration-2">
                verdadeira celebração.
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Massas fofinhas e úmidas, recheios fartos preparados com chocolate belga e frutas frescas selecionadas. Cada fatia é criada sob medida para transformar seu aniversário, casamento ou café em memórias inesquecíveis.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                id="hero-cta-explore-menu"
                onClick={() => onScrollTo('cardapio')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-amber-800 text-amber-50 hover:bg-amber-900 font-semibold text-sm transition-all shadow-md hover:shadow-lg cursor-pointer group"
              >
                <span>Ver Cardápio de Bolos</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                id="hero-cta-custom-cake"
                onClick={onOpenCustomBuilder}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-amber-100/80 hover:bg-amber-200/80 text-amber-950 font-semibold text-sm border border-amber-300/80 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-700" />
                <span>Monte seu Bolo Sob Medida</span>
              </button>
            </div>

            {/* Social Trust Metrics */}
            <div className="pt-6 border-t border-amber-900/10 grid grid-cols-3 gap-4 text-left">
              <div>
                <div className="flex items-center gap-1 text-amber-600 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <p className="text-xs font-bold text-stone-900">4.9 / 5 Estrelas</p>
                <p className="text-[11px] text-stone-500">+1.200 clientes felizes</p>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-stone-900 mb-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-bold">100% Artesanal</span>
                </div>
                <p className="text-[11px] text-stone-500">Sem pré-misturas industriais</p>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-stone-900 mb-1">
                  <Clock className="w-4 h-4 text-amber-700" />
                  <span className="text-xs font-bold">Feito no Dia</span>
                </div>
                <p className="text-[11px] text-stone-500">Frescor incomparável</p>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Image with artisan badge and interactive callout */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative ring */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/80 bg-white">
                <img
                  id="hero-main-artisan-cake-img"
                  src={HERO_IMAGE}
                  alt="Bolo artesanal decorado com frutas frescas e flores nobres"
                  referrerPolicy="no-referrer"
                  className="w-full h-80 sm:h-96 lg:h-[420px] object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="inline-block px-2.5 py-1 rounded-md bg-amber-700 text-amber-100 text-[10px] font-bold uppercase tracking-wider mb-1">
                    Obra de Arte Comestível
                  </span>
                  <p className="font-serif-display text-lg sm:text-xl font-bold leading-snug">
                    Bolo Celebration Flores Naturais & Ouro 24k
                  </p>
                  <p className="text-xs text-amber-200 mt-0.5">
                    Massa amanteigada de limão siciliano com 4 leites & coulis de frutas amarelas
                  </p>
                </div>
              </div>

              {/* Floating review sticker */}
              <div className="absolute -top-4 -right-4 sm:-right-6 bg-white p-3.5 rounded-2xl shadow-xl border border-amber-200/80 flex items-center gap-3 max-w-[210px] animate-bounce-slow">
                <div className="w-9 h-9 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                  <Heart className="w-5 h-5 fill-rose-600" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-stone-900 leading-tight">Receita de Família</p>
                  <p className="text-[10px] text-stone-500">Manteiga pura & chocolate belga</p>
                </div>
              </div>

              {/* Floating WhatsApp reservation sticker */}
              <div className="hidden sm:flex absolute -bottom-5 -left-6 bg-stone-900 text-amber-50 p-3.5 rounded-2xl shadow-xl border border-stone-800 items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center font-black text-xs">
                  48h
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Agenda Aberta</p>
                  <p className="text-[10px] text-stone-300">Reserve a data da sua celebração</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
