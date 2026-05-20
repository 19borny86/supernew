import React from 'react';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';
import { BRAND_LOGO_URL } from '../data';
import { ActiveTab } from '../types';

interface HeaderProps {
  activeTab: ActiveTab;
  onChangeTab: (tab: ActiveTab) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onOpenCart: () => void;
  cartCount: number;
}

export default function Header({
  activeTab,
  onChangeTab,
  searchTerm,
  onSearchChange,
  onOpenCart,
  cartCount
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const tabs: { id: ActiveTab; label: string }[] = [
    { id: 'heritage', label: 'Heritage' },
    { id: 'catalog', label: 'Catalog' },
    { id: 'materials', label: 'Materials' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-brand-surface/95 backdrop-blur-md border-b border-brand-soft-sand/30 transition-shadow duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        {/* Logo and Branding */}
        <button
          onClick={() => {
            onChangeTab('heritage');
            setMobileMenuOpen(false);
          }}
          className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-brand-primary/20 rounded-lg p-1 text-left"
          id="logo-btn"
        >
          <img
            src={BRAND_LOGO_URL}
            alt="Bornia Rattan Logo"
            className="h-10 w-10 object-contain rounded-full border border-brand-primary/10 transition-transform duration-500 group-hover:rotate-12"
          />
          <span className="font-serif text-lg md:text-xl font-bold tracking-wider text-brand-deep-earth">
            BORNIA RATTAN
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-12">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onChangeTab(tab.id)}
                className={`relative py-2 text-xs uppercase tracking-widest font-semibold font-sans transition-colors duration-300 focus:outline-none ${
                  isActive
                    ? 'text-brand-primary font-bold'
                    : 'text-brand-secondary/70 hover:text-brand-primary'
                }`}
                id={`nav-${tab.id}`}
              >
                {tab.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-primary rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Tool Actions (Search & Shopping Bag) */}
        <div className="flex items-center gap-4 lg:gap-6">
          {/* Live Search */}
          <div className="relative hidden lg:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-secondary/60" />
            <input
              type="text"
              placeholder="Search collection..."
              value={searchTerm}
              onChange={(e) => {
                onSearchChange(e.target.value);
                if (activeTab !== 'catalog' && activeTab !== 'materials') {
                  onChangeTab('catalog');
                }
              }}
              className="pl-9 pr-4 py-1.5 w-44 xl:w-52 bg-brand-surface border border-brand-soft-sand rounded-full text-xs font-sans text-brand-deep-earth placeholder-brand-secondary/50 focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary transition-all duration-300"
              id="search-input"
            />
          </div>

          {/* Sample Request Bag */}
          <button
            onClick={onOpenCart}
            className="relative p-2 text-brand-secondary hover:text-brand-primary transition-all focus:outline-none focus:ring-2 focus:ring-brand-primary/20 rounded-full"
            title="Sample Cart"
            id="cart-btn"
          >
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-brand-primary text-brand-surface font-sans text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center animate-bounce shadow">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-brand-secondary hover:text-brand-primary transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary/20 rounded-full"
            id="mobile-menu-btn"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-brand-soft-sand/20 bg-brand-surface px-6 py-4 space-y-3 absolute top-full left-0 right-0 shadow-lg animate-fade-in-up">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  onChangeTab(tab.id);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left py-2 px-3 text-xs uppercase tracking-widest font-semibold rounded-md transition-colors ${
                  isActive
                    ? 'bg-brand-soft-sand/30 text-brand-primary font-bold'
                    : 'text-brand-secondary/80 hover:bg-brand-soft-sand/10 hover:text-brand-primary'
                }`}
                id={`mobile-nav-${tab.id}`}
              >
                {tab.label}
              </button>
            );
          })}
          {/* Mobile Search bar */}
          <div className="relative pt-2">
            <Search className="absolute left-3 top-1/2 translate-y-[-10%] h-4 w-4 text-brand-secondary/60" />
            <input
              type="text"
              placeholder="Search collection..."
              value={searchTerm}
              onChange={(e) => {
                onSearchChange(e.target.value);
                if (activeTab !== 'catalog' && activeTab !== 'materials') {
                  onChangeTab('catalog');
                }
              }}
              className="w-full pl-9 pr-4 py-2 bg-brand-surface border border-brand-soft-sand rounded-lg text-xs font-sans text-brand-deep-earth focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary transition-all"
              id="mobile-search-input"
            />
          </div>
        </div>
      )}
    </header>
  );
}
