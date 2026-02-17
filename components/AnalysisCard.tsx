import React, { useState } from 'react';
import { AnalysisPoint, Sentiment } from '../types';
import { AlertTriangle, CheckCircle2, ArrowRight, ShieldAlert, ShieldCheck, Scale, CircleSlash, Calculator } from 'lucide-react';
import FondoCeseSimulator from './FondoCeseSimulator';

interface Props {
  point: AnalysisPoint;
}

const AnalysisCard: React.FC<Props> = ({ point }) => {
  const [showSimulator, setShowSimulator] = useState(false);
  const isNegative = point.impact === Sentiment.NEGATIVE;
  const isWarning = point.impact === Sentiment.WARNING;
  const isPositive = point.impact === Sentiment.POSITIVE;
  const isNeutral = point.impact === Sentiment.NEUTRAL;

  const getHeaderColor = () => {
    if (isPositive) return 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800';
    if (isNegative) return 'bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-900/30 dark:text-rose-400 dark:border-rose-800';
    if (isWarning) return 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800';
    return 'bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700';
  };

  const getBadgeLabel = () => {
    if (isPositive) return 'Avance / Beneficio';
    if (isNegative) return 'Retroceso de Derechos';
    if (isWarning) return 'Cambio Estructural';
    return 'Cambio Administrativo / Neutro';
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-md transition-all duration-300">
      {/* Header */}
      <div className={`px-6 py-3 border-b flex justify-between items-center ${getHeaderColor()}`}>
        <div className="flex items-center gap-2 font-bold text-sm uppercase tracking-wide">
          {isNegative && <ShieldAlert className="w-5 h-5" />}
          {isPositive && <ShieldCheck className="w-5 h-5" />}
          {isWarning && <Scale className="w-5 h-5" />}
          {isNeutral && <CircleSlash className="w-5 h-5" />}
          {getBadgeLabel()}
        </div>
        {point.articleReference && (
          <span className="text-xs font-mono opacity-80 bg-white/50 dark:bg-black/20 px-2 py-1 rounded">
            {point.articleReference}
          </span>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6">{point.title}</h3>

        <div className="flex flex-col md:flex-row gap-4 md:gap-0 relative">

          {/* Col 1: Ley Actual */}
          <div className="flex-1 md:pr-8 md:border-r border-slate-100 dark:border-slate-800 relative">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400 text-xs font-bold px-2 py-1 rounded uppercase">Ley Actual</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-500" />
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm md:text-base">
              {point.currentLawDescription}
            </p>
          </div>

          {/* Divider/Arrow on Desktop */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-full items-center justify-center z-10 text-slate-400 dark:text-slate-500 shadow-sm">
            <ArrowRight className="w-4 h-4" />
          </div>

          {/* Arrow on Mobile */}
          <div className="md:hidden flex justify-center py-2">
            <ArrowRight className="w-6 h-6 text-slate-300 dark:text-slate-600 rotate-90" />
          </div>

          {/* Col 2: Reforma */}
          <div className="flex-1 md:pl-8">
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-xs font-bold px-2 py-1 rounded uppercase ${isNegative
                ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400'
                : isWarning
                  ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                  : isPositive
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                    : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400'
                }`}>
                Reforma
              </span>
              {isNegative && <AlertTriangle className="w-4 h-4 text-rose-500" />}
            </div>
            <p className="text-slate-800 dark:text-slate-200 font-medium leading-relaxed text-sm md:text-base">
              {point.reformDescription}
            </p>

            {/* Bloque de impacto negativo para el trabajador */}
            {point.workerImpact && (
              <div className="mt-4 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/50 rounded-xl p-4">
                <p className="text-rose-700 dark:text-rose-300 text-sm leading-relaxed font-medium">
                  {point.workerImpact}
                </p>
              </div>
            )}

            {/* Simulado de Impacto para Fondo de Cese */}
            {(point.id === '10' || point.id.startsWith('fal-')) && (
              <button
                onClick={() => setShowSimulator(true)}
                className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-900/20 active:scale-95"
              >
                <Calculator className="w-5 h-5" />
                Simular Impacto en mi Bolsillo
              </button>
            )}
          </div>
        </div>

      </div>

      <FondoCeseSimulator isOpen={showSimulator} onClose={() => setShowSimulator(false)} />
    </div >
  );
};

export default AnalysisCard;