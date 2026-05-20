import { ArrowRight, Eye, Heart, Info, Check } from 'lucide-react';
import { PRODUCTS } from '../data';
import { Product } from '../types';

interface CatalogViewProps {
  searchTerm: string;
  onAddToCart: (product: Product) => void;
  cartItems: Product[];
  onShowProductDetails: (product: Product) => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function CatalogView({
  searchTerm,
  onAddToCart,
  cartItems,
  onShowProductDetails,
  selectedCategory,
  onSelectCategory
}: CatalogViewProps) {
  // Extract all categories
  const categories = ['Tutti', 'Paglia di Vienna', 'Midollino', 'Rattan', 'Diffusori'];

  // Filter products based on search query and category
  const filteredProducts = PRODUCTS.filter((prod) => {
    const matchesSearch =
      prod.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory =
      selectedCategory === 'Tutti' || prod.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-16 pb-12 animate-fade-in-up">
      {/* Catalog Hero Header */}
      <section className="relative h-[45vh] min-h-[300px] overflow-hidden flex items-center justify-center">
        {/* Woven background texture */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://lh3.googleusercontent.com/aida/ADBb0uifO__Fz1TPlTw834HRGf5cOh-q7uI84Y7PXl0eLM-rOkdK2I3emEBaKka00L0kvH4arRPk16opXGUrBX3Isa2n-HDuabOtPSUgw3HgtrdRCuLZB9RJjifIf21_Qg4_U-AcHPc5VejBmndr8YA5iZBf62MoCYUXLvIi-1H6nT9aEr131xTkAN4QXmFfEop1hh1bEpRdj1LoUHU7CAgZzdYRVCQ1O0YGADakz7rrNtsNtWHfWZ60XZOl1w"
            alt="Bornia Rattan Close Texture"
            className="w-full h-full object-cover brightness-95 opacity-85"
          />
          <div className="absolute inset-0 bg-brand-deep-earth/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-surface via-brand-surface/75 to-transparent" />
        </div>

        {/* Hero typography */}
        <div className="relative z-10 text-center px-6 max-w-3xl space-y-4">
          <h1 className="font-serif text-4xl md:text-5xl text-brand-deep-earth font-bold tracking-tight">
            Our Catalog
          </h1>
          <p className="font-sans text-sm md:text-base text-brand-secondary max-w-2xl mx-auto leading-relaxed">
            Timeless craftsmanship meets nature's finest fibers. Explore our curated selection of high-quality rattan materials for artisans, designers, and major builders.
          </p>
        </div>
      </section>

      {/* Category Navigation Bar & Products Filter */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 border-b border-brand-soft-sand/30 pb-6">
          {categories.map((cat) => {
            const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-4 py-2 font-sans text-xs uppercase tracking-widest font-semibold rounded-full transition-all focus:outline-none ${
                  isActive
                    ? 'bg-brand-primary text-brand-surface shadow-sm font-bold'
                    : 'bg-brand-surface-container/50 text-brand-secondary hover:bg-brand-soft-sand/20'
                }`}
                id={`cat-filter-${cat.replace(/\s+/g, '-').toLowerCase()}`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* 2-Column Product Grid in the mockup style */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 space-y-4">
            <Info className="h-10 w-10 text-brand-secondary/40 mx-auto" />
            <h3 className="font-serif text-lg font-bold text-brand-deep-earth">Nessun materiale trovato</h3>
            <p className="font-sans text-xs text-brand-secondary max-w-md mx-auto">
              Nessun articolo risponde alla ricerca "{searchTerm}". Prova a reimpostare i filtri o digita un termine diverso.
            </p>
            <button
              onClick={() => onSelectCategory('Tutti')}
              className="text-xs uppercase tracking-widest font-bold text-brand-primary border-b border-brand-primary pb-0.5"
            >
              Mostra Tutti i Prodotti
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
            {filteredProducts.map((prod) => {
              const isInCart = cartItems.some((item) => item.id === prod.id);
              return (
                <div
                  key={prod.id}
                  className="product-card group relative flex flex-col justify-between"
                  id={`product-card-${prod.id}`}
                >
                  <div className="space-y-6">
                    {/* Image block featuring rich overlays and quick-add actions */}
                    <div className="aspect-[16/10] bg-brand-soft-sand overflow-hidden relative shadow-md">
                      <img
                        src={prod.imageUrl}
                        alt={prod.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-brand-deep-earth/5 group-hover:bg-brand-deep-earth/10 transition-colors duration-300" />
                      
                      {/* Interactive hover controls EXACTLY matching sample mock styles */}
                      <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        <button
                          onClick={() => onShowProductDetails(prod)}
                          className="flex-1 bg-brand-deep-earth text-brand-surface py-3 text-[10px] font-sans font-bold uppercase tracking-widest hover:bg-brand-primary transition-all duration-300 flex items-center justify-center gap-2 shadow"
                        >
                          <Eye className="h-3 w-3" />
                          Dettagli tecnici
                        </button>
                        <button
                          onClick={() => onAddToCart(prod)}
                          className={`p-3 transition-colors shadow ${
                            isInCart
                              ? 'bg-brand-tertiary text-brand-surface'
                              : 'bg-brand-surface hover:bg-brand-primary hover:text-brand-surface text-brand-deep-earth'
                          }`}
                          title={isInCart ? 'Già nei campioni' : 'Richiedi Campione gratuito'}
                        >
                          {isInCart ? <Check className="h-4.5 w-4.5" /> : <Heart className="h-4.5 w-4.5" />}
                        </button>
                      </div>
                    </div>

                    {/* Metadata & textual layout aligning to exact visual alignment */}
                    <div className="flex justify-between items-start pt-2">
                      <div className="space-y-1.5 max-w-[85%]">
                        <span className="text-brand-sage-accent font-sans text-[10px] font-bold uppercase tracking-widest block">
                          {prod.category}
                        </span>
                        <h3 className="font-serif text-xl font-bold text-brand-deep-earth">
                          {prod.title}
                        </h3>
                        <p className="font-sans text-xs font-medium text-brand-secondary/80 italic leading-snug">
                          {prod.subtitle}
                        </p>
                        <p className="font-sans text-sm text-brand-secondary/90 pt-1 leading-relaxed">
                          {prod.description}
                        </p>
                      </div>

                      {/* Right-chevron action exactly like designer specified */}
                      <button
                        onClick={() => onShowProductDetails(prod)}
                        className="mt-5 p-1 text-brand-primary hover:translate-x-1.5 transition-transform font-bold"
                        aria-label="Vedi dettagli"
                        id={`btn-details-${prod.id}`}
                      >
                        <ArrowRight className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Experience the Quality bottom banner */}
      <section className="bg-brand-surface-container py-24 text-center mt-12">
        <div className="max-w-2xl mx-auto px-6 space-y-6">
          <h2 className="font-serif text-3xl md:text-4xl text-brand-deep-earth font-bold">
            Experience the Quality
          </h2>
          <p className="font-sans text-sm md:text-base text-brand-secondary max-w-xl mx-auto leading-relaxed">
            Crediamo fortemente nell'esperienza tattile. Richiedi una selezione o ordina un pratico kit di campionatura personalizzato per toccare con mano la qualità superiore delle nostre fibre naturali.
          </p>
          <div className="pt-4">
            <button
              onClick={() => {
                // Add all items in product array to sample bag
                PRODUCTS.forEach((p) => onAddToCart(p));
              }}
              className="bg-brand-primary text-brand-surface font-sans text-xs uppercase tracking-widest font-semibold px-8 py-4 hover:bg-brand-deep-earth transition-all duration-300 shadow active:scale-95"
              id="request-all-samples"
            >
              Richiedi Kit Intero di Campioni
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
