import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Check,
  ShoppingBag,
  Info,
  Layers,
  Palette,
  Scale,
  Plus,
  Heart
} from 'lucide-react';
import {
  BATTER_OPTIONS,
  FILLING_OPTIONS,
  FROSTING_OPTIONS,
  SIZE_OPTIONS,
  EXTRA_OPTIONS,
} from '../data/cakes';
import { OrderItem } from '../types';

interface CakeBuilderProps {
  onAddCustomCake: (orderItem: OrderItem) => void;
}

export const CakeBuilder: React.FC<CakeBuilderProps> = ({ onAddCustomCake }) => {
  const [selectedBatterId, setSelectedBatterId] = useState<string>('baunilha');
  const [selectedFillingId, setSelectedFillingId] = useState<string>('ninho-frutas-vermelhas');
  const [selectedFrostingId, setSelectedFrostingId] = useState<string>('chantininho-espatulado');
  const [selectedSizeId, setSelectedSizeId] = useState<string>('size-m');
  const [selectedExtras, setSelectedExtras] = useState<string[]>(['extra-frutas']);
  const [customWriting, setCustomWriting] = useState<string>('');
  const [addedNotice, setAddedNotice] = useState(false);

  const selectedBatter = useMemo(
    () => BATTER_OPTIONS.find((b) => b.id === selectedBatterId) || BATTER_OPTIONS[0],
    [selectedBatterId]
  );
  const selectedFilling = useMemo(
    () => FILLING_OPTIONS.find((f) => f.id === selectedFillingId) || FILLING_OPTIONS[0],
    [selectedFillingId]
  );
  const selectedFrosting = useMemo(
    () => FROSTING_OPTIONS.find((fr) => fr.id === selectedFrostingId) || FROSTING_OPTIONS[0],
    [selectedFrostingId]
  );
  const selectedSize = useMemo(
    () => SIZE_OPTIONS.find((s) => s.id === selectedSizeId) || SIZE_OPTIONS[1],
    [selectedSizeId]
  );

  const toggleExtra = (extraId: string) => {
    setSelectedExtras((prev) =>
      prev.includes(extraId) ? prev.filter((id) => id !== extraId) : [...prev, extraId]
    );
  };

  const totalPrice = useMemo(() => {
    const base = selectedSize.basePrice;
    const fillingExtra = selectedFilling.priceExtra;
    const frostingExtra = selectedFrosting.priceExtra;
    const extrasTotal = selectedExtras.reduce((sum, extraId) => {
      const extra = EXTRA_OPTIONS.find((e) => e.id === extraId);
      return sum + (extra ? extra.price : 0);
    }, 0);

    return base + fillingExtra + frostingExtra + extrasTotal;
  }, [selectedSize, selectedFilling, selectedFrosting, selectedExtras]);

  const handleFinishCustomCake = () => {
    const extrasNames = selectedExtras
      .map((id) => EXTRA_OPTIONS.find((e) => e.id === id)?.name)
      .filter(Boolean)
      .join(', ');

    const details = [
      `Massa: ${selectedBatter.name}`,
      `Recheio: ${selectedFilling.name}`,
      `Cobertura: ${selectedFrosting.name}`,
      `Tamanho: ${selectedSize.name} (${selectedSize.weight}, ${selectedSize.servings})`,
      extrasNames ? `Adicionais: ${extrasNames}` : null,
      customWriting ? `Mensagem no bolo: "${customWriting}"` : null,
    ]
      .filter(Boolean)
      .join(' • ');

    const orderItem: OrderItem = {
      id: `custom-cake-${Date.now()}`,
      title: `Bolo Sob Medida (${selectedSize.name})`,
      details,
      price: totalPrice,
      quantity: 1,
      isCustom: true,
    };

    onAddCustomCake(orderItem);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2500);
  };

  return (
    <section id="monte-seu-bolo" className="py-20 bg-amber-900/5 border-y border-amber-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-800 text-amber-100 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Personalização Exclusiva</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
            Monte Seu Bolo Sob Medida
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base">
            Combine sua massa predileta, recheios artesanais, estilo de cobertura e finalizações. Veja a previsão do bolo em tempo real e o valor exato.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Interactive Customization Steps */}
          <div className="lg:col-span-7 space-y-8 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm">
            
            {/* Step 1: Tamanho do Bolo */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Scale className="w-4 h-4" /> 1. Escolha o Tamanho & Rendimento
                </span>
                <span className="text-xs text-stone-500 font-medium">{selectedSize.servings}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {SIZE_OPTIONS.map((size) => (
                  <button
                    key={size.id}
                    id={`builder-size-${size.id}`}
                    type="button"
                    onClick={() => setSelectedSizeId(size.id)}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      selectedSizeId === size.id
                        ? 'border-amber-800 bg-amber-50/70 ring-1 ring-amber-800'
                        : 'border-stone-200 hover:border-amber-400 bg-stone-50/50'
                    }`}
                  >
                    <p className="font-bold text-stone-900 text-xs sm:text-sm">{size.name}</p>
                    <p className="text-[11px] text-stone-500">{size.weight}</p>
                    <p className="text-[10px] text-amber-800 font-semibold mt-1">R$ {size.basePrice}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Escolha a Massa */}
            <div>
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block mb-3">
                2. Escolha a Massa Artesanal
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {BATTER_OPTIONS.map((batter) => (
                  <div
                    key={batter.id}
                    id={`builder-batter-${batter.id}`}
                    onClick={() => setSelectedBatterId(batter.id)}
                    className={`p-3.5 rounded-2xl border flex items-start gap-3 transition-all cursor-pointer ${
                      selectedBatterId === batter.id
                        ? 'border-amber-800 bg-amber-50/70 ring-1 ring-amber-800'
                        : 'border-stone-200 hover:border-amber-400 bg-stone-50/50'
                    }`}
                  >
                    <div
                      className="w-5 h-5 rounded-full border border-stone-300 mt-0.5 shrink-0 shadow-xs"
                      style={{ backgroundColor: batter.color }}
                    />
                    <div className="flex-1">
                      <p className="text-xs sm:text-sm font-bold text-stone-900">{batter.name}</p>
                      <p className="text-[11px] text-stone-500 leading-tight mt-0.5">{batter.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 3: Escolha o Recheio */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                  3. Recheio Farto & Artesanal
                </span>
                {selectedFilling.priceExtra > 0 && (
                  <span className="text-xs text-amber-900 font-semibold bg-amber-100 px-2 py-0.5 rounded-md">
                    + R$ {selectedFilling.priceExtra.toFixed(2)}
                  </span>
                )}
              </div>
              <div className="space-y-2">
                {FILLING_OPTIONS.map((filling) => (
                  <div
                    key={filling.id}
                    id={`builder-filling-${filling.id}`}
                    onClick={() => setSelectedFillingId(filling.id)}
                    className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 transition-all cursor-pointer ${
                      selectedFillingId === filling.id
                        ? 'border-amber-800 bg-amber-50/70 ring-1 ring-amber-800'
                        : 'border-stone-200 hover:border-amber-400 bg-stone-50/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-4 h-4 rounded-full shrink-0 border border-stone-300"
                        style={{ backgroundColor: filling.color }}
                      />
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-stone-900">{filling.name}</p>
                        <p className="text-[11px] text-stone-500">{filling.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      {filling.priceExtra > 0 ? (
                        <span className="text-xs font-semibold text-amber-800">+ R$ {filling.priceExtra}</span>
                      ) : (
                        <span className="text-xs font-medium text-stone-400">Incluso</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 4: Cobertura & Estilo */}
            <div>
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block mb-3">
                4. Estilo de Cobertura
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {FROSTING_OPTIONS.map((frosting) => (
                  <div
                    key={frosting.id}
                    id={`builder-frosting-${frosting.id}`}
                    onClick={() => setSelectedFrostingId(frosting.id)}
                    className={`p-3.5 rounded-2xl border flex flex-col justify-between transition-all cursor-pointer ${
                      selectedFrostingId === frosting.id
                        ? 'border-amber-800 bg-amber-50/70 ring-1 ring-amber-800'
                        : 'border-stone-200 hover:border-amber-400 bg-stone-50/50'
                    }`}
                  >
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-stone-900">{frosting.name}</p>
                      <p className="text-[11px] text-stone-500 mt-0.5">{frosting.description}</p>
                    </div>
                    <div className="mt-2 pt-2 border-t border-stone-200/50 flex items-center justify-between text-[11px]">
                      <span className="text-stone-500 italic">{frosting.texture}</span>
                      {frosting.priceExtra > 0 ? (
                        <span className="font-semibold text-amber-800">+ R$ {frosting.priceExtra}</span>
                      ) : (
                        <span className="text-stone-400">Incluso</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 5: Adicionais e Toppers */}
            <div>
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block mb-3">
                5. Toques Finais & Decoração Especial (Opcionais)
              </span>
              <div className="space-y-2">
                {EXTRA_OPTIONS.map((extra) => {
                  const isSelected = selectedExtras.includes(extra.id);
                  return (
                    <div
                      key={extra.id}
                      id={`builder-extra-${extra.id}`}
                      onClick={() => toggleExtra(extra.id)}
                      className={`p-3 rounded-xl border flex items-center justify-between text-xs transition-all cursor-pointer ${
                        isSelected
                          ? 'border-amber-700 bg-amber-100/60 font-semibold text-stone-900'
                          : 'border-stone-200 bg-stone-50 hover:bg-stone-100/70 text-stone-700'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                            isSelected ? 'bg-amber-800 border-amber-800 text-white' : 'border-stone-400 bg-white'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3" />}
                        </div>
                        <span>{extra.name}</span>
                      </div>
                      <span className="text-amber-900 font-bold">+ R$ {extra.price.toFixed(2)}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Optional message on cake */}
            <div>
              <label htmlFor="custom-cake-writing-input" className="text-xs font-bold text-stone-700 block mb-1.5">
                Mensagem escrita no bolo ou topo (Opcional):
              </label>
              <input
                id="custom-cake-writing-input"
                type="text"
                maxLength={40}
                value={customWriting}
                onChange={(e) => setCustomWriting(e.target.value)}
                placeholder='Ex: "Parabéns Sofia! 30 anos" ou "Amor Infinito"'
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-amber-700"
              />
            </div>

          </div>

          {/* Right Column: Live Visual Layer Canvas & Summary */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
            
            {/* Visual Layer Stack Card */}
            <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-7 shadow-xl border border-stone-800 relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold uppercase tracking-widest text-amber-400 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" /> Raio-X das Camadas
                </span>
                <span className="text-xs bg-stone-800 px-2.5 py-1 rounded-full text-stone-300">
                  {selectedSize.diameter}
                </span>
              </div>

              {/* Cake Layers Graphic */}
              <div className="py-6 flex flex-col items-center justify-center">
                
                {/* Topper / Extras Visualization */}
                <div className="h-10 flex items-end justify-center gap-2 mb-1 text-xs">
                  {selectedExtras.includes('extra-flores') && (
                    <span className="text-rose-300 animate-pulse text-lg" title="Flores Nobres">🌸</span>
                  )}
                  {selectedExtras.includes('extra-frutas') && (
                    <span className="text-red-400 animate-bounce text-lg" title="Frutas Frescas">🍓</span>
                  )}
                  {selectedExtras.includes('extra-brigadeiros') && (
                    <span className="text-amber-700 text-lg" title="Brigadeiros">🍫</span>
                  )}
                  {selectedExtras.includes('extra-vela') && (
                    <span className="text-amber-300 text-lg" title="Vela Faísca">✨</span>
                  )}
                  {customWriting && (
                    <div className="bg-amber-100 text-amber-950 px-2 py-0.5 rounded text-[10px] font-bold shadow-md line-clamp-1 max-w-[160px]">
                      "{customWriting}"
                    </div>
                  )}
                </div>

                {/* Cake Layers Box */}
                <div className="w-56 sm:w-64 space-y-1.5">
                  {/* Frosting Crown */}
                  <div
                    className="w-full h-5 rounded-t-xl border border-white/20 flex items-center justify-center text-[10px] font-bold text-stone-900 shadow-sm transition-all"
                    style={{
                      backgroundColor:
                        selectedFrostingId === 'ganache-drip'
                          ? '#3D2314'
                          : selectedFrostingId === 'brigadeiro-vulcão'
                          ? '#4A2E1B'
                          : '#FDFCF7',
                      color:
                        selectedFrostingId === 'ganache-drip' || selectedFrostingId === 'brigadeiro-vulcão'
                          ? '#FFF'
                          : '#444',
                    }}
                  >
                    {selectedFrosting.name.split(' ')[0]}
                  </div>

                  {/* Batter Top Layer */}
                  <div
                    className="w-full h-8 rounded-sm flex items-center justify-center text-[10px] font-semibold text-stone-800 transition-all shadow-inner"
                    style={{
                      backgroundColor: selectedBatter.color,
                      color: selectedBatterId === 'chocolate' || selectedBatterId === 'red-velvet' ? '#FFF' : '#333',
                    }}
                  >
                    Massa: {selectedBatter.name.split(' ')[0]}
                  </div>

                  {/* Filling Layer 1 */}
                  <div
                    className="w-full h-5 rounded-xs flex items-center justify-center text-[10px] font-bold transition-all"
                    style={{
                      backgroundColor: selectedFilling.color,
                      color: selectedFillingId === 'quatro-leites' ? '#333' : '#FFF',
                    }}
                  >
                    Recheio: {selectedFilling.name.split(' ')[0]}
                  </div>

                  {/* Batter Middle Layer */}
                  <div
                    className="w-full h-8 rounded-sm flex items-center justify-center text-[10px] font-semibold text-stone-800 transition-all shadow-inner"
                    style={{
                      backgroundColor: selectedBatter.color,
                      color: selectedBatterId === 'chocolate' || selectedBatterId === 'red-velvet' ? '#FFF' : '#333',
                    }}
                  >
                    Massa: {selectedBatter.name.split(' ')[0]}
                  </div>

                  {/* Filling Layer 2 */}
                  <div
                    className="w-full h-5 rounded-xs flex items-center justify-center text-[10px] font-bold transition-all"
                    style={{
                      backgroundColor: selectedFilling.color,
                      color: selectedFillingId === 'quatro-leites' ? '#333' : '#FFF',
                    }}
                  >
                    Recheio: {selectedFilling.name.split(' ')[0]}
                  </div>

                  {/* Batter Base Layer */}
                  <div
                    className="w-full h-8 rounded-b-sm flex items-center justify-center text-[10px] font-semibold text-stone-800 transition-all shadow-inner"
                    style={{
                      backgroundColor: selectedBatter.color,
                      color: selectedBatterId === 'chocolate' || selectedBatterId === 'red-velvet' ? '#FFF' : '#333',
                    }}
                  >
                    Massa: {selectedBatter.name.split(' ')[0]}
                  </div>
                </div>

                {/* Cake Board Stand */}
                <div className="w-64 sm:w-72 h-3 bg-gradient-to-r from-amber-700 via-amber-500 to-amber-700 rounded-b-lg shadow-lg mt-1" />
                <div className="w-20 h-4 bg-stone-700 rounded-b-lg" />
              </div>

              {/* Real-time Order Summary Card */}
              <div className="mt-6 pt-5 border-t border-stone-800 space-y-2.5 text-xs text-stone-300">
                <div className="flex justify-between">
                  <span>Tamanho Selecionado:</span>
                  <strong className="text-white">{selectedSize.name} ({selectedSize.weight})</strong>
                </div>
                <div className="flex justify-between">
                  <span>Rendimento Estimado:</span>
                  <strong className="text-amber-300">{selectedSize.servings}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Massa & Recheio:</span>
                  <strong className="text-white text-right max-w-[200px] truncate">
                    {selectedBatter.name.split(' ')[0]} + {selectedFilling.name.split(' ')[0]}
                  </strong>
                </div>
              </div>

              {/* Total & Action Button */}
              <div className="mt-6 pt-4 border-t border-stone-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-stone-400 block">Investimento Total</span>
                  <span className="text-2xl sm:text-3xl font-bold font-serif-display text-amber-400">
                    R$ {totalPrice.toFixed(2).replace('.', ',')}
                  </span>
                </div>

                <button
                  id="builder-confirm-cake-btn"
                  type="button"
                  onClick={handleFinishCustomCake}
                  className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-lg transition-all cursor-pointer ${
                    addedNotice ? 'bg-emerald-600 text-white' : 'bg-amber-500 hover:bg-amber-400 text-stone-950'
                  }`}
                >
                  {addedNotice ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Bolo Adicionado!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Adicionar à Encomenda</span>
                    </>
                  )}
                </button>
              </div>

            </div>

            {/* Note badge */}
            <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200/80 flex items-start gap-3 text-stone-700 text-xs">
              <Info className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
              <p>
                <strong>Dica da Confeiteira:</strong> Você poderá revisar todas as personalizações no carrinho antes de enviar diretamente pelo WhatsApp para confirmação de data e horário!
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
