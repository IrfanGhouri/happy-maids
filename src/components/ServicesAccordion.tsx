"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ArrowUpRight, Sparkles } from "lucide-react";
import gsap from "gsap";
import { servicesList } from "./Header";

export default function ServicesAccordion() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const columns = gsap.utils.toArray(".service-col");
    if (columns.length === 0) return;

    // Entrance animation
    gsap.fromTo(columns,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.08,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none none"
        }
      }
    );
  }, []);

  return (
    <section ref={containerRef} className="py-24 bg-white relative overflow-hidden">
      {/* Sparkles background element */}
      <div className="absolute top-10 right-10 text-primary-light/40 animate-pulse pointer-events-none">
        <Sparkles className="w-12 h-12" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-bold text-xs uppercase tracking-widest block mb-2">
            Interactive Showcase
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-secondary">
            Hover to Explore Our Services
          </h2>
          <div className="w-12 h-1 bg-primary rounded-full mx-auto mt-4" />
        </div>

        {/* Horizontal Expandable Columns */}
        <div className="hidden lg:flex items-stretch gap-3 h-[480px] w-full overflow-hidden select-none">
          {servicesList.map((service, index) => {
            const isExpanded = hoveredIndex === index;
            return (
              <div
                key={service.name}
                onMouseEnter={() => setHoveredIndex(index)}
                className={`service-col relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 ease-out border border-slate-100 ${
                  isExpanded ? "flex-[4] bg-slate-900" : "flex-[1] bg-slate-50 hover:bg-slate-100/80"
                }`}
              >
                {/* Background Image with overlay */}
                <div
                  className={`absolute inset-0 z-0 transition-opacity duration-500 ${
                    isExpanded ? "opacity-35" : "opacity-0"
                  }`}
                >
                  <Image
                    src={service.img}
                    alt={service.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 500px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                </div>

                {/* Main Content Box */}
                <div className="absolute inset-0 z-10 p-8 flex flex-col justify-between h-full">
                  {/* Top content (Header text) */}
                  <div className="flex flex-col gap-2">
                    <span
                      className={`text-[10px] font-black uppercase tracking-widest block transition-colors duration-300 ${
                        isExpanded ? "text-primary" : "text-slate-400"
                      }`}
                    >
                      0{index + 1}
                    </span>
                    <h3
                      className={`font-heading font-black text-xl leading-tight transition-colors duration-300 ${
                        isExpanded ? "text-white" : "text-secondary [writing-mode:vertical-lr] rotate-180 origin-center tracking-wide"
                      }`}
                    >
                      {service.name}
                    </h3>
                  </div>

                  {/* Bottom details revealed when expanded */}
                  <div
                    className={`transition-all duration-500 flex flex-col gap-4 ${
                      isExpanded ? "opacity-100 translate-y-0 scale-100 pointer-events-auto" : "opacity-0 translate-y-8 scale-95 pointer-events-none"
                    }`}
                  >
                    <p className="text-sm text-slate-300 leading-relaxed font-sans max-w-sm">
                      {service.desc}
                    </p>

                    <ul className="flex flex-col gap-2.5 font-sans mb-2">
                      <li className="flex items-center gap-2 text-xs text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                        Drywall dust, paint spots, and debris sweeps
                      </li>
                      <li className="flex items-center gap-2 text-xs text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                        Eco-friendly and allergen-safe chemical agents
                      </li>
                    </ul>

                    <div>
                      <Link
                        href={service.href}
                        className="inline-flex items-center gap-1.5 bg-primary hover:bg-primary-dark text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-full transition-all shadow-md shadow-primary/20 hover:scale-102"
                      >
                        Explore Service
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Fallback: Grid layout */}
        <div className="lg:hidden grid grid-cols-1 gap-6">
          {servicesList.map((service, index) => (
            <div
              key={service.name}
              className="bg-slate-50 border border-slate-100 rounded-3xl p-6 flex flex-col justify-between min-h-[220px]"
            >
              <div>
                <span className="text-[10px] text-primary font-bold tracking-widest block mb-1">
                  0{index + 1}
                </span>
                <h3 className="font-heading font-extrabold text-xl text-secondary mb-2">
                  {service.name}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-4">
                  {service.desc}
                </p>
              </div>
              <Link
                href={service.href}
                className="text-xs text-primary font-bold flex items-center gap-1.5 hover:underline"
              >
                Learn More
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
