"use client";

import ServicePageTemplate from "@/components/ServicePageTemplate";

export default function MoveInCleaningPage() {
  return (
    <ServicePageTemplate
      title="Move-In Cleaning"
      heroBadge="Fresh Start Cleaning"
      subtitle="Sanitize and clean your new property top-to-bottom before you move your family and furniture in."
      imageSrc="/move_in_out.png"
      description="Moving into a new home is a major milestone, but you want to start fresh. Our Move-In Cleaning is specifically designed for empty homes, allowing us to scrub inside cabinets, deep-clean baseboards, wash closet shelves, and sanitize every corner without furniture in the way. Ensure your family moves into a healthy, allergen-free environment."
      benefitsTitle="Move-In Detail Highlights"
      benefits={[
        { title: "Inside Cabinet Wash", desc: "Scrub interior shelves, drawers, and cabinet doors in kitchens and bathrooms." },
        { title: "Floor Sanitization", desc: "Deep wash and sanitize hardwood, tiles, and steam vacuum carpets to remove leftover dust." },
        { title: "Wall & Baseboard Scrub", desc: "Wipe off smudges, scuff marks, and dust from walls, outlets, and baseboards." },
        { title: "Appliance Deep Clean", desc: "Complete interior and exterior clean of refrigerator, oven, dishwasher, and microwave." }
      ]}
      oneTimeTitle="Pre-Move Deep Clean"
      oneTimeDesc="A complete one-time sanitization scrub scheduled 1-2 days before the moving trucks arrive."
      recurringTitle="Welcome Package Discount"
      recurringDesc="Secure a move-in clean and schedule recurring monthly maintenance to keep it feeling brand new."
      whyScheduleTitle="Why Book a Move-In Cleaning?"
      whyScheduleDesc="A move-in clean gives you a truly clean slate. Previous tenants may leave behind hidden dust, pet dander, and mold spores. Cleaning before furniture is set is faster, more thorough, and ensures immediate comfort."
      toolsTitle="Deep Cleansing Equipment"
      tools={[
        { name: "High-Temperature Steam Mops", desc: "Uses steam to sanitize floors and remove sticky residue without chemicals." },
        { name: "HEPA Filtration Vacuums", desc: "Filters out 99.97% of fine dust particles and microscopic dander." }
      ]}
      blueprintTabs={[
        {
          id: "cabinets",
          name: "Inside Cabinets & Drawers",
          img: "/job_kitchen.png",
          intro: "Deep scrubbing of storage units before your items are unpacked.",
          checklist: [
            "Wipe interior shelves, corner slides, and pull-out trays.",
            "De-grease and sanitize drawer tracks and handles.",
            "Clean exterior cabinet moldings and polish wooden panels.",
            "Remove builder's dust or chemical smells from new millwork."
          ]
        },
        {
          id: "walls",
          name: "Walls & Baseboard Detailing",
          img: "/move_in_out.png",
          intro: "Removing scuff marks and fine dust from all vertical surfaces.",
          checklist: [
            "Wipe down wall switch covers, doorframes, and door tops.",
            "Vacuum and scrub baseboards to remove dust buildup.",
            "Dust window blinds, curtain bars, and clean window sills.",
            "Carefully scrub smudge marks and dry paint drips."
          ]
        },
        {
          id: "bathrooms",
          name: "Restroom Sterilization",
          img: "/job_bathroom.png",
          intro: "Sanitization of toilets, showers, and vanity counters.",
          checklist: [
            "Clinical sanitization of toilet bowls and surrounding grout lines.",
            "Scrub bath panels, shower glass tiles, and faucet hardware.",
            "Wipe interior vanity cabinets, medicine shelves, and mirrors.",
            "Steam mop floor tiles to eliminate biological remnants."
          ]
        },
        {
          id: "floors",
          name: "Floor Scrub & HEPA Vacuum",
          img: "/clean_bedroom.png",
          intro: "Thorough floor treatments to prepare for carpet overlay or walking barefoot.",
          checklist: [
            "HEPA vacuuming of all carpeted areas and closet floors.",
            "Dust and sweep corners, radiator grids, and under-vent covers.",
            "Damp mop hardwood surfaces with specialized wood nourishment.",
            "Steam mop ceramic and stone floors for a residue-free shine."
          ]
        }
      ]}
    />
  );
}
