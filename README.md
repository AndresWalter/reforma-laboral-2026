# ⚖️ Observatorio Legal — Reforma Laboral Argentina 2026

[![Vercel Ready](https://img.shields.io/badge/deploy-Vercel-black?logo=vercel)](https://vercel.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript)](https://www.typescriptlang.org)

Plataforma interactiva de análisis jurídico que compara la **Ley de Modernización Laboral** (sancionada el 12/02/2026) con la legislación vigente, punto por punto. Diseñada para que trabajadores, abogados y periodistas comprendan su impacto real.

---

## ✨ Características

| Módulo | Descripción |
|--------|-------------|
| **📊 Análisis de Impacto** | 16 puntos comparativos (Ley Actual vs Reforma) con filtros por categoría: Perjudiciales, Favorables, Estructurales |
| **🤖 Chatbot con IA** | Asistente legal potenciado |
| **🖼️ Infografías** | Carrusel interactivo con slides de análisis crítico |
| **📄 Visor de Documento** | Texto completo del proyecto de ley con navegación por capítulos |
| **🏔️ Ley de Glaciares** | Análisis paralelo de la reforma a la Ley de Glaciares |
| **🌙 Dark Mode** | Soporte completo de modo claro/oscuro |


### Seguridad y Optimización

- 🔒 **Rate limiting** — Cooldown de 5s entre llamadas a la API
- 🧹 **Sanitización** — Input truncado a 300 caracteres
- ✅ **Validación HTTP** — Manejo de errores 401, 429, 500
- 🧠 **Caché en memoria** — Respuestas IA cacheadas por consulta normalizada
- ⚡ **System prompt comprimido** — ~50% menos tokens por llamada

---

## 🛠️ Stack Tecnológico

| Tecnología | Uso |
|-----------|-----|
| [React 19](https://react.dev) | UI declarativa y componentes |
| [TypeScript 5.8](https://www.typescriptlang.org) | Tipado estático |
| [Vite 6](https://vite.dev) | Build tool y dev server |
| [Tailwind CSS](https://tailwindcss.com) | Estilos utilitarios |
| [Lucide React](https://lucide.dev) | Iconografía |


---

## 📁 Estructura del Proyecto

```
├── App.tsx                  # Componente raíz con routing de vistas
├── index.html               # Entry point HTML
├── index.tsx                # Montaje de React
├── data.ts                  # Base de datos de puntos de análisis
├── types.ts                 # Interfaces TypeScript
├── components/
│   ├── AnalysisCard.tsx     # Tarjeta comparativa (Ley Actual vs Reforma)
│   ├── AnalysisView.tsx     # Vista principal con filtros
│   ├── ChatBot.tsx          # Chatbot con IA (Groq) + caché + rate limiting
│   ├── Carousel.tsx         # Carrusel de infografías
│   ├── DocumentViewer.tsx   # Visor del texto legal completo
│   ├── GlaciaresView.tsx    # Análisis Ley de Glaciares
│   ├── InfographicsView.tsx # Vista de infografías
│   └── TraspasoModal.tsx    # Modal de traspaso de justicia
├── vercel.json              # Configuración de deploy (SPA)
├── vite.config.ts           # Configuración de Vite
└── package.json             # Dependencias y scripts
```

---

## 🚀 Instalación y Uso Local

### Prerrequisitos

- [Node.js](https://nodejs.org) v18 o superior
- Una API Key de [Groq](https://console.groq.com) (opcional, para el chatbot IA)

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/AndresWalter/reforma-laboral-2026.git
cd reforma-laboral-2026

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tu API Key de Groq:
# VITE_GROQ_API_KEY=gsk_tu_clave_aqui

# 4. Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`.

### Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo con HMR |
| `npm run build` | Build de producción optimizado |
| `npm run preview` | Preview del build de producción |

---

---

## ⚙️ Variables de Entorno

| Variable | Requerida | Descripción |
|----------|-----------|-------------|
| `API_KEY` | Opcional | API Key para el chatbot IA. Sin ella, el chatbot funciona con respuestas locales precargadas |

---

## 📋 Temas del Chatbot (Respuestas Locales)

El chatbot tiene 7 temas con respuestas precargadas que **no consumen tokens**:

1. **Teletrabajo** — Derogación Ley 27.555, pérdida de protección moral
2. **Juicios e Intereses** — Tope IPC+3%, piso 67%, tasa pasiva BCRA
3. **Indemnización por Despido** — Exclusión de SAC y bonos (Art. 245)
4. **Monotributo** — Eliminación de presunción laboral con factura
5. **Apps y Repartidores** — Régimen de "prestador independiente"
6. **Derecho a Huelga** — 75% cobertura esenciales, bloqueos = despido
7. **Período de Prueba** — Extensión de 3 a 6-8 meses

---

## 🤝 Contribuir

Las contribuciones son bienvenidas. Para cambios significativos:

1. Fork del repositorio
2. Crear branch (`git checkout -b feature/nueva-funcionalidad`)
3. Commit con mensaje descriptivo (`git commit -m 'feat: descripción'`)
4. Push al branch (`git push origin feature/nueva-funcionalidad`)
5. Abrir un Pull Request

---

## 📄 Licencia

Este proyecto es de código abierto.

---

## ⚠️ Aviso Legal

Esta herramienta es de carácter **informativo y educativo**. No constituye asesoramiento legal profesional. Para consultas específicas sobre tu situación laboral, consultá con un abogado especializado en derecho del trabajo.

---

**Desarrollado por Andres para la comunidad trabajadora argentina.** 
