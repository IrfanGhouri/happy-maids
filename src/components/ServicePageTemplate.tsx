"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  Phone,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Maximize2,
  Calendar,
  Sparkle,
  Zap,
  Check,
  Clock,
  Wrench,
  Leaf
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { servicesList } from "./Header";

gsap.registerPlugin(ScrollTrigger);

export interface BlueprintTab {
  id: string;
  name: string;
  img: string;
  intro: string;
  checklist: string[];
}

export interface Benefit {
  title: string;
  desc: string;
}

export interface ToolMethod {
  name: string;
  desc: string;
}

export interface ServicePageTemplateProps {
  title: string;
  subtitle: string;
  heroBadge: string;
  description: string;
  benefitsTitle: string;
  benefits: Benefit[];
  oneTimeTitle: string;
  oneTimeDesc: string;
  recurringTitle: string;
  recurringDesc: string;
  whyScheduleTitle: string;
  whyScheduleDesc: string;
  toolsTitle: string;
  tools: ToolMethod[];
  imageSrc: string;
  blueprintTabs?: BlueprintTab[];
}

// Room-by-room checklist structure for the interactive blueprint
const roomChecklists = [
  {
    id: "kitchen",
    name: "Kitchen Sanitization",
    img: "/job_kitchen.png",
    intro: "The heart of the home receives our highest grade chemical-free scrub.",
    checklist: [
      "De-grease and wash stovetops, burner grates, and knobs.",
      "Sanitize exterior of refrigerator, oven, dishwasher, and microwave.",
      "Polish stainless steel sinks, hardware, and backsplash surfaces.",
      "Wipe down countertops, cabinets exterior, and kitchen islands."
    ]
  },
  {
    id: "bathrooms",
    name: "Bathroom Disinfection",
    img: "/job_bathroom.png",
    intro: "Complete clinical sanitization to eliminate bacteria and scaling.",
    checklist: [
      "Deep scrub tub, tile grout, glass enclosures, and showers.",
      "Sanitize toilets inside-out, vanity mirrors, and sink basins.",
      "Polish fixtures, chrome detailing, and accessory stands.",
      "Steam clean floors and disinfect baseboards."
    ]
  },
  {
    id: "living",
    name: "Living Areas Care",
    img: "/clean_living_room.png",
    intro: "Polishing high-traffic areas to present a gorgeous aesthetic first impression.",
    checklist: [
      "Vacuum all rugs, sofa cushions, under-furniture corners, and carpet pathways.",
      "Dust media consoles, picture frames, lamps, shelves, and electronics.",
      "Wipe baseboards, light switches, and window sills.",
      "Polish hardwood flooring or steam clean tiles."
    ]
  },
  {
    id: "bedrooms",
    name: "Bedrooms Sanctuary",
    img: "/clean_bedroom.png",
    intro: "Dust-free, allergen-low sleep sanctuaries tailored for your comfort.",
    checklist: [
      "Dust and wipe headboards, nightstands, and ceiling fans.",
      "Neat bed making and optional linen sheet replacement.",
      "Vacuum under beds, wardrobes, and closet pathways.",
      "Empty trash, sanitize trash bins, and organize surfaces."
    ]
  }
];

export default function ServicePageTemplate(props: ServicePageTemplateProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sliderSectionRef = useRef<HTMLDivElement>(null);
  
  // Before-After Slider State
  const sliderContainerRef = useRef<HTMLDivElement>(null);
  const cleanImageRef = useRef<HTMLDivElement>(null);
  const [sliderPos, setSliderPos] = useState(90); // Start mostly dusty
  const isDragging = useRef(false);
  const scrollTweenRef = useRef<any>(null);

  const activeBlueprintTabs = props.blueprintTabs || roomChecklists;

  // Blueprint Tab State
  const [activeTab, setActiveTab] = useState(activeBlueprintTabs[0]?.id || "kitchen");

  useEffect(() => {
    if (props.blueprintTabs && props.blueprintTabs.length > 0) {
      setActiveTab(props.blueprintTabs[0].id);
    }
  }, [props.blueprintTabs]);

  // Filter other services
  const otherServices = servicesList.filter(
    (item) => item.name.toLowerCase() !== props.title.toLowerCase()
  );

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating bubble particles
      const bubbles = gsap.utils.toArray(".floating-particle");
      bubbles.forEach((bubble: any) => {
        gsap.to(bubble, {
          y: "random(-50, -90)",
          x: "random(-30, 30)",
          duration: "random(6, 9)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      });

      // Reveal elements on scroll
      gsap.fromTo(
        ".reveal-item",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".reveal-trigger",
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

      // Scroll-scrub reveal animation for before/after slider with PINNING
      const revealTarget = { value: 90 };
      const sliderSec = sliderSectionRef.current;
      if (sliderSec) {
        scrollTweenRef.current = gsap.to(revealTarget, {
          value: 10, // Reveal to 10% (almost completely clean)
          scrollTrigger: {
            trigger: sliderSec,
            start: "center center", // Pin when the center of the section is at the center of the viewport
            end: "+=100%", // Pin duration
            scrub: 1, // Smooth scrubbing
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
      }
    }, containerRef);

    return () => {
      ctx.revert();
      if (scrollTweenRef.current?.scrollTrigger) {
        scrollTweenRef.current.scrollTrigger.kill();
      }
      scrollTweenRef.current?.kill();
    };
  }, []);

  // Before/After Clip Path Easing
  useEffect(() => {
    if (cleanImageRef.current) {
      gsap.to(cleanImageRef.current, {
        clipPath: `polygon(${sliderPos}% 0%, 100% 0%, 100% 100%, ${sliderPos}% 100%)`,
        duration: 0.15,
        ease: "power2.out"
      });
    }
  }, [sliderPos]);

  // Before-After Slider Events
  const moveSlider = (clientX: number) => {
    const container = sliderContainerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;

    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;

    setSliderPos(percentage);
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
    const handleMouseUp = () => endDrag();
    const handleTouchEnd = () => endDrag();
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  const selectedBlueprint = activeBlueprintTabs.find(t => t.id === activeTab) || activeBlueprintTabs[0];

  return (
    <div className="relative min-h-screen bg-[#F8FAFC] text-[#0F172A] overflow-x-hidden font-sans" ref={containerRef}>
      
      {/* Dynamic Animated Wave Background Elements */}
      <div className="absolute top-0 left-0 right-0 h-[650px] bg-gradient-to-b from-teal-50/50 via-sky-50/20 to-transparent -z-10 overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] aspect-square rounded-full bg-teal-200/10 blur-[120px] animate-pulse" />
        <div className="absolute top-[20%] -right-[15%] w-[45%] aspect-square rounded-full bg-amber-100/10 blur-[130px]" />
      </div>

      {/* 1. Cinematic Hero Section */}
      <section className="relative pt-36 pb-20 px-6 sm:px-8 max-w-7xl mx-auto">
        {/* Floating Bubble Particles */}
        <div className="absolute top-[20%] left-[8%] w-10 h-10 real-bubble opacity-40 floating-particle -z-10" />
        <div className="absolute top-[60%] right-[10%] w-14 h-14 real-bubble opacity-30 floating-particle -z-10" />
        <div className="absolute top-[40%] right-[45%] w-8 h-8 real-bubble opacity-50 floating-particle -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column Content */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary-dark font-bold text-xs uppercase tracking-widest px-4 py-2 rounded-full w-fit">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              {props.heroBadge}
            </div>
            
            <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.1] text-secondary">
              Elite <span className="bg-gradient-to-r from-primary to-teal-500 bg-clip-text text-transparent">{props.title}</span> Services
            </h1>

            <p className="text-base sm:text-lg text-slate-650 leading-relaxed font-medium max-w-2xl">
              {props.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <Link
                href="/book"
                className="bg-primary hover:bg-primary-dark text-white font-bold px-8 py-4 rounded-full transition-all text-sm shadow-lg shadow-primary/20 hover:scale-102 text-center"
              >
                Book This Service Now
              </Link>
              <a
                href="tel:5132221010"
                className="bg-white hover:bg-slate-50 border border-slate-200 text-secondary font-bold px-8 py-4 rounded-full transition-all text-sm text-center flex items-center justify-center gap-2 shadow-sm"
              >
                <Phone className="w-4 h-4 text-primary" />
                (513) 222-1010
              </a>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-6 border-t border-slate-200/80 pt-8 mt-4">
              <div>
                <span className="block font-heading font-black text-2xl text-secondary">50-Pt</span>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mt-1">Checklist Standard</span>
              </div>
              <div>
                <span className="block font-heading font-black text-2xl text-secondary">100%</span>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mt-1">Eco-Safe Supplies</span>
              </div>
              <div>
                <span className="block font-heading font-black text-2xl text-secondary">No-Risk</span>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mt-1">Satisfaction Guarantee</span>
              </div>
            </div>
          </div>

          {/* Right Column Frame */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full aspect-[4/3] rounded-[40px] overflow-hidden p-2 bg-gradient-to-tr from-primary/30 to-teal-500/10 border-2 border-white shadow-2xl shadow-slate-300/40">
              <div className="relative w-full h-full rounded-[34px] overflow-hidden">
                <Image
                  src={props.imageSrc}
                  alt={props.title}
                  fill
                  priority
                  className="object-cover"
                />
              </div>
              {/* Satisfaction Badge */}
              <div className="absolute -bottom-4 -left-4 bg-white/95 backdrop-blur-md text-secondary rounded-[24px] p-4 border border-slate-200/80 shadow-xl flex items-center gap-3.5 max-w-[260px]">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block font-sans">Corporate Assurance</span>
                  <span className="text-xs font-black text-secondary font-heading">Bonded & Insured Care</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Blueprint & Visual Checklist Tabbed Hub */}
      <section className="py-24 bg-white border-y border-slate-200/60 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-primary font-bold text-xs uppercase tracking-widest block mb-2">Our Cleaning Blueprint</span>
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-secondary tracking-tight">
              Interactive Room-By-Room Cleaning Standards
            </h2>
            <p className="text-slate-500 text-sm mt-3 leading-relaxed">
              We clean with systemic accuracy. Choose a room category below to inspect our transparent quality checklist.
            </p>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {activeBlueprintTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-full font-bold text-sm tracking-wide transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-secondary text-white shadow-lg shadow-secondary/15"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/40"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>

          {/* Dynamic Tab Panel */}
          <div className="bg-slate-50/50 rounded-[40px] p-6 lg:p-10 border border-slate-150 flex flex-col lg:flex-row gap-10 items-center text-left">
            {/* Left Description Info */}
            <div className="lg:w-[50%] flex flex-col gap-6">
              <span className="text-primary font-extrabold text-xs uppercase tracking-wider">
                {selectedBlueprint.name} Checklist
              </span>
              <h3 className="font-heading font-black text-2xl sm:text-3xl text-secondary">
                {selectedBlueprint.intro}
              </h3>
              
              <div className="grid grid-cols-1 gap-3.5">
                {selectedBlueprint.checklist.map((item, idx) => (
                  <div key={idx} className="flex gap-3 items-start bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="w-5 h-5 rounded-full bg-teal-50 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-slate-700 leading-relaxed font-sans">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Interactive Image Panel */}
            <div className="lg:w-[50%] w-full">
              <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden border-4 border-white shadow-xl bg-slate-100">
                <Image
                  src={selectedBlueprint.img}
                  alt={selectedBlueprint.name}
                  fill
                  className="object-cover transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                  <div className="flex items-center gap-2">
                    <Sparkle className="w-5 h-5 text-primary animate-spin" style={{ animationDuration: '6s' }} />
                    <span className="text-xs font-black text-secondary font-heading">Signature Clean Guarantee</span>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-slate-500">100% Inspected</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Before/After Interactive Image Slider Card */}
      <section ref={sliderSectionRef} className="py-24 max-w-7xl mx-auto px-6 reveal-trigger">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Text Detail */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-left reveal-item">
            <span className="text-primary font-bold text-xs uppercase tracking-widest block font-sans">Visual proof</span>
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-secondary tracking-tight">
              See the Magical Happy Cleaning Difference
            </h2>
            <p className="text-slate-650 text-sm leading-relaxed font-medium">
              We don't just surface-wipe. We dig deep to erase dust, grime, and grease. Use the comparison slider on the right to view a side-by-side demonstration of our cleaning outcomes.
            </p>
            
            <div className="flex flex-col gap-3 font-sans mt-2">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4 text-amber-500" />
                </div>
                <span className="text-sm font-bold text-slate-700">Before: Dusty, allergen-packed spaces</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-teal-50 flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm font-bold text-slate-700">After: Gleaming, sanitized, health-promoting homes</span>
              </div>
            </div>
          </div>

          {/* Right Interactive Slider Box */}
          <div className="lg:col-span-7 reveal-item">
            <div
              ref={sliderContainerRef}
              onMouseMove={(e) => {
                if (isDragging.current || e.buttons === 1) moveSlider(e.clientX);
              }}
              onTouchMove={(e) => {
                if (e.touches && e.touches[0]) moveSlider(e.touches[0].clientX);
              }}
              className="relative w-full aspect-[16/10] rounded-[36px] overflow-hidden shadow-2xl border border-slate-200/80 cursor-ew-resize select-none"
            >
              {/* BEFORE: Dirty Room */}
              <div className="absolute inset-0 z-0">
                <Image
                  src="/dirty_living_room.png"
                  alt="Before Cleaning"
                  fill
                  sizes="(max-width: 1024px) 100vw, 700px"
                  className="object-cover"
                />
                <div className="absolute bottom-6 left-6 z-20 bg-slate-950/80 backdrop-blur-md text-white font-bold text-[10px] uppercase tracking-widest px-4 py-2 rounded-full border border-white/10">
                  Before Visit
                </div>
              </div>

              {/* AFTER: Clean Room */}
              <div
                ref={cleanImageRef}
                className="absolute inset-0 z-10"
                style={{
                  clipPath: `polygon(${sliderPos}% 0%, 100% 0%, 100% 100%, ${sliderPos}% 100%)`
                }}
              >
                <Image
                  src="/clean_living_room.png"
                  alt="After Cleaning"
                  fill
                  sizes="(max-width: 1024px) 100vw, 700px"
                  className="object-cover"
                />
                <div className="absolute bottom-6 right-6 z-20 bg-primary text-white font-bold text-[10px] uppercase tracking-widest px-4 py-2 rounded-full shadow-lg shadow-primary/20">
                  Happy Clean
                </div>
              </div>

              {/* Slider Handle line */}
              <div
                onMouseDown={startDrag}
                onTouchStart={startDrag}
                className="absolute top-0 bottom-0 z-20 w-1 bg-white cursor-ew-resize"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white text-primary flex items-center justify-center shadow-xl border-2 border-primary hover:scale-105 transition-transform duration-200">
                  <Maximize2 className="w-4 h-4 rotate-45" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Choice Frequency Dashboard */}
      <section className="py-24 bg-gradient-to-br from-secondary to-slate-950 text-white relative overflow-hidden">
        <div className="absolute top-[10%] left-[10%] w-[350px] h-[350px] bg-primary/10 rounded-full blur-[100px] -z-10" />
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-primary font-bold text-xs uppercase tracking-widest block mb-2">Flexible Clean Frequencies</span>
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-white tracking-tight">
              Subscription Discounts & One-Time Sparkle
            </h2>
            <p className="text-slate-400 text-sm mt-3 leading-relaxed">
              We fit your rhythm. Book a single deep clean or subscribe to weekly maintenance plans to save maximum.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch font-sans max-w-4xl mx-auto">
            {/* One Time Sparkle */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 sm:p-10 rounded-[36px] flex flex-col justify-between gap-8 relative text-left">
              <div className="flex flex-col gap-4">
                <span className="bg-white/10 text-slate-300 text-[10px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full w-fit">
                  No Commitment
                </span>
                <h3 className="font-heading font-extrabold text-2xl text-white">
                  {props.oneTimeTitle}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed font-medium">
                  {props.oneTimeDesc}
                </p>
              </div>
              <Link
                href="/book"
                className="bg-white/10 hover:bg-white text-white hover:text-secondary text-center font-bold py-4 rounded-2xl transition-all text-sm border border-white/10"
              >
                Select & Calculate Rate
              </Link>
            </div>

            {/* Recurring Clean */}
            <div className="bg-gradient-to-br from-primary/30 to-primary/10 backdrop-blur-md border-2 border-primary p-8 sm:p-10 rounded-[36px] flex flex-col justify-between gap-8 relative text-left shadow-2xl shadow-primary/10">
              <div className="absolute top-0 right-10 transform -translate-y-1/2 bg-primary text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                Highly Popular (Save 20%)
              </div>
              
              <div className="flex flex-col gap-4">
                <span className="bg-primary/20 text-primary-light text-[10px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full w-fit">
                  Recurring Subs
                </span>
                <h3 className="font-heading font-extrabold text-2xl text-white">
                  {props.recurringTitle}
                </h3>
                <p className="text-teal-100/90 text-sm leading-relaxed font-medium">
                  {props.recurringDesc}
                </p>
              </div>
              <Link
                href="/book"
                className="bg-primary hover:bg-primary-dark text-white text-center font-bold py-4 rounded-2xl transition-all text-sm shadow-lg shadow-primary/25 hover:scale-102"
              >
                Select & Save 20% Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. "Equipment Locker" Sanitation Armor Vault */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-5 text-left flex flex-col gap-6">
            <span className="text-primary font-bold text-xs uppercase tracking-widest block font-sans">Our Green Armoury</span>
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-secondary tracking-tight">
              Eco-Safe Sanitation Locker & Micro-Tech Tools
            </h2>
            <p className="text-slate-650 text-sm leading-relaxed font-medium">
              We stand against harsh chlorine and toxic bleaches. We deploy biological, hypoallergenic sprays and microfiber dirt traps that ensure complete bacterial clean-outs without damaging wood, stone, or infants' lungs.
            </p>
            
            <div className="bg-slate-50 border border-slate-150 p-6 rounded-3xl flex gap-4 items-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Leaf className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-heading font-extrabold text-secondary text-sm">Eco-Conscious Promise</h4>
                <p className="text-slate-500 text-xs mt-0.5 font-sans font-medium">100% biodegradable and zero synthetic odors.</p>
              </div>
            </div>
          </div>

          {/* Right Bento Grid Locker */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
            {props.tools.map((tool, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200/70 p-7 rounded-[28px] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
              >
                <div className="absolute right-0 bottom-0 w-24 h-24 bg-primary/5 rounded-full blur-xl group-hover:scale-110 transition-transform duration-500" />
                <div className="w-10 h-10 rounded-xl bg-slate-50 group-hover:bg-primary-light flex items-center justify-center transition-colors mb-4 border border-slate-100">
                  <Wrench className="w-5 h-5 text-slate-600 group-hover:text-primary transition-colors" />
                </div>
                <h4 className="font-heading font-bold text-base text-secondary">{tool.name}</h4>
                <p className="text-slate-500 text-xs leading-relaxed mt-2 font-medium font-sans">{tool.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. Footer Navigation: Explore Other Services */}
      <section className="py-24 bg-slate-50 border-t border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-12">
            <div className="text-left">
              <span className="text-primary font-bold text-xs uppercase tracking-widest block mb-2">Explore Options</span>
              <h2 className="font-heading font-black text-2xl sm:text-3xl text-secondary">
                Our Complementary Cleaning Programs
              </h2>
            </div>
            <Link
              href="/book"
              className="inline-flex items-center gap-1.5 font-heading font-bold text-sm text-primary hover:text-primary-dark transition-colors"
            >
              Get Custom Cleaning Estimate
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherServices.slice(0, 3).map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="bg-white border border-slate-200/60 rounded-[32px] overflow-hidden hover:shadow-lg transition-all group flex flex-col h-full text-left"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={item.img}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                </div>
                <div className="p-6 flex flex-col justify-between flex-grow gap-4">
                  <h4 className="font-heading font-bold text-lg text-secondary group-hover:text-primary transition-colors leading-snug">
                    {item.name}
                  </h4>
                  <div className="flex items-center justify-between font-sans mt-auto">
                    <span className="text-xs font-bold text-slate-400 group-hover:text-primary transition-colors">
                      Learn More
                    </span>
                    <div className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-primary group-hover:text-white flex items-center justify-center transition-colors">
                      <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
