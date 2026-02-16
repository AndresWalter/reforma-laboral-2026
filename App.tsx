import React, { useState, useEffect } from 'react';
import { LayoutDashboard, FileText, Scale, Image as ImageIcon, Sun, Moon, Mountain, Heart } from 'lucide-react';
import DocumentViewer from './components/DocumentViewer';
import AnalysisView from './components/AnalysisView';
import InfographicsView from './components/InfographicsView';
import GlaciaresView from './components/GlaciaresView';
import TraspasoModal from './components/TraspasoModal';
import ChatBot from './components/ChatBot';

function App() {
  const [activeTab, setActiveTab] = useState<'analysis' | 'document' | 'infographics' | 'glaciares'>('analysis');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showTraspaso, setShowTraspaso] = useState(false);

  // Apply dark mode class to html element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const renderContent = () => {
    switch (activeTab) {
      case 'analysis': return <AnalysisView />;
      case 'document': return <DocumentViewer />;
      case 'infographics': return <InfographicsView />;
      case 'glaciares': return <GlaciaresView />;
      default: return <AnalysisView />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans text-slate-900 dark:text-slate-100 pb-24 md:pb-0 transition-colors duration-300">
      {/* Desktop Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 hidden md:block transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-2.5 rounded-xl shadow-lg shadow-blue-900/20">
              <Scale className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Observatorio Legal</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Ley de Modernización Laboral</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <nav className="flex items-center bg-slate-100 dark:bg-slate-800 p-1.5 rounded-xl border border-transparent dark:border-slate-700">
              <button
                onClick={() => setActiveTab('analysis')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === 'analysis'
                  ? 'bg-white dark:bg-slate-700 text-blue-700 dark:text-blue-400 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-700/50'
                  }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                Análisis
              </button>
              <button
                onClick={() => setActiveTab('infographics')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === 'infographics'
                  ? 'bg-white dark:bg-slate-700 text-blue-700 dark:text-blue-400 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-700/50'
                  }`}
              >
                <ImageIcon className="w-4 h-4" />
                Infografías
              </button>
              <button
                onClick={() => setActiveTab('document')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === 'document'
                  ? 'bg-white dark:bg-slate-700 text-blue-700 dark:text-blue-400 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-700/50'
                  }`}
              >
                <FileText className="w-4 h-4" />
                Documento
              </button>
            </nav>

            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setActiveTab('glaciares')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all border ${activeTab === 'glaciares'
                ? 'bg-cyan-50 dark:bg-cyan-600 text-cyan-700 dark:text-white border-cyan-200 dark:border-cyan-500 shadow-lg shadow-cyan-900/20'
                : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-cyan-300 dark:hover:border-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-300'
                }`}
            >
              <Mountain className="w-4 h-4" />
              Ley de Glaciares
            </button>
            <button
              onClick={() => setShowTraspaso(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-900/50 border border-indigo-200 dark:border-indigo-800 transition-colors"
            >
              Reforma Laboral - Anexo 1 - Transferencia de justicia
            </button>

            <a
              href="https://mpago.li/2oP8F4o"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-900/20 transition-all active:scale-95"
            >
              <Heart className="w-4 h-4 fill-current" />
              Apoyar Proyecto
            </a>
          </div>
        </div>
      </header>

      {/* Mobile Top Bar */}
      <div className="md:hidden bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-2 rounded-lg shadow-md">
            <Scale className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-900 dark:text-white leading-tight">Observatorio Legal</h1>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wide">Ley de Modernización</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          {/* Mobile Actions Menu */}
          <div className="relative group">
            <button className="p-2 rounded-md bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
              <LayoutDashboard className="w-5 h-5 rotate-90" />
            </button>
            <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 p-2 hidden group-focus-within:block">
              <button
                onClick={() => setActiveTab('glaciares')}
                className={`flex items-center gap-2 w-full text-left px-4 py-3 rounded-lg text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 mb-1 ${activeTab === 'glaciares' ? 'text-cyan-600 font-bold bg-cyan-50 dark:bg-cyan-900/20' : 'text-slate-700 dark:text-slate-200'}`}
              >
                <Mountain className="w-4 h-4" />
                Ley de Glaciares
              </button>
              <button
                onClick={() => setActiveTab('analysis')}
                className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 ${activeTab === 'analysis' ? 'text-blue-600 font-bold' : 'text-slate-500'}`}
              >
                Volver a Análisis
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">

        {/* Intro Section */}
        {activeTab === 'analysis' && (
          <div className="bg-white dark:bg-slate-900 border border-blue-100 dark:border-blue-900/30 rounded-2xl p-6 mb-8 shadow-sm relative overflow-hidden transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 dark:bg-blue-900/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Análisis de Impacto</h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-3xl">
                Esta herramienta interactiva contrasta los puntos clave del nuevo proyecto de ley con la legislación vigente.
                Utiliza las tarjetas a continuación para entender qué cambia, qué derechos se modifican y cómo impacta en tu futuro laboral.
              </p>
              <div className="mt-4 flex items-center gap-3">
                <a
                  href="https://mpago.li/2oP8F4o"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  <Heart className="w-3.5 h-3.5" />
                  ¿Te resultó útil? Apoyá este observatorio independiente
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Content */}
        <div className="transition-all duration-300 ease-in-out">
          {renderContent()}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pb-safe z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] transition-colors">
        <div className="flex justify-around items-center h-16">
          <button
            onClick={() => setActiveTab('analysis')}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${activeTab === 'analysis' ? 'text-blue-600 dark:text-blue-300' : 'text-slate-500 dark:text-slate-300 hover:text-slate-700 dark:hover:text-slate-100'
              }`}
          >
            <LayoutDashboard className={`w-6 h-6 ${activeTab === 'analysis' ? 'fill-current' : ''}`} strokeWidth={activeTab === 'analysis' ? 2 : 2} />
            <span className="text-[10px] font-medium">Análisis</span>
          </button>

          <button
            onClick={() => setActiveTab('infographics')}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${activeTab === 'infographics' ? 'text-blue-600 dark:text-blue-300' : 'text-slate-500 dark:text-slate-300 hover:text-slate-700 dark:hover:text-slate-100'
              }`}
          >
            <ImageIcon className={`w-6 h-6 ${activeTab === 'infographics' ? 'fill-current' : ''}`} strokeWidth={activeTab === 'infographics' ? 2 : 2} />
            <span className="text-[10px] font-medium">Infografías</span>
          </button>

          <button
            onClick={() => setActiveTab('document')}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${activeTab === 'document' ? 'text-blue-600 dark:text-blue-300' : 'text-slate-500 dark:text-slate-300 hover:text-slate-700 dark:hover:text-slate-100'
              }`}
          >
            <FileText className={`w-6 h-6 ${activeTab === 'document' ? 'fill-current' : ''}`} strokeWidth={activeTab === 'document' ? 2 : 2} />
            <span className="text-[10px] font-medium">Documento</span>
          </button>

          <button
            onClick={() => setShowTraspaso(true)}
            className="flex flex-col items-center justify-center w-full h-full space-y-1 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200"
          >
            <Scale className="w-6 h-6" strokeWidth={2} />
            <span className="text-[10px] font-bold">Anexo 1</span>
          </button>

          <a
            href="https://mpago.li/2oP8F4o"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center w-full h-full space-y-1 text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-200"
          >
            <Heart className="w-6 h-6 fill-current" strokeWidth={2} />
            <span className="text-[10px] font-bold">Apoyar</span>
          </a>
        </div>
      </nav>

      <TraspasoModal isOpen={showTraspaso} onClose={() => setShowTraspaso(false)} />
      <ChatBot />
    </div >
  );
}

export default App;