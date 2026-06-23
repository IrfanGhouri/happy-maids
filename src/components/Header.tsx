"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Menu, X, Sparkles, ChevronDown, ArrowRight } from "lucide-react";

export const servicesList = [
  {
    name: "Home Cleaning",
    desc: "Premium residential cleaning tailored for your comfort.",
    href: "/services/home-cleaning",
    img: "/home_cleaning.png"
  },
  {
    name: "Vacation Rental Cleaning",
    desc: "Fast turnaround Airbnb & hotel-grade sanitization.",
    href: "/services/vacation-rental-cleaning",
    img: "/vacation_cleaning.png"
  },
  {
    name: "Commercial Cleaning",
    desc: "Dust-free, pristine workspaces for offices & retail.",
    href: "/services/commercial-cleaning",
    img: "/commercial_cleaning.png"
  },
  {
    name: "Move-In Cleaning",
    desc: "Prepare your brand new home before moving in.",
    href: "/services/move-in-cleaning",
    img: "/move_in_out.png"
  },
  {
    name: "Out Cleaning",
    desc: "Detailed cleaning check list for vacating tenants.",
    href: "/services/out-cleaning",
    img: "/move_in_out.png"
  },
  {
    name: "Post Construction Cleaning",
    desc: "Complete removal of industrial dust, splatter & debris.",
    href: "/services/post-construction-cleaning",
    img: "/post_construction.png"
  },
  {
    name: "Basement Cleaning",
    desc: "De-cluttering, sanitation, and heavy storage organization.",
    href: "/services/basement-cleaning",
    img: "/basement_cleaning.png"
  }
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setMegaMenuOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setMegaMenuOpen(false);
    }, 200); // 200ms grace period so it doesn't flicker/close immediately
  };

  const handleLinkClick = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setMegaMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 z-50 transition-all duration-500 ease-out px-4 sm:px-6 lg:px-8 ${
        scrolled
          ? "top-3"
          : "top-0 md:top-4"
      }`}
    >
      <div
        className={`mx-auto max-w-7xl px-6 lg:px-8 flex items-center justify-between transition-all duration-500 ease-out border rounded-full ${
          scrolled
            ? "bg-white/80 backdrop-blur-lg shadow-xl shadow-teal-950/[0.04] border-white/50 py-2.5"
            : "bg-white/40 backdrop-blur-md shadow-md border-white/25 py-4"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform duration-300">
            <Sparkles className="w-5 h-5 text-white animate-pulse" />
          </div>
          <span className="font-heading font-extrabold text-xl lg:text-2xl tracking-tight text-secondary">
            Happy <span className="text-primary">Cleaning</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8 font-medium">
          <Link href="/" className="text-secondary hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/about" className="text-secondary hover:text-primary transition-colors">
            About Us
          </Link>

          {/* Mega Menu Dropdown Trigger */}
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button className="flex items-center gap-1.5 text-secondary hover:text-primary transition-colors py-2 cursor-pointer font-bold text-base">
              Services
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${megaMenuOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Mega Menu Dropdown wrapper containing the pt-3 gap bridge */}
            <div
              className={`absolute top-[calc(100%-4px)] left-1/2 -translate-x-1/2 pt-3 w-[940px] transition-all duration-350 origin-top z-50 ${
                megaMenuOpen
                  ? "opacity-100 scale-100 pointer-events-auto"
                  : "opacity-0 scale-95 pointer-events-none"
              }`}
            >
              <div className="bg-white rounded-[32px] shadow-2xl border border-slate-100/80 overflow-hidden flex shadow-teal-950/[0.08]">
                {/* Left Column: Highlight Panel */}
                <div className="w-[36%] bg-gradient-to-br from-secondary to-slate-900 text-white p-9 flex flex-col justify-between text-left">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mb-6">
                      <Sparkles className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-heading font-black text-2xl leading-snug">Elite Quality Guaranteed</h4>
                    <p className="text-[15px] text-slate-350 mt-3 leading-relaxed font-sans font-medium">
                      Every visit includes our signature 50-point checklist inspection. 100% money-back guarantee.
                    </p>
                  </div>
                  <div>
                    <Link
                      href="/book"
                      onClick={handleLinkClick}
                      className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold text-sm uppercase tracking-wider px-6 py-3.5 rounded-full transition-all shadow-md shadow-primary/20 hover:shadow-lg"
                    >
                      Book in 60s
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* Right Column: Links list */}
                <div className="w-[64%] p-8 grid grid-cols-2 gap-4 bg-slate-50/60 text-left">
                  {servicesList.map((service) => {
                    return (
                      <Link
                        key={service.name}
                        href={service.href}
                        onClick={handleLinkClick}
                        className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white hover:shadow-md border border-transparent hover:border-slate-100 transition-all group"
                      >
                        <div className="w-16 h-12 rounded-xl relative overflow-hidden shrink-0 bg-slate-200 border border-slate-100/60">
                          <Image
                            src={service.img}
                            alt={service.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <span className="font-heading font-bold text-base text-secondary group-hover:text-primary transition-colors leading-tight">
                          {service.name}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <Link href="/faqs" className="text-secondary hover:text-primary transition-colors">
            FAQs
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="tel:5132221010"
            className="flex items-center gap-2 font-bold text-secondary hover:text-primary transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
              <Phone className="w-4 h-4 text-primary" />
            </div>
            (513) 222-1010
          </a>
          <Link
            href="/book"
            className="bg-primary hover:bg-primary-dark text-white font-bold px-5 py-2.5 rounded-full transition-all duration-300 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-secondary hover:text-primary transition-colors p-1"
          aria-label="Toggle navigation"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`lg:hidden fixed inset-y-0 right-0 z-45 w-full max-w-sm bg-white shadow-xl border-l border-slate-100 p-6 flex flex-col gap-6 transition-transform duration-350 ease-out transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <span className="font-heading font-extrabold text-xl text-secondary">
            Happy <span className="text-primary">Cleaning</span>
          </span>
          <button onClick={() => setIsOpen(false)} aria-label="Close menu">
            <X className="w-6 h-6 text-slate-500" />
          </button>
        </div>

        <nav className="flex flex-col gap-4 text-lg font-medium">
          <Link href="/" onClick={() => setIsOpen(false)} className="text-secondary hover:text-primary py-1">
            Home
          </Link>
          <Link href="/about" onClick={() => setIsOpen(false)} className="text-secondary hover:text-primary py-1">
            About Us
          </Link>

          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Services</span>
            <div className="grid grid-cols-1 gap-2 pl-3 border-l border-slate-200">
              {servicesList.map((service) => (
                <Link
                  key={service.name}
                  href={service.href}
                  onClick={() => setIsOpen(false)}
                  className="text-sm text-secondary hover:text-primary py-1"
                >
                  {service.name}
                </Link>
              ))}
            </div>
          </div>

          <Link href="/faqs" onClick={() => setIsOpen(false)} className="text-secondary hover:text-primary py-1">
            FAQs
          </Link>
        </nav>

        <div className="mt-auto border-t border-slate-100 pt-6 flex flex-col gap-4">
          <a href="tel:5132221010" className="flex items-center gap-3 font-bold text-secondary text-lg">
            <Phone className="w-5 h-5 text-primary" />
            (513) 222-1010
          </a>
          <Link
            href="/book"
            onClick={() => setIsOpen(false)}
            className="bg-primary hover:bg-primary-dark text-white text-center font-bold py-3 rounded-full shadow-lg shadow-primary/20"
          >
            Book Now
          </Link>
        </div>
      </div>
    </header>
  );
}
