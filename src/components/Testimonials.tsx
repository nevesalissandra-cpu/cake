import React from 'react';
import { Star, Heart, Quote, Sparkles } from 'lucide-react';
import { REVIEWS } from '../data/cakes';

export const Testimonials: React.FC = () => {
  return (
    <section id="depoimentos" className="py-20 bg-stone-50/70 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold mb-3">
            <Heart className="w-3.5 h-3.5 fill-amber-700 text-amber-700" />
            <span>Histórias e Comemorações</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
            Momentos Especiais dos Nossos Clientes
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base">
            Mais de 1.200 famílias e celebrações já tiveram seus momentos doces assinados pelo nosso ateliê. Veja o que dizem sobre nós.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              id={`review-card-${review.id}`}
              className="bg-white rounded-3xl p-7 border border-stone-200/80 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Rating Stars & Event Tag */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-[10px] font-bold uppercase tracking-wider">
                    {review.event}
                  </span>
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic relative">
                  <Quote className="w-6 h-6 text-amber-200/80 absolute -top-2 -left-2 -z-0 opacity-50" />
                  <span className="relative z-10">"{review.comment}"</span>
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-6 mt-6 border-t border-stone-100 flex items-center gap-3">
                <img
                  src={review.avatar}
                  alt={review.name}
                  referrerPolicy="no-referrer"
                  className="w-11 h-11 rounded-full object-cover border-2 border-amber-200"
                />
                <div>
                  <h4 className="font-bold text-stone-900 text-xs sm:text-sm">{review.name}</h4>
                  <p className="text-[11px] text-stone-500">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
