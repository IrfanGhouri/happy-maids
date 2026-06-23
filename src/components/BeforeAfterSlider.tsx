"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Sparkles, Maximize2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BeforeAfterSlider() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const cleanImageRef = useRef<HTMLDivElement>(null);
  const [sliderPos, setSliderPos] = useState(90); // Start mostly dusty
  const isDragging = useRef(false);
  const scrollTweenRef = useRef<any>(null);

  // Synchronize clip-path using GSAP for smooth easing
  useEffect(() => {
    if (cleanImageRef.current) {
      gsap.to(cleanImageRef.current, {
        clipPath: `polygon(${sliderPos}% 0%, 100% 0%, 100% 100%, ${sliderPos}% 100%)`,
        duration: 0.15,
        ease: "power2.out"
      });
    }
  }, [sliderPos]);

  // Scroll Triggered Auto-Reveal Animation
  useEffect(() => {
    const el = containerRef.current;
    const sec = sectionRef.current;
    if (!el || !sec) return;

    // Entrance fade-in for section
    gsap.fromTo(
      el,
      { opacity: 0, y: 30, scale: 0.98 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );

    // Scroll-scrub reveal animation with PINNING
    const revealTarget = { value: 90 };
    scrollTweenRef.current = gsap.to(revealTarget, {
      value: 10, // Reveal to 10% (almost completely clean)
      scrollTrigger: {
        trigger: sec,
        start: "center center", // Pin when the center of the section is at the center of the viewport
        end: "+=100%", // Pin duration (scroll distance)
        scrub: 1, // Smooth follow-through
        pin: true, // PIN the section!
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
      onUpdate: () => {
        if (!isDragging.current) {
          setSliderPos(revealTarget.value);
        }
      }
    });

    return () => {
      if (scrollTweenRef.current?.scrollTrigger) {
        scrollTweenRef.current.scrollTrigger.kill();
      }
      scrollTweenRef.current?.kill();
    };
  }, []);

  const moveSlider = (clientX: number) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;

    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;

    setSliderPos(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches && e.touches[0]) {
      moveSlider(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current || e.buttons === 1) {
      moveSlider(e.clientX);
    }
  };

  const startDrag = () => {
    isDragging.current = true;
    document.body.style.userSelect = "none";
    
    // Pause/kill scroll trigger so it doesn't fight the user's manual dragging
    if (scrollTweenRef.current) {
      if (scrollTweenRef.current.scrollTrigger) {
        scrollTweenRef.current.scrollTrigger.kill();
      }
      scrollTweenRef.current.kill();
      scrollTweenRef.current = null;
    }
  };

  useEffect(() => {
    const endDrag = () => {
      isDragging.current = false;
      document.body.style.userSelect = "";
    };
    window.addEventListener("mouseup", endDrag);
    window.addEventListener("touchend", endDrag);
    return () => {
      window.removeEventListener("mouseup", endDrag);
      window.removeEventListener("touchend", endDrag);
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
      {/* Background ambient bubble */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full filter blur-[100px] -z-10 animate-pulse" />
      
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-bold text-xs uppercase tracking-widest block mb-2">
            The Proof is in the Shine
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-secondary">
            Drag to Experience The Magic
          </h2>
          <p className="text-slate-500 text-sm mt-3 max-w-md mx-auto">
            Swipe the handle back and forth to see a side-by-side comparison of our typical deep cleaning results.
          </p>
          <div className="w-12 h-1 bg-primary rounded-full mx-auto mt-4" />
        </div>

        {/* Draggable container */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          className="relative w-full aspect-[16/10] max-h-[550px] rounded-3xl overflow-hidden shadow-2xl border border-slate-200 cursor-ew-resize select-none"
        >
          {/* BEFORE: Dirty Room (Base layer) */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/dirty_living_room.png"
              alt="Messy House Before Happy Maids"
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              priority
              className="object-cover"
            />
            {/* Tag Before */}
            <div className="absolute bottom-6 left-6 z-20 bg-slate-950/80 backdrop-blur-md text-white font-bold text-xs uppercase tracking-widest px-4 py-2 rounded-full border border-white/10">
              Dirty House (Before)
            </div>
          </div>

          {/* AFTER: Clean Room (Revealed layer) */}
          <div
            ref={cleanImageRef}
            className="absolute inset-0 z-10"
            style={{
              clipPath: `polygon(${sliderPos}% 0%, 100% 0%, 100% 100%, ${sliderPos}% 100%)`
            }}
          >
            <Image
              src="/clean_living_room.png"
              alt="Spotless House After Happy Maids"
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              priority
              className="object-cover"
            />
            {/* Tag After */}
            <div className="absolute bottom-6 right-6 z-20 bg-primary/95 text-white font-bold text-xs uppercase tracking-widest px-4 py-2 rounded-full shadow-lg shadow-primary/20">
              Happy Clean (After)
            </div>
          </div>

          {/* Draggable Handle */}
          <div
            ref={handleRef}
            onMouseDown={startDrag}
            onTouchStart={startDrag}
            className="absolute top-0 bottom-0 z-20 w-1 bg-white cursor-ew-resize"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white text-primary flex items-center justify-center shadow-xl border-2 border-primary hover:scale-105 transition-transform duration-200">
              <Maximize2 className="w-5 h-5 rotate-45 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
