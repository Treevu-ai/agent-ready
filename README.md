<!-- readme-hero -->
<div align="center">

<img src="assets/readme-hero.svg" alt="AGENT READY" width="100%" />

</div>

# 🚀 GEO Landing MVP Premium

Landing page premium para servicios GEO (Generative Engine Optimization) de agent-ready.

Stack: **Bold/Brutalist design** + **Express API** + **Groq + LangChain/LangGraph agent**.

---

## 📁 Estructura del Proyecto

```
landing-mvp-premium/
├── mvp/
│   ├── index.html              # Landing page bold/brutalist
│   ├── css/
│   │   └── geo-brutalist.min.css  # Estilos
│   ├── robots.txt              # SEO
│   └── sitemap.xml             # SEO
├── backend/
│   ├── server.js               # Express API
│   └── data/
│       └── leads.json          # Almacenamiento leads
├── agent/
│   ├── geo-agent.js            # Agente conversacional Groq
│   └── package.json
├── package.json
└── README.md
```

---

## 🚀 Quick Start

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar Groq API key en .env
# GROQ_API_KEY=your_key_here

# 3. Iniciar desarrollo
npm run dev

# 4. Abrir
http://localhost:3000
```

---

## 🔌 API Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/contact` | Enviar formulario de contacto |
| POST | `/api/chat` | Chat con agente GEO |
| GET | `/api/leads` | Obtener todos los leads |
| GET | `/api/stats` | Estadísticas de leads |
| PATCH | `/api/leads/:id` | Actualizar lead |
| DELETE | `/api/leads/:id` | Eliminar lead |
| **POST** | **`/api/score`** | **Obtener GEO Score (FREE tier)** |
| **POST** | **`/api/audit`** | **Generar auditoría PDF (PAID tier)** |
| **GET** | **`/api/audits/:filename`** | **Descargar auditoría PDF** |

### Ejemplos

```bash
# Health check
curl http://localhost:3000/api/health

# Enviar lead
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Juan","email":"juan@empresa.com","company":"Empresa SAC","message":"Hola"}'

# Chat con agente
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"¿Cuánto cuesta la auditoría?"}'

# Ver leads
curl http://localhost:3000/api/leads

# Ver estadísticas
curl http://localhost:3000/api/stats
```

---

## 🎨 Stack Técnico

| Componente | Tecnología |
|------------|------------|
| Frontend | HTML/CSS/JS vanilla (Bold/Brutalist) |
| Backend | Express.js |
| LLM | Groq (`llama-3.3-70b-versatile`) |
| Agente | LangChain + LangGraph |
| Chat UI | Widget custom vanilla JS |
| Storage | JSON file |

---

## 📊 Precios (USD)

| Plan | Precio | Descripción | Entrega |
|------|--------|-------------|---------|
| **GEO Score** | GRATIS | Puntuación 0-100 + 3 insights | 1 minuto, automático |
| **Auditoría** | $197 | 50+ factores, roadmap, PDF ejecutivo | 24-48h (humano + agente) |
| **Migration Audit** | $497 | Auditoría pre-migración + garantía | 24-48h (oferta limitada) |
| **Implementación** | $1,497 | Ejecución completa + validación | 1-2 semanas |
| **Retainer** | $1,397/mes | Monitoreo continuo + iteraciones | Recurrente, cancelable |

---

## 📝 Estructura del Lead

```json
{
  "id": "timestamp",
  "name": "Nombre completo",
  "email": "email@empresa.com",
  "company": "Empresa SAC",
  "service": "No especificado",
  "message": "Mensaje opcional",
  "status": "nuevo",
  "createdAt": "2026-04-22T...",
  "source": "Landing GEO",
  "utm": {
    "campaign": null,
    "source": null,
    "medium": null
  }
}
```

---

## 🚢 Despliegue

### Railway (Backend/API)

```bash
npm install -g @railway/cli
railway login
railway init
railway up
```

### Vercel (Frontend)

```bash
npm install -g vercel
vercel --prod
```

---

## 🔒 Variables de Entorno

Crear archivo `.env` en la raíz:

```env
PORT=3000
NODE_ENV=production
GROQ_API_KEY=your_groq_api_key_here
```

---

## 🤝 Soporte

- Email: hola@agent-ready.consulting
- Web: agent-ready.consulting

MIT © 2026 Agent-Ready Consulting