"use client";

import Link from "next/link";
import { Sparkles, Phone, MapPin, Mail } from "lucide-react";
import { servicesList } from "./Header";

export default function Footer() {
  return (
    <footer className="bg-secondary text-white pt-16 pb-8 border-t border-slate-850">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        {/* Column 1: Info */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-heading font-extrabold text-xl tracking-tight">
              Happy <span className="text-primary">Maids</span>
            </span>
          </Link>
          <p className="text-slate-400 text-sm leading-relaxed max-w-xs font-sans">
            Des Plaines and Chicago's premier eco-friendly professional cleaning service. Trustworthy, background-checked cleaners delivering 100% sparkling satisfaction.
          </p>
          {/* Custom SVG Social Icons */}
          <div className="flex gap-4 mt-2">
            <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors duration-300" aria-label="Facebook">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
              </svg>
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors duration-300" aria-label="Instagram">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Column 2: Pages */}
        <div className="flex flex-col gap-4">
          <h4 className="font-heading font-bold text-lg text-white border-l-4 border-primary pl-3">
            Pages
          </h4>
          <ul className="flex flex-col gap-2.5 text-slate-400 text-sm font-sans">
            <li>
              <Link href="/about" className="hover:text-primary transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/book" className="hover:text-primary transition-colors">
                Book Now
              </Link>
            </li>
            <li>
              <Link href="/faqs" className="hover:text-primary transition-colors">
                FAQs
              </Link>
            </li>
            <li>
              <Link href="/blogs" className="hover:text-primary transition-colors">
                Blogs
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Services */}
        <div className="flex flex-col gap-4">
          <h4 className="font-heading font-bold text-lg text-white border-l-4 border-primary pl-3">
            Services
          </h4>
          <ul className="flex flex-col gap-2.5 text-slate-400 text-sm font-sans">
            {servicesList.map((service) => (
              <li key={service.name}>
                <Link href={service.href} className="hover:text-primary transition-colors">
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Contact */}
        <div className="flex flex-col gap-4">
          <h4 className="font-heading font-bold text-lg text-white border-l-4 border-primary pl-3">
            Contact Us
          </h4>
          <ul className="flex flex-col gap-3 text-slate-400 text-sm font-sans">
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-primary shrink-0" />
              <a href="tel:5132221010" className="hover:text-primary transition-colors font-bold text-white">
                (513) 222-1010
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span>
                8814 Robin Dr Unit A<br />
                Des Plaines, IL 60016
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-primary shrink-0" />
              <a href="mailto:info@happymaids.com" className="hover:text-primary transition-colors">
                info@happymaids.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <span>&copy; {new Date().getFullYear()} Happy Maids. All rights reserved.</span>
        <span>
          Powered by{" "}
          <a
            href="https://elbasofttechnologies.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline font-semibold"
          >
            Elbasoft Technologies
          </a>
        </span>
      </div>
    </footer>
  );
}
