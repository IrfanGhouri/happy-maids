"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, Calendar, ArrowRight } from "lucide-react";
import gsap from "gsap";

export default function FloatingWidget() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (visible) {
      gsap.to(".floating-widget-container", {
        opacity: 1,
        x: 0,
        pointerEvents: "auto",
        duration: 0.4,
        ease: "back.out(1.5)"
      });
    } else {
      gsap.to(".floating-widget-container", {
        opacity: 0,
        x: 40,
        pointerEvents: "none",
        duration: 0.3,
        ease: "power2.in"
      });
    }
  }, [visible]);

  return (
    <div
      className="floating-widget-container fixed bottom-8 right-6 z-40 flex flex-col gap-3 opacity-0 translate-x-10 pointer-events-none"
      style={{ willChange: "transform, opacity" }}
    >
      {/* Phone Call Widget */}
      <a
        href="tel:5132221010"
        className="group flex items-center gap-3 bg-white border border-slate-100 hover:border-primary shadow-xl rounded-full p-2 pr-5 transition-all duration-300 hover:-translate-y-1"
      >
        <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
          <Phone className="w-4 h-4 text-primary animate-pulse" />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Call Agent</span>
          <span className="text-sm font-bold text-secondary font-sans leading-none">(513) 222-1010</span>
        </div>
      </a>

      {/* Book Online Widget */}
      <Link
        href="/book"
        className="group flex items-center gap-3 bg-primary hover:bg-primary-dark text-white shadow-xl shadow-primary/30 rounded-full p-2 pr-5 transition-all duration-300 hover:-translate-y-1"
      >
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:rotate-12 transition-transform">
          <Calendar className="w-4 h-4 text-white" />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] text-white/70 font-bold uppercase tracking-wider">Instant Clean</span>
          <div className="flex items-center gap-1 text-sm font-black tracking-wide leading-none">
            Book Now
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </Link>
    </div>
  );
}
