import { BRAND_LOGO_URL } from '../data';
import { ActiveTab } from '../types';

interface FooterProps {
  onChangeTab: (tab: ActiveTab) => void;
  onSelectWholesale: () => void;
  onShowPolicy: () => void;
}

export default function Footer({ onChangeTab, onSelectWholesale, onShowPolicy }: FooterProps) {
  return (
    <footer className="bg-brand-surface-container border-t border-brand-soft-sand/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
        {/* Left column: Brand & Mission */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <img
              src={BRAND_LOGO_URL}
              alt="Bornia Rattan Logo"
              className="h-12 w-12 object-contain rounded-full border border-brand-primary/10"
            />
            <span className="font-serif text-xl font-bold tracking-wider text-brand-deep-earth">
              BORNIA RATTAN
            </span>
          </div>
          <p className="font-sans text-sm text-brand-secondary/80 leading-relaxed max-w-md">
            Drafting excellence for generations. Our legacy is built on the strength of natural fibers and the hands of master weavers. Importatori di materiali naturali di alta qualità dal 1970 per l'arredamento di lusso e l'industria di design.
          </p>
          <div className="font-sans text-xs text-brand-secondary/60">
            © 1970 Bornia Rattan. All rights reserved. Crafting Excellence for Generations.
          </div>
        </div>

        {/* Right columns: Navigation and Contacts */}
        <div className="grid grid-cols-2 gap-8">
          {/* Esplora Category links */}
          <div className="space-y-4">
            <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-brand-primary">
              Esplora
            </h4>
            <ul className="space-y-2.5 font-sans text-sm text-brand-secondary/80">
              <li>
                <button
                  onClick={() => onChangeTab('heritage')}
                  className="hover:text-brand-primary transition-colors text-left"
                  id="footer-link-heritage"
                >
                  Our Heritage
                </button>
              </li>
              <li>
                <button
                  onClick={() => onChangeTab('catalog')}
                  className="hover:text-brand-primary transition-colors text-left"
                  id="footer-link-catalog"
                >
                  Catalog
                </button>
              </li>
              <li>
                <button
                  onClick={() => onChangeTab('materials')}
                  className="hover:text-brand-primary transition-colors text-left"
                  id="footer-link-materials"
                >
                  Materials Specs
                </button>
              </li>
              <li>
                <button
                  onClick={onSelectWholesale}
                  className="hover:text-brand-primary transition-colors text-left"
                  id="footer-link-wholesale"
                >
                  Wholesale Inquiries
                </button>
              </li>

            </ul>
          </div>

          {/* Contact Category links */}
          <div className="space-y-4">
            <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-brand-primary">
              Contatti
            </h4>
            <p className="font-sans text-sm text-brand-secondary/80 leading-relaxed">
              Via Venezia, 31<br />
              Tezze di Piave - 31028<br />
              (TV) ITALY<br />
              <span className="block mt-2 font-semibold">info@bornia-rattan.it</span>
              <span className="block font-semibold">+39 0438 488295</span>
            </p>
          </div>
        </div>
      </div>

      {/* Extreme bottom line: Brand authenticity info */}
      <div className="border-t border-brand-soft-sand/30 bg-brand-surface-container-low py-6 text-center text-[11px] uppercase tracking-widest text-brand-secondary/60">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 1970 BORNIA RATTAN. CRAFTING EXCELLENCE FOR GENERATIONS.</p>
          <div className="flex gap-8">
            <span>Made in Italy</span>
            <span>Est. Veneta Tradizione</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
