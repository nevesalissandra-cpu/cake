import React, { useState } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  MessageCircle,
  Calendar,
  Clock,
  MapPin,
  ShoppingBag,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { OrderItem } from '../types';

interface OrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: OrderItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearOrder: () => void;
  onExploreMenu: () => void;
}

export const OrderDrawer: React.FC<OrderDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearOrder,
  onExploreMenu,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [deliveryType, setDeliveryType] = useState<'retirada' | 'entrega'>('retirada');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [orderSentNotice, setOrderSentNotice] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = deliveryType === 'entrega' ? 25.0 : 0.0;
  const total = subtotal + deliveryFee;

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) return;

    let message = `🎂 *NOVA ENCOMENDA - ATELIÊ DOS BOLOS*\n`;
    message += `──────────────────────\n`;
    message += `👤 *Cliente:* ${customerName || 'Não informado'}\n`;
    if (customerPhone) message += `📱 *Telefone:* ${customerPhone}\n`;
    message += `📅 *Data do Evento:* ${eventDate || 'A combinar'}\n`;
    if (eventTime) message += `⏰ *Horário Desejado:* ${eventTime}\n`;
    message += `🚗 *Tipo:* ${deliveryType === 'retirada' ? 'Retirada no Ateliê' : 'Entrega em Domicílio'}\n`;
    if (deliveryType === 'entrega' && address) {
      message += `📍 *Endereço:* ${address}\n`;
    }
    message += `──────────────────────\n`;
    message += `🛒 *ITENS DA ENCOMENDA:*\n`;

    items.forEach((item, index) => {
      message += `\n${index + 1}. *${item.title}* (${item.quantity}x)\n`;
      if (item.details) {
        message += `   _Detalhes:_ ${item.details}\n`;
      }
      message += `   _Subtotal:_ R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}\n`;
    });

    message += `──────────────────────\n`;
    message += `💰 *Subtotal Bolos:* R$ ${subtotal.toFixed(2).replace('.', ',')}\n`;
    if (deliveryType === 'entrega') {
      message += `🚚 *Taxa Estimada de Entrega:* R$ ${deliveryFee.toFixed(2).replace('.', ',')}\n`;
    }
    message += `✨ *TOTAL ESTIMADO:* R$ ${total.toFixed(2).replace('.', ',')}\n`;

    if (notes) {
      message += `\n📝 *Observações:* ${notes}\n`;
    }
    message += `\nAguardo a confirmação da disponibilidade para efetuar o sinal de reserva. Obrigado!`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5511999999999?text=${encoded}`;

    window.open(whatsappUrl, '_blank');
    setOrderSentNotice(true);
    setTimeout(() => {
      setOrderSentNotice(false);
    }, 4000);
  };

  return (
    <div
      id="order-drawer-backdrop"
      className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex justify-end animate-fade-in"
      onClick={onClose}
    >
      <div
        id="order-drawer-panel"
        className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between text-stone-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 sm:p-6 border-b border-stone-200 flex items-center justify-between bg-amber-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-amber-800 text-white flex items-center justify-center shadow-xs">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif-display text-xl font-bold text-stone-900 leading-tight">
                Sua Encomenda
              </h2>
              <p className="text-xs text-stone-500">
                {items.length} {items.length === 1 ? 'item selecionado' : 'itens selecionados'}
              </p>
            </div>
          </div>

          <button
            id="close-order-drawer-btn"
            onClick={onClose}
            className="w-9 h-9 rounded-full hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Fechar gaveta"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {items.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-800 mx-auto flex items-center justify-center">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <p className="text-base font-bold text-stone-800">Sua lista de encomenda está vazia</p>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Escolha seus bolos favoritos em nosso cardápio ou monte uma combinação personalizada sob medida.
              </p>
              <button
                id="drawer-empty-explore-btn"
                type="button"
                onClick={() => {
                  onClose();
                  onExploreMenu();
                }}
                className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-800 text-white text-xs font-semibold hover:bg-amber-900 cursor-pointer shadow-xs"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Explorar Cardápio</span>
              </button>
            </div>
          ) : (
            <>
              {/* Order Items List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-stone-400 uppercase tracking-wider">
                  <span>Itens Selecionados</span>
                  <button
                    type="button"
                    onClick={onClearOrder}
                    className="text-stone-400 hover:text-rose-600 transition-colors font-medium cursor-pointer"
                  >
                    Esvaziar tudo
                  </button>
                </div>

                {items.map((item) => (
                  <div
                    key={item.id}
                    id={`order-item-row-${item.id}`}
                    className="p-4 rounded-2xl border border-stone-200 bg-stone-50/60 space-y-2.5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="font-bold text-stone-900 text-sm">{item.title}</h4>
                        {item.details && (
                          <p className="text-[11px] text-stone-500 leading-tight mt-1">
                            {item.details}
                          </p>
                        )}
                      </div>
                      <button
                        id={`remove-item-btn-${item.id}`}
                        type="button"
                        onClick={() => onRemoveItem(item.id)}
                        className="text-stone-400 hover:text-rose-600 p-1 transition-colors cursor-pointer"
                        title="Remover item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-stone-200/60">
                      <div className="flex items-center border border-stone-300 rounded-lg overflow-hidden bg-white">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="px-2 py-1 hover:bg-stone-100 text-stone-700 font-bold text-xs cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-xs font-bold text-stone-900">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="px-2 py-1 hover:bg-stone-100 text-stone-700 font-bold text-xs cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-bold text-sm text-stone-900 font-serif-display">
                        R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Event Details Form */}
              <form id="order-form-details" onSubmit={handleSendWhatsApp} className="space-y-4 pt-4 border-t border-stone-200">
                <span className="text-xs font-bold text-stone-400 uppercase tracking-wider block">
                  Dados para Reserva e Orçamento
                </span>

                <div>
                  <label htmlFor="customer-name-input" className="block text-xs font-semibold text-stone-700 mb-1">
                    Seu Nome Completo *
                  </label>
                  <input
                    id="customer-name-input"
                    type="text"
                    required
                    placeholder="Ex: Beatriz Silva"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs sm:text-sm focus:outline-none focus:border-amber-700"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="customer-date-input" className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-amber-700" /> Data do Evento *
                    </label>
                    <input
                      id="customer-date-input"
                      type="date"
                      required
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs sm:text-sm focus:outline-none focus:border-amber-700"
                    />
                  </div>

                  <div>
                    <label htmlFor="customer-time-input" className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-700" /> Horário Pretendido
                    </label>
                    <input
                      id="customer-time-input"
                      type="time"
                      value={eventTime}
                      onChange={(e) => setEventTime(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs sm:text-sm focus:outline-none focus:border-amber-700"
                    />
                  </div>
                </div>

                {/* Delivery or Pickup */}
                <div>
                  <span className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Como deseja receber o bolo?
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      id="delivery-opt-pickup"
                      onClick={() => setDeliveryType('retirada')}
                      className={`p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer text-center ${
                        deliveryType === 'retirada'
                          ? 'border-amber-800 bg-amber-50 text-amber-950 font-bold'
                          : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      Retirada no Ateliê (Grátis)
                    </button>
                    <button
                      type="button"
                      id="delivery-opt-shipping"
                      onClick={() => setDeliveryType('entrega')}
                      className={`p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer text-center ${
                        deliveryType === 'entrega'
                          ? 'border-amber-800 bg-amber-50 text-amber-950 font-bold'
                          : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      Entrega Climatizada (+ R$ 25)
                    </button>
                  </div>
                </div>

                {deliveryType === 'entrega' && (
                  <div>
                    <label htmlFor="customer-address-input" className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-amber-700" /> Endereço de Entrega Completo *
                    </label>
                    <input
                      id="customer-address-input"
                      type="text"
                      required
                      placeholder="Rua, número, bairro, complemento"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs sm:text-sm focus:outline-none focus:border-amber-700"
                    />
                  </div>
                )}

                <div>
                  <label htmlFor="customer-notes-input" className="block text-xs font-semibold text-stone-700 mb-1">
                    Observações ou Restrições Alimentares:
                  </label>
                  <textarea
                    id="customer-notes-input"
                    rows={2}
                    placeholder="Ex: sem nozes, velinha de aniversário inclusa, etc."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs sm:text-sm focus:outline-none focus:border-amber-700"
                  />
                </div>
              </form>
            </>
          )}
        </div>

        {/* Drawer Footer / Subtotal & Send Button */}
        {items.length > 0 && (
          <div className="p-5 sm:p-6 border-t border-stone-200 bg-stone-50 space-y-4">
            <div className="space-y-1.5 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal dos bolos:</span>
                <span className="font-semibold text-stone-800">
                  R$ {subtotal.toFixed(2).replace('.', ',')}
                </span>
              </div>
              {deliveryType === 'entrega' && (
                <div className="flex justify-between">
                  <span>Entrega especializada:</span>
                  <span className="font-semibold text-stone-800">
                    R$ {deliveryFee.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-base font-bold text-stone-900 pt-2 border-t border-stone-200 font-serif-display">
                <span>Total Estimado:</span>
                <span className="text-xl text-amber-900">
                  R$ {total.toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>

            {orderSentNotice && (
              <div className="p-3 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Pedido copiado para o WhatsApp! Aguarde nossa resposta para confirmação.</span>
              </div>
            )}

            <button
              id="send-order-whatsapp-btn"
              type="submit"
              form="order-form-details"
              className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-white/20" />
              <span>Enviar Pedido pelo WhatsApp</span>
            </button>
            <p className="text-[11px] text-stone-500 text-center">
              Você não paga nada agora. O sinal de reserva é combinado diretamente no WhatsApp.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
