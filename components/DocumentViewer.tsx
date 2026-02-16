import React, { useState, useEffect, useRef } from 'react';
import * as pdfjs from 'pdfjs-dist';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download, FileText } from 'lucide-react';

// Configure worker - using CDN to avoid build setup issues
// @ts-ignore
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const DocumentViewer: React.FC = () => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.2);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const renderTaskRef = useRef<pdfjs.RenderTask | null>(null);
  const pdfRef = useRef<pdfjs.PDFDocumentProxy | null>(null);

  useEffect(() => {
    const loadPdf = async () => {
      try {
        setLoading(true);
        // Load the PDF file
        const loadingTask = pdfjs.getDocument('/reforma_2026_ocr.pdf');
        const pdf = await loadingTask.promise;
        pdfRef.current = pdf;
        setNumPages(pdf.numPages);
        setLoading(false);
      } catch (err) {
        console.error("Error loading PDF:", err);
        setError("No se pudo cargar el documento PDF. Por favor verifica que el archivo exista.");
        setLoading(false);
      }
    };

    loadPdf();
  }, []);

  useEffect(() => {
    const renderPage = async () => {
      if (!pdfRef.current || !canvasRef.current) return;

      try {
        // Cancel previous render if any
        if (renderTaskRef.current) {
          renderTaskRef.current.cancel();
        }

        const page = await pdfRef.current.getPage(pageNumber);
        const viewport = page.getViewport({ scale });
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        if (!context) return;

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        const renderTask = page.render(renderContext);
        renderTaskRef.current = renderTask;

        await renderTask.promise;
      } catch (err: any) {
        if (err.name !== 'RenderingCancelledException') {
          console.error("Error rendering page:", err);
        }
      }
    };

    if (!loading && !error) {
      renderPage();
    }
  }, [pageNumber, scale, loading, error]);

  const changePage = (offset: number) => {
    setPageNumber(prevPageNumber => {
      const newPage = prevPageNumber + offset;
      if (newPage >= 1 && newPage <= numPages) {
        return newPage;
      }
      return prevPageNumber;
    });
  };

  const changeScale = (delta: number) => {
    setScale(prevScale => Math.max(0.5, Math.min(3.0, prevScale + delta)));
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center text-slate-500">
        <FileText className="w-16 h-16 mb-4 opacity-50" />
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Error al cargar documento</h3>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fadeIn">
      {/* Controls Toolbar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 sticky top-24 z-10">

        {/* Pagination */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => changePage(-1)}
            disabled={pageNumber <= 1}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed text-slate-600 dark:text-slate-400"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300 min-w-[80px] text-center">
            Pág {pageNumber} de {numPages || '--'}
          </span>
          <button
            onClick={() => changePage(1)}
            disabled={pageNumber >= numPages}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed text-slate-600 dark:text-slate-400"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 rounded-lg p-1">
          <button
            onClick={() => changeScale(-0.1)}
            className="p-1.5 rounded-md hover:bg-white dark:hover:bg-slate-700 shadow-sm transition-all text-slate-600 dark:text-slate-400"
            title="Reducir"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono w-12 text-center text-slate-500 dark:text-slate-400">
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={() => changeScale(0.1)}
            className="p-1.5 rounded-md hover:bg-white dark:hover:bg-slate-700 shadow-sm transition-all text-slate-600 dark:text-slate-400"
            title="Aumentar"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>

        {/* Actions */}
        <a
          href="/reforma_2026_ocr.pdf"
          download
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors ml-auto md:ml-0"
        >
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">Descargar PDF</span>
        </a>
      </div>

      {/* PDF Canvas Container */}
      <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 p-4 md:p-8 flex justify-center overflow-auto min-h-[500px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-500 text-sm animate-pulse">Cargando documento...</p>
          </div>
        ) : (
          <div className="shadow-2xl">
            <canvas ref={canvasRef} className="max-w-full h-auto rounded-lg bg-white" />
          </div>
        )}
      </div>

      <p className="text-xs text-slate-400 text-center mt-8 mb-4">
        Disclaimer: This content was generated using AI. While we strive for accuracy, we recommend that readers verify important information.
      </p>
    </div>
  );
};

export default DocumentViewer;