"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Phone,
  CheckCircle2,
  Calendar,
  ShieldCheck,
  Star,
  X,
  ArrowRight
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import VideoReviews from "@/components/VideoReviews";
import InteractiveCalculator from "@/components/InteractiveCalculator";
import FloatingWidget from "@/components/FloatingWidget";
import ServicesAccordion from "@/components/ServicesAccordion";
import FaqFlipCards from "@/components/FaqFlipCards";
import WhyChooseUs from "@/components/WhyChooseUs";
import ImportanceOfCleaning from "@/components/ImportanceOfCleaning";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const reviews = [
  { name: "Sarah J.", role: "Homeowner", rating: 5, text: "Happy Cleaning did an outstanding job with my move-out cleaning. Got my entire deposit back!" },
  { name: "David M.", role: "Airbnb Host", rating: 5, text: "Prompt, detailed, and professional. My guests always compliment the cleanliness of my rental." },
  { name: "Jessica R.", role: "Busy Parent", rating: 5, text: "Having them come bi-weekly has given me my weekends back. Best decision I've made all year!" },
  { name: "Robert L.", role: "Office Manager", rating: 5, text: "Our staff noticed the difference immediately. Pristine desks, spotless floors. Highly recommend." },
  { name: "Emily T.", role: "New Resident", rating: 5, text: "Move-in cleaning was flawless. The kitchen and bathrooms looked absolutely brand new!" }
];

export default function HomePage() {
  const [discountPopup, setDiscountPopup] = useState(false);
  const [preloader, setPreloader] = useState(true);

  const heroLeftRef = useRef<HTMLDivElement>(null);
  const heroPortalRef = useRef<HTMLDivElement>(null);

  // Preloader fadeout
  useEffect(() => {
    const timer = setTimeout(() => {
      gsap.to(".liquid-loader", {
        opacity: 0,
        y: -100,
        duration: 0.8,
        ease: "power3.inOut",
        onComplete: () => setPreloader(false)
      });
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Show discount popup on load
  useEffect(() => {
    if (preloader) return;
    const hasSeenPopup = sessionStorage.getItem("hasSeenHappyCleaningDiscount");
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setDiscountPopup(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [preloader]);

  const closePopup = () => {
    sessionStorage.setItem("hasSeenHappyCleaningDiscount", "true");
    setDiscountPopup(false);
  };

  // GSAP Entrance Animations for Hero
  useEffect(() => {
    if (preloader) return;

    // Slide and fade left text elements
    gsap.fromTo(
      ".hero-anim-item",
      { opacity: 0, x: -40 },
      { opacity: 1, x: 0, duration: 0.8, stagger: 0.12, ease: "power3.out" }
    );

    // Zoom and spin portal
    if (heroPortalRef.current) {
      gsap.fromTo(
        heroPortalRef.current,
        { scale: 0.85, rotate: -6, opacity: 0 },
        { scale: 1, rotate: 0, opacity: 1, duration: 1.1, ease: "back.out(1.2)" }
      );
    }

    // Floating particles loop in hero background
    const bubbles = gsap.utils.toArray(".floating-bubble");
    bubbles.forEach((bubble: any) => {
      gsap.to(bubble, {
        y: "random(-60, -100)",
        x: "random(-30, 30)",
        duration: "random(6, 10)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });
  }, [preloader]);

  return (
    <div className="relative min-h-screen bg-[#F8FAFC]">
      {/* Scroll widget buttons */}
      <FloatingWidget />

      {/* 0. Liquid Preloader */}
      {preloader && (
        <div className="liquid-loader fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center text-white">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center animate-bounce">
              <Sparkles className="w-8 h-8 text-white animate-spin-slow" />
            </div>
            <span className="font-heading font-extrabold text-2xl tracking-widest text-white/90">
              HAPPY CLEANING
            </span>
            <div className="w-24 h-1 bg-slate-800 rounded-full overflow-hidden mt-2">
              <div className="h-full bg-primary animate-loading-bar" />
            </div>
          </div>
        </div>
      )}

      {/* 1. First-Time Discount Popup */}
      {discountPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg glass-card-dark rounded-3xl p-8 text-center text-white shadow-2xl animate-scaleUp">
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-heading font-extrabold text-3xl mb-2">First-Time Client?</h3>
            <p className="text-slate-350 text-sm mb-6 max-w-md mx-auto leading-relaxed font-sans">
              Welcome to Happy Cleaning! All new clients receive an automatic <span className="text-primary font-bold">10% discount</span> on their initial professional cleaning service. No promo codes required!
            </p>
            <div className="flex flex-col gap-3 font-sans">
              <Link
                href="#booking-calculator"
                onClick={closePopup}
                className="bg-primary hover:bg-primary-dark text-white font-bold py-3.5 rounded-full transition-all block w-full shadow-lg shadow-primary/20"
              >
                Claim 10% Off & Book Now
              </Link>
              <button onClick={closePopup} className="text-slate-400 hover:text-slate-200 text-sm font-semibold transition-colors cursor-pointer">
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Innovative Split Hero Section */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-4 bg-gradient-to-b from-[#E0F2FE] via-[#F0FDFA] to-white">
        {/* Floating Real Glass Bubbles */}
        <div className="absolute top-[15%] left-[5%] w-10 h-10 real-bubble floating-bubble z-0" />
        <div className="absolute top-[35%] left-[25%] w-16 h-16 real-bubble floating-bubble z-0" />
        <div className="absolute top-[65%] left-[10%] w-12 h-12 real-bubble floating-bubble z-0" />
        <div className="absolute top-[80%] left-[30%] w-8 h-8 real-bubble floating-bubble z-0" />
        
        <div className="absolute top-[20%] right-[10%] w-14 h-14 real-bubble floating-bubble z-0" />
        <div className="absolute top-[45%] right-[28%] w-10 h-10 real-bubble floating-bubble z-0" />
        <div className="absolute top-[70%] right-[5%] w-20 h-20 real-bubble floating-bubble z-0" />
        <div className="absolute top-[85%] right-[22%] w-12 h-12 real-bubble floating-bubble z-0" />
        
        {/* Background outline brand slogan */}
        <div className="absolute bottom-6 left-12 text-[11vw] font-black text-slate-100/50 leading-none select-none tracking-tighter uppercase font-heading pointer-events-none">
          PRISTINE
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full py-12">
          
          {/* Left Text Block (Glassmorphic) */}
          <div ref={heroLeftRef} className="lg:col-span-6 flex flex-col gap-6 text-left items-start">
            <div className="hero-anim-item inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest text-primary">
              <ShieldCheck className="w-4 h-4 text-primary" />
              Bonded • Vetted • Eco-Friendly
            </div>
            
            <h1 className="hero-anim-item font-heading font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight text-secondary leading-tight">
              We Sweep. You <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dark">Smile</span>. Experience Happy Cleaning.
            </h1>
            
            <p className="hero-anim-item text-slate-500 text-base sm:text-lg max-w-xl font-medium leading-relaxed font-sans">
              Des Plaines & Chicago's state-of-the-art house cleaning platform. Personalized flat-rates, certified non-toxic agents, and custom timelines.
            </p>

            <div className="hero-anim-item flex flex-col sm:flex-row gap-4 w-full sm:w-auto font-sans">
              <Link
                href="#booking-calculator"
                className="bg-primary hover:bg-primary-dark text-white font-bold text-base px-8 py-4 rounded-full transition-all duration-300 w-full sm:w-auto shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                Book Clean in 60s
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="tel:5132221010"
                className="border-2 border-slate-200 hover:border-primary hover:bg-primary/5 text-secondary font-bold text-base px-8 py-3.5 rounded-full transition-all duration-300 w-full sm:w-auto flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5 text-primary" />
                (513) 222-1010
              </a>
            </div>

            {/* Micro Stats panel */}
            <div className="hero-anim-item flex items-center gap-6 mt-4 border-t border-slate-100 pt-6 w-full">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((num) => (
                  <div key={num} className="relative w-9 h-9 rounded-full border-2 border-white overflow-hidden bg-slate-200">
                    <Image src="/testimonial_woman.png" alt="Happy client profile" fill className="object-cover" />
                  </div>
                ))}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
                  ))}
                  <span className="text-sm font-black text-secondary ml-1">4.9/5</span>
                </div>
                <span className="text-xs text-slate-400 font-medium">Loved by 1,200+ Chicago residents</span>
              </div>
            </div>
          </div>

          {/* Right Floating Portal Block */}
          <div className="lg:col-span-6 flex items-center justify-center relative">
            {/* Glow backdrop bubble */}
            <div className="absolute w-[400px] h-[400px] bg-primary/10 rounded-full filter blur-[80px] -z-10 animate-pulse" />
            
            <div
              ref={heroPortalRef}
              className="relative w-[280px] h-[280px] sm:w-[420px] sm:h-[420px] rounded-full border-8 border-white shadow-2xl p-2 bg-gradient-to-tr from-primary to-primary-light aspect-square shrink-0 flex-shrink-0"
            >
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <Image
                  src="/clean_living_room.png"
                  alt="Spotless Happy Cleaning Living Room"
                  fill
                  priority
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              {/* Suspended badge */}
              <div className="absolute top-10 -right-8 bg-white text-secondary font-black text-xs px-4 py-2.5 rounded-full shadow-lg flex items-center gap-1.5 border border-slate-50 animate-bounce whitespace-nowrap z-20">
                <Sparkles className="w-4 h-4 text-primary" />
                100% Satisfaction Guarantee
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Review Marquee */}
      <section className="bg-secondary py-6 overflow-hidden border-y border-slate-850">
        <div className="flex whitespace-nowrap animate-marquee">
          {reviews.concat(reviews).map((review, index) => (
            <div
              key={index}
              className="inline-flex flex-col justify-between bg-slate-900 border border-slate-800 p-5 rounded-2xl mx-4 w-72 shrink-0 whitespace-normal text-white"
            >
              <div className="flex items-center gap-1 mb-2">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-350 italic mb-4 font-sans">"{review.text}"</p>
              <div className="flex items-center justify-between text-[11px] text-slate-400 font-bold border-t border-slate-800/60 pt-2 font-sans">
                <span>{review.name}</span>
                <span className="text-primary">{review.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Innovative Horizontal Services Accordion Grid */}
      <ServicesAccordion />

      {/* 4.5 Why Choose Happy Maids Section */}
      <WhyChooseUs />

      {/* 4.7 Why Cleaning is Important (Carousel Layout) */}
      <ImportanceOfCleaning />

      {/* 5. Before & After Drag Slider */}
      <BeforeAfterSlider />

      {/* 6. Pricing Estimator Calculator */}
      <InteractiveCalculator />

      {/* 7. Client Video Reviews */}
      <VideoReviews />

      {/* 8. Innovative 3D Flip FAQ Cards Grid */}
      <FaqFlipCards />
    </div>
  );
}
