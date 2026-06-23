"use client";

import { useRef, useEffect, useState } from "react";
import { ChevronRight, HelpCircle, Sparkles } from "lucide-react";
import gsap from "gsap";

const faqs = [
  {
    q: "How do I book a cleaning service?",
    a: "You can book online in less than 60 seconds by using our estimate calculator, or call us directly at (513) 222-1010 to speak with a booking coordinator."
  },
  {
    q: "Do you offer flat rates or hourly pricing?",
    a: "We provide upfront, transparent flat rates based on the number of bedrooms/bathrooms and selected add-ons. No hidden fees or surprises."
  },
  {
    q: "Are your cleaners background checked?",
    a: "Yes, every cleaner undergoes a comprehensive background check, reference checks, and a strict 50-point screening process."
  },
  {
    q: "Are you fully bonded and insured?",
    a: "Absolutely. Happy Maids is fully insured and bonded to protect your home and give you total peace of mind."
  },
  {
    q: "What is your satisfaction guarantee?",
    a: "If you're not 100% satisfied with our service, contact us within 24 hours and we will return to re-clean the area for free."
  },
  {
    q: "Do I need to supply cleaning products?",
    a: "No! We bring everything needed, including advanced microfiber cloths and certified green, eco-friendly cleaners."
  }
];

export default function FaqFlipCards() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = gsap.utils.toArray(".faq-flip-card");
    if (cards.length === 0) return;

    gsap.fromTo(cards,
      { opacity: 0, y: 35, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.1,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );
  }, []);

  return (
    <section ref={containerRef} className="py-24 bg-white relative overflow-hidden">
      {/* Dynamic ambient highlights */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full filter blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-bold text-xs uppercase tracking-widest block mb-2">
            Tactile Interaction
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-secondary">
            Got Questions? We Have Answers
          </h2>
          <div className="w-12 h-1 bg-primary rounded-full mx-auto mt-4" />
        </div>

        {/* 3D Flip Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 perspective-1000">
          {faqs.map((faq, index) => (
            <FaqCard key={index} faq={faq} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqCard({ faq }: { faq: typeof faqs[0] }) {
  const [mobileFlipped, setMobileFlipped] = useState(false);

  const toggleFlip = () => {
    // Only toggle on click for mobile/touch screens (less than lg desktop width)
    if (window.innerWidth < 1024) {
      setMobileFlipped(!mobileFlipped);
    }
  };

  return (
    <div
      onClick={toggleFlip}
      className="faq-flip-card h-64 cursor-pointer w-full group relative"
    >
      <div
        className={`relative w-full h-full preserve-3d transition-transform duration-700 ease-in-out ${
          mobileFlipped ? "[transform:rotateY(180deg)]" : "lg:group-hover:[transform:rotateY(180deg)]"
        }`}
        style={{ transformStyle: "preserve-3d" }}
      >
        
        {/* FRONT SIDE */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden bg-slate-50 border border-slate-150 rounded-3xl p-6 flex flex-col justify-between hover:border-primary/50 transition-colors shadow-sm"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-extrabold text-base sm:text-lg text-secondary leading-snug">
              {faq.q}
            </h3>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-400 font-bold mt-4">
            <span className="lg:inline hidden">Hover to flip</span>
            <span className="lg:hidden inline">Tap to flip</span>
            <ChevronRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* BACK SIDE */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden bg-slate-900 border border-slate-800 text-white rounded-3xl p-6 flex flex-col justify-between shadow-md"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)"
          }}
        >
          <div className="overflow-y-auto max-h-[170px] pr-2">
            <div className="flex items-center gap-1.5 text-xs text-primary font-bold uppercase tracking-wider mb-2.5">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              Happy Answer
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              {faq.a}
            </p>
          </div>
          <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-2">
            <span className="lg:inline hidden">Hover away to flip back</span>
            <span className="lg:hidden inline">Tap to flip back</span>
          </div>
        </div>

      </div>
    </div>
  );
}
