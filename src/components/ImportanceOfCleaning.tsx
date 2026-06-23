"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Heart, Sparkles, Check } from "lucide-react";
import gsap from "gsap";

const carouselSlides = [
  {
    img: "/clean_playroom.png",
    title: "Germ-Free Play Spaces",
    desc: "Kids crawl and play on floors. Disinfecting and deep-dusting playroom spaces removes bacteria, viruses, and mold triggers safely."
  },
  {
    img: "/clean_bedroom.png",
    title: "Allergen-Free Restful Sleep",
    desc: "Removing microscopic dust mites, dander, and pollen from sleep areas promotes deeper breathing and healthier overnight recovery."
  },
  {
    img: "/clean_living_room.png",
    title: "Clarity & Reduced Stress",
    desc: "A cluttered, dusty house spikes cortisol levels. Spotless surfaces instantly calm the nervous system and increase daily focus."
  }
];

export default function ImportanceOfCleaning() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);

  // Auto-play interval
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5500);
    return () => clearInterval(timer);
  }, [activeIndex]);

  // Entrance ScrollTrigger animation
  useEffect(() => {
    if (!containerRef.current) return;
    gsap.fromTo(
      containerRef.current.children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );
  }, []);

  const handlePrev = () => {
    gsap.to(slideRef.current, {
      opacity: 0,
      scale: 0.98,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => {
        setActiveIndex((prev) => (prev === 0 ? carouselSlides.length - 1 : prev - 1));
        gsap.fromTo(slideRef.current,
          { opacity: 0, scale: 0.98 },
          { opacity: 1, scale: 1, duration: 0.35, ease: "power2.out" }
        );
      }
    });
  };

  const handleNext = () => {
    gsap.to(slideRef.current, {
      opacity: 0,
      scale: 0.98,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => {
        setActiveIndex((prev) => (prev === carouselSlides.length - 1 ? 0 : prev + 1));
        gsap.fromTo(slideRef.current,
          { opacity: 0, scale: 0.98 },
          { opacity: 1, scale: 1, duration: 0.35, ease: "power2.out" }
        );
      }
    });
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background soft mesh highlights */}
      <div className="absolute bottom-1/4 right-0 w-[450px] h-[450px] bg-primary/5 rounded-full filter blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto px-6" ref={containerRef}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: Carousel */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden border border-slate-100 shadow-xl group">
              
              {/* Carousel Image container */}
              <div ref={slideRef} className="relative w-full h-full">
                <Image
                  src={carouselSlides[activeIndex].img}
                  alt={carouselSlides[activeIndex].title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 550px"
                  className="object-cover"
                />
                
                {/* Custom Glass Title Box inside Slide */}
                <div className="absolute bottom-6 left-6 right-6 bg-slate-950/75 backdrop-blur-md border border-white/10 rounded-2xl p-5 text-white z-10">
                  <span className="text-[10px] text-primary font-bold uppercase tracking-wider block mb-1">
                    Value of Clean space
                  </span>
                  <h4 className="font-heading font-extrabold text-lg mb-1">
                    {carouselSlides[activeIndex].title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {carouselSlides[activeIndex].desc}
                  </p>
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white border border-slate-100 text-secondary hover:scale-105 flex items-center justify-center transition-all z-20 cursor-pointer shadow-md opacity-0 group-hover:opacity-100"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white border border-slate-100 text-secondary hover:scale-105 flex items-center justify-center transition-all z-20 cursor-pointer shadow-md opacity-0 group-hover:opacity-100"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Slide Dot Indicators */}
              <div className="absolute top-6 right-6 z-20 flex gap-1.5 bg-black/45 backdrop-blur-md px-3 py-1.5 rounded-full">
                {carouselSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      activeIndex === i ? "bg-primary scale-125 w-4" : "bg-white/50 hover:bg-white"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Content benefits */}
          <div className="lg:col-span-6 flex flex-col gap-6 text-left">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-primary w-fit">
              <Heart className="w-3.5 h-3.5 text-primary" />
              Healthy Living Focus
            </div>

            <h2 className="font-heading font-black text-3xl sm:text-4xl text-secondary leading-tight">
              Why a Clean House is Essential to Your Well-Being
            </h2>
            <div className="w-12 h-1 bg-primary rounded-full mt-2" />

            <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-medium font-sans mt-2">
              Cleanliness is not just about aesthetics; it is the cornerstone of a healthy, productive, and low-stress lifestyle. Our professional sanitation techniques eliminate hidden pollutants that accumulate silently over time.
            </p>

            {/* List of points */}
            <ul className="flex flex-col gap-4 font-sans mt-4">
              <li className="flex gap-3.5 items-start">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 text-primary">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <div>
                  <h4 className="font-heading font-black text-sm text-secondary">Reduces Allergies & Asthma Triggers</h4>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    Eradicates pet dander, pollen, and dust mites hidden deep in rugs and upholstery.
                  </p>
                </div>
              </li>

              <li className="flex gap-3.5 items-start">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 text-primary">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <div>
                  <h4 className="font-heading font-black text-sm text-secondary">Enhances Mental Clarity & Mood</h4>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    Visual clutter increases anxiety. Walking into a pristine home releases instant mental relief.
                  </p>
                </div>
              </li>

              <li className="flex gap-3.5 items-start">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 text-primary">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <div>
                  <h4 className="font-heading font-black text-sm text-secondary">Saves Time & Focus Energy</h4>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    Delegating housework buys you back 10+ hours a week to spend with family, work, or hobbies.
                  </p>
                </div>
              </li>
            </ul>

            <div className="mt-4 font-sans">
              <Link
                href="#booking-calculator"
                className="inline-flex items-center gap-1.5 bg-secondary hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-full transition-all shadow-md"
              >
                Experience Healthy Living
                <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
