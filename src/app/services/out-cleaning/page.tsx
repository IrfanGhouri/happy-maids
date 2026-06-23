"use client";

import ServicePageTemplate from "@/components/ServicePageTemplate";

export default function MoveOutCleaningPage() {
  return (
    <ServicePageTemplate
      title="Move-Out Cleaning"
      heroBadge="Rental Deposit Recovery"
      subtitle="Ensure you secure your security deposit with our professional, checklist-certified move-out cleans."
      imageSrc="/move_in_out.png"
      description="Moving out is stressful enough without having to scrub ovens and wipe baseboards. Our Move-Out Cleaning service is tailored to match rental lease contract specifications. We follow a strict security deposit recovery checklist, leaving no spot untouched—from kitchen grease buildup to bathroom hard water stains."
      benefitsTitle="Move-Out Guarantee Checklist"
      benefits={[
        { title: "Deposit Recovery Scrub", desc: "Detailed cleaning of window tracks, doors, inside closets, and wall corners." },
        { title: "Deep Kitchen Degrease", desc: "Heavy scrub of range hood filters, oven interiors, stovetops, and cabinets." },
        { title: "Bathroom Decalcification", desc: "Remove limescale and soap scum from glass, chrome fixtures, tiles, and grout." },
        { title: "Clean Under Appliances", desc: "Pull out heavy appliances where possible to vacuum and wash hidden floor space." }
      ]}
      oneTimeTitle="Deposit Checklist Clean"
      oneTimeDesc="A specialized flat-rate service focusing on landlord check-out requirements."
      recurringTitle="Multi-Property Discount"
      recurringDesc="For landlords, property managers, or real estate brokers managing multiple turnarounds."
      whyScheduleTitle="Why Secure a Move-Out Clean?"
      whyScheduleDesc="Landlords can be extremely strict about dust, hair, and grease. Professional cleanings provide concrete proof (receipts) to property managers that a thorough lease-end checklist was completed, reducing deposit disputes."
      toolsTitle="Grease & Limescale Solvents"
      tools={[
        { name: "Eco-Friendly Degreasers", desc: "Lifts heavy oil and carbon deposits in ovens without noxious fumes." },
        { name: "Grout Restoration Brushes", desc: "Scrub bristles designed to deep-clean discolored bathroom floor grout lines." }
      ]}
      blueprintTabs={[
        {
          id: "lease",
          name: "Deposit Checklist Clean",
          img: "/move_in_out.png",
          intro: "Meeting strict lease agreement terms to secure your deposit.",
          checklist: [
            "Wipe down all interior closets, shelves, hanging rods, and drawers.",
            "Clean window tracks, sliders, sills, and internal glass panes.",
            "Wipe off wall handprints, dry scuff marks, and baseboards.",
            "Empty all residual trash, sanitize bins, and wipe outlet plates."
          ]
        },
        {
          id: "appliances",
          name: "Appliance Deep Degrease",
          img: "/job_kitchen.png",
          intro: "Eliminating heavy food grime, grease, and oven carbon deposits.",
          checklist: [
            "Scrub oven interiors, baking trays, heating elements, and oven glass.",
            "Remove grease from range hood mesh filters, stove knobs, and burners.",
            "Sanitize refrigerator interior, freezer shelves, and door rubber seal gaskets.",
            "Clean interior of dishwasher and wipe down microwave turntables."
          ]
        },
        {
          id: "bathrooms",
          name: "Tile & Grout Restoration",
          img: "/job_bathroom.png",
          intro: "Decalcifying bathroom suites to look like new.",
          checklist: [
            "Remove hard-water stains, soap scum, and mold from shower screens.",
            "Scrub wall tiles, restore discolored floor grout lines, and wash drains.",
            "Sanitize vanity cabinets, sinks, faucets, and medicine chests.",
            "Disinfect toilet bowl inside-out, including tank lid and wall brackets."
          ]
        },
        {
          id: "corners",
          name: "Hidden Space Clean-out",
          img: "/clean_bedroom.png",
          intro: "Addressing areas that are normally hidden behind furniture.",
          checklist: [
            "Pull out lighter appliances to sweep and mop accumulated dirt.",
            "Vacuum closet crevices, floor corners, and behind-door paths.",
            "Wipe top of doors, radiator grills, and lighting fixtures.",
            "Thoroughly mop hard floors and shampoo-vacuum carpet borders."
          ]
        }
      ]}
    />
  );
}
