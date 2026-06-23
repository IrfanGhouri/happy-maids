"use client";

import ServicePageTemplate from "@/components/ServicePageTemplate";

export default function VacationRentalCleaningPage() {
  return (
    <ServicePageTemplate
      title="Vacation Rental Cleaning"
      heroBadge="Airbnb Turnover Specialists"
      subtitle="Hotel-grade turnover cleanups that secure 5-star cleanliness ratings from your guests."
      imageSrc="/vacation_cleaning.png"
      description="In the vacation rental industry, cleanliness is your #1 review metric. Our dedicated Airbnb turnover service is engineered to respond quickly between guest check-out and check-in windows. We completely sanitize the property, change linens, stock amenities, and report any damages so your listing remains in pristine condition."
      benefitsTitle="Turnover Service Highlights"
      benefits={[
        { title: "Linen Service", desc: "Strip beds, wash and dry linens, remake beds with crisp hospital corners." },
        { title: "Amenity Restocking", desc: "Refill hand soaps, toilet papers, shampoo dispensers, and clean kitchen sponge replacements." },
        { title: "Damage Check", desc: "Inspection of main living spaces for tenant damage; immediate photographic reports." },
        { title: "Detailed Sanitization", desc: "Full disinfectant wash of kitchenware, toilets, remotes, and high-touch areas." }
      ]}
      oneTimeTitle="Initial Deep Turnover"
      oneTimeDesc="A complete overhaul of the property before launching your rental on Airbnb or VRBO."
      recurringTitle="Automated Turnover Schedule"
      recurringDesc="Synchronize with your reservation calendar. We auto-dispatch cleaning crews for every guest checkout."
      whyScheduleTitle="Why Hire Vacation Rental Professionals?"
      whyScheduleDesc="Outsourcing check-out cleanups ensures professional consistency, increases host status (Superhost potential), and removes the stress of last-minute bookings or tight turnaround windows."
      toolsTitle="Turnover Kits & Supplies"
      tools={[
        { name: "Eco-Safe Odor Neutralizers", desc: "Instantly removes cooking or pet smells without artificial fragrances." },
        { name: "HEPA Back-Pack Vacuums", desc: "High efficiency particulate air vacuuming for deep allergen removal." }
      ]}
      blueprintTabs={[
        {
          id: "turnover",
          name: "Guest Turnover Prep",
          img: "/vacation_cleaning.png",
          intro: "Speed and precision turnovers between guest reservation windows.",
          checklist: [
            "Conduct full damage inspection and log photo reports for the host.",
            "Sanitize TV remotes, AC panels, door levers, and key lockboxes.",
            "Empty all interior waste baskets, wash bins, and restock trash liners.",
            "Vacuum entryway mats, patio pathways, and wipe main console tables."
          ]
        },
        {
          id: "linens",
          name: "Linen & Bed Layouts",
          img: "/clean_bedroom.png",
          intro: "Creating that premium hotel feel with clean linen setups.",
          checklist: [
            "Strip used sheets, pillowcases, and duvet covers from beds.",
            "Inspect mattress pads, blankets, and pillow protectors for spots.",
            "Re-make bed layouts with fresh, laundered sheets and tight corners.",
            "Fold and stack clean bath towels, washcloths, and hand rags."
          ]
        },
        {
          id: "kitchen",
          name: "Kitchen & Supplies Check",
          img: "/job_kitchen.png",
          intro: "Ensuring guest food areas are stocked and completely grease-free.",
          checklist: [
            "Load and start the dishwasher, and hand wash delicate stemware.",
            "Sanitize inside of toaster, coffee brewer, microwave, and fridge shelf panels.",
            "Wipe cabinet doors, dining counters, and barstool frames.",
            "Restock complimentary coffee pods, paper towels, and new sponges."
          ]
        },
        {
          id: "bathrooms",
          name: "Hygienic Restrooms Prep",
          img: "/job_bathroom.png",
          intro: "Perfect clinical sanitization to impress rental guests.",
          checklist: [
            "Sanitize tub, shower glass walls, faucets, and drain strainers.",
            "Deep clean toilet bowls, surrounding tiles, and floor base rings.",
            "Polish vanity mirrors, chrome fixtures, and wipe drawer handles.",
            "Restock trial shampoos, body soaps, hand lotions, and toilet paper rolls."
          ]
        }
      ]}
    />
  );
}
