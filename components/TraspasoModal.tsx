import React from 'react';
import { X, Scale, CheckCircle2, AlertTriangle } from 'lucide-react';

interface TraspasoModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const TraspasoModal: React.FC<TraspasoModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-slate-700 animate-slideUp">

                {/* Header */}
                <div className="sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-start z-10">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 px-3 py-1 rounded-full text-xs font-bold border border-indigo-200 dark:border-indigo-700/50">
                                PÁGINAS 119 - 132
                            </span>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                            Acuerdo de Transferencia de la Justicia Nacional a CABA
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">

                    <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2 flex items-center gap-2">
                            <Scale className="w-5 h-5 text-indigo-500" />
                            ¿Qué Implica el Traspaso?
                        </h3>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                            El acuerdo transfiere la <strong>Justicia Nacional del Trabajo</strong> (80 juzgados y 10 salas) a la órbita de la <strong>Ciudad Autónoma de Buenos Aires (CABA)</strong>. Los jueces dejan de ser "Nacionales" y pasan a ser jueces locales de la Ciudad.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Perjuicios */}
                        <div className="bg-red-50 dark:bg-red-900/20 p-5 rounded-xl border border-red-100 dark:border-red-800">
                            <h3 className="text-lg font-bold text-red-700 dark:text-red-400 mb-4 flex items-center gap-2">
                                <AlertTriangle className="w-5 h-5" />
                                Impacto Negativo / Perjuicios
                            </h3>
                            <ul className="space-y-3">
                                <li className="flex gap-3 text-slate-700 dark:text-slate-300 text-sm">
                                    <span className="text-red-500 font-bold text-lg leading-none">•</span>
                                    <span><strong>Pérdida de Blindaje Nacional:</strong> Históricamente, el fuero Nacional ha sido un baluarte de protección al trabajador. Se teme que la justicia local sea más permeable a presiones políticas y empresariales de la Ciudad.</span>
                                </li>
                                <li className="flex gap-3 text-slate-700 dark:text-slate-300 text-sm">
                                    <span className="text-red-500 font-bold text-lg leading-none">•</span>
                                    <span><strong>Desfinanciación Posible:</strong> Si bien se transfieren recursos, el traspaso administrativo suele generar caos inicial y demoras en los expedientes ya iniciados (efecto "cuello de botella").</span>
                                </li>
                                <li className="flex gap-3 text-slate-700 dark:text-slate-300 text-sm">
                                    <span className="text-red-500 font-bold text-lg leading-none">•</span>
                                    <span><strong>Cambio de Criterios:</strong> Existe el riesgo de que los nuevos jueces designados por el Consejo de la Magistratura de la Ciudad tengan un perfil más pro-empresa o menos garantista que el fuero laboral histórico.</span>
                                </li>
                            </ul>
                        </div>

                        {/* Beneficios */}
                        <div className="bg-green-50 dark:bg-green-900/20 p-5 rounded-xl border border-green-100 dark:border-green-800">
                            <h3 className="text-lg font-bold text-green-700 dark:text-green-400 mb-4 flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5" />
                                Argumentos a Favor / Beneficios
                            </h3>
                            <ul className="space-y-3">
                                <li className="flex gap-3 text-slate-700 dark:text-slate-300 text-sm">
                                    <span className="text-green-600 font-bold text-lg leading-none">•</span>
                                    <span><strong>Cercanía Institucional:</strong> Se cumple con la Constitución Nacional (Art. 129) y la autonomía de la Ciudad. La justicia laboral pasa a ser gestionada donde ocurren los conflictos.</span>
                                </li>
                                <li className="flex gap-3 text-slate-700 dark:text-slate-300 text-sm">
                                    <span className="text-green-600 font-bold text-lg leading-none">•</span>
                                    <span><strong>Modernización Procesal:</strong> La CABA cuenta con códigos procesales más modernos que podrían, teóricamente, agilizar los juicios laborales (digitalización, oralidad).</span>
                                </li>
                                <li className="flex gap-3 text-slate-700 dark:text-slate-300 text-sm">
                                    <span className="text-green-600 font-bold text-lg leading-none">•</span>
                                    <span><strong>Unificación:</strong> Se termina la anomalía de que la justicia "Nacional" intervenga en conflictos que son de derecho común y local.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mt-0.5 shrink-0" />
                        <div>
                            <h4 className="font-bold text-indigo-800 dark:text-indigo-300 text-sm">Saldo Final para el Trabajador</h4>
                            <p className="text-sm text-indigo-700 dark:text-indigo-400 mt-1">
                                El cambio es principalmente institucional. El riesgo inmediato no es normativo (la Ley de Contrato de Trabajo sigue siendo la misma) sino <strong>político y procesal</strong>: ¿Será la nueva justicia local tan protectora e independiente como la Justicia Nacional?
                            </p>
                        </div>
                    </div>

                </div>

                {/* Footer */}
                <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-medium hover:opacity-90 transition-opacity shadow-lg shadow-slate-900/10"
                    >
                        Cerrar Análisis
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TraspasoModal;
