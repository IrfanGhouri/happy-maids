"use client";

import { useRef, useEffect } from "react";
import { Sparkles, ShieldCheck, Heart, Leaf, HelpCircle } from "lucide-react";
import gsap from "gsap";

const keyDifferentiators = [
  {
    icon: Leaf,
    title: "100% Eco-Friendly Cleaners",
    desc: "We exclusively use certified biodegradable, non-toxic, child and pet-safe products that clean beautifully without harsh chemical residues.",
    color: "from-teal-500/20 to-emerald-500/20",
    iconColor: "text-emerald-500"
  },
  {
    icon: ShieldCheck,
    title: "50-Point Checked Staff",
    desc: "Every housekeeper undergoes rigorous background checks, strict training programs, and regular quality reviews for your absolute security.",
    color: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-cyan-500"
  },
  {
    icon: Heart,
    title: "100% Happiness Guarantee",
    desc: "Not satisfied with a specific area? Contact us within 24 hours and our team will return to re-clean the space completely free of charge.",
    color: "from-amber-500/20 to-orange-500/20",
    iconColor: "text-amber-500"
  },
  {
    icon: Sparkles,
    title: "Instant Transparent Pricing",
    desc: "No hidden charges, mysterious fees, or hourly estimates. You get flat upfront quotes customized precisely to your home's exact layout.",
    color: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-500"
  }
];

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = gsap.utils.toArray(".differentiator-card");
    if (cards.length === 0) return;

    gsap.fromTo(cards,
      { opacity: 0, y: 50, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none"
        }
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      {/* Abstract light portal in the background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-primary/5 rounded-full filter blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-primary font-bold text-xs uppercase tracking-widest block mb-2">
            The Happy Maids Edge
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-secondary">
            Why Discerning Homeowners Choose Us
          </h2>
          <div className="w-12 h-1 bg-primary rounded-full mx-auto mt-4" />
        </div>

        {/* Asymmetrical Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {keyDifferentiators.map((item, index) => {
            const Icon = item.icon;
            // Introduce asymmetrical vertical shifts on even cards for premium dynamic feel
            const yShift = index % 2 === 1 ? "md:translate-y-6" : "";
            
            return (
              <div
                key={item.title}
                className={`differentiator-card bg-white/70 backdrop-blur-md border border-slate-100 hover:border-primary/30 p-8 sm:p-10 rounded-[32px] shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 group flex flex-col sm:flex-row gap-6 items-start ${yShift}`}
              >
                {/* Icon Container with glowing color mesh */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${item.color} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300`}>
                  <Icon className={`w-6 h-6 ${item.iconColor}`} />
                </div>

                {/* Content info */}
                <div className="flex flex-col gap-2">
                  <h3 className="font-heading font-black text-xl text-secondary group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed font-sans">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
