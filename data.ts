import { AnalysisPoint, DocumentChapter, Sentiment, Infographic } from './types';

// Updated Infographics based on user provided images
export const infographics: Infographic[] = [
  {
    id: 'info-2',
    title: 'Análisis Crítico de la Reforma',
    src: '/infographics/slide-2.jpg',
    description: 'Portada del análisis crítico sobre la modernización vs retroceso.'
  },
  {
    id: 'info-3',
    title: 'Cambio de Paradigma',
    src: '/infographics/slide-3.jpg',
    description: 'Impacto económico, erosión del vínculo laboral y neutralización de la acción colectiva.'
  },
  {
    id: 'info-1',
    title: 'Legalización del Fraude Laboral',
    src: '/infographics/slide-1.jpg',
    description: 'Comparativa sobre la presunción de laboralidad y la carga de la prueba.'
  },
  {
    id: 'info-4',
    title: 'Eliminación de Multas',
    src: '/infographics/slide-4.jpg',
    description: 'Comparativa sobre la eliminación de multas por trabajo no registrado.'
  },
  {
    id: 'info-5',
    title: 'Reducción de Indemnización',
    src: '/infographics/slide-5.jpg',
    description: 'Reducción de la base de cálculo para la indemnización por despido.'
  },
  {
    id: 'info-6',
    title: 'Dilución de Responsabilidad',
    src: '/infographics/slide-6.jpg',
    description: 'Cambios en la responsabilidad solidaria en casos de tercerización.'
  },
  {
    id: 'info-7',
    title: 'Formalizando la Inestabilidad',
    src: '/infographics/slide-7.jpg',
    description: 'Extensión de períodos de prueba y trabajadores de plataformas.'
  },
  {
    id: 'info-8',
    title: 'Limitación del Derecho a Huelga',
    src: '/infographics/slide-8.jpg',
    description: 'Nuevas definiciones de servicios esenciales y trascendentales.'
  },
  {
    id: 'info-9',
    title: 'Bloqueos: Nueva Causal de Despido',
    src: '/infographics/slide-9.jpg',
    description: 'Los bloqueos y tomas pasan a ser causal objetiva de despido.'
  },
  {
    id: 'info-10',
    title: 'Panorama Completo: Desprotección',
    src: '/infographics/slide-10.jpg',
    description: 'Hacia un nuevo paradigma de desprotección laboral.'
  }
];

export const summaryInfographics: Infographic[] = [
  {
    id: 'sum-2',
    title: 'Un Paso Atrás',
    src: '/infographics/summary-new-2.png',
    description: 'Resumen gráfico de los principales retrocesos en derechos laborales.'
  },
  {
    id: 'sum-4',
    title: 'Balance General',
    src: '/infographics/summary-4.jpg',
    description: 'Comparativa de protección vs precarización entre la ley actual y la reforma.'
  },
  {
    id: 'sum-3',
    title: 'Solidaridad y Prueba',
    src: '/infographics/summary-3.jpg',
    description: 'Impacto en responsabilidad solidaria y cambios en el período de prueba.'
  }
];

export const glaciaresInfographics: Infographic[] = [
  {
    id: 'glac-5',
    title: '¿Reserva o Inversión?',
    src: '/glaciares/slide-5.jpg',
    description: 'Glaciares argentinos: la tensión entre conservación y explotación.'
  },
  {
    id: 'glac-1',
    title: 'Reserva de Agua',
    src: '/glaciares/slide-1.jpg',
    description: 'Los glaciares como recurso estratégico y reserva de agua dulce.'
  },
  {
    id: 'glac-2',
    title: 'Reforma de Ley',
    src: '/glaciares/slide-2.jpg',
    description: 'Propuesta de modificación de la Ley de Glaciares.'
  },
  {
    id: 'glac-3',
    title: 'Visiones del Futuro',
    src: '/glaciares/slide-3.jpg',
    description: 'Contraste entre protección ambiental y desarrollo económico.'
  },
  {
    id: 'glac-4',
    title: 'Ambiente Periglacial',
    src: '/glaciares/slide-4.jpg',
    description: 'El debate sobre la protección del ambiente periglacial.'
  },
  {
    id: 'glac-6',
    title: 'Actividades Prohibidas',
    src: '/glaciares/slide-6.jpg',
    description: 'El Impacto Práctico: ¿Qué Actividades se Prohíben?'
  },
  {
    id: 'glac-7',
    title: 'Inventario Nacional',
    src: '/glaciares/slide-7.jpg',
    description: 'El Inventario Nacional: La Herramienta que Define los Límites.'
  },
  {
    id: 'glac-8',
    title: 'Argumento del Gobierno',
    src: '/glaciares/slide-8.jpg',
    description: 'Previsibilidad para Destrabar la Inversión.'
  },
  {
    id: 'glac-9',
    title: 'Alerta Científica',
    src: '/glaciares/slide-9.jpg',
    description: 'La Alerta Científica y Ambiental: La Integridad de las Reservas Hídricas.'
  },
  {
    id: 'glac-10',
    title: 'Futuros Posibles',
    src: '/glaciares/slide-10.jpg',
    description: 'En Balanza: Protección Hídrica vs Desarrollo Económico.'
  }
];

export const glaciaresSummary: Infographic[] = [

  {
    id: 'glac-sum-2',
    title: 'Agua o Minería',
    src: '/glaciares/resumen-2.jpg',
    description: 'Infografía detallada sobre el impacto de la reforma en la protección de glaciares.'
  },
  {
    id: 'glac-sum-3',
    title: 'Impacto de la Reforma',
    src: '/glaciares/resumen-final.jpg',
    description: 'Análisis detallado: ¿Protección del Agua o Vía Libre a la Minería?'
  }
];

export const analysisPoints: AnalysisPoint[] = [
  // --- PERJUDICIALES (Sentiment.NEGATIVE) ---
  {
    id: '1',
    title: 'Eliminación de Multas (Trabajo "En Negro")',
    reformDescription: 'Se eliminan las multas para el empleador que no registre. El trabajador NO recibe indemnización extra. El Estado condona la deuda.',
    currentLawDescription: 'Compensación económica directa al trabajador por no estar registrado. Indemnizaciones agravadas que duplican el monto.',
    impact: Sentiment.NEGATIVE,
    articleReference: 'Derogación Arts 8-15 Ley 24.013'
  },
  {
    id: '2',
    title: 'Reducción de Indemnización por Despido',
    reformDescription: 'Mejor remuneración mensual SIN aguinaldo ni bonos. Excluye explícitamente aguinaldo, premios y bonificaciones de la base de cálculo.',
    currentLawDescription: 'Base de cálculo amplia que a menudo incluye o prorratea el aguinaldo (SAC) y bonos anuales.',
    impact: Sentiment.NEGATIVE,
    articleReference: 'Art. 245 LCT (Base de cálculo)'
  },
  {
    id: '3',
    title: 'Extensión del Período de Prueba',
    reformDescription: 'Extensión a 6-8 meses (Agrario) y 6 meses (Doméstico). Despidos sin costo durante este lapso mayor.',
    currentLawDescription: 'Período de prueba general es de 3 meses. Mayor estabilidad laboral con períodos breves.',
    impact: Sentiment.NEGATIVE,
    articleReference: 'Art. 92 bis LCT'
  },
  {
    id: '4',
    title: 'Debilitamiento de la Presunción de Contrato',
    reformDescription: 'La presunción de contrato de trabajo NO se aplicará si se emiten facturas o recibos profesionales. Facilita el encuadre como "independiente".',
    currentLawDescription: 'Presunción fuerte de laboralidad. Se asume que quien presta servicios es empleado y el empleador debe probar lo contrario.',
    impact: Sentiment.NEGATIVE,
    articleReference: 'Ref. Art. 23 LCT'
  },
  {
    id: '13',
    title: 'Recorte en el "Ius Variandi" (Daño Moral)',
    reformDescription: 'El empleador solo tiene prohibido causar "perjuicio material" al cambiar condiciones. Se eliminó la prohibición de causar "perjuicio moral".',
    currentLawDescription: 'Protección integral ante cambios abusivos en las condiciones laborales que causen perjuicio material o moral.',
    impact: Sentiment.NEGATIVE,
    articleReference: 'Art. 66 LCT'
  },
  {
    id: '14',
    title: 'Derogación de Leyes Protectoras',
    reformDescription: 'Se derogan leyes específicas como el Estatuto del Viajante de Comercio y zonas grises en Teletrabajo.',
    currentLawDescription: 'Regímenes específicos (Estatutos Profesionales) que otorgaban derechos adicionales a ciertos sectores.',
    impact: Sentiment.NEGATIVE,
    articleReference: 'Derogaciones Varias'
  },
  {
    id: '15',
    title: 'Actualización de Créditos Judiciales a la Baja',
    reformDescription: 'Nuevo tope para intereses en juicios: IPC + 3% anual. Suele ser inferior a las tasas de la Justicia Nacional, licuando el crédito del trabajador.',
    currentLawDescription: 'Intereses definidos por la justicia (Actas CNAT) que buscan mantener el valor real del crédito alimentario.',
    impact: Sentiment.NEGATIVE,
    articleReference: 'Art. 276 LCT'
  },
  {
    id: '9',
    title: 'Bloqueos: Nueva Causal de Despido',
    reformDescription: 'Los bloqueos o impedimentos de ingreso se tipifican como "injuria grave" objetiva, permitiendo el despido directo sin indemnización.',
    currentLawDescription: 'El despido depende de la evaluación judicial de la gravedad de la falta en cada caso concreto.',
    impact: Sentiment.NEGATIVE,
    articleReference: 'Art. 242 LCT'
  },
  {
    id: '5',
    title: 'Limitación del Derecho a Huelga',
    reformDescription: 'Eleva la cobertura de servicios mínimos: 75% para esenciales y 50% para actividades "trascendentales".',
    currentLawDescription: 'Servicios esenciales restringidos a salud y vida. Menor exigencia de guardias mínimas en transporte o industria.',
    impact: Sentiment.NEGATIVE,
    articleReference: 'Art. 24 y 97'
  },
  {
    id: '6',
    title: 'Solidaridad (Art. 31 LCT)',
    reformDescription: 'La responsabilidad solidaria en grupos económicos ahora solo aplica si hay "maniobras fraudulentas" demostradas.',
    currentLawDescription: 'Solidaridad automática entre empresas relacionadas o grupos económicos ante deudas laborales.',
    impact: Sentiment.NEGATIVE,
    articleReference: 'Art. 31 LCT'
  },
  {
    id: '11',
    title: 'Trabajadores Independientes con Colaboradores (Art. 91)',
    reformDescription: 'Crea un régimen especial donde un "independiente" puede tener hasta 5 "colaboradores" sin vínculo laboral. Implica: Sin indemnización por despido, sin vacaciones pagas, sin aguinaldo y sin cobertura plena de ART.',
    currentLawDescription: 'Rige la presunción de laboralidad (Art. 23 LCT): quien trabaja bajo órdenes de otro es empleado y tiene todos los derechos laborales.',
    impact: Sentiment.NEGATIVE,
    articleReference: 'Anexo I - Art. 91'
  },
  {
    id: '8',
    title: 'Desprotección en Plataformas (Apps)',
    reformDescription: 'Crea régimen de "prestadores independientes", negando relación de dependencia por ley.',
    currentLawDescription: 'Vacío legal, pero muchos jueces reconocen la relación laboral y derechos plenos (vacaciones, aguinaldo).',
    impact: Sentiment.NEGATIVE,
    articleReference: 'Nuevo Título'
  },


  // --- FAVORABLES (Sentiment.POSITIVE) ---
  {
    id: '17',
    title: 'Cómputo de Aportes por Regularización (PER)',
    reformDescription: 'Trabajadores regularizados podrán computar hasta 60 meses de servicios con aportes (según SMVM) para jubilación.',
    currentLawDescription: 'Los períodos no registrados ("en negro") requieren juicio o moratoria para ser reconocidos previsionalmente.',
    impact: Sentiment.POSITIVE,
    articleReference: 'Promoción Empleo'
  },
  {
    id: '18',
    title: 'Compatibilidad con Planes Sociales',
    reformDescription: 'Permite mantener planes sociales por 1 año tras la registración laboral, funcionando como subsidio al empleo.',
    currentLawDescription: 'Generalmente el empleo registrado es incompatible con planes sociales, generando temor a perder la asistencia.',
    impact: Sentiment.POSITIVE,
    articleReference: 'Planes Sociales'
  },
  {
    id: '19',
    title: 'Seguridad Rurales Temporarios',
    reformDescription: 'Mantienen asignaciones contributivas y acceden automáticamente a no contributivas al cesar el trabajo.',
    currentLawDescription: 'Burocracia y demoras para restablecer asignaciones universales tras períodos de trabajo temporario registrado.',
    impact: Sentiment.POSITIVE,
    articleReference: 'Trabajo Agrario'
  },
  {
    id: '22',
    title: 'Régimen de Incentivo (RIMI)',
    reformDescription: 'Beneficios fiscales para inversiones productivas que fomenten la creación de empleo registrado.',
    currentLawDescription: 'Incentivos dispersos o inexistentes en un régimen unificado.',
    impact: Sentiment.POSITIVE,
    articleReference: 'Título RIMI'
  },

  // --- ESTRUCTURALES (Sentiment.WARNING) ---
  {
    id: '10',
    title: 'Fondo de Cese Laboral (Optional)',
    reformDescription: 'Habilita sistema de fondo de cese (tipo UOCRA) por convenio. Reemplaza indemnización directa por cuentas individuales.',
    currentLawDescription: 'Sistema de indemnización tarifada a cargo directo del empleador en el momento del despido.',
    impact: Sentiment.WARNING,
    articleReference: 'Nuevo Sistema',
    workerImpact: '⚠️ Perjuicio para el trabajador: El fondo de cese suele acumular montos menores a la indemnización legal. El empleador deja de pagar de su bolsillo al despedir, reduciendo el "costo" del despido y facilitando la rotación. En la práctica, el trabajador recibe menos dinero al ser desvinculado.'
  },
  {
    id: 'fal-1',
    title: 'Despido "Barato" y Fácil (Monetización)',
    reformDescription: 'El costo del despido se paga mes a mes por anticipado. Despedir a un empleado de 20 años de antigüedad tiene costo CERO en el momento del despido.',
    currentLawDescription: 'Despedir tiene un costo alto y disuasorio (1 sueldo por año) que protege la estabilidad del empleo.',
    impact: Sentiment.NEGATIVE,
    articleReference: 'Fondo de Cese',
    workerImpact: 'Al eliminar el costo económico de despedir, se incentiva la rotación laboral. Tu antigüedad deja de ser un "seguro" de estabilidad.'
  },
  {
    id: 'fal-2',
    title: 'Licuación de la Indemnización',
    reformDescription: 'El fondo acumula aportes sobre sueldos históricos. En una economía inflacionaria, ese dinero pierde valor real comparado con tu sueldo actual.',
    currentLawDescription: 'La indemnización se calcula sobre tu MEJOR remuneración actual. Se actualiza automáticamente con tus aumentos de sueldo.',
    impact: Sentiment.NEGATIVE,
    articleReference: 'Fondo de Cese',
    workerImpact: 'Recibirás significativamente MENOS dinero que con el sistema actual, especialmente si tuviste ascensos o buena carrera en la empresa.'
  },
  {
    id: 'fal-3',
    title: 'Financiamiento con tu Propio Salario',
    reformDescription: 'El aporte al fondo (aprox 8%) sale de la masa salarial total. En la práctica, es dinero que podría ir a tu aumento de sueldo.',
    currentLawDescription: 'La indemnización la paga la empresa de su patrimonio solo si decide despedirte.',
    impact: Sentiment.NEGATIVE,
    articleReference: 'Fondo de Cese',
    workerImpact: 'Es un "salario diferido" obligatorio. Estás pagando mes a mes tu propio despido futuro, en lugar de recibir ese dinero en mano hoy.'
  },
  {
    id: 'fal-4',
    title: 'Riesgo de Administración',
    reformDescription: 'Tu dinero depende de la solvencia y manejo financiero del ente administrador del fondo (privado, sindical o mixto).',
    currentLawDescription: 'Tu crédito es directo contra el empleador y sus bienes.',
    impact: Sentiment.NEGATIVE,
    articleReference: 'Fondo de Cese',
    workerImpact: 'Si el fondo invierte mal o quiebra, tu "mochila" se vacía. Suma un riesgo financiero a tu estabilidad laboral.'
  },
  {
    id: '20',
    title: 'Transferencia Justicia a CABA',
    reformDescription: 'Traspaso de la Justicia Nacional del Trabajo a la Ciudad. Implica cambio de jurisdicción y jueces locales.',
    currentLawDescription: 'Justicia Nacional del Trabajo (Federal en la práctica) con competencia en CABA.',
    impact: Sentiment.WARNING,
    articleReference: 'Anexo II',
    workerImpact: '⚠️ Perjuicio para el trabajador: La Justicia Nacional del Trabajo tiene una doctrina pro-operario consolidada durante décadas. El traspaso a la órbita de CABA implica jueces nuevos, sin esa tradición protectora, y riesgo de fallos menos favorables para el trabajador. Además, genera incertidumbre procesal durante la transición.'
  },
  {
    id: '7',
    title: 'Simplificación Registral (ARCA)',
    reformDescription: 'Centraliza el registro ante ARCA (ex AFIP) y elimina requisitos duplicados. Busca eficiencia administrativa.',
    currentLawDescription: 'Múltiples registros y libros (AFIP, Ministerio de Trabajo, Libros Ley), generando burocracia.',
    impact: Sentiment.WARNING,
    articleReference: 'Art. 52 LCT - ARCA',
    workerImpact: '⚠️ Perjuicio para el trabajador: Al eliminar la obligación de llevar libros laborales físicos (Art. 52 LCT), se reduce la evidencia documental disponible para el trabajador en caso de juicio. Si el registro digital falla o es manipulado, el empleado pierde una herramienta clave para probar su antigüedad, categoría y salario.'
  },
  {
    id: '12',
    title: 'Ultraactividad de Convenios',
    reformDescription: 'Limita la vigencia automática de cláusulas normativas al vencer el convenio, salvo acuerdo contrario.',
    currentLawDescription: 'Ultraactividad plena: el convenio sigue vigente íntegramente hasta ser reemplazado.',
    impact: Sentiment.WARNING,
    articleReference: 'Negociación Colectiva',
    workerImpact: '⚠️ Perjuicio para el trabajador: Sin ultraactividad, al vencer un convenio colectivo el trabajador pierde automáticamente beneficios negociados (adicionales salariales, jornada reducida, licencias especiales). Esto presiona al sindicato a negociar desde una posición más débil, ya que la alternativa es perder todo lo conquistado.'
  }
];

export const documentContent: DocumentChapter[] = [
  {
    id: 'intro',
    title: 'Mensaje de Elevación',
    sections: [
      {
        id: 'msg-1',
        title: 'Fundamentos',
        content: `Tengo el agrado de dirigirme a Ud. a fin de remitirle adjunto al presente el Proyecto de Ley denominado "Ley de Modernización Laboral". \n\nLa iniciativa pretende actualizar el marco laboral vigente a fines de remover las distorsiones que afectan la creación de empleo formal... La combinación de crisis económica, incertidumbre jurídica y altos costos derivados de la litigiosidad ha generado un estancamiento del empleo formal.`,
        pageReference: 4
      }
    ]
  },
  {
    id: 'titulo-1',
    title: 'Título I: Modificaciones LCT',
    sections: [
      {
        id: 'art-1',
        title: 'Ámbito de Aplicación (Art. 2 LCT)',
        content: `ARTÍCULO 1°.- Sustitúyese el artículo 2° de la Ley de Contrato de Trabajo N° 20.744... \n\n"ARTÍCULO 2°.- Ámbito de aplicación. La vigencia de esta ley quedará condicionada a que la aplicación de sus disposiciones resulte compatible con la naturaleza y modalidades de la actividad... \n\n a. A los dependientes de la Administración Pública Nacional, provincial o municipal... \n b. Al personal de casas particulares... \n c. A los trabajadores agrarios..."`,
        pageReference: 15
      },
      {
        id: 'art-23',
        title: 'Presunción del Contrato (Art. 23 LCT)',
        content: `ARTÍCULO 13.- Sustitúyese el artículo 23 de la LCT... \n\n"ARTÍCULO 23.- Presunción de la existencia del contrato de trabajo. El hecho de la prestación de servicios hace presumir la existencia de un contrato de trabajo, salvo que, por las circunstancias, las relaciones o causas que lo motiven se demostrase lo contrario. \n\nLa presunción contenida en el presente artículo no será de aplicación cuando mediaren contrataciones de obras o de servicios profesionales o de oficios y se emitan los recibos o facturas correspondientes..."`,
        pageReference: 19
      }
    ]
  },
  {
    id: 'titulo-2',
    title: 'Título II: Fondo de Asistencia Laboral',
    sections: [
      {
        id: 'fondo-cese',
        title: 'Creación del Fondo',
        content: `ARTÍCULO 58.- Objeto. Créanse los Fondos de Asistencia Laboral... destinados a coadyuvar al cumplimiento de las obligaciones indemnizatorias reparadoras de preaviso y despido sin causa. \n\nEste sistema podrá sustituir el régimen indemnizatorio vigente mediante Convenio Colectivo de Trabajo.`,
        pageReference: 46
      }
    ]
  },
  {
    id: 'titulo-vii',
    title: 'Título VII: Conflictos Colectivos',
    sections: [
      {
        id: 'huelga',
        title: 'Servicios Esenciales',
        content: `ARTÍCULO 98.- Sustitúyese el artículo 24 de la Ley N° 25.877... \n\nEn el caso de los servicios esenciales, en ningún caso se podrá negociar o imponer a las partes una cobertura menor al SETENTA Y CINCO POR CIENTO (75%) de la prestación normal. \n\nEn el caso de actividades de importancia trascendental, la cobertura no podrá ser menor al CINCUENTA POR CIENTO (50%).`,
        pageReference: 63
      }
    ]
  },
  {
    id: 'titulo-xii',
    title: 'Título XII: Plataformas Tecnológicas',
    sections: [
      {
        id: 'plataformas',
        title: 'Régimen de Movilidad y Reparto',
        content: `ARTÍCULO 114.- Objeto. El presente régimen tiene por objeto establecer reglas adecuadas para promover el desarrollo de la economía de plataformas tecnológicas... \n\nARTÍCULO 116.- Libertad de conexión... El prestador independiente será libre de conectarse a cualquiera de las plataformas... no pudiendo exigirse exclusividad.`,
        pageReference: 76
      }
    ]
  }
];