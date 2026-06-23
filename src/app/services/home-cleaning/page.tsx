"use client";

import ServicePageTemplate from "@/components/ServicePageTemplate";

export default function HomeCleaningPage() {
  return (
    <ServicePageTemplate
      title="Home Cleaning"
      heroBadge="Residential Care"
      subtitle="Standard and deep house cleaning services designed to keep your sanctuary fresh, clean, and organized."
      imageSrc="/home_cleaning.png"
      description="Our professional home cleaning service covers all the essentials your living spaces need. We dust, sanitize, vacuum, and wash every surface in your bedrooms, bathrooms, kitchen, and common areas. Whether you need a weekly touch-up or a thorough deep scrub, we tailor our service to match your exact home care requirements."
      benefitsTitle="Standard Cleaning Checklist"
      benefits={[
        { title: "All Rooms Dusted", desc: "Dusting picture frames, shelves, ceiling fans, and lampshades." },
        { title: "Floor Care", desc: "Vacuuming carpets and rugs; sweeping and steam mopping hard floors." },
        { title: "Kitchen Sanitized", desc: "Wiping exterior appliances, cleaning sinks, and degreasing stove tops." },
        { title: "Bathrooms Disinfected", desc: "Deep scrub of toilets, bathtubs, showers, vanity mirrors, and floors." }
      ]}
      oneTimeTitle="One-Time Sparkle Clean"
      oneTimeDesc="Perfect for preparing for guests, post-event cleanup, or giving your home a refreshing reboot."
      recurringTitle="Recurring Home Maintenance"
      recurringDesc="Keep your home permanently pristine. Save up to 20% by subscribing to weekly or bi-weekly cleans."
      whyScheduleTitle="Why Schedule Regular Housekeeping?"
      whyScheduleDesc="Regular housekeeping prevents dirt build-up, significantly lowers household allergen counts, and frees up precious hours of your weekend so you can spend quality time doing what you love."
      toolsTitle="Eco-Friendly Sanitation Equipment"
      tools={[
        { name: "Microfiber Scrubbing Cloths", desc: "Traps 99% of dust particles without scratching premium wood or stone." },
        { name: "Non-Toxic Disinfectants", desc: "Biodegradable sprays safe for infants, toddlers, and pets." }
      ]}
    />
  );
}
