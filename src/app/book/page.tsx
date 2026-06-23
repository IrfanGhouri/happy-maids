"use client";

import InteractiveCalculator from "@/components/InteractiveCalculator";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function BookPage() {
  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Back Link */}
        <div className="mb-8 font-sans">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-secondary font-bold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Homepage
          </Link>
        </div>

        {/* Re-use the exact same multi-step calculator/booking component */}
        <InteractiveCalculator />
        
      </div>
    </div>
  );
}
