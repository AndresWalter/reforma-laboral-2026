import React, { useState } from 'react';
import { analysisPoints } from '../data';
import { Sentiment } from '../types';
import AnalysisCard from './AnalysisCard';
import FondoCeseSimulator from './FondoCeseSimulator';
import { Filter, ThumbsDown, ThumbsUp, AlertTriangle, SearchX, Calculator } from 'lucide-react';

const AnalysisView: React.FC = () => {
  const [filter, setFilter] = useState<Sentiment | 'ALL'>('ALL');
  const [showSimulator, setShowSimulator] = useState(false);

  const filteredPoints = analysisPoints.filter(point =>
    filter === 'ALL' ? true : point.impact === filter
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 transition-colors">
        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
          <Filter className="w-5 h-5" />
          <span className="font-medium">Filtrar Análisis por Impacto:</span>
        </div>

        <div className="flex flex-wrap gap-2 w-full md:w-auto justify-center md:justify-start">
          <button
            onClick={() => setFilter('ALL')}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === 'ALL' ? 'bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700'}`}
          >
            Todos
          </button>
          <button
            onClick={() => setFilter(Sentiment.POSITIVE)}
            className={`whitespace-nowrap flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === Sentiment.POSITIVE ? 'bg-green-600 text-white shadow-lg shadow-green-900/20' : 'bg-green-50 text-green-700 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/40'}`}
          >
            <ThumbsUp className="w-4 h-4" /> Favorables
          </button>
          <button
            onClick={() => setFilter(Sentiment.NEGATIVE)}
            className={`whitespace-nowrap flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === Sentiment.NEGATIVE ? 'bg-red-600 text-white shadow-lg shadow-red-900/20' : 'bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40'}`}
          >
            <ThumbsDown className="w-4 h-4" /> Perjudiciales
          </button>
          <button
            onClick={() => setFilter(Sentiment.WARNING)}
            className={`whitespace-nowrap flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === Sentiment.WARNING ? 'bg-amber-500 text-white shadow-lg shadow-amber-900/20' : 'bg-amber-50 text-amber-700 hover:bg-amber-100 dark:bg-amber-900/20 dark:text-amber-400 dark:hover:bg-amber-900/40'}`}
          >
            <AlertTriangle className="w-4 h-4" /> Estructurales
          </button>
        </div>
      </div>

      {/* Botón de acceso directo al Simulador FAL */}
      <button
        onClick={() => setShowSimulator(true)}
        className="w-full group relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white p-4 rounded-xl shadow-lg shadow-indigo-900/20 transition-all transform hover:scale-[1.01] active:scale-[0.99]"
      >
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="relative flex items-center justify-center gap-3">
          <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
            <Calculator className="w-6 h-6" />
          </div>
          <div className="text-left">
            <h3 className="font-bold text-lg leading-tight">Simulá el impacto en tu bolsillo</h3>
            <p className="text-xs text-indigo-100 font-medium opacity-90">Compará tu indemnización actual vs. el Fondo de Cese Laboral</p>
          </div>
        </div>
      </button>

      <div className="grid grid-cols-1 gap-6">
        {filteredPoints.length > 0 ? (
          filteredPoints.map(point => (
            <AnalysisCard key={point.id} point={point} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center animate-fadeIn">
            {filter === Sentiment.POSITIVE ? (
              <div className="max-w-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm">
                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <SearchX className="w-8 h-8 text-slate-400 dark:text-slate-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">
                  No se encontraron medidas claramente favorables
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Tras el análisis comparativo del proyecto, <strong>no se han identificado artículos que amplíen derechos</strong> o beneficien directamente al trabajador respecto a la Ley de Contrato de Trabajo vigente.
                </p>
                <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-900/30 rounded-lg text-sm text-yellow-800 dark:text-yellow-400">
                  La reforma se centra principalmente en la <strong>flexibilización de normas</strong>, reducción de costos indemnizatorios para empleadores y la legalización de figuras no laborales, lo cual representa un retroceso en el marco protectorio tradicional.
                </div>
              </div>
            ) : (
              <div className="text-slate-500 dark:text-slate-400">
                No se encontraron puntos con el filtro seleccionado.
              </div>
            )}
          </div>
        )}
      </div>

      <FondoCeseSimulator
        isOpen={showSimulator}
        onClose={() => setShowSimulator(false)}
      />
    </div>
  );
};

export default AnalysisView;