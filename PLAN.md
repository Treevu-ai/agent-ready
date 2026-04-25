# Plan: Landing GEO MVP Premium

## Resumen
Landing page con diseño bold/brutalist para servicios GEO (Generative Engine Optimization). Incluye agente conversacional híbrido con LangChain/LangGraph que responde preguntas y califica leads. Backend Express para captura y almacenamiento de leads. Stack: Groq + LangChain + LangGraph.

---

## Decisiones clave

| Área | Decisión |
|------|----------|
| Diseño | Bold/brutalist: colores neón (#FF3366, #00FF88), tipografía bold, bordes duros, animaciones agresivas |
| Nombre servicio | GEO — Generative Engine Optimization |
| Agente | Híbrido: responde dudas + califica leads cuando interesa |
| LLM | Groq (gratis, rápido) — modelo `llama-3.3-70b-versatile` |
| Framework agentes | LangChain + LangGraph |
| Backend | Express.js con almacenamiento JSON |
| Chat UI | Widget flotante en corner derecho |
| Pricing | 4 tiers: Score ($0), Audit ($197), Implementation ($1,497), Retainer ($1,397/mes) |

---

## Arquitectura

```
┌─────────────────────────────────────────────────────────┐
│                    LANDING PAGE                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   HERO       │  │   SERVICES   │  │   PRICING    │  │
│  │  (bold copy) │  │   (GEO)      │  │  (3 planes)  │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
│                                                         │
│  ┌──────────────────────────────────────────────────┐ │
│  │          CHAT WIDGET (flotante, bottom-right)     │ │
│  │  ┌─────────────────────────────────────────────┐  │ │
│  │  │ Agente GEO: "Hola, ¿en qué te ayudo?"       │  │ │
│  │  └─────────────────────────────────────────────┘  │ │
│  └──────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                   EXPRESS API                           │
│  POST /api/contact  →  captura lead                    │
│  GET  /api/leads    →  lista leads                     │
│  GET  /api/stats    →  estadísticas                    │
│  GET  /api/chat     →  proxy al agente Groq            │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│              LANGGRAPH AGENT (Groq)                     │
│                                                         │
│  ┌─────────┐    ┌─────────┐    ┌─────────┐           │
│  │  State  │───▶│  Router │───▶│ Response│           │
│  │ Graph   │    │ (LLM)   │    │ Builder │           │
│  └─────────┘    └─────────┘    └─────────┘           │
│       │              │              │                  │
│       ▼              ▼              ▼                  │
│  ┌─────────┐   ┌──────────┐  ┌──────────┐           │
│  │  Lead   │   │  Geo     │  │  Small   │           │
│  │ Capture │   │  Info    │  │  Talk    │           │
│  └─────────┘   └──────────┘  └──────────┘           │
└─────────────────────────────────────────────────────────┘
```

---

## Estructura de archivos

```
landing-mvp-premium/
├── mvp/
│   ├── index.html          # Landing bold/brutalist
│   └── css/
│       └── styles.min.css  # Estilos bold/brutalist
├── backend/
│   ├── server.js           # Express API
│   └── data/
│       └── leads.json      # Almacenamiento leads
├── agent/
│   ├── agent.js            # LangGraph agent
│   ├── schema.js           # Tools y state
│   └── package.json        # Dependencias agente
└── package.json           # Root package
```

---

## Plan de implementación

### Fase 1: Diseño y contenido
- [x] Landing bold/brutalist: colores neón (#FF3366 magenta, #00FF88 verde, #FFFF00 amarillo), fondo negro, tipografía bold system-ui
- [x] Nueva estructura: Hero impactante → Stats → Servicios → Pricing → FAQ → Contacto
- [x] Actualizar todo el copy de AEO → GEO
- [x] Precios: Score $0 (teaser), Audit $197 (entrada), Implementation $1,497 (core), Retainer $1,397/mes (LTV)

### Fase 2: Backend
- [x] Express API con endpoints: `/api/health`, `/api/contact`, `/api/leads`, `/api/stats`, `/api/chat`
- [x] Almacenamiento JSON de leads
- [x] Validación y deduplicación de emails

### Fase 3: Agente LangChain/LangGraph
- [ ] Graph con nodos: `welcome`, `route_intent`, `geo_info`, `capture_lead`, `close_talk`
- [ ] Herramientas: `search_geo_info`, `save_lead`, `calculate_interest`
- [x] Estado: mensajes, datos lead, nivel de interés (low/medium/high)
- [x] Routing: si interés alto → capturar lead (implícito en geo-agent.js)
- [x] Usar Groq con `llama-3.3-70b-versatile`

### Fase 4: Frontend Chat Widget
- [x] Widget flotante (bottom-right, 380x500px)
- [x] Historial de mensajes
- [x] Input con debounce
- [x] Conexión a `/api/chat` (proxy) o endpoint dedicado
- [x] Animación de typing indicator

### Fase 5: Testing
- [ ] Flujo completo: landing → chat → agente responde → calificación → lead guardado
- [ ] Verificar que los leads aparecen en `/api/leads`

---

## Definición de done

- ✅ Landing con diseño bold/brutalist visible y funcional
- ✅ Copy actualizado a GEO
- ✅ Hero con storytelling de transformación (antes/ahora)
- ✅ Sección "Cómo funciona" con 4 pasos (incluye Score Gratis)
- ✅ Estadísticas con fuentes cite (4 stats en grid 2x2)
- ✅ Chat widget conectando con agente (sin LangGraph pesado)
- ✅ Agente responde preguntas sobre GEO (con fallback rule-based)
- ✅ Agente captura leads cuando usuario muestra interés (nivel medio-alto)
- ✅ Leads guardados en backend Express
- ✅ Pricing: 4 tiers (Score $0, Audit $197, Implementation $1,497, Retainer $1,397/mes) en grid 2x2
- ✅ Stats endpoint funcionando
- ✅ Validación y deduplicación de emails
- ✅ Input con debounce en chat widget
- ✅ Modal de Score Gratis con formulario URL + email
- ✅ Endpoint /api/score implementado (5 factores básicos)
- ✅ Leads de score se guardan en backend

---

## Stack técnico confirmado

| Componente | Tecnología |
|------------|------------|
| Frontend | HTML/CSS/JS vanilla (bold/brutalist) |
| Backend | Express.js |
| LLM | Groq (`llama-3.3-70b-versatile`) |
| Agent | LangChain + LangGraph |
| Chat UI | Widget custom vanilla JS |
| Storage | JSON file |
| Deploy | Vercel (frontend) + Railway (backend/agent) |
- [x] Migration Audit incluido en agente (nodes.js) con precios actualizados
- [x] Seccion Como funciona ahora usa grid 2x2 en lugar de lista vertical
- [x] CSS actualizado con .how-it-works__grid para layout 2 columnas
## Actualizado: 2026-04-24

- [x] Agregado Migration Audit (Tier 0.5) a PRICING_SPEC.md con precio $497
### Cambios realizados

- [x] Integracion de score-pdf.js con backend server.js
- [x] Creado score-pdf.js con PDF empresarial comprensible para empresarios
- [x] PDF incluye: semaforo visual, categorias traducidas, oportunidades, CTA
