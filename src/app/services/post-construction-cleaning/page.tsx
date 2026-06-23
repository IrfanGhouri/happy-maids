"use client";

import ServicePageTemplate from "@/components/ServicePageTemplate";

export default function PostConstructionCleaningPage() {
  return (
    <ServicePageTemplate
      title="Post Construction Cleaning"
      heroBadge="Renovation Turnaround"
      subtitle="Complete removal of hazardous silica dust, paint splatter, plaster, and building debris."
      imageSrc="/post_construction.png"
      description="Renovations and new builds leave behind fine, airborne silica dust that settles in HVAC vents, drawers, and ceilings. Our specialized post-construction cleaning service is a multi-phase deep clean designed to make your renovated space safe to live in. We remove paint overspray, adhesive residue, drywall dust, and plaster."
      benefitsTitle="Construction Cleanup Detail"
      benefits={[
        { title: "Fine Dust Filtration", desc: "Vacuum walls, ceilings, light fixtures, and vents to capture microscopic drywall dust." },
        { title: "Paint & Plaster Removal", desc: "Safely scrape paint splatter, glue, tape residue, and plaster drops from glass and floors." },
        { title: "Interior Cabinet Detailing", desc: "Vacuum and wipe out construction dust from inside hinges, drawers, and tracks." },
        { title: "Fixture Polishing", desc: "Detailed polish of new kitchen and bathroom plumbing fixtures, chrome, and countertops." }
      ]}
      oneTimeTitle="Multi-Phase Final Clean"
      oneTimeDesc="A thorough, detailed cleanup scheduled directly after the contractors pack up their tools."
      recurringTitle="Contractor Partnership"
      recurringDesc="Discounted rates for local general contractors and builders needing regular cleanup for handovers."
      whyScheduleTitle="Why Hire Construction Cleaners?"
      whyScheduleDesc="Construction dust is dangerous. Silica dust can damage lungs and clog ventilation. Standard residential vacuums will release this dust back into the air. Our teams use industrial HEPA vacuums and specialized damp-wipe techniques to fully trap particles."
      toolsTitle="Drywall Dust Equipment"
      tools={[
        { name: "Industrial HEPA Wet/Dry Vacuums", desc: "Heavy suction vacuums with 3-stage filtration that capture fine plaster dust." },
        { name: "Microfiber Wet Dusters", desc: "Special electrostatic cloths that trap dust instead of pushing it around." }
      ]}
      blueprintTabs={[
        {
          id: "debris",
          name: "Rough Debris Removal",
          img: "/post_construction.png",
          intro: "Clearing out large construction debris, tape, and protective covers.",
          checklist: [
            "Collect and dispose of left-over drywall sheets, wood scraps, and bricks.",
            "Remove protective plastic sheets, stickers, and tags from glass windows.",
            "Sweep subfloors and pick up nails, screws, and hardware shavings.",
            "Empty heavy construction trash containers and haul away."
          ]
        },
        {
          id: "dust",
          name: "Fine Dust Filtration",
          img: "/clean_living_room.png",
          intro: "Eliminating hazardous fine silica dust from high areas and HVAC paths.",
          checklist: [
            "Vacuum walls, ceilings, HVAC register vents, and ceiling fans.",
            "Clean interior duct intakes and replace ventilation filters.",
            "Electrostatic dust-down of all lighting fixtures, sconces, and moldings.",
            "HEPA vacuuming of carpets and deep cracks in flooring joints."
          ]
        },
        {
          id: "trim",
          name: "Glass & Trim Polishing",
          img: "/move_in_out.png",
          intro: "Scraping paint splatters and polishing chrome to a shine.",
          checklist: [
            "Carefully scrape paint over-sprays, drywall mud, and tape glue from glass.",
            "Sanitize window frames, sash locks, track guides, and trim lines.",
            "Wipe down wall baseboards, outlets, and door hinges.",
            "Polish stainless steel taps, handles, and kitchen sink fixtures."
          ]
        },
        {
          id: "final",
          name: "Final Sanitization",
          img: "/job_bathroom.png",
          intro: "The final detailed walkthrough polish before you unpack or move in.",
          checklist: [
            "Wipe down all interior cabinets, drawer slides, and built-in closet tracks.",
            "Sanitize all kitchen countertops, splashbacks, and appliances inside-out.",
            "Deep clean bathroom porcelain sinks, mirrors, shower tiles, and toilets.",
            "Steam mop all tile floors and execute final floor vacuuming."
          ]
        }
      ]}
    />
  );
}
