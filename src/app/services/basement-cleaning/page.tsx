"use client";

import ServicePageTemplate from "@/components/ServicePageTemplate";

export default function BasementCleaningPage() {
  return (
    <ServicePageTemplate
      title="Basement Cleaning"
      heroBadge="De-Clutter & Organize"
      subtitle="Reclaim your lower level with deep floor washing, shelving reorganization, and cobweb removal."
      imageSrc="/basement_cleaning.png"
      description="Basements often become catch-alls for clutter, dust, mold, and cobwebs. Our basement cleaning service specializes in sorting through storage, washing down concrete or tiled floors, cleaning utility closets, and removing damp-related dust. We help turn your dark storage space back into a bright, usable, and healthy part of your home."
      benefitsTitle="Basement Checklist Details"
      benefits={[
        { title: "Cobweb & Dust Removal", desc: "Detailed sweeping of overhead joists, floorboards, pipes, and utility meters." },
        { title: "Floor Wash & Sanitation", desc: "Heavy scrub of concrete, laminate, or tile basement floors to eliminate dust and damp smell." },
        { title: "Shelving Reorganization", desc: "Wipe down storage shelves and neatly organize boxes, bins, and household items." },
        { title: "Molding Inspection", desc: "Wipe down walls with mold-inhibiting agents to prevent spores from spreading in damp areas." }
      ]}
      oneTimeTitle="Seasonal De-clutter Clean"
      oneTimeDesc="A major spring cleanup or organizer service to sort through years of accumulated boxes."
      recurringTitle="Maintenance Plan"
      recurringDesc="Keep your basement dry, fresh, and pest-free with quarterly or semi-annual maintenance sweeps."
      whyScheduleTitle="Why Keep Your Basement Clean?"
      whyScheduleDesc="Damp, dusty basements are prime breeding grounds for spiders, rodents, and mold. Regularly cleaning and organizing storage stops pests, controls musty odors, and makes sorting through family keepsakes a pleasant experience."
      toolsTitle="Basement Heavy-Duty Gear"
      tools={[
        { name: "Mold-Inhibiting Solutions", desc: "Eco-friendly sprays that sanitize concrete walls and slow down mildew regrowth." },
        { name: "Heavy-Duty Extension Dusters", desc: "Allows cleaners to reach ceiling joists and exposed ductwork safely." }
      ]}
      blueprintTabs={[
        {
          id: "declutter",
          name: "Storage & De-cluttering",
          img: "/basement_cleaning.png",
          intro: "Helping sort and organize storage units to optimize your basement space.",
          checklist: [
            "Dust and wipe exterior surfaces of plastic storage bins and cardboard containers.",
            "Wipe down metal shelving units, utility stands, and cabinet panels.",
            "Neatly arrange boxes, seasonal equipment, and discard loose trash.",
            "Sweep around boilers, water heaters, and laundry stations."
          ]
        },
        {
          id: "cobwebs",
          name: "High Cobweb Sweep-out",
          img: "/clean_playroom.png",
          intro: "Clearing spider webs and ceiling dust from joists and ducts.",
          checklist: [
            "Clear cobwebs from exposed ceiling joists, support beams, and ducts.",
            "Dust overhead copper pipes, water conduits, and drainage lines.",
            "Wipe high-level windows, light bulbs, and security sensors.",
            "Clean top surfaces of storage wardrobes and electrical breaker panels."
          ]
        },
        {
          id: "mildew",
          name: "Wall & Mildew Scrub",
          img: "/move_in_out.png",
          intro: "Sanitizing basement walls with bio-safe damp-control inhibitors.",
          checklist: [
            "Wipe down concrete or drywall surfaces to remove damp dust.",
            "Apply eco-safe, non-toxic sanitizers to damp-prone wall corners.",
            "Wipe down stairs, handrails, baseboards, and bottom trim plates.",
            "Clean utility room doors, door knobs, and switch plates."
          ]
        },
        {
          id: "floors",
          name: "Heavy Floor Scrubbing",
          img: "/clean_living_room.png",
          intro: "Eliminating musty scents and ground-in dirt with concrete scrub mops.",
          checklist: [
            "Vacuum and remove sand, debris, and concrete dust from floors.",
            "Scrub concrete, laminate, or tile surfaces with deodorizing sanitizers.",
            "Wipe base areas of pillars, columns, and sump-pump covers.",
            "Execute final dry-sweep and air out ventilation paths."
          ]
        }
      ]}
    />
  );
}
