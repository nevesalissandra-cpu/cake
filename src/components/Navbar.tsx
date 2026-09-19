import React, { useState, useEffect } from 'react';
import { Cake, ShoppingBag, Menu, X, Phone, Calculator, Sparkles, MessageCircle } from 'lucide-react';
import { OrderItem } from '../types';

interface NavbarProps {
  orderItems: OrderItem[];
  onOpenOrder: () => void;
  onScrollTo: (elementId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ orderItems, onOpenOrder, onScrollTo }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalItemsCount = orderItems.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { label: 'Cardápio', target: 'cardapio' },
    { label: 'Monte seu Bolo', target: 'monte-seu-bolo' },
    { label: 'Calculadora de Fatias', target: 'calculadora' },
    { label: 'Diferenciais', target: 'diferenciais' },
    { label: 'Depoimentos', target: 'depoimentos' },
    { label: 'Dúvidas', target: 'faq' },
  ];

  const handleNavClick = (target: string) => {
    setMobileMenuOpen(false);
    onScrollTo(target);
  };

  return (
    <header
      id="main-navbar-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-amber-50/95 backdrop-blur-md shadow-xs border-b border-amber-900/10 py-3'
          : 'bg-gradient-to-b from-amber-950/70 via-amber-950/30 to-transparent text-white py-4.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Atelier Name */}
          <button
            id="brand-logo-btn"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer"
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors shadow-xs ${
                isScrolled ? 'bg-amber-700 text-white' : 'bg-white text-amber-900'
              }`}
            >
              <Cake className="w-5 h-5 transition-transform group-hover:scale-110" />
            </div>
            <div>
              <span
                className={`font-serif-display text-xl sm:text-2xl font-bold tracking-tight block leading-tight ${
                  isScrolled ? 'text-stone-900' : 'text-white'
                }`}
              >
                Ateliê dos Bolos
              </span>
              <span
                className={`text-[11px] uppercase tracking-widest block font-medium ${
                  isScrolled ? 'text-amber-800' : 'text-amber-200'
                }`}
              >
                Confeitaria Artesanal
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav id="desktop-navigation" className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <button
                key={link.target}
                id={`nav-link-${link.target}`}
                onClick={() => handleNavClick(link.target)}
                className={`text-sm font-medium transition-colors hover:text-amber-600 cursor-pointer ${
                  isScrolled ? 'text-stone-700' : 'text-amber-50 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Action CTAs & Cart */}
          <div className="flex items-center gap-3">
            {/* WhatsApp Quick Link */}
            <a
              id="whatsapp-direct-nav-link"
              href="https://wa.me/5511999999999?text=Ol%C3%A1!%20Gostaria%20de%20tirar%20uma%20d%C3%BAvida%20sobre%20as%20encomendas%20de%20bolos."
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full border transition-all ${
                isScrolled
                  ? 'border-emerald-600/30 text-emerald-800 bg-emerald-50 hover:bg-emerald-100'
                  : 'border-white/30 text-white bg-white/10 hover:bg-white/20'
              }`}
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500/20" />
              <span>WhatsApp</span>
            </a>

            {/* Order Bag / Drawer Trigger */}
            <button
              id="open-order-drawer-btn"
              onClick={onOpenOrder}
              className={`relative inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-xs ${
                isScrolled
                  ? 'bg-amber-800 text-amber-50 hover:bg-amber-900'
                  : 'bg-amber-500 text-stone-950 hover:bg-amber-400 font-bold'
              }`}
              aria-label="Abrir pedido"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Minha Encomenda</span>
              {totalItemsCount > 0 && (
                <span
                  id="navbar-order-badge-count"
                  className="w-5 h-5 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center animate-pulse"
                >
                  {totalItemsCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors cursor-pointer ${
                isScrolled ? 'text-stone-800 hover:bg-amber-100' : 'text-white hover:bg-white/10'
              }`}
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-menu"
          className="lg:hidden bg-amber-50 border-b border-amber-200 px-4 pt-4 pb-6 mt-3 space-y-3 shadow-lg text-stone-800"
        >
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.target}
                id={`mobile-nav-link-${link.target}`}
                onClick={() => handleNavClick(link.target)}
                className="text-left px-3 py-2.5 rounded-lg text-sm font-medium text-stone-800 hover:bg-amber-100/80 transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>
          <div className="pt-3 border-t border-amber-200 flex flex-col gap-2">
            <button
              id="mobile-custom-cake-builder-btn"
              onClick={() => handleNavClick('monte-seu-bolo')}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-amber-800 text-amber-50 text-sm font-semibold hover:bg-amber-900"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              Monte seu Bolo Sob Medida
            </button>
            <a
              id="mobile-whatsapp-btn"
              href="https://wa.me/5511999999999?text=Ol%C3%A1!%20Gostaria%20de%20encomendar%20um%20bolo."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700"
            >
              <MessageCircle className="w-4 h-4" />
              Falar Direto no WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
