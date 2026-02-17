import * as React from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';

interface Props {
    children: React.ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends React.Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    private handleReset = () => {
        this.setState({ hasError: false, error: null });
        window.location.reload();
    };

    private handleGoHome = () => {
        this.setState({ hasError: false, error: null });
        window.location.href = '/';
    };

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 transition-colors duration-300">
                    <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-fadeIn">
                        <div className="p-8 text-center">
                            <div className="w-20 h-20 bg-rose-100 dark:bg-rose-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                                <AlertCircle className="w-10 h-10 text-rose-600 dark:text-rose-400" />
                            </div>

                            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                                Algo no salió como esperábamos
                            </h1>

                            <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                                La aplicación encontró un error inesperado al intentar cargar el contenido.
                            </p>

                            {import.meta.env.DEV && this.state.error && (
                                <div className="mb-8 p-4 bg-slate-100 dark:bg-slate-800 rounded-xl text-left overflow-auto max-h-40">
                                    <p className="text-xs font-mono text-rose-500 mb-2">Error Debug:</p>
                                    <code className="text-[10px] text-slate-700 dark:text-slate-300">
                                        {this.state.error.toString()}
                                    </code>
                                </div>
                            )}

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <button
                                    onClick={this.handleReset}
                                    className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-900/20 active:scale-95"
                                >
                                    <RefreshCw className="w-4 h-4" />
                                    Reintentar
                                </button>

                                <button
                                    onClick={this.handleGoHome}
                                    className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl transition-all active:scale-95"
                                >
                                    <Home className="w-4 h-4" />
                                    Inicio
                                </button>
                            </div>
                        </div>

                        <div className="px-8 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 text-center">
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                Punto de control de errores activado.
                            </p>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
