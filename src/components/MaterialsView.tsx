import { CheckCircle2, Ruler, ShieldCheck, Zap } from 'lucide-react';
import { PRODUCTS } from '../data';

export default function MaterialsView() {
  return (
    <div className="space-y-24 py-12 animate-fade-in-up">
      {/* 1. Header Hero */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 text-center space-y-4">
        <span className="font-sans text-xs font-bold text-brand-primary tracking-[0.25em] uppercase block">
          Technical Specifications
        </span>
        <h1 className="font-serif text-3xl md:text-5xl text-brand-deep-earth font-bold tracking-tight">
          Guida ai Materiali &amp; Spessore
        </h1>
        <p className="font-sans text-sm md:text-base text-brand-secondary max-w-2xl mx-auto leading-relaxed">
          I nostri standard dimensionali seguono severi processi di calibrazione e selezione. Qui troverai ogni dettaglio tecnico per realizzare arredi di alto pregio, restauro a regola d'arte ed eccellenti sistemi olfattivi.
        </p>
      </section>

      {/* 2. Grid with dimensional details and metrics */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Left panel: Dimensional guidelines */}
          <div className="space-y-8">
            <h2 className="font-serif text-2xl text-brand-deep-earth font-bold tracking-tight flex items-center gap-3">
              <Ruler className="h-6 w-6 text-brand-primary" />
              Standard Di Tessitura &amp; Altezza
            </h2>
            <p className="font-sans text-sm text-brand-secondary/90 leading-relaxed">
              Il filamento di rattan naturale impiegato per la nostra Paglia di Vienna segue un rigido processo di trafilatura calibrata. La larghezza standard del raddoppio è certificata per garantire un intreccio esagonale perfettamente simmetrico e ad altissima resistenza strutturale.
            </p>

            <div className="border border-brand-soft-sand rounded-lg p-6 bg-brand-surface-container-low space-y-4">
              <h3 className="font-serif text-lg text-brand-deep-earth font-bold">Consigli per il Restauro (Sedie Thonet):</h3>
              <ul className="space-y-3 font-sans text-xs text-brand-secondary leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-brand-primary mt-0.5">•</span>
                  <span><strong>Idratazione:</strong> Consigliamo di immergere la Paglia di Vienna in acqua tiepida per circa 20-30 minuti prima dell'applicazione per renderla flessibile.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-primary mt-0.5">•</span>
                  <span><strong>Asciugatura naturale:</strong> Durante la fase di asciugatura, le fibre si tenderanno in modo naturale, garantendo una superficie rigida e perfettamente tesa.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-primary mt-0.5">•</span>
                  <span><strong>Calibrazione:</strong> Utilizzare cannette di midollino da 3.0mm o 4.0mm per bloccare in sicurezza il tessuto nella scanalatura della seduta.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right panel: Comparison of Capillary Absorption of Diffusers */}
          <div className="space-y-8">
            <h2 className="font-serif text-2xl text-brand-deep-earth font-bold tracking-tight flex items-center gap-3">
              <Zap className="h-6 w-6 text-brand-primary" />
              Porosità e Capillarità Olfattiva
            </h2>
            <p className="font-sans text-sm text-brand-secondary/90 leading-relaxed">
              Non tutto il rattan è idoneo per la profumazione. I nostri bastoncini di midollo speciale per diffusori ambiente vengono ricavati dalla porzione interna più porosa del fusto, caratterizzata da canali longitudinali lineari privi di ostruzioni.
            </p>

            {/* Micro rating table or stat highlights */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-brand-surface border border-brand-soft-sand p-5 rounded space-y-2 text-center">
                <span className="font-serif text-3xl font-bold text-brand-primary">98%</span>
                <p className="font-sans text-xs font-semibold text-brand-deep-earth uppercase">Tasso di Assorbimento</p>
                <p className="font-sans text-[11px] text-brand-secondary/80">Massimo rilascio e diffusione oraria</p>
              </div>
              <div className="bg-brand-surface border border-brand-soft-sand p-5 rounded space-y-2 text-center">
                <span className="font-serif text-3xl font-bold text-brand-primary">&lt; 1%</span>
                <p className="font-sans text-xs font-semibold text-brand-deep-earth uppercase">Ostruzione Dei Canali</p>
                <p className="font-sans text-[11px] text-brand-secondary/80">Regolarità del flusso capillare</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Detailed individual products technical highlight rows */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 bg-brand-surface-container py-20 rounded-md">
        <h2 className="font-serif text-2xl md:text-3xl text-brand-deep-earth font-bold text-center mb-16">
          Schede di Tolleranza e Qualità
        </h2>

        <div className="space-y-12">
          {PRODUCTS.map((prod) => (
            <div
              key={prod.id}
              className="bg-brand-surface p-6 md:p-8 rounded border border-brand-soft-sand/30 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
              id={`specs-row-${prod.id}`}
            >
              {/* Product preview */}
              <div className="md:col-span-3 flex items-center gap-4">
                <img
                  src={prod.imageUrl}
                  alt={prod.title}
                  className="h-20 w-20 object-cover rounded-md border border-brand-soft-sand"
                />
                <div>
                  <span className="font-sans text-[10px] font-bold text-brand-sage-accent uppercase tracking-wider block">
                    {prod.category}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-brand-deep-earth">{prod.title}</h3>
                </div>
              </div>

              {/* Description */}
              <div className="md:col-span-4 font-sans text-sm text-brand-secondary/90 leading-relaxed">
                {prod.description}
              </div>

              {/* Specs detailed bullet block */}
              <div className="md:col-span-5 space-y-2.5">
                <h4 className="font-sans text-xs font-bold text-brand-primary uppercase tracking-widest flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4" /> Specifiche Certificate
                </h4>
                <ul className="space-y-1.5 font-sans text-[13px] text-brand-secondary">
                  {prod.specifications?.map((spec, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-brand-primary shrink-0" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
