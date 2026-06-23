"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Play, Pause, X, Star, Volume2, VolumeX, Sparkles } from "lucide-react";
import gsap from "gsap";

const videoReviewsData = [
  {
    id: 1,
    name: "Sarah Jenkins",
    location: "Des Plaines, IL",
    rating: 5,
    title: "Absolutely spotless, they saved my weekend!",
    img: "/testimonial_woman.png",
    duration: "1:12",
    feedback: "Happy Maids does an incredible job. They're professional, on-time, and my kitchen looks cleaner than the day I moved in!"
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "Chicago, IL",
    rating: 5,
    title: "Best commercial cleaners in the area",
    img: "/commercial_cleaning.png",
    duration: "0:45",
    feedback: "Having a clean office is essential for our clients. Happy Maids handles everything bi-weekly, completely hands-free!"
  },
  {
    id: 3,
    name: "Jessica Miller",
    location: "Park Ridge, IL",
    rating: 5,
    title: "Eco-friendly products were a game changer",
    img: "/job_kitchen.png",
    duration: "1:30",
    feedback: "I was worried about harsh chemicals around my kids and puppy. They use all-natural green products that smell amazing and work perfectly."
  }
];

export default function VideoReviews() {
  const [activeVideo, setActiveVideo] = useState<typeof videoReviewsData[0] | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(15); // simulated initial progress
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Entrance animations for review cards
  useEffect(() => {
    const cards = gsap.utils.toArray(".video-card");
    if (cards.length === 0) return;

    gsap.fromTo(cards,
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none"
        }
      }
    );
  }, []);

  const openVideo = (video: typeof videoReviewsData[0]) => {
    setActiveVideo(video);
    setIsPlaying(true);
    setProgress(0);
  };

  const closeVideo = () => {
    setActiveVideo(null);
    setIsPlaying(false);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
  };

  // Simulate progress bar movement
  useEffect(() => {
    if (isPlaying && activeVideo) {
      progressIntervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
            return 100;
          }
          return prev + 1.5;
        });
      }, 300);
    } else {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    }
    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [isPlaying, activeVideo]);

  return (
    <section ref={sectionRef} className="py-24 bg-secondary text-white relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(13,148,136,0.15)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-bold text-xs uppercase tracking-widest block mb-2">
            Real Stories, Real Smiles
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-4xl">
            What Our Clients Say on Video
          </h2>
          <div className="w-12 h-1 bg-primary rounded-full mx-auto mt-4" />
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {videoReviewsData.map((review) => (
            <div
              key={review.id}
              onClick={() => openVideo(review)}
              className="video-card bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden cursor-pointer group hover:-translate-y-2 hover:border-primary/50 transition-all duration-300"
            >
              {/* Image Frame / Play Overlay */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={review.img}
                  alt={review.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 350px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 brightness-75"
                />
                {/* Play Button Icon Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/35 group-hover:bg-black/20 transition-colors">
                  <div className="w-14 h-14 rounded-full bg-primary/95 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-6 h-6 fill-white ml-1 text-white" />
                  </div>
                </div>
                {/* Duration Badge */}
                <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold tracking-wider">
                  {review.duration}
                </div>
              </div>

              {/* Video Info Content */}
              <div className="p-6">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
                  ))}
                </div>
                <h3 className="font-heading font-extrabold text-lg text-slate-100 group-hover:text-primary transition-colors leading-tight mb-2">
                  "{review.title}"
                </h3>
                <p className="text-xs text-slate-400 font-medium line-clamp-2 mb-4">
                  {review.feedback}
                </p>
                <div className="flex items-center justify-between text-xs text-slate-400 font-bold border-t border-slate-800/80 pt-4">
                  <span>{review.name}</span>
                  <span className="text-primary">{review.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Simulated Premium Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-3xl bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl animate-scaleUp">
            {/* Top Close Bar */}
            <div className="absolute top-4 right-4 z-30 flex gap-2">
              <button
                onClick={closeVideo}
                className="w-10 h-10 rounded-full bg-slate-900/90 border border-slate-800 hover:border-white text-slate-400 hover:text-white flex items-center justify-center transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player Box */}
            <div className="relative aspect-video bg-black flex items-center justify-center select-none overflow-hidden">
              <Image
                src={activeVideo.img}
                alt={activeVideo.name}
                fill
                sizes="(max-width: 1024px) 100vw, 800px"
                className="object-cover opacity-90 transition-opacity duration-300"
              />

              {/* Simulation overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 flex flex-col justify-end p-6 z-10">
                {/* Simulated Floating Sparkles when "playing" */}
                {isPlaying && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 bg-primary/20 backdrop-blur-md border border-primary/30 px-4 py-2 rounded-full text-xs font-bold text-primary-light animate-pulse">
                    <Sparkles className="w-4 h-4" />
                    Simulating Spotless clean video test...
                  </div>
                )}

                {/* Video Info Label */}
                <div className="mb-4">
                  <span className="text-[10px] text-primary font-bold uppercase tracking-widest block mb-1">
                    Customer Testimonial Video
                  </span>
                  <h4 className="font-heading font-black text-xl leading-tight">
                    {activeVideo.name} — {activeVideo.location}
                  </h4>
                </div>

                {/* Player Controls Bar */}
                <div className="flex items-center gap-4">
                  {/* Play/Pause Button */}
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white cursor-pointer hover:scale-105 transition-transform"
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
                  </button>

                  {/* Simulated Progress bar */}
                  <div className="flex-grow h-1.5 bg-slate-800 rounded-full overflow-hidden relative cursor-pointer">
                    <div
                      className="absolute left-0 top-0 bottom-0 bg-primary transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  {/* Volume Button */}
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white cursor-pointer transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
