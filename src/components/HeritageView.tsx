import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { HERO_BACKGROUND_URL, HERITAGE_SIDE_URL, PRODUCTS } from '../data';
import { ActiveTab } from '../types';

interface HeritageViewProps {
  onNavigate: (tab: ActiveTab) => void;
  onSelectProduct: (productId: string) => void;
}

export default function HeritageView({ onNavigate, onSelectProduct }: HeritageViewProps) {
  return (
    <div className="space-y-24 pb-12">
      {/* 1. Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        {/* Ambient Darkened Background image overlay */}
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center parallax-bg transition-scale duration-1000 transform hover:scale-105 blur-[6px] scale-105"
            style={{ backgroundImage: `url(${HERO_BACKGROUND_URL})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-surface via-brand-surface/40 to-transparent" />
        </div>

        {/* Hero Content aligned exactly like high-end layout */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full pt-12">
          <motion.div
            initial={{ opacity: 0, translateY: 30 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl space-y-6 md:space-y-8"
          >
            <div className="space-y-3">
              <span className="font-sans text-xs md:text-sm font-bold tracking-[0.25em] text-brand-primary uppercase block">
                Est. 1970
              </span>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-deep-earth font-bold leading-tight tracking-tight">
                L'Arte del Rattan<br />dal 1970
              </h1>
            </div>

            <p className="font-sans text-base md:text-lg text-brand-deep-earth/80 leading-relaxed max-w-md">
              Importazione, distribuzione ed esportazione di materiali pregiati per l'alto artigianato e l'industria.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => onNavigate('catalog')}
                className="bg-brand-primary text-brand-surface font-sans text-xs uppercase tracking-widest font-semibold px-8 py-4 hover:bg-brand-primary-container transition-all duration-300 shadow-md active:scale-95 text-center"
                id="hero-explore"
              >
                Esplora il Catalogo
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="border border-brand-primary text-brand-primary font-sans text-xs uppercase tracking-widest font-semibold px-8 py-4 hover:bg-brand-primary hover:text-brand-surface transition-all duration-300 active:scale-95 text-center"
                id="hero-contact"
              >
                Contattaci
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. La Nostra Azienda Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          {/* Informational blocks */}
          <div className="lg:col-span-5 space-y-6 md:space-y-8">
            <div className="w-12 h-0.5 bg-brand-primary" />
            <h2 className="font-serif text-3xl md:text-4xl text-brand-deep-earth font-bold tracking-tight">
              La Nostra Azienda
            </h2>
            <div className="font-sans text-sm md:text-base text-brand-secondary/90 space-y-5 leading-relaxed">
              <p>
                Bornia si occupa di importazione, distribuzione ed esportazione di prodotti in Rattan e relativi derivati fin dal 1970. Grazie alla nostra conoscenza pluriennale relativa a materiali e territori d'origine, possiamo garantire forniture stabili di assoluto valore e qualità superiore.
              </p>
              <p>
                Abbiamo costantemente a disposizione canne di Manao naturale e scortecciato, Manila, Malacca, Giunco, Midollo e Midollini di varie sezioni calibrate, oltre a pregiati tessuti in Rattan intrecciati come la rinomata Paglia di Vienna.
              </p>
            </div>
          </div>

          {/* Sun-drenched sun imagery with overlay custom badge */}
          <div className="lg:col-span-7 relative">
            <div className="aspect-[4/3] bg-brand-soft-sand overflow-hidden shadow-lg select-none">
              <img
                src={HERITAGE_SIDE_URL}
                alt="Intrecci di Rattan in laboratorio"
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
              />
            </div>
            {/* Elegant overlay card mirroring original mock */}
            <div className="absolute -bottom-6 -left-6 md:-left-8 bg-brand-primary p-6 md:p-8 text-brand-surface shadow-2xl hidden sm:block">
              <p className="font-serif text-xl md:text-2xl font-semibold italic">Qualità e Tradizione</p>
              <p className="font-sans text-[10px] tracking-widest uppercase text-brand-surface/80 mt-1">
                Oltre 50 anni di eccellenza italiana
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Collezione Section */}
      <section className="bg-brand-surface-container py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center space-y-4 mb-16 max-w-2xl mx-auto">
            <span className="font-sans text-xs font-bold text-brand-primary tracking-[0.25em] uppercase block">
              Collezioni
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-brand-deep-earth font-bold tracking-tight">
              I Nostri Materiali Pregiati
            </h2>
          </div>

          {/* 4 elements catalog grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PRODUCTS.map((prod, index) => {
              // Different margin tops on alternate items to replicate editorial feel of the mockup
              const gapClass = index % 2 === 1 ? 'lg:translate-y-6' : '';
              return (
                <div
                  key={prod.id}
                  onClick={() => onSelectProduct(prod.id)}
                  className={`group cursor-pointer bg-brand-surface p-4 transition-all duration-300 hover:shadow-xl rounded-sm ${gapClass}`}
                  id={`home-col-${prod.id}`}
                >
                  <div className="aspect-[3/4] overflow-hidden bg-brand-soft-sand/30 relative mb-5">
                    <img
                      src={prod.imageUrl}
                      alt={prod.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-brand-deep-earth/5 group-hover:bg-transparent transition-colors duration-300" />
                    {prod.id === 'malacca' && (
                      <div className="absolute bottom-4 left-4">
                        <span className="bg-brand-primary text-brand-surface text-[10px] tracking-widest font-bold uppercase py-1 px-3">
                          Naturale
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-1">
                    <span className="font-sans text-[10px] font-bold text-brand-primary tracking-widest uppercase">
                      {prod.category}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-brand-deep-earth group-hover:text-brand-primary transition-colors">
                      {prod.title}
                    </h3>
                    <p className="font-sans text-xs text-brand-secondary/85 line-clamp-2 pt-1">
                      {prod.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Ready to upgrade / Call to action */}
      <section className="bg-brand-surface-container-low py-20">
        <div className="max-w-4xl mx-auto text-center px-6 space-y-8">
          <h2 className="font-serif text-3xl md:text-4xl text-brand-deep-earth font-bold tracking-tight">
            Pronti a elevare le vostre creazioni?
          </h2>
          <p className="font-sans text-base text-brand-secondary/90 leading-relaxed max-w-2xl mx-auto">
            Dall'arredamento d'autore alla profumeria d'ambiente di lusso, i nostri materiali pregiati sono la scelta indiscussa per artigiani d'eccellenza ed industrie d'avanguardia. Scoprite l'intera gamma nel catalogo.
          </p>
          <div className="pt-2 flex justify-center">
            <button
              onClick={() => onNavigate('catalog')}
              className="bg-brand-primary text-brand-surface flex items-center gap-3 font-sans text-xs uppercase tracking-widest font-bold px-10 py-5 hover:bg-brand-deep-earth transition-all duration-300 shadow active:scale-95 group"
              id="cta-explore"
            >
              Esplora il Catalogo
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
