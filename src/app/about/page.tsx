"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ShieldCheck, Heart, Award, Users, ArrowRight } from "lucide-react";
import gsap from "gsap";

export default function AboutPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Stagger reveal of content cards on load
    gsap.fromTo(
      ".about-anim-item",
      { opacity: 0, y: 35 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out" }
    );
  }, []);

  return (
    <div className="bg-[#F8FAFC] min-h-screen relative overflow-hidden" ref={pageRef}>
      {/* Soft background liquid gradient */}
      <div className="absolute top-0 left-0 right-0 h-[50vh] bg-gradient-to-b from-[#E0F2FE] via-[#F0FDFA] to-transparent -z-10" />

      {/* 1. Innovative Hero Header */}
      <section className="relative pt-28 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-5">
          <div className="about-anim-item inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest text-primary">
            <Sparkles className="w-3.5 h-3.5" />
            Our Story & Values
          </div>
          <h1 className="about-anim-item font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-secondary tracking-tight leading-tight">
            About Happy Maids
          </h1>
          <p className="about-anim-item text-slate-500 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed font-medium font-sans">
            We are redefining home care with eco-safe techniques, transparent flat pricing, and thoroughly vetted cleaning specialists so you can buy back your weekends.
          </p>
        </div>
      </section>

      {/* 2. Visual Asymmetrical Info Section */}
      <section className="py-16 px-6 bg-white/60 backdrop-blur-md border-y border-slate-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Image wrapper */}
          <div className="about-anim-item lg:col-span-6 relative aspect-[4/3] rounded-[36px] overflow-hidden border-8 border-white shadow-xl bg-slate-100 shrink-0">
            <Image
              src="/about_team.png"
              alt="Happy Maids cleaning professionals"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Right Column: Copy details */}
          <div className="about-anim-item lg:col-span-6 flex flex-col gap-6 text-left items-start">
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-secondary leading-snug">
              Professionalism, Integrity & Pristine Standards Combined
            </h2>
            <div className="w-12 h-1 bg-primary rounded-full" />
            
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-sans">
              At Happy Maids, we recognize that letting a cleaner into your private sanctuary is an act of trust. That's why we don't just send housekeepers; we send vetted, trained professionals who take pride in rendering spaces spotless.
            </p>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-sans">
              Founded locally in Des Plaines, IL and expanding across Chicago, our core commitment remains unchanged: utilizing certified green, non-toxic cleaning products to ensure your living spaces are sanitarily safe for infants, toddlers, and pets.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-2 font-sans w-full">
              <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-100 rounded-2xl text-secondary font-bold text-xs uppercase tracking-wider">
                <Award className="w-4 h-4 text-primary shrink-0" />
                Top-Rated Local Service
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-100 rounded-2xl text-secondary font-bold text-xs uppercase tracking-wider">
                <Users className="w-4 h-4 text-primary shrink-0" />
                Fully Insured & Vetted
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Vetting & Safety Process Card Grid */}
      <section className="py-24 px-6 relative">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <span className="text-primary font-bold text-xs uppercase tracking-widest block mb-2 font-sans">
            Safety First
          </span>
          <h2 className="font-heading font-black text-3xl text-secondary">
            Our Strict Cleaner Vetting Process
          </h2>
          <div className="w-12 h-1 bg-primary rounded-full mx-auto mt-4" />
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 font-sans">
          
          <div className="about-anim-item bg-white border border-slate-150 p-8 rounded-3xl text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="w-6 h-6 text-primary" />
            </div>
            <h4 className="font-heading font-extrabold text-lg text-secondary mb-2">1. Background Checked</h4>
            <p className="text-slate-500 text-xs leading-relaxed">
              Every applicant undergoes a rigorous multi-county criminal history verification and strict credential check for your absolute safety.
            </p>
          </div>

          <div className="about-anim-item bg-white border border-slate-150 p-8 rounded-3xl text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <h4 className="font-heading font-extrabold text-lg text-secondary mb-2">2. Rigorous In-Person Training</h4>
            <p className="text-slate-500 text-xs leading-relaxed">
              Housekeepers complete hands-on practical training audits under senior directors, mastering our strict 50-point cleanliness checklist.
            </p>
          </div>

          <div className="about-anim-item bg-white border border-slate-150 p-8 rounded-3xl text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Heart className="w-6 h-6 text-primary" />
            </div>
            <h4 className="font-heading font-extrabold text-lg text-secondary mb-2">3. 100% Happiness Inspected</h4>
            <p className="text-slate-500 text-xs leading-relaxed">
              Every clean is backed by our direct satisfaction guarantee. If anything is missed, we re-clean within 24 hours at no extra cost.
            </p>
          </div>

        </div>

        {/* Closing CTA */}
        <div className="about-anim-item mt-16 text-center">
          <Link
            href="/book"
            className="inline-flex items-center gap-2 bg-secondary hover:bg-slate-800 text-white font-bold text-sm px-8 py-4 rounded-full shadow-lg transition-all"
          >
            Schedule Your First Clean
            <ArrowRight className="w-4 h-4 text-primary" />
          </Link>
        </div>
      </section>
    </div>
  );
}
