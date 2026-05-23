import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { ImageSlide } from '../types';

interface AutoCarouselProps {
  images: ImageSlide[];
  intervalMs?: number;
  aspectRatio?: 'video' | 'card' | 'free';
}

export default function AutoCarousel({
  images,
  intervalMs = 4000,
  aspectRatio = 'video',
}: AutoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const total = images.length;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (total <= 1 || !isPlaying) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      return;
    }

    // Set auto swap
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, intervalMs);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentIndex, isPlaying, total, intervalMs]);

  if (!images || images.length === 0) {
    return (
      <div className="w-full flex items-center justify-center bg-gray-100 rounded-xl aspect-video border border-emerald-100">
        <span className="text-sm text-emerald-800/60 font-medium">Rasm mavjud emas</span>
      </div>
    );
  }

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(false); // Pause auto-rotation on user manual interaction for accessibility
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(false); // Pause auto-rotation on user manual interaction for accessibility
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const selectSlide = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(false);
    setCurrentIndex(idx);
  };

  // Class helper for responsive heights/aspect ratios
  const aspectClass =
    aspectRatio === 'video'
      ? 'aspect-[16/9] md:aspect-[16/9]'
      : aspectRatio === 'card'
      ? 'aspect-[4/3]'
      : 'aspect-[3/2]';

  return (
    <div className={`relative w-full rounded-2xl overflow-hidden group border border-emerald-950/10 shadow-lg ${aspectClass}`}>
      {/* Slides with AnimatePresence */}
      <div className="absolute inset-0 w-full h-full bg-emerald-950/5">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.img
            key={currentIndex}
            src={images[currentIndex].url}
            alt={images[currentIndex].alt || 'Slide image'}
            referrerPolicy="no-referrer"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
      </div>

      {/* Ambient Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />

      {/* Floating Info Overlay showing the current slide title and numbering */}
      <div className="absolute bottom-4 left-4 right-4 text-white pointer-events-none z-10 select-none">
        <div className="backdrop-blur-md bg-emerald-950/40 border border-white/10 p-3 rounded-xl max-w-lg">
          <p className="text-xs font-mono text-emerald-300 uppercase tracking-widest mb-0.5">
            GulDPI Yashil Foto-Kolleksiya
          </p>
          <h4 className="text-sm md:text-base font-sans font-medium line-clamp-1">
            {images[currentIndex].alt}
          </h4>
        </div>
      </div>

      {/* Controls: Left & Right Arrows (Only shown when total > 1) */}
      {total > 1 && (
        <>
          <button
            onClick={handlePrev}
            id={`carousel-prev-${images[currentIndex].alt.slice(0,5)}`}
            className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-black/30 backdrop-blur-md text-white border border-white/10 hover:bg-emerald-600/80 hover:scale-105 active:scale-95 transition-all duration-200 z-10 cursor-pointer"
            aria-label="Oldingi rasm"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={handleNext}
            id={`carousel-next-${images[currentIndex].alt.slice(0,5)}`}
            className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-black/30 backdrop-blur-md text-white border border-white/10 hover:bg-emerald-600/80 hover:scale-105 active:scale-95 transition-all duration-200 z-10 cursor-pointer"
            aria-label="Keyingi rasm"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      {/* Play/Pause & Slides Tracker controls bottom-right */}
      <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
        {total > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsPlaying(!isPlaying);
            }}
            id={`carousel-play-pause-${images[currentIndex].alt.slice(0,5)}`}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white hover:bg-emerald-600 focus:outline-none transition-all duration-200 select-none cursor-pointer"
            title={isPlaying ? 'Avtomatik almashtirishni to\'xtatish' : 'Avtomatik almashtirishni davom ettirish'}
          >
            {isPlaying ? <Pause size={12} /> : <Play size={12} />}
          </button>
        )}
        <div className="px-2.5 py-1 text-xs font-mono rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-zinc-300">
          {currentIndex + 1} / {total}
        </div>
      </div>

      {/* Indicators/Dots for jumping directly to slides */}
      {total > 1 && (
        <div className="absolute bottom-4 right-4 flex items-center gap-1.5 z-10">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => selectSlide(idx, e)}
              id={`carousel-indicator-${idx}-${images[currentIndex].alt.slice(0,5)}`}
              className={`h-2 rounded-full cursor-pointer transition-all duration-300 ${
                currentIndex === idx ? 'w-6 bg-emerald-400' : 'w-2 bg-white/40 hover:bg-white/80'
              }`}
              aria-label={`Slaydga o'tish ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
