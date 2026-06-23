"use client";

import { useState, useRef, useEffect } from "react";
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2, ChevronLeft, Check } from "lucide-react";
import gsap from "gsap";

const baseRates = {
  bedrooms: 35,
  bathrooms: 25,
  types: {
    standard: 110,
    deep: 160,
    move_in_out: 180,
    construction: 240
  }
};

const addOnsList = [
  { id: "fridge", label: "Clean Inside Fridge", price: 25 },
  { id: "oven", label: "Clean Inside Oven", price: 30 },
  { id: "windows", label: "Interior Windows", price: 35 },
  { id: "basement", label: "Basement Deep Clean", price: 80 },
  { id: "cabinets", label: "Clean Inside Cabinets", price: 40 }
];

export default function InteractiveCalculator() {
  const [step, setStep] = useState(1);
  const [beds, setBeds] = useState(2);
  const [baths, setBaths] = useState(1);
  const [cleanType, setCleanType] = useState<"standard" | "deep" | "move_in_out" | "construction">("standard");
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [finalPrice, setFinalPrice] = useState(0);

  // Booking details state
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  // Compute estimate dynamically
  useEffect(() => {
    let price = baseRates.types[cleanType];
    price += (beds - 1) * baseRates.bedrooms;
    price += (baths - 1) * baseRates.bathrooms;

    selectedAddOns.forEach((addonId) => {
      const item = addOnsList.find((a) => a.id === addonId);
      if (item) price += item.price;
    });

    setFinalPrice(price);
  }, [beds, baths, cleanType, selectedAddOns]);

  const toggleAddOn = (id: string) => {
    if (selectedAddOns.includes(id)) {
      setSelectedAddOns(selectedAddOns.filter((item) => item !== id));
    } else {
      setSelectedAddOns([...selectedAddOns, id]);
    }
  };

  const handleStepChange = (nextStep: number) => {
    if (!formRef.current) return;
    
    // GSAP Step slide out and slide in
    gsap.to(formRef.current, {
      opacity: 0,
      x: nextStep > step ? -20 : 20,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => {
        setStep(nextStep);
        gsap.fromTo(formRef.current,
          { opacity: 0, x: nextStep > step ? 20 : -20 },
          { opacity: 1, x: 0, duration: 0.35, ease: "power2.out" }
        );
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !email || !bookingDate) {
      alert("Please fill in all contact details to schedule your clean.");
      return;
    }
    
    if (!formRef.current) return;
    
    gsap.to(formRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        setSubmitted(true);
        gsap.fromTo(formRef.current,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.2)" }
        );
      }
    });
  };

  const handleReset = () => {
    setStep(1);
    setBeds(2);
    setBaths(1);
    setCleanType("standard");
    setSelectedAddOns([]);
    setFullName("");
    setPhone("");
    setEmail("");
    setBookingDate("");
    setSubmitted(false);
  };

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden" id="booking-calculator">
      {/* Background blobs */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full filter blur-[120px] -z-10" />

      <div className="max-w-6xl mx-auto px-6" ref={containerRef}>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-bold text-xs uppercase tracking-widest block mb-2">
            Instant Quote & Booking
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-secondary">
            Personalize Your Cleaning Plan
          </h2>
          <div className="w-12 h-1 bg-primary rounded-full mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Step Layout / Success Panel */}
          <div className="lg:col-span-8 bg-white border border-slate-150 p-8 sm:p-10 rounded-3xl shadow-xl min-h-[460px] flex flex-col justify-between">
            <div ref={formRef} className="w-full">
              
              {submitted ? (
                /* SUCCESS SCREEN */
                <div className="flex flex-col items-center justify-center text-center py-10 min-h-[300px]">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 animate-bounce">
                    <Check className="w-8 h-8 text-primary stroke-[3]" />
                  </div>
                  <h3 className="font-heading font-black text-2xl text-secondary mb-3">
                    Booking Request Sent!
                  </h3>
                  <p className="text-sm text-slate-500 max-w-md leading-relaxed mb-8 font-sans">
                    Your message has been sent, you'll get a confirmation message on the provided number soon.
                  </p>
                  <button
                    onClick={handleReset}
                    className="bg-secondary hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider py-3.5 px-8 rounded-full shadow transition-all cursor-pointer font-sans"
                  >
                    Calculate Another Clean
                  </button>
                </div>
              ) : (
                /* MULTI STEP FORM */
                <div>
                  
                  {/* STEP 1: Bed / Bath Selections */}
                  {step === 1 && (
                    <div>
                      <span className="text-xs text-primary font-bold uppercase tracking-wider block mb-2">Step 1 of 4</span>
                      <h3 className="font-heading font-extrabold text-2xl text-secondary mb-8 font-heading">Tell us about your home space</h3>
                      
                      {/* Beds selector */}
                      <div className="mb-8">
                        <label className="block text-sm font-bold text-secondary mb-3">How many bedrooms?</label>
                        <div className="flex gap-2.5 sm:gap-4 flex-wrap">
                          {[1, 2, 3, 4, 5, 6].map((num) => (
                            <button
                              key={num}
                              onClick={() => setBeds(num)}
                              className={`w-12 h-12 rounded-full font-bold border transition-all cursor-pointer ${
                                beds === num
                                  ? "bg-primary border-primary text-white shadow-md shadow-primary/20 scale-105"
                                  : "border-slate-200 text-slate-600 hover:border-primary/50"
                              }`}
                            >
                              {num}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Baths selector */}
                      <div>
                        <label className="block text-sm font-bold text-secondary mb-3">How many bathrooms?</label>
                        <div className="flex gap-2.5 sm:gap-4 flex-wrap">
                          {[1, 2, 3, 4, 5].map((num) => (
                            <button
                              key={num}
                              onClick={() => setBaths(num)}
                              className={`w-12 h-12 rounded-full font-bold border transition-all cursor-pointer ${
                                baths === num
                                  ? "bg-primary border-primary text-white shadow-md shadow-primary/20 scale-105"
                                  : "border-slate-200 text-slate-600 hover:border-primary/50"
                              }`}
                            >
                              {num}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: Cleaning Type */}
                  {step === 2 && (
                    <div>
                      <span className="text-xs text-primary font-bold uppercase tracking-wider block mb-2">Step 2 of 4</span>
                      <h3 className="font-heading font-extrabold text-2xl text-secondary mb-6 font-heading">Select a clean service format</h3>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <button
                          onClick={() => setCleanType("standard")}
                          className={`text-left p-5 rounded-2xl border transition-all cursor-pointer ${
                            cleanType === "standard"
                              ? "bg-primary/5 border-primary shadow-sm"
                              : "border-slate-200 hover:border-primary/40"
                          }`}
                        >
                          <h4 className="font-heading font-bold text-secondary">Standard Maintenance</h4>
                          <p className="text-xs text-slate-500 mt-1 leading-relaxed font-sans">
                            Regular dust, mop, vacuum & surface wipes for clean home upkeep.
                          </p>
                        </button>

                        <button
                          onClick={() => setCleanType("deep")}
                          className={`text-left p-5 rounded-2xl border transition-all cursor-pointer ${
                            cleanType === "deep"
                              ? "bg-primary/5 border-primary shadow-sm"
                              : "border-slate-200 hover:border-primary/40"
                          }`}
                        >
                          <h4 className="font-heading font-bold text-secondary">Elite Deep Cleaning</h4>
                          <p className="text-xs text-slate-500 mt-1 leading-relaxed font-sans">
                            Intensive detailing, baseboards, grout scrub, and deep dust layers.
                          </p>
                        </button>

                        <button
                          onClick={() => setCleanType("move_in_out")}
                          className={`text-left p-5 rounded-2xl border transition-all cursor-pointer ${
                            cleanType === "move_in_out"
                              ? "bg-primary/5 border-primary shadow-sm"
                              : "border-slate-200 hover:border-primary/40"
                          }`}
                        >
                          <h4 className="font-heading font-bold text-secondary">Move-In / Out Clean</h4>
                          <p className="text-xs text-slate-500 mt-1 leading-relaxed font-sans">
                            Complete floor-to-ceiling sanitizing checklist for security deposits.
                          </p>
                        </button>

                        <button
                          onClick={() => setCleanType("construction")}
                          className={`text-left p-5 rounded-2xl border transition-all cursor-pointer ${
                            cleanType === "construction"
                              ? "bg-primary/5 border-primary shadow-sm"
                              : "border-slate-200 hover:border-primary/40"
                          }`}
                        >
                          <h4 className="font-heading font-bold text-secondary">Post-Construction</h4>
                          <p className="text-xs text-slate-500 mt-1 leading-relaxed font-sans">
                            Heavier structural clean up of drywall dust, paint spills & construction debris.
                          </p>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: Add-Ons */}
                  {step === 3 && (
                    <div>
                      <span className="text-xs text-primary font-bold uppercase tracking-wider block mb-2">Step 3 of 4</span>
                      <h3 className="font-heading font-extrabold text-2xl text-secondary mb-6 font-heading">Select premium add-on services</h3>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {addOnsList.map((addon) => {
                          const selected = selectedAddOns.includes(addon.id);
                          return (
                            <button
                              key={addon.id}
                              onClick={() => toggleAddOn(addon.id)}
                              className={`text-left p-4 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                                selected
                                  ? "bg-primary/5 border-primary text-secondary font-semibold"
                                  : "border-slate-200 text-slate-600 hover:border-primary/40"
                              }`}
                            >
                              <span className="text-sm font-heading">{addon.label}</span>
                              <span className="text-xs bg-slate-100 px-2 py-1 rounded font-bold text-primary font-sans">
                                +${addon.price}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* STEP 4: Contact & Scheduling Details */}
                  {step === 4 && (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                      <div>
                        <span className="text-xs text-primary font-bold uppercase tracking-wider block mb-2">Step 4 of 4</span>
                        <h3 className="font-heading font-extrabold text-2xl text-secondary mb-6 font-heading">Schedule Your Service Appointment</h3>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold text-secondary">Full Name</label>
                          <input
                            type="text"
                            required
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="John Doe"
                            className="border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-primary focus:outline-none"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold text-secondary">Phone Number</label>
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="(513) 222-1010"
                            className="border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-primary focus:outline-none"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold text-secondary">Email Address</label>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="john@example.com"
                            className="border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-primary focus:outline-none"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold text-secondary">Preferred Date</label>
                          <input
                            type="date"
                            required
                            value={bookingDate}
                            onChange={(e) => setBookingDate(e.target.value)}
                            className="border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-primary focus:outline-none"
                          />
                        </div>
                      </div>
                    </form>
                  )}

                </div>
              )}

            </div>

            {/* Step navigation buttons footer */}
            {!submitted && (
              <div className="flex items-center justify-between border-t border-slate-100 pt-6 mt-8">
                {step > 1 ? (
                  <button
                    onClick={() => handleStepChange(step - 1)}
                    className="flex items-center gap-1.5 text-sm text-slate-500 font-bold hover:text-secondary transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Back
                  </button>
                ) : (
                  <div />
                )}

                {step < 4 ? (
                  <button
                    onClick={() => handleStepChange(step + 1)}
                    className="bg-secondary hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-full text-sm transition-all flex items-center gap-1 hover:gap-1.5 cursor-pointer font-sans"
                  >
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-full text-sm transition-all shadow-md shadow-primary/20 flex items-center gap-1.5 cursor-pointer font-sans"
                  >
                    Confirm & Book Clean
                    <Sparkles className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Right estimate widget card */}
          <div className="lg:col-span-4 bg-slate-900 border border-slate-800 text-white rounded-3xl p-8 shadow-xl flex flex-col justify-between min-h-[460px]">
            <div>
              <h3 className="font-heading font-black text-xl mb-6 pb-4 border-b border-slate-800">
                Plan Estimate Summary
              </h3>

              <ul className="flex flex-col gap-4 mb-8 font-sans">
                <li className="flex items-center justify-between text-sm text-slate-350">
                  <span>Home size:</span>
                  <span className="font-bold text-slate-100">{beds} Beds • {baths} Baths</span>
                </li>
                <li className="flex items-center justify-between text-sm text-slate-350">
                  <span>Clean Type:</span>
                  <span className="font-bold text-slate-100 uppercase text-xs tracking-wider">
                    {cleanType.replace("_", " ")}
                  </span>
                </li>
                {selectedAddOns.length > 0 && (
                  <li className="flex items-start justify-between text-sm text-slate-350">
                    <span>Add-ons:</span>
                    <span className="font-bold text-slate-100 text-right">
                      {selectedAddOns.length} selected
                    </span>
                  </li>
                )}
                {bookingDate && (
                  <li className="flex items-center justify-between text-sm text-slate-350 border-t border-slate-800 pt-3">
                    <span>Date Selected:</span>
                    <span className="font-bold text-primary">{bookingDate}</span>
                  </li>
                )}
              </ul>

              <div className="flex items-center gap-2 border-t border-slate-800 pt-6">
                <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
                <span className="text-xs text-slate-400 leading-tight">
                  Flat-rate transparent quote. Bonded & fully insured guarantee.
                </span>
              </div>
            </div>

            <div className="border-t border-slate-800 pt-6 mt-8">
              <span className="text-slate-400 text-xs block mb-1">Estimated price:</span>
              <div className="flex items-baseline gap-1.5">
                <span className="font-heading font-black text-4xl sm:text-5xl text-primary">
                  ${finalPrice}
                </span>
                <span className="text-slate-400 text-xs font-semibold font-sans">/ visit</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-2 font-medium">
                *Prices may vary depending on deep details. Cleaners bring all green supplies.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
