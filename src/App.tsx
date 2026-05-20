import { useState, useEffect } from 'react';
import { Sparkles, CheckCircle2, ShoppingBag } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';
import { ActiveTab, Product } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import HeritageView from './components/HeritageView';
import CatalogView from './components/CatalogView';
import MaterialsView from './components/MaterialsView';
import ContactView from './components/ContactView';
import { ProductDetailsModal, SampleCartModal, ShippingPolicyModal } from './components/Modals';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('heritage');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tutti');
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);
  const [contactInitialArea, setContactInitialArea] = useState('');
  const [sampleSuccess, setSampleSuccess] = useState(false);

  // Restore cartItems from localStorage on start
  useEffect(() => {
    try {
      const saved = localStorage.getItem('bornia_samples');
      if (saved) {
        setCartItems(JSON.parse(saved));
      }
    } catch (e) {
      console.error('LocalStorage load error:', e);
    }
  }, []);

  // Save cartItems to localStorage
  const saveCart = (items: Product[]) => {
    setCartItems(items);
    try {
      localStorage.setItem('bornia_samples', JSON.stringify(items));
    } catch (e) {
      console.error('LocalStorage save error:', e);
    }
  };

  const handleAddToCart = (product: Product) => {
    const exists = cartItems.some((item) => item.id === product.id);
    if (!exists) {
      const updated = [...cartItems, product];
      saveCart(updated);
    }
  };

  const handleRemoveFromCart = (productId: string) => {
    const updated = cartItems.filter((item) => item.id !== productId);
    saveCart(updated);
  };

  const handleClearCart = () => {
    saveCart([]);
  };

  const handleSelectWholesale = () => {
    setContactInitialArea('wholesale');
    setActiveTab('contact');
    setTimeout(() => {
      const elem = document.getElementById('contact-form');
      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  const handleShowPolicy = () => {
    setIsPolicyOpen(true);
  };

  // When a product is selected on Home (Heritage) collections:
  const handleSelectCollection = (productId: string) => {
    // find product in core data if we want to pre-filter
    const prod = cartItems.find((p) => p.id === productId);
    setSelectedCategory('Tutti');
    setActiveTab('catalog');
    setTimeout(() => {
      const elem = document.getElementById(`product-card-${productId}`);
      if (elem) elem.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const handleSampleRequestSubmit = (note: string) => {
    setIsCartOpen(false);
    setSampleSuccess(true);
    saveCart([]);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-brand-surface text-brand-deep-earth selection:bg-brand-primary-container/20">
      
      {/* Top Navbar */}
      <Header
        activeTab={activeTab}
        onChangeTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'instant' });
        }}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={cartItems.length}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'heritage' && (
          <HeritageView
            onNavigate={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'instant' });
            }}
            onSelectProduct={handleSelectCollection}
          />
        )}

        {activeTab === 'catalog' && (
          <CatalogView
            searchTerm={searchTerm}
            onAddToCart={handleAddToCart}
            cartItems={cartItems}
            onShowProductDetails={setSelectedProduct}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        )}

        {activeTab === 'materials' && <MaterialsView />}

        {activeTab === 'contact' && <ContactView initialArea={contactInitialArea} />}
      </main>

      {/* Corporate Boutique Footer */}
      <Footer
        onChangeTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'instant' });
        }}
        onSelectWholesale={handleSelectWholesale}
        onShowPolicy={handleShowPolicy}
      />

      {/* Modal Dialog: Product technical specs details */}
      <ProductDetailsModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        isInCart={cartItems.some((item) => item.id === (selectedProduct?.id || ''))}
      />

      {/* Modal Slideover Drawer: Sample collection inquiry box */}
      <SampleCartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onRequestSubmit={handleSampleRequestSubmit}
      />

      {/* Modal Dialog: Material and shipping guideline values */}
      <ShippingPolicyModal isOpen={isPolicyOpen} onClose={() => setIsPolicyOpen(false)} />

      {/* Sample inquiry success notice overlays */}
      {sampleSuccess && (
        <div className="fixed inset-0 bg-brand-deep-earth/50 backdrop-blur-sm flex items-center justify-center p-6 z-50">
          <div className="bg-brand-surface max-w-md w-full p-8 text-center space-y-6 border border-brand-soft-sand rounded shadow-2xl animate-fade-in-up">
            <CheckCircle2 className="h-14 w-14 text-brand-tertiary mx-auto animate-bounce" />
            <h3 className="font-serif text-2xl font-bold text-brand-deep-earth">Richiesta Ricevuta!</h3>
            <p className="font-sans text-sm text-brand-secondary leading-relaxed">
              Il tuo set campione omaggio è stato correttamente registrato nei nostri magazzini storici di Treviso. Riceverai un codice di tracciamento GLS appena i materiali verranno consegnati al corriere.
            </p>
            <button
              onClick={() => setSampleSuccess(false)}
              className="w-full bg-brand-primary hover:bg-brand-deep-earth text-brand-surface text-xs font-sans uppercase tracking-widest font-bold py-3.5 rounded transition-colors"
            >
              Ritorna alla boutique
            </button>
          </div>
        </div>
      )}
      
      {/* Vercel Web Analytics */}
      <Analytics />
    </div>
  );
}
