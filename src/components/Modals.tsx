import { X, Check, ShoppingBag, Trash2 } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailsModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  isInCart: boolean;
}

export function ProductDetailsModal({
  product,
  onClose,
  onAddToCart,
  isInCart
}: ProductDetailsModalProps) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-brand-deep-earth/45 backdrop-blur-sm transition-opacity" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative bg-brand-surface max-w-2xl w-full shadow-2xl rounded-sm border border-brand-soft-sand overflow-hidden z-20 animate-fade-in-up">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-brand-secondary hover:text-brand-primary transition-colors focus:outline-none"
          id="close-details-modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left panel: Image */}
          <div className="h-64 md:h-full min-h-[250px] relative bg-brand-soft-sand/20">
            <img
              src={product.imageUrl}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right panel: Information */}
          <div className="p-6 md:p-8 space-y-6">
            <div className="space-y-1.5">
              <span className="text-brand-sage-accent font-sans text-[10px] font-bold uppercase tracking-widest block">
                {product.category}
              </span>
              <h3 className="font-serif text-2xl font-bold text-brand-deep-earth">{product.title}</h3>
              <p className="font-sans text-xs font-semibold text-brand-secondary/80 italic">{product.subtitle}</p>
            </div>

            <p className="font-sans text-sm text-brand-secondary/90 leading-relaxed">
              {product.description}
            </p>

            {/* Specifications list */}
            {product.specifications && (
              <div className="space-y-2 pt-4 border-t border-brand-soft-sand/30">
                <h4 className="font-sans text-xs font-bold text-brand-primary uppercase tracking-widest">
                  Parametri Tecnici
                </h4>
                <ul className="space-y-2 text-xs text-brand-secondary">
                  {product.specifications.map((spec, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-brand-primary mt-0.5">•</span>
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA action to request samples */}
            <div className="pt-4">
              <button
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
                className={`w-full font-sans text-xs uppercase tracking-widest font-bold py-3.5 px-6 transition-all duration-300 flex items-center justify-center gap-2 ${
                  isInCart
                    ? 'bg-brand-tertiary text-brand-surface cursor-default'
                    : 'bg-brand-primary hover:bg-brand-deep-earth text-brand-surface active:scale-95 shadow'
                }`}
                id="modal-add-cart"
              >
                {isInCart ? (
                  <>
                    <Check className="h-4 w-4" />
                    Aggiunto ai Campioni
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-4 w-4" />
                    Aggiungi campionatura gratuita
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface SampleCartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: Product[];
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onRequestSubmit: (message: string) => void;
}

export function SampleCartModal({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
  onClearCart,
  onRequestSubmit
}: SampleCartModalProps) {
  if (!isOpen) return null;

  const [inquiryMessage, setInquiryMessage] = useState('');

  const handleRequestSubmit = () => {
    if (cartItems.length === 0) return;
    onRequestSubmit(inquiryMessage);
    setInquiryMessage('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-brand-deep-earth/35 backdrop-blur-sm transition-opacity" onClick={onClose} />

      {/* Drawer layout */}
      <div className="relative w-full max-w-md bg-brand-surface h-full shadow-2xl flex flex-col justify-between z-10 animate-fade-in-up">
        {/* Header */}
        <div className="p-6 border-b border-brand-soft-sand/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-brand-primary" />
            <h3 className="font-serif text-xl font-bold text-brand-deep-earth">I tuoi Campioni</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-brand-secondary hover:text-brand-primary transition-colors focus:outline-none"
            id="close-cart-btn"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cartItems.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <ShoppingBag className="h-10 w-10 text-brand-secondary/30 mx-auto" />
              <p className="font-serif text-base font-bold text-brand-deep-earth">La borsa è vuota</p>
              <p className="font-sans text-xs text-brand-secondary max-w-xs mx-auto">
                Seleziona i materiali che ti interessano dal catalogo per provarne l'autenticità e la qualità con il nostro kit gratuito.
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <span className="font-sans text-xs text-brand-secondary">
                  {cartItems.length} {cartItems.length === 1 ? 'materiale selezionato' : 'materiali selezionati'}
                </span>
                <button
                  onClick={onClearCart}
                  className="font-sans text-[11px] font-bold text-red-600 uppercase tracking-wider"
                  id="clear-samples-btn"
                >
                  Svuota tutto
                </button>
              </div>

              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-3 bg-white border border-brand-soft-sand/40 rounded-sm relative group"
                    id={`cart-item-${item.id}`}
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="h-14 w-14 object-cover rounded-sm border border-brand-soft-sand/30"
                    />
                    <div className="space-y-0.5 flex-1 pr-6">
                      <span className="text-[10px] font-bold text-brand-sage-accent uppercase tracking-widest block">
                        {item.category}
                      </span>
                      <h4 className="font-serif text-sm font-bold text-brand-deep-earth leading-snug">
                        {item.title}
                      </h4>
                      <span className="font-sans text-[11px] text-brand-secondary block italic">
                        Campione gratuito 10x10 cm
                      </span>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-brand-secondary/40 hover:text-red-600 transition-colors"
                      title="Rimuovi campione"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Message annotation */}
              <div className="space-y-2 pt-6 border-t border-brand-soft-sand/20">
                <label className="font-sans text-xs font-bold text-brand-deep-earth uppercase tracking-wider block">
                  Cosa stai realizzando?
                </label>
                <textarea
                  value={inquiryMessage}
                  onChange={(e) => setInquiryMessage(e.target.value)}
                  placeholder="Es. Restauro sedia d'epoca, progetto contract, arredo bar boutique..."
                  rows={3}
                  className="w-full bg-brand-surface/40 border border-brand-soft-sand p-3 text-xs font-sans focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary transition-colors"
                />
              </div>
            </>
          )}
        </div>

        {/* Footer info & CTA */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-brand-soft-sand/30 bg-brand-surface-container space-y-4">
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-brand-secondary font-sans">
                <span>Costo del Kit:</span>
                <span className="font-bold text-green-700">Omaggio / Gratuito</span>
              </div>
              <div className="flex justify-between text-xs text-brand-secondary font-sans">
                <span>Spedizione provini:</span>
                <span>Inclusa (Poste Italiane / GLS)</span>
              </div>
            </div>

            <button
              onClick={handleRequestSubmit}
              className="w-full bg-brand-primary hover:bg-brand-deep-earth text-brand-surface font-sans text-xs uppercase tracking-widest font-bold py-4 transition-all duration-300 shadow flex items-center justify-center gap-2 active:scale-95"
              id="request-checkout-btn"
            >
              Richiedi la Spedizione
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

interface ShippingPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ShippingPolicyModal({ isOpen, onClose }: ShippingPolicyModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-brand-deep-earth/45 backdrop-blur-sm transition-opacity" onClick={onClose} />

      {/* Container */}
      <div className="relative bg-brand-surface max-w-md w-full shadow-2xl rounded-sm border border-brand-soft-sand p-6 md:p-8 z-20 animate-fade-in-up space-y-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-brand-secondary hover:text-brand-primary transition-colors focus:outline-none"
        >
          <X className="h-5 w-5" />
        </button>

        <h3 className="font-serif text-2xl font-bold text-brand-deep-earth border-b border-brand-soft-sand/30 pb-3">
          Shipping &amp; Sampling Policy
        </h3>

        <div className="space-y-4 font-sans text-xs md:text-sm text-brand-secondary leading-relaxed">
          <p>
            Offriamo a professionisti, interior designer e restauratori la possibilità di richiedere campioni gratuiti di <strong>10x10 cm</strong> per testare i nostri materiali in modo reale.
          </p>
          <p>
            <strong>Costi di spedizione:</strong> I campioni e la spedizione sono completamente gratuiti per aziende registrate e artigiani con partita IVA. Per clienti privati può essere richiesto un piccolo contributo fisso pari alle spese vive del corriere se si desidera una spedizione urgente tracciata (GLS / DHL).
          </p>
          <p>
            <strong>Tempi di consegna:</strong> I provini vengono spediti ogni lunedì e giovedì e giungono a destinazione in 2-4 giorni lavorativi su tutto il territorio italiano (comprese le isole).
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-brand-primary text-brand-surface py-3 text-xs uppercase tracking-widest font-bold font-sans hover:bg-brand-deep-earth transition-colors"
        >
          Ho capito, grazie
        </button>
      </div>
    </div>
  );
}

// Ensure React is imported inside file
import { useState } from 'react';
