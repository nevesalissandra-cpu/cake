import React, { useState } from 'react';
import { X, Check, ShoppingBag, MessageCircle, Sparkles, Scale, Users } from 'lucide-react';
import { CakeItem } from '../types';

interface CakeModalProps {
  cake: CakeItem | null;
  onClose: () => void;
  onAddToCart: (cake: CakeItem, quantity: number) => void;
}

export const CakeModal: React.FC<CakeModalProps> = ({ cake, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  if (!cake) return null;

  const handleAdd = () => {
    onAddToCart(cake, quantity);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 600);
  };

  const whatsappMessage = encodeURIComponent(
    `Olá! Tenho interesse no *${cake.name}* (R$ ${cake.price.toFixed(2)}). Poderiam me informar a disponibilidade para a minha data?`
  );

  return (
    <div
      id="cake-details-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs animate-fade-in overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="cake-details-modal-content"
        className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-amber-200 my-8 text-stone-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="close-cake-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-stone-700 hover:text-stone-950 shadow-md flex items-center justify-center transition-all cursor-pointer"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Image */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-amber-100">
          <img
            src={cake.image}
            alt={cake.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />
          
          <div className="absolute bottom-4 left-5 right-5 text-white">
            <span className="inline-block px-2.5 py-1 rounded-md bg-amber-600 text-white text-[11px] font-bold uppercase tracking-wider mb-1.5">
              {cake.tag}
            </span>
            <h2 className="font-serif-display text-2xl sm:text-3xl font-bold leading-tight">
              {cake.name}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7 space-y-6">
          
          {/* Quick Stats Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-3 px-4 rounded-2xl bg-amber-50/70 border border-amber-200/70 text-xs">
            <div className="flex items-center gap-2 text-stone-700">
              <Scale className="w-4 h-4 text-amber-700" />
              <span><strong>Peso:</strong> {cake.weight}</span>
            </div>
            <div className="flex items-center gap-2 text-stone-700">
              <Users className="w-4 h-4 text-amber-700" />
              <span><strong>Rendimento:</strong> {cake.servings}</span>
            </div>
            <div className="text-right">
              <span className="text-stone-500 text-[11px] block">Preço unitário:</span>
              <span className="text-xl font-bold text-amber-900 font-serif-display">
                R$ {cake.price.toFixed(2).replace('.', ',')}
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Descrição Artesanal</h3>
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
              {cake.fullDesc}
            </p>
          </div>

          {/* Highlights */}
          <div>
            <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Destaques da Receita</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {cake.highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-stone-700">
                  <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5" />
                  </div>
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Ingredients list */}
          <div className="pt-2 border-t border-stone-100">
            <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Ingredientes Nobres Utilizados</h3>
            <div className="flex flex-wrap gap-1.5">
              {cake.ingredients.map((ing, i) => (
                <span key={i} className="px-2.5 py-1 rounded-lg bg-stone-100 text-stone-600 text-xs">
                  {ing}
                </span>
              ))}
            </div>
          </div>

          {/* Actions & Quantity */}
          <div className="pt-4 border-t border-amber-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Quantity Selector */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
              <span className="text-xs font-semibold text-stone-600">Quantidade:</span>
              <div className="flex items-center border border-stone-300 rounded-xl overflow-hidden bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 hover:bg-stone-100 text-stone-700 font-bold transition-colors cursor-pointer"
                >
                  -
                </button>
                <span className="px-4 py-1.5 text-sm font-bold text-stone-900 min-w-[36px] text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 hover:bg-stone-100 text-stone-700 font-bold transition-colors cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <a
                id={`modal-whatsapp-cake-${cake.id}`}
                href={`https://wa.me/5511999999999?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl border border-emerald-600/40 text-emerald-800 bg-emerald-50 hover:bg-emerald-100 transition-colors flex items-center justify-center shrink-0"
                title="Dúvidas no WhatsApp"
              >
                <MessageCircle className="w-5 h-5 text-emerald-600" />
              </a>

              <button
                id={`modal-add-to-order-btn-${cake.id}`}
                onClick={handleAdd}
                className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white shadow-md transition-all cursor-pointer ${
                  addedAnimation ? 'bg-emerald-600 scale-95' : 'bg-amber-800 hover:bg-amber-900'
                }`}
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Adicionado!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Adicionar à Encomenda (R$ {(cake.price * quantity).toFixed(2).replace('.', ',')})</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
