import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CakeMenu } from './components/CakeMenu';
import { CakeModal } from './components/CakeModal';
import { CakeBuilder } from './components/CakeBuilder';
import { CakeCalculator } from './components/CakeCalculator';
import { Differentiators } from './components/Differentiators';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { OrderDrawer } from './components/OrderDrawer';
import { Footer } from './components/Footer';
import { CakeItem, OrderItem } from './types';
import { MessageCircle, ShoppingBag, ArrowUp } from 'lucide-react';

export default function App() {
  const [orderItems, setOrderItems] = useState<OrderItem[]>(() => {
    try {
      const saved = localStorage.getItem('atelie_bolos_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isOrderDrawerOpen, setIsOrderDrawerOpen] = useState(false);
  const [selectedCakeModal, setSelectedCakeModal] = useState<CakeItem | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('atelie_bolos_cart', JSON.stringify(orderItems));
    } catch (e) {
      console.warn('Could not save cart to localStorage', e);
    }
  }, [orderItems]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Add standard cake from modal
  const handleAddToCart = (cake: CakeItem, quantity: number) => {
    setOrderItems((prev) => {
      const existing = prev.find((item) => item.id === cake.id);
      if (existing) {
        return prev.map((item) =>
          item.id === cake.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: cake.id,
          title: cake.name,
          details: `${cake.weight} • ${cake.servings}`,
          price: cake.price,
          quantity,
          image: cake.image,
        },
      ];
    });
  };

  // Quick add 1 item directly from card
  const handleQuickAdd = (cake: CakeItem) => {
    handleAddToCart(cake, 1);
  };

  // Add customized cake from builder
  const handleAddCustomCake = (customItem: OrderItem) => {
    setOrderItems((prev) => [...prev, customItem]);
    setIsOrderDrawerOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setOrderItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as OrderItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setOrderItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearOrder = () => {
    setOrderItems([]);
  };

  const totalItemsCount = orderItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/20 selection:bg-amber-200 selection:text-amber-950 font-sans">
      {/* Top Fixed Navbar */}
      <Navbar
        orderItems={orderItems}
        onOpenOrder={() => setIsOrderDrawerOpen(true)}
        onScrollTo={scrollToSection}
      />

      {/* Main Landing Sections */}
      <main className="flex-grow">
        {/* 1. Hero Section */}
        <Hero
          onScrollTo={scrollToSection}
          onOpenCustomBuilder={() => scrollToSection('monte-seu-bolo')}
        />

        {/* 2. Menu Catalog */}
        <CakeMenu
          onSelectCake={(cake) => setSelectedCakeModal(cake)}
          onQuickAdd={handleQuickAdd}
        />

        {/* 3. Interactive Custom Cake Builder */}
        <CakeBuilder onAddCustomCake={handleAddCustomCake} />

        {/* 4. Slice / Party Cake Calculator */}
        <CakeCalculator onSelectRecommendedSize={scrollToSection} />

        {/* 5. Differentiators & Craft Pillars */}
        <Differentiators />

        {/* 6. Customer Testimonials */}
        <Testimonials />

        {/* 7. Frequently Asked Questions */}
        <FAQ />
      </main>

      {/* Footer */}
      <Footer onScrollTo={scrollToSection} />

      {/* Cake Details Full Modal */}
      <CakeModal
        cake={selectedCakeModal}
        onClose={() => setSelectedCakeModal(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Interactive Order Drawer */}
      <OrderDrawer
        isOpen={isOrderDrawerOpen}
        onClose={() => setIsOrderDrawerOpen(false)}
        items={orderItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearOrder={handleClearOrder}
        onExploreMenu={() => scrollToSection('cardapio')}
      />

      {/* Floating Bottom Action Buttons */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 pointer-events-none">
        {/* Back to Top */}
        {showScrollTop && (
          <button
            id="floating-scroll-top-btn"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-11 h-11 rounded-full bg-white/95 text-stone-700 hover:text-stone-900 border border-stone-200 shadow-md flex items-center justify-center transition-all hover:scale-105 pointer-events-auto cursor-pointer"
            aria-label="Voltar ao topo"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}

        {/* Floating Cart Button (if has items) */}
        {totalItemsCount > 0 && (
          <button
            id="floating-cart-badge-btn"
            onClick={() => setIsOrderDrawerOpen(true)}
            className="pointer-events-auto inline-flex items-center gap-2 px-4 py-3 rounded-full bg-amber-800 text-white font-bold text-xs shadow-xl hover:bg-amber-900 hover:scale-105 transition-all cursor-pointer animate-pulse"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Ver Pedido ({totalItemsCount})</span>
          </button>
        )}

        {/* WhatsApp Direct Floating Bubble */}
        <a
          id="floating-whatsapp-bubble"
          href="https://wa.me/5511999999999?text=Ol%C3%A1!%20Gostaria%20de%20tirar%20uma%20d%C3%BAvida%20sobre%20os%20bolos."
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto flex items-center gap-2 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl hover:scale-105 transition-all cursor-pointer font-bold text-xs"
          title="Fale no WhatsApp"
        >
          <MessageCircle className="w-5 h-5 fill-white/20" />
          <span className="hidden sm:inline">Tirar Dúvidas</span>
        </a>
      </div>
    </div>
  );
}
