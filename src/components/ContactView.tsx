import React from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { CONTACT_CHAIR_URL, CONTACT_RAW_FIBERS_URL } from '../data';
import { InquiryFormData } from '../types';

interface ContactViewProps {
  initialArea?: string;
}

export default function ContactView({ initialArea = '' }: ContactViewProps) {
  const [formData, setFormData] = React.useState<InquiryFormData>({
    fullName: '',
    company: '',
    workEmail: '',
    areaOfInterest: initialArea || '',
    message: ''
  });

  React.useEffect(() => {
    if (initialArea) {
      setFormData((prev) => ({ ...prev, areaOfInterest: initialArea }));
    }
  }, [initialArea]);

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.workEmail || !formData.message) {
      alert('Per favore, compila tutti i campi obbligatori (Nome, Email, Messaggio).');
      return;
    }

    setIsSubmitting(true);
    // Mimic real API transmission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({
        fullName: '',
        company: '',
        workEmail: '',
        areaOfInterest: '',
        message: ''
      });
    }, 1200);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 md:py-20 animate-fade-in-up">
      {/* 1. Page Large Typography Header */}
      <div className="mb-16 md:mb-24 text-center md:text-left">
        <span className="font-sans text-xs font-bold text-brand-primary uppercase tracking-[0.2em] mb-3 block">
          Get in Touch
        </span>
        <h1 className="font-serif text-4xl md:text-5xl text-brand-deep-earth max-w-3xl leading-tight font-bold">
          Connect with the artisans of natural rattan.
        </h1>
      </div>

      {/* 2. Form & Heritage details split block */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
        
        {/* Left Side: Heritage info & Details */}
        <div className="lg:col-span-5 space-y-12">
          <div className="space-y-6">
            <h2 className="font-serif text-2xl text-brand-deep-earth font-bold">Our Heritage</h2>
            <p className="font-sans text-sm md:text-base text-brand-secondary/90 leading-relaxed">
              Established in 1970, Bornia Rattan has been a pioneer in the global materials sector for over five decades. Our journey began with a singular focus on sustainable sourcing and has evolved into a master-craft legacy that serves premium hospitality and residential projects worldwide.
            </p>
          </div>

          <div className="space-y-8 pt-4 border-t border-brand-soft-sand/30">
            {/* Location */}
            <div className="flex items-start gap-4">
              <MapPin className="h-5 w-5 text-brand-primary shrink-0 mt-1" />
              <div>
                <h3 className="font-sans text-[10px] font-bold text-brand-primary uppercase tracking-widest mb-1.5">
                  LOCATION
                </h3>
                <p className="font-sans text-sm text-brand-deep-earth leading-relaxed">
                  Via Venezia, 31<br />
                  Tezze di Piave - 31028<br />
                  (TV) ITALY
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <Phone className="h-5 w-5 text-brand-primary shrink-0 mt-1" />
              <div>
                <h3 className="font-sans text-[10px] font-bold text-brand-primary uppercase tracking-widest mb-1.5">
                  PHONE
                </h3>
                <p className="font-sans text-sm text-brand-deep-earth">
                  +39 0438 488295
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <Mail className="h-5 w-5 text-brand-primary shrink-0 mt-1" />
              <div>
                <h3 className="font-sans text-[10px] font-bold text-brand-primary uppercase tracking-widest mb-1.5">
                  EMAIL
                </h3>
                <p className="font-sans text-sm text-brand-deep-earth">
                  info@bornia-rattan.it
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Professional Inquiry Form Block */}
        <div className="lg:col-span-7 space-y-12">
          <div className="bg-white p-8 md:p-12 shadow-[0_10px_40px_rgba(140,115,85,0.06)] border border-brand-soft-sand/35 rounded-sm">
            <h2 className="font-serif text-2xl text-brand-deep-earth font-bold mb-8">
              Professional Inquiry
            </h2>

            {isSuccess ? (
              <div className="p-6 md:p-8 bg-brand-tertiary/10 border border-brand-tertiary/25 text-brand-deep-earth text-center space-y-4 rounded-sm">
                <CheckCircle className="h-12 w-12 text-brand-tertiary mx-auto animate-bounce" />
                <h3 className="font-serif text-lg font-bold">Dati Trasmessi Con Successo</h3>
                <p className="font-sans text-xs text-brand-secondary/90 max-w-sm mx-auto">
                  Grazie per la tua richiesta. Un rappresentante del nostro team storico ti contatterà via email entro le prossime 24 ore lavorative.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="mt-2 text-xs uppercase tracking-widest font-bold text-brand-primary border-b border-brand-primary/50"
                  id="reset-form"
                >
                  Invia un altro messaggio
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" id="contact-form">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full name */}
                  <div className="space-y-2">
                    <label className="font-sans text-[10px] font-bold text-brand-secondary/85 uppercase tracking-wider block" htmlFor="fullName">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      placeholder="E.g. Julian Vahl"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full bg-brand-surface/40 border border-brand-soft-sand px-4 py-3 focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary transition-colors text-sm font-sans"
                    />
                  </div>

                  {/* Company */}
                  <div className="space-y-2">
                    <label className="font-sans text-[10px] font-bold text-brand-secondary/85 uppercase tracking-wider block" htmlFor="company">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      placeholder="Organization Name"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full bg-brand-surface/40 border border-brand-soft-sand px-4 py-3 focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary transition-colors text-sm font-sans"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="font-sans text-[10px] font-bold text-brand-secondary/85 uppercase tracking-wider block" htmlFor="workEmail">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    id="workEmail"
                    placeholder="julian@company.com"
                    value={formData.workEmail}
                    onChange={handleChange}
                    required
                    className="w-full bg-brand-surface/40 border border-brand-soft-sand px-4 py-3 focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary transition-colors text-sm font-sans"
                  />
                </div>

                {/* Area of Interest Selection */}
                <div className="space-y-2">
                  <label className="font-sans text-[10px] font-bold text-brand-secondary/85 uppercase tracking-wider block" htmlFor="areaOfInterest">
                    Area of Interest
                  </label>
                  <select
                    id="areaOfInterest"
                    value={formData.areaOfInterest}
                    onChange={handleChange}
                    className="w-full bg-brand-surface/40 border border-brand-soft-sand px-4 py-3 focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary transition-colors text-sm font-sans appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236f583c%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:16px] bg-[right_16px_center] bg-no-repeat"
                  >
                    <option value="">Select an option</option>
                    <option value="wholesale">Wholesale Inquiry</option>
                    <option value="custom">Custom Projects</option>
                    <option value="general">General Inquiry</option>
                  </select>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="font-sans text-[10px] font-bold text-brand-secondary/85 uppercase tracking-wider block" htmlFor="message">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Tell us about your project requirements..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full bg-brand-surface/40 border border-brand-soft-sand px-4 py-3 focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary transition-colors text-sm font-sans"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand-primary hover:bg-brand-deep-earth text-brand-surface font-sans text-xs py-5 uppercase tracking-widest font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow pr-1 active:scale-[0.98] disabled:opacity-60"
                  id="submit-inquiry-btn"
                >
                  {isSubmitting ? 'Inivio in corso...' : 'Submit Inquiry'}
                  <Send className="h-3 w-3 inline" />
                </button>
              </form>
            )}
          </div>

          {/* Aesthetic atmospheric imagery grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="h-44 overflow-hidden rounded-sm relative shadow-sm group">
              <img
                src={CONTACT_RAW_FIBERS_URL}
                alt="Rattan raw fibers drying under the sun"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-brand-deep-earth/5 hover:bg-transparent transition-colors duration-300" />
            </div>
            <div className="h-44 overflow-hidden rounded-sm relative shadow-sm group">
              <img
                src={CONTACT_CHAIR_URL}
                alt="Showroom display of elite rattan chair"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-brand-deep-earth/5 hover:bg-transparent transition-colors duration-300" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
