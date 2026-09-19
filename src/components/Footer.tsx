import React from 'react';
import { Cake, Heart, MapPin, Clock, Phone, MessageCircle, Instagram, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onScrollTo: (target: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollTo }) => {
  return (
    <footer id="main-footer" className="bg-stone-950 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-600 text-white flex items-center justify-center shadow-xs">
                <Cake className="w-5 h-5" />
              </div>
              <div>
                <span className="font-serif-display text-2xl font-bold text-white tracking-tight block">
                  Ateliê dos Bolos
                </span>
                <span className="text-[11px] uppercase tracking-widest text-amber-400 block font-medium">
                  Confeitaria Artesanal
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Confeitaria afetiva e contemporânea dedicada a celebrar histórias com bolos artesanais, massas macias, recheios nobres e decorações que encantam os olhos e o paladar.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                id="footer-social-instagram"
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-stone-900 hover:bg-amber-800 text-stone-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                id="footer-social-whatsapp"
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-stone-900 hover:bg-emerald-700 text-stone-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Navegação</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  id="footer-link-cardapio"
                  onClick={() => onScrollTo('cardapio')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Cardápio de Bolos
                </button>
              </li>
              <li>
                <button
                  id="footer-link-monte-seu-bolo"
                  onClick={() => onScrollTo('monte-seu-bolo')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Monte seu Bolo
                </button>
              </li>
              <li>
                <button
                  id="footer-link-calculadora"
                  onClick={() => onScrollTo('calculadora')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Calculadora de Fatias
                </button>
              </li>
              <li>
                <button
                  id="footer-link-diferenciais"
                  onClick={() => onScrollTo('diferenciais')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Nossos Diferenciais
                </button>
              </li>
              <li>
                <button
                  id="footer-link-depoimentos"
                  onClick={() => onScrollTo('depoimentos')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Depoimentos
                </button>
              </li>
              <li>
                <button
                  id="footer-link-faq"
                  onClick={() => onScrollTo('faq')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Dúvidas Frequentes
                </button>
              </li>
            </ul>
          </div>

          {/* Hours and Retirada */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Ateliê & Retiradas</h4>
            <div className="space-y-2 text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>Alameda das Baunilhas, 420 • Jardim Primavera, São Paulo - SP (Estacionamento no local)</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p>Terça a Sábado: 09h às 19h</p>
                  <p>Domingo: 09h às 14h</p>
                  <p className="text-[11px] text-stone-500">Segunda: Produção interna</p>
                </div>
              </div>
            </div>
          </div>

          {/* Direct Orders & Trust */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Central de Encomendas</h4>
            <p className="text-xs text-stone-400">
              Precisa de um bolo com urgência ou projeto especial para grandes eventos? Fale com nossa confeiteira:
            </p>
            <a
              id="footer-contact-whatsapp-btn"
              href="https://wa.me/5511999999999?text=Ol%C3%A1!%20Gostaria%20de%20fazer%20uma%20encomenda%20especial."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>(11) 99999-9999</span>
            </a>
            <div className="flex items-center gap-2 text-[11px] text-stone-400 pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Cozinha inspecionada e certificada pela ANVISA</span>
            </div>
          </div>

        </div>

        {/* Sub-footer copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} Ateliê dos Bolos Artesanais. Todos os direitos reservados.</p>
          <p className="flex items-center gap-1">
            Feito com <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> carinho e paixão pela confeitaria.
          </p>
        </div>
      </div>
    </footer>
  );
};
