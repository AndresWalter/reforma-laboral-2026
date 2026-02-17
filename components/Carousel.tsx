import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { Infographic } from '../types';

interface CarouselProps {
  items: Infographic[];
  id: string;
}

const Carousel: React.FC<CarouselProps> = ({ items, id }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null); // Reset touch end
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      if (currentIndex < items.length - 1) {
        setCurrentIndex(prev => prev + 1);
      }
    }

    if (isRightSwipe) {
      if (currentIndex > 0) {
        setCurrentIndex(prev => prev - 1);
      }
    }
  };

  const prevSlide = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? prev : prev - 1));
  };

  const nextSlide = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === items.length - 1 ? prev : prev + 1));
  };

  if (!items || items.length === 0) return null;

  return (
    <>
      <div className="relative group max-w-4xl mx-auto">
        <div
          className="aspect-video bg-slate-900 rounded-2xl overflow-hidden shadow-2xl relative"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Main Image */}
          <div
            className="w-full h-full flex transition-transform duration-500 ease-out cursor-zoom-in"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            onClick={() => setIsZoomed(true)}
          >
            {items.map((info) => (
              <div key={info.id} className="min-w-full h-full relative flex items-center justify-center bg-black">
                <img
                  src={info.src}
                  alt={info.title}
                  className="max-h-full max-w-full object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>

          {/* Overlay Zoom Hint */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full text-white/80 text-sm flex items-center gap-2">
              <ZoomIn className="w-4 h-4" /> Clic para ampliar
            </div>
          </div>

          {/* Controls */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 disabled:opacity-0 z-10"
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 disabled:opacity-0 z-10"
            disabled={currentIndex === items.length - 1}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10 p-2 rounded-full bg-white/20 backdrop-blur-[2px]">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={(e) => { e.stopPropagation(); setCurrentIndex(index); }}
                className={`w-2.5 h-2.5 rounded-full transition-all shadow-sm ${index === currentIndex ? 'bg-slate-900 w-6' : 'bg-slate-600/80 hover:bg-slate-800'
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Info Card */}
        <div className="mt-6 bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 transition-all">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            {items[currentIndex].title}
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            {items[currentIndex].description}
          </p>
          <div className="mt-4 flex justify-between text-sm text-slate-500 dark:text-slate-500">
            <span>{currentIndex + 1} / {items.length}</span>
          </div>
        </div>
      </div>

      {/* Zoom Modal */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setIsZoomed(false)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className="relative w-full max-w-7xl h-full max-h-screen flex flex-col items-center justify-center" onClick={e => e.stopPropagation()}>
            <img
              src={items[currentIndex].src}
              alt={items[currentIndex].title}
              className="max-w-full max-h-[85vh] object-contain rounded-sm shadow-2xl"
            />
            <div className="mt-4 text-center">
              <h3 className="text-white font-bold text-lg">{items[currentIndex].title}</h3>
              <p className="text-white/60 text-sm">{currentIndex + 1} / {items.length}</p>
            </div>

            {/* Modal Controls */}
            <button
              onClick={(e) => prevSlide(e)}
              className="absolute left-0 md:-left-12 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-2 disabled:opacity-0 hidden md:block"
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="w-10 h-10" />
            </button>
            <button
              onClick={(e) => nextSlide(e)}
              className="absolute right-0 md:-right-12 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-2 disabled:opacity-0 hidden md:block"
              disabled={currentIndex === items.length - 1}
            >
              <ChevronRight className="w-10 h-10" />
            </button>
          </div>

          <button
            className="absolute top-4 right-4 text-white hover:text-white transition-colors z-[200] p-2 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setIsZoomed(false);
            }}
          >
            <X className="w-8 h-8" />
          </button>
        </div>
      )}
    </>
  );
};

export default Carousel;
