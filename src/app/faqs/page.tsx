"use client";

import { useState } from "react";
import { Plus, Search, Sparkles } from "lucide-react";

const allFaqs = [
  {
    category: "General Booking",
    q: "How do I book a cleaning online?",
    a: "Booking is extremely simple. Click any 'Book Now' button on our website, fill out your home details (service type, size, date/time), and submit. We'll handle the rest and send an SMS/Email confirmation immediately."
  },
  {
    category: "General Booking",
    q: "Can I adjust or reschedule my appointment?",
    a: "Yes, you can reschedule or cancel for free up to 24 hours prior to your scheduled cleaning. Just call us at (513) 222-1010 or email support@homecare.com."
  },
  {
    category: "Pricing & Frequency",
    q: "Do you offer discounts for recurring cleans?",
    a: "Yes, we offer heavy discounts: 20% off for weekly service, 15% off for bi-weekly service, and 10% off for monthly service. You can select these directly on the booking page."
  },
  {
    category: "Pricing & Frequency",
    q: "What is your flat rate based on?",
    a: "Our flat rates are based on the number of bedrooms and bathrooms in your home. Add-ons such as oven interior, fridge interior, or deep clean detail have upfront fixed fees."
  },
  {
    category: "Cleaners & Trust",
    q: "Are the cleaners insured and bonded?",
    a: "Yes, Home Care is fully bonded and insured. Every cleaner on our dispatch roster undergoes criminal background checks and detailed training audits."
  },
  {
    category: "Cleaners & Trust",
    q: "Do I need to be home for the cleaning?",
    a: "No, most clients prefer to leave a lockbox key or entry code. Just note down your entry details in the instructions box when booking."
  },
  {
    category: "Our Standards",
    q: "What cleaning products do you use?",
    a: "We use eco-friendly, biodegradable, non-toxic, and pet-safe cleaning agents. They are designed to kill bacteria and lift stains without leaving behind toxic chemical residue or fumes."
  },
  {
    category: "Our Standards",
    q: "What happens if I'm not satisfied with the clean?",
    a: "Your satisfaction is our primary goal. If you are not happy with any aspect of your clean, call us within 24 hours and we will send a supervisor to re-clean the area free of charge."
  }
];

export default function FaqsPage() {
  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaqs = allFaqs.filter(
    (faq) =>
      faq.q.toLowerCase().includes(search.toLowerCase()) ||
      faq.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero */}
      <section className="relative py-20 bg-secondary text-white text-center overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative z-10 flex flex-col items-center gap-4">
          <span className="text-primary font-bold text-xs uppercase tracking-widest block mb-1">
            Questions & Answers
          </span>
          <h1 className="font-heading font-black text-4xl sm:text-5xl tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-350 text-sm sm:text-base max-w-xl">
            Everything you need to know about our home care cleaning services, booking policies, and safety standards.
          </p>
        </div>
      </section>

      {/* FAQs Panel with search */}
      <section className="py-20 max-w-4xl mx-auto px-6">
        {/* Search Input */}
        <div className="relative mb-10">
          <input
            type="text"
            placeholder="Search FAQs (e.g. background check, pricing, guarantee)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-6 text-sm focus:outline-none focus:border-primary text-secondary font-medium shadow-sm transition-all"
          />
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        </div>

        {filteredFaqs.length > 0 ? (
          <div className="flex flex-col gap-4">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-6 text-left font-bold text-secondary hover:text-primary transition-colors cursor-pointer"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 pr-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/5 px-2.5 py-1 rounded-full border border-primary/10 w-fit">
                        {faq.category}
                      </span>
                      <span className="text-sm sm:text-base">{faq.q}</span>
                    </div>
                    <div
                      className={`w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center shrink-0 transition-transform ${
                        isOpen ? "rotate-45 text-primary" : "text-slate-400"
                      }`}
                    >
                      <Plus className="w-4 h-4" />
                    </div>
                  </button>

                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen ? "max-h-60 border-t border-slate-50" : "max-h-0"
                    }`}
                  >
                    <p className="p-6 text-xs sm:text-sm text-slate-500 leading-relaxed bg-slate-50/40">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <p className="text-slate-500 text-sm">No results match your search term.</p>
          </div>
        )}
      </section>

      {/* Help Banner */}
      <section className="bg-white py-16 border-t border-slate-100 text-center">
        <div className="max-w-2xl mx-auto px-6 flex flex-col items-center gap-4">
          <Sparkles className="w-8 h-8 text-primary" />
          <h3 className="font-heading font-extrabold text-2xl text-secondary">
            Still have questions?
          </h3>
          <p className="text-slate-500 text-sm">
            Our local client service team is standing by to help. Give us a call today!
          </p>
          <a
            href="tel:5132221010"
            className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold px-6 py-3 rounded-full transition-all shadow-md shadow-primary/20"
          >
            Call (513) 222-1010
          </a>
        </div>
      </section>
    </div>
  );
}
