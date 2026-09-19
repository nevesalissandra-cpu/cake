import React, { useState, useMemo } from 'react';
import { Search, Sparkles, Plus, Eye, Scale, Users, Check } from 'lucide-react';
import { CakeItem } from '../types';
import { CAKES_CATALOG } from '../data/cakes';

interface CakeMenuProps {
  onSelectCake: (cake: CakeItem) => void;
  onQuickAdd: (cake: CakeItem) => void;
}

export const CakeMenu: React.FC<CakeMenuProps> = ({ onSelectCake, onQuickAdd }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  const categories = [
    { id: 'todos', label: 'Todos os Bolos' },
    { id: 'festivos', label: 'Festivos & Aniversários' },
    { id: 'vulcao', label: 'Vulcão & Afetivos' },
    { id: 'naked', label: 'Naked Cakes & Rústicos' },
  ];

  const filteredCakes = useMemo(() => {
    return CAKES_CATALOG.filter((cake) => {
      const matchesCategory = selectedCategory === 'todos' || cake.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        query === '' ||
        cake.name.toLowerCase().includes(query) ||
        cake.shortDesc.toLowerCase().includes(query) ||
        cake.ingredients.some((ing) => ing.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleQuickAdd = (e: React.MouseEvent, cake: CakeItem) => {
    e.stopPropagation();
    onQuickAdd(cake);
    setRecentlyAddedId(cake.id);
    setTimeout(() => setRecentlyAddedId(null), 1200);
  };

  return (
    <section id="cardapio" className="py-20 bg-stone-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Cardápio da Confeiteira</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
            Nossos Bolos Mais Desejados
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base">
            Produzidos artesanalmente sob encomenda para o seu evento. Escolha a sua receita favorita ou monte uma combinação exclusiva.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          
          {/* Category Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                id={`filter-category-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-amber-800 text-white shadow-xs'
                    : 'bg-white text-stone-600 hover:bg-amber-100/70 border border-stone-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="cakes-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por sabor ou recheio..."
              className="w-full pl-9.5 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-stone-200 bg-white text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-amber-700 focus:ring-1 focus:ring-amber-700 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600"
              >
                Limpar
              </button>
            )}
          </div>

        </div>

        {/* Cakes Grid */}
        {filteredCakes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCakes.map((cake) => (
              <div
                key={cake.id}
                id={`cake-card-${cake.id}`}
                onClick={() => onSelectCake(cake)}
                className="group bg-white rounded-2xl overflow-hidden border border-amber-900/10 hover:border-amber-400/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
              >
                {/* Image Container */}
                <div className="relative h-56 sm:h-64 overflow-hidden bg-stone-100">
                  <img
                    src={cake.image}
                    alt={cake.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 via-transparent to-transparent pointer-events-none" />

                  {/* Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-xs text-stone-900 text-[11px] font-bold shadow-xs">
                      {cake.tag}
                    </span>
                  </div>

                  {/* View Details Quick Floating Button */}
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-stone-950/80 text-white text-xs font-semibold backdrop-blur-xs">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Ver receita</span>
                    </span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif-display text-xl font-bold text-stone-900 group-hover:text-amber-900 transition-colors line-clamp-1">
                      {cake.name}
                    </h3>

                    {/* Metadata specs */}
                    <div className="flex items-center gap-3 mt-2 text-[11px] text-stone-500 font-medium">
                      <span className="flex items-center gap-1">
                        <Scale className="w-3.5 h-3.5 text-amber-700" />
                        {cake.weight}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-amber-700" />
                        {cake.servings}
                      </span>
                    </div>

                    <p className="mt-2.5 text-xs text-stone-600 line-clamp-2 leading-relaxed">
                      {cake.shortDesc}
                    </p>
                  </div>

                  {/* Footer with Price and Quick Add */}
                  <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-stone-400 block font-medium">
                        A partir de
                      </span>
                      <span className="text-xl font-extrabold text-stone-900 font-serif-display">
                        R$ {cake.price.toFixed(2).replace('.', ',')}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        id={`quick-add-btn-${cake.id}`}
                        onClick={(e) => handleQuickAdd(e, cake)}
                        className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-xs ${
                          recentlyAddedId === cake.id
                            ? 'bg-emerald-600 text-white'
                            : 'bg-amber-100 hover:bg-amber-800 text-amber-950 hover:text-white'
                        }`}
                      >
                        {recentlyAddedId === cake.id ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Adicionado</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>Encomendar</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8">
            <p className="text-stone-500 text-base">Nenhum bolo encontrado para "{searchQuery}".</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('todos');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-amber-800 text-white text-xs font-semibold hover:bg-amber-900 cursor-pointer"
            >
              Ver todos os bolos
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
