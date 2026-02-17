import React, { useEffect, useRef } from 'react';
import { infographics, summaryInfographics } from '../data';
import { Info } from 'lucide-react';
import Carousel from './Carousel';
import ThreeEightsChart from './ThreeEightsChart';

const InfographicsView: React.FC = () => {
  const firstCarouselRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Scroll to the first carousel after a brief delay to ensure rendering
    const timer = setTimeout(() => {
      firstCarouselRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-12 animate-fadeIn pb-12">
      {/* Introduction - Made smaller as requested */}
      <div className="flex items-start gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800/30">
        <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
        <div>
          <h2 className="text-base font-bold text-blue-900 dark:text-blue-100 mb-0.5">Galería Visual</h2>
          <p className="text-sm text-blue-800 dark:text-blue-300/80">
            Explora gráficamente los cambios y contrastes de la reforma laboral.
          </p>
        </div>
      </div>

      {/* New Interactive Infographic */}
      <section ref={firstCarouselRef} className="animate-slideUp">
        <div className="flex items-center gap-3 mb-6 px-4 md:px-0">
          <span className="w-1.5 h-8 bg-indigo-600 rounded-full"></span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Equilibrio Vital</h2>
        </div>
        <ThreeEightsChart />
      </section>

      {/* Detailed Carousel */}
      <section>
        <div className="flex items-center gap-3 mb-6 px-4 md:px-0">
          <span className="w-1.5 h-8 bg-blue-600 rounded-full"></span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Análisis Detallado</h2>
        </div>
        <Carousel items={infographics} id="detail-carousel" />
      </section>

      {/* Summary Carousel (Now Second) */}
      <section>
        <div className="flex items-center gap-3 mb-6 px-4 md:px-0">
          <span className="w-1.5 h-8 bg-amber-500 rounded-full"></span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Resumen General</h2>
        </div>
        <Carousel items={summaryInfographics} id="summary-carousel" />
      </section>

      <div className="text-center p-8 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-100 dark:border-amber-900/30 text-amber-800 dark:text-amber-400 text-sm mt-8">
        <p><strong>Nota:</strong> Las infografías son representaciones esquemáticas basadas en la interpretación del proyecto de ley.</p>
      </div>
    </div>
  );
};

export default InfographicsView;