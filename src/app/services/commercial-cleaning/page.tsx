"use client";

import ServicePageTemplate from "@/components/ServicePageTemplate";

export default function CommercialCleaningPage() {
  return (
    <ServicePageTemplate
      title="Commercial Cleaning"
      heroBadge="Business & Office Care"
      subtitle="Keep your workplace pristine, professional, and healthy for your employees and clients."
      imageSrc="/commercial_cleaning.png"
      description="Our commercial cleaning service caters to offices, retail storefronts, medical clinics, and school facilities. We understand the importance of a clean workspace in maintaining staff productivity and brand reputation. Our bonded teams work after-hours to keep desk surfaces, lobbies, restrooms, and breakrooms completely disinfected."
      benefitsTitle="Commercial Standard Checklist"
      benefits={[
        { title: "Desk & Screen Dusting", desc: "Wipe down monitor stands, keyboards, meeting tables, and office electronics safely." },
        { title: "Trash Management", desc: "Empty office garbage bins, replace liners, and separate recyclables responsibly." },
        { title: "Breakroom Hygiene", desc: "Sanitize countertops, microwave interiors, sinks, and communal refrigerator exteriors." },
        { title: "Floor Maintenance", desc: "Deep vacuum office carpets and high-traffic lobby tile buffing." }
      ]}
      oneTimeTitle="Deep Sanitization Cleanup"
      oneTimeDesc="A seasonal deep scrub, or disinfection protocol before major events or after office remodeling."
      recurringTitle="After-Hours Maintenance"
      recurringDesc="Establish a daily, bi-weekly, or weekly plan. Our crews operate overnight to avoid interrupting your work day."
      whyScheduleTitle="Why Choose Commercial Cleaning?"
      whyScheduleDesc="A clean workspace minimizes sick leaves, maintains a professional first-impression for visiting stakeholders, and protects expensive office assets from wear and dust build-up."
      toolsTitle="Commercial Sanitation Tools"
      tools={[
        { name: "Electrostatic Sprayers", desc: "Disinfectant mist that coats surfaces evenly for maximum microbial kill-rates." },
        { name: "Industrial Floor Buffers", desc: "Maintains a high-gloss finish on marble, tile, and concrete office lobbies." }
      ]}
      blueprintTabs={[
        {
          id: "workspaces",
          name: "Workstations & Desks",
          img: "/commercial_cleaning.png",
          intro: "Clinical dust-downs and sanitization of shared workspaces.",
          checklist: [
            "Dust monitors, keyboard panels, desk bases, and partition frames.",
            "Disinfect phone receivers, mouse pads, and personal desk drawers.",
            "Sanitize trash cans and replace high-volume office bin liners.",
            "Vacuum desk carpets, rug liners, and wipe plastic chair mats."
          ]
        },
        {
          id: "conference",
          name: "Conference & Meeting Rooms",
          img: "/clean_living_room.png",
          intro: "Polishing formal rooms for prime corporate presentations.",
          checklist: [
            "Wipe high-gloss conference glass tables and board consoles.",
            "Dust whiteboards, projector mounts, audio docks, and LED screens.",
            "Sanitize leather executive seats and rearrange presentation layouts.",
            "Detail floor borders, baseboards, and glass entrances."
          ]
        },
        {
          id: "breakroom",
          name: "Kitchenette & Breakrooms",
          img: "/job_kitchen.png",
          intro: "Degreasing and sanitizing communal eating and food-prep spaces.",
          checklist: [
            "Deep scrub countertops, splashboards, and breakroom sink basins.",
            "Sanitize coffee machines, water dispensers, and vending panel faceplates.",
            "Wipe exterior panels of refrigerators, microwaves, and tea kettles.",
            "Damp mop kitchen tiles with heavy-duty grease cutter."
          ]
        },
        {
          id: "restrooms",
          name: "Office Restrooms & Lobbies",
          img: "/job_bathroom.png",
          intro: "High-grade hygienic disinfection to halt microbial build-ups.",
          checklist: [
            "Sanitize toilet bowls, seat rings, flush levers, and paper holders.",
            "Scrub porcelain sinks, polished brass faucets, and vanity mirrors.",
            "Refill soap dispensers, paper towel trays, and sanitizing sprays.",
            "Steam mop restroom floors using clinical disinfectant solutions."
          ]
        }
      ]}
    />
  );
}
