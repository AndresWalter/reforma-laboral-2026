import React, { useState, useMemo } from 'react';

interface SegmentData {
  id: string;
  label: string;
  start: number;
  duration: number;
  color: string;
  icon?: string;
  parentId?: string;
}

const ThreeEightsChart: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [centerText, setCenterText] = useState({ title: '24 Horas', sub: 'Equilibrio Vital' });

  const RADIUS_INNER = 110;
  const RADIUS_OUTER = 175;
  const CENTER = 200;

  const segments: SegmentData[] = [
    {
      id: 'rest',
      label: 'Descanso',
      start: 23,
      duration: 8,
      color: '#6366f1', // Indigo 500
      icon: '🌙'
    },
    {
      id: 'prep',
      label: 'Personal',
      start: 7,
      duration: 2,
      color: '#10b981', // Emerald 500
      parentId: 'leisure'
    },
    {
      id: 'work',
      label: 'Trabajo',
      start: 9,
      duration: 8,
      color: '#f97316', // Orange 500
      icon: '💼'
    },
    {
      id: 'leisure_pm',
      label: 'Esparcimiento',
      start: 17,
      duration: 6,
      color: '#10b981', // Emerald 500
      parentId: 'leisure',
      icon: '🌱'
    }
  ];

  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };

  const describeArc = (x: number, y: number, innerRadius: number, outerRadius: number, startAngle: number, endAngle: number) => {
    const startOuter = polarToCartesian(x, y, outerRadius, endAngle);
    const endOuter = polarToCartesian(x, y, outerRadius, startAngle);
    const startInner = polarToCartesian(x, y, innerRadius, endAngle);
    const endInner = polarToCartesian(x, y, innerRadius, startAngle);

    const arcSweep = endAngle - startAngle <= 180 ? "0" : "1";

    return [
      "M", startOuter.x, startOuter.y,
      "A", outerRadius, outerRadius, 0, arcSweep, 0, endOuter.x, endOuter.y,
      "L", endInner.x, endInner.y,
      "A", innerRadius, innerRadius, 0, arcSweep, 1, startInner.x, startInner.y,
      "L", startOuter.x, startOuter.y
    ].join(" ");
  };

  const ticks = useMemo(() => {
    const tempTicks = [];
    for (let i = 0; i < 24; i++) {
      const angle = i * 15;
      const tickStart = polarToCartesian(CENTER, CENTER, 182, angle);
      const tickEnd = polarToCartesian(CENTER, CENTER, 192, angle);
      const labelPos = polarToCartesian(CENTER, CENTER, 160, angle);

      tempTicks.push({
        i,
        x1: tickStart.x,
        y1: tickStart.y,
        x2: tickEnd.x,
        y2: tickEnd.y,
        lx: labelPos.x,
        ly: labelPos.y,
        showLabel: i % 2 === 0
      });
    }
    return tempTicks;
  }, []);

  const handleHover = (id: string | null, label?: string, duration?: number) => {
    setHoveredId(id);
    if (id && label && duration) {
      setCenterText({ title: label, sub: `${duration} Horas` });
    } else {
      setCenterText({ title: '24 Horas', sub: 'Equilibrio Vital' });
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-6 md:p-8 max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-8 border border-slate-100 dark:border-slate-800 transition-colors">
      
      {/* Gráfico SVG */}
      <div className="relative w-full max-w-[380px] aspect-square flex-shrink-0">
        <svg viewBox="0 0 400 400" className="w-full h-full transform -rotate-90 rounded-full">
          <circle cx="200" cy="200" r="198" fill="transparent" className="stroke-slate-100 dark:stroke-slate-800" strokeWidth="1"/>
          
          {/* Segmentos */}
          <g>
            {segments.map((seg) => {
              const startDeg = seg.start * 15;
              const endDeg = (seg.start + seg.duration) * 15;
              const isHovered = hoveredId === (seg.parentId || seg.id);
              
              return (
                <path
                  key={seg.id}
                  d={describeArc(CENTER, CENTER, RADIUS_INNER, RADIUS_OUTER, startDeg, endDeg)}
                  fill={seg.color}
                  className="transition-all duration-300 cursor-pointer"
                  style={{ 
                    opacity: hoveredId ? (isHovered ? 1 : 0.3) : 0.8,
                    transform: isHovered ? 'scale(1.02)' : 'scale(1)',
                    transformOrigin: 'center',
                    filter: isHovered ? 'drop-shadow(0px 4px 8px rgba(0,0,0,0.2))' : 'none'
                  }}
                  onMouseEnter={() => handleHover(seg.parentId || seg.id, seg.label, seg.parentId === 'leisure' ? 8 : seg.duration)}
                  onMouseLeave={() => handleHover(null)}
                />
              );
            })}
          </g>
          
          {/* Marcas de tiempo */}
          <g>
            {ticks.map((tick) => (
              <React.Fragment key={tick.i}>
                <line
                  x1={tick.x1} y1={tick.y1} x2={tick.x2} y2={tick.y2}
                  className="stroke-slate-300 dark:stroke-slate-600"
                  strokeWidth="1"
                />
                {tick.showLabel && (
                  <text
                    x={tick.lx} y={tick.ly}
                    className="text-[10px] fill-slate-400 dark:fill-slate-500 font-medium"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    transform={`rotate(90, ${tick.lx}, ${tick.ly})`}
                  >
                    {tick.i < 10 ? `0${tick.i}` : tick.i}
                  </text>
                )}
              </React.Fragment>
            ))}
          </g>
          
          {/* Centro */}
          <circle cx="200" cy="200" r="105" className="fill-white dark:fill-slate-900" />
          
          <g transform="rotate(90, 200, 200)">
            <text x="200" y="195" textAnchor="middle" className="text-2xl font-bold fill-slate-800 dark:fill-white font-sans">
              {centerText.title}
            </text>
            <text x="200" y="220" textAnchor="middle" className="text-sm fill-slate-500 dark:fill-slate-400 font-sans">
              {centerText.sub}
            </text>
          </g>
        </svg>
      </div>

      {/* Leyenda y Explicación */}
      <div className="flex-1 space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-3">La Regla de los 3 Ochos</h1>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm md:text-base">
            El equilibrio ideal propuesto históricamente para la jornada diaria: <span className="font-semibold text-slate-900 dark:text-slate-200">Trabajo, Recreo y Descanso.</span>
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1">
          {/* Ítem Descanso */}
          <div 
            className={`flex items-center p-3 rounded-xl border transition-all cursor-default ${hoveredId === 'rest' ? 'bg-indigo-50 border-indigo-200 dark:bg-indigo-900/20 dark:border-indigo-800' : 'bg-slate-50 dark:bg-slate-800/50 border-transparent'}`}
            onMouseEnter={() => handleHover('rest', 'Descanso', 8)}
            onMouseLeave={() => handleHover(null)}
          >
            <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white text-lg shadow-sm mr-4 shrink-0">🌙</div>
            <div>
              <h3 className="font-bold text-indigo-900 dark:text-indigo-300 text-sm">Descanso (8h)</h3>
              <p className="text-xs text-indigo-700/80 dark:text-indigo-400/80">Recuperación y sueño (23:00 - 07:00)</p>
            </div>
          </div>

          {/* Ítem Trabajo */}
          <div 
            className={`flex items-center p-3 rounded-xl border transition-all cursor-default ${hoveredId === 'work' ? 'bg-orange-50 border-orange-200 dark:bg-orange-900/20 dark:border-orange-800' : 'bg-slate-50 dark:bg-slate-800/50 border-transparent'}`}
            onMouseEnter={() => handleHover('work', 'Trabajo', 8)}
            onMouseLeave={() => handleHover(null)}
          >
            <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white text-lg shadow-sm mr-4 shrink-0">💼</div>
            <div>
              <h3 className="font-bold text-orange-900 dark:text-orange-300 text-sm">Trabajo (8h)</h3>
              <p className="text-xs text-orange-700/80 dark:text-orange-400/80">Productividad y enfoque (09:00 - 17:00)</p>
            </div>
          </div>

          {/* Ítem Esparcimiento */}
          <div 
            className={`flex items-center p-3 rounded-xl border transition-all cursor-default ${hoveredId === 'leisure' ? 'bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800' : 'bg-slate-50 dark:bg-slate-800/50 border-transparent'}`}
            onMouseEnter={() => handleHover('leisure', 'Esparcimiento', 8)}
            onMouseLeave={() => handleHover(null)}
          >
            <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white text-lg shadow-sm mr-4 shrink-0">🌱</div>
            <div>
              <h3 className="font-bold text-emerald-900 dark:text-emerald-300 text-sm">Esparcimiento (8h)</h3>
              <p className="text-xs text-emerald-700/80 dark:text-emerald-400/80">Vida personal, ocio y traslados</p>
            </div>
          </div>
        </div>

        {/* Origen Histórico */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-sm font-bold text-slate-800 dark:text-white mb-2 flex items-center gap-2">
            <span className="text-indigo-500">📜</span> Origen Histórico
          </h2>
          <div className="bg-slate-50 dark:bg-slate-800/30 rounded-lg p-3 text-[11px] md:text-xs text-slate-600 dark:text-slate-400 leading-relaxed border border-slate-100 dark:border-slate-800">
            <p className="mb-2">
              Propuesta en <strong>1817</strong> por <strong>Robert Owen</strong> surgida como respuesta a las jornadas extenuantes de la Revolución Industrial. Owen buscaba demostrar que el bienestar era esencial para una sociedad sostenible.
            </p>
            <blockquote className="italic text-slate-500 border-l-2 border-indigo-300 pl-3 py-1 bg-white/50 dark:bg-slate-900/50 rounded-r">
              "Ocho horas de trabajo, ocho horas de recreo, ocho horas de descanso."
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreeEightsChart;
