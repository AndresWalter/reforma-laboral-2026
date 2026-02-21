import React, { useState, useEffect } from 'react';
import { Calculator, X, AlertTriangle, TrendingDown, Info } from 'lucide-react';
import { supabase } from '../src/supabase';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  defaultSalary?: number;
}

const FondoCeseSimulator: React.FC<Props> = ({ isOpen, onClose, defaultSalary = 800000 }) => {
  const [salary, setSalary] = useState(defaultSalary);
  const [salaryInput, setSalaryInput] = useState(defaultSalary.toLocaleString('es-AR'));
  const [years, setYears] = useState(5);
  const [indemnizacionActual, setIndemnizacionActual] = useState(0);
  const [fondoCese, setFondoCese] = useState(0);
  const [lossPercentage, setLossPercentage] = useState(0);

  useEffect(() => {
    // Cálculo Indemnización Actual (Art. 245 LCT): 1 sueldo por año
    // Se toma el MEJOR sueldo actual.
    const current = salary * years;
    setIndemnizacionActual(current);

    // Cálculo Fondo Cese (Estimación)
    // El fondo acumula un % mensual (aprox 8%). 
    // Problema: Acumula sobre sueldos HISTÓRICOS. 
    // En Argentina, con inflación, los sueldos de hace 5 años eran nominalmente infinitamente menores.
    // Aunque el fondo capitalice, difícilmente le gana a la actualización "de golpe" que hace el Art. 245 (tomar sueldo actual para TODA la antigüedad).
    // Estimamos una pérdida estructural del 30% al 40% en capacidad de compra real al momento del despido comparado con el sistema actual.
    // Factor de corrección: 0.65 (asumiendo pérdida del 35% por licuación histórica + comisiones de administración)
    const falEstimation = current * 0.65;

    setFondoCese(falEstimation);
    setLossPercentage(35); // 35% de pérdida

    // Registro automático en Supabase con Debounce
    const timer = setTimeout(async () => {
      if (salary > 0 && years > 0) {
        try {
          await supabase.from('simulaciones_impacto').insert([
            {
              sueldo_bruto: salary,
              antiguedad: years,
              indemnizacion_actual: current,
              fondo_cese_estimado: falEstimation,
              porcentaje_perdida: 35,
              metadata: { source: 'simulator_v1' }
            }
          ]);
        } catch (error) {
          console.error("Error al guardar la simulación:", error);
        }
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [salary, years]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="bg-slate-50 dark:bg-slate-800/50 p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2.5 rounded-lg">
              <Calculator className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">
                Simulador de Impacto
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Mochila Austriaca vs. Indemnización Actual
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1">

          {/* Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Tu Sueldo Bruto Actual
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                <input
                  type="text"
                  value={salaryInput}
                  onChange={(e) => {
                    // Solo permitir números y puntos de miles
                    const rawValue = e.target.value.replace(/\D/g, '');
                    const numValue = Number(rawValue);

                    if (!isNaN(numValue)) {
                      setSalary(numValue);
                      // Formatear con puntos para la vista
                      setSalaryInput(numValue.toLocaleString('es-AR'));
                    }
                  }}
                  className="w-full pl-8 pr-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Años de Antigüedad
              </label>
              <div className="relative">
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex justify-between mt-2">
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-1 rounded">{years} Años</span>
                </div>
              </div>
            </div>
          </div>

          {/* Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

            {/* Card Actual */}
            <div className="bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-800/30 rounded-xl p-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3 opacity-10">
                <CheckCircleIcon className="w-24 h-24" />
              </div>
              <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-2">
                Sistema Actual (Art. 245)
              </p>
              <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                {new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(indemnizacionActual)}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                1 Sueldo <strong>ACTUAL</strong> por año
              </p>
            </div>

            {/* Card FAL */}
            <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/30 rounded-xl p-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3 opacity-10">
                <TrendingDown className="w-24 h-24" />
              </div>
              <p className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider mb-2">
                Fondo Cese (Estimado)
              </p>
              <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                ~ {new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(fondoCese)}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Acumulado histórico variable
              </p>
            </div>
          </div>

          {/* Result Alert */}
          <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
            <div className="flex items-start gap-3">
              <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-full shrink-0">
                <TrendingDown className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg">
                  Perderías un {lossPercentage}% aprox.
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  Con el Fondo de Cese, tu indemnización deja de calcularse sobre tu <strong>mejor sueldo actual</strong>. Pasa a depender de un acumulado histórico que se devalúa con la inflación.
                </p>
                <div className="mt-3 flex items-start gap-2 text-xs text-slate-500 dark:text-slate-400 bg-white dark:bg-black/20 p-3 rounded-lg border border-slate-200 dark:border-slate-700/50">
                  <Info className="w-4 h-4 shrink-0 mt-0.5" />
                  <p>
                    Además, el "Fondo" se financia con un porcentaje (aprox 8%) que suele salir de la masa salarial. Es decir, es <strong>salario diferido</strong> que dejas de cobrar hoy para pagar tu propio despido mañana.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Detalles Legales (Acordeón) */}
          <div className="mt-6 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-slate-50/50 dark:bg-slate-800/30">
            <details className="group">
              <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors">
                <span className="font-semibold text-sm text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  ¿Cómo se calcula según la Ley? (Letra chica)
                </span>
                <span className="text-slate-400 group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>

              <div className="px-6 pb-6 text-sm text-slate-600 dark:text-slate-300 space-y-4 animate-fadeIn border-t border-slate-100 dark:border-slate-700/50">
                <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg">
                  <h4 className="font-bold text-slate-800 dark:text-white mb-2">1. Lo que paga la empresa (Aporte Mensual)</h4>
                  <p className="mb-2">El empleador deposita mensualmente en tu cuenta del Fondo:</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li><strong>Grandes Empresas:</strong> 1% de la nómina salarial.</li>
                    <li><strong>PyMES:</strong> 2,5% de la nómina salarial.</li>
                  </ul>
                  <p className="text-xs text-slate-500 mt-2 italic">
                    *Este costo suele trasladarse a precios o restarse de futuros aumentos (salario diferido).
                  </p>
                </div>

                <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg">
                  <h4 className="font-bold text-slate-800 dark:text-white mb-2">2. Lo que cobrás vos (Indemnización)</h4>
                  <p className="mb-2">
                    La fórmula es: <code>Mejor Remuneración × Años de Antigüedad</code>.
                    <br />
                    Pero la "Mejor Remuneración" tiene <strong>recortes claves</strong> (Art. 52):
                  </p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li className="text-red-600 dark:text-red-400 font-medium">⛔ Exclusión del Aguinaldo (SAC).</li>
                    <li className="text-red-600 dark:text-red-400 font-medium">⛔ Exclusión de Bonos y Premios (no mensuales).</li>
                    <li><strong>Promedios:</strong> Para comisiones/horas extras se toma el promedio de los últimos 6 meses.</li>
                    <li><strong>Tope:</strong> No puede superar 3 veces el promedio del convenio.</li>
                  </ul>
                </div>

                <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 rounded-lg">
                  <h4 className="font-bold text-indigo-800 dark:text-indigo-300 mb-2">Ejemplo Práctico (Sueldo $1.000.000)</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-2 bg-white/50 dark:bg-black/20 rounded-lg">
                      <span className="block font-bold text-gray-500 mb-1">Sistema Anterior</span>
                      <div className="font-medium">Base: $1.083.000 (con SAC prop.)</div>
                      <div className="text-emerald-600 font-bold text-lg">$5.415.000</div>
                    </div>
                    <div className="p-2 bg-white/50 dark:bg-black/20 rounded-lg">
                      <span className="block font-bold text-gray-500 mb-1">Nuevo Sistema FAL</span>
                      <div className="font-medium">Base: $1.000.000 (LIMPIA)</div>
                      <div className="text-red-600 font-bold text-lg">$5.000.000</div>
                    </div>
                  </div>
                  <p className="mt-2 text-xs opacity-80">
                    * Diferencia inicial de $415.000 menos, sin contar la pérdida por inflación acumulada en el fondo.
                  </p>
                </div>
              </div>
            </details>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-lg hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper icon component since CheckCircle2 might not be available or I want a custom one
const CheckCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <path d="m9 11 3 3L22 4" />
  </svg>
);

export default FondoCeseSimulator;
