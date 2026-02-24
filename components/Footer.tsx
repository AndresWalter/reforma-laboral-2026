import React from 'react';
import { Mail, Scale } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-12 pb-24 md:pb-12 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {/* Brand & Mission */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-2 rounded-lg shadow-md">
                                <Scale className="w-5 h-5 text-white" />
                            </div>
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Observatorio Legal</h2>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            Una plataforma independiente dedicada a clarificar el impacto de la Reforma Laboral 2026 en Argentina,
                            brindando herramientas de análisis accesibles para todos los ciudadanos.
                        </p>
                    </div>

                    {/* Contact */}
                    <div className="space-y-6">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Contacto</h3>
                        <div className="flex items-center gap-4">
                            <a
                                href="mailto:enrique215walter@gmail.com"
                                title="Contactar por email"
                                className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all border border-transparent hover:border-indigo-200 dark:hover:border-indigo-800 group"
                            >
                                <Mail className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 dark:text-slate-500 font-medium">
                    <p>© 2026 Observatorio Legal Argentina. Todos los derechos reservados.</p>
                    <div className="flex gap-6">
                        <span>Hecho para la comunidad</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
