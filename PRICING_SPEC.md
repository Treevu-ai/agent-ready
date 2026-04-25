# 📊 Pricing Strategy — GEO Services

## Estrategia: Predatorio No Canibalizante

**Principio:** Dar *suficiente* gratis para crear deseo, pero *insuficiente* para resolver el problema.

---

## Tiers

| Tier | Nombre | Precio | Objetivo | Margen |
|------|--------|--------|----------|--------|
| **Tier 0.5** | Migration Audit | $497 | Migraciones web, proteger tráfico | ~80% |
| **Tier 0** | GEO Score | GRATIS | Top of funnel, captura leads | ~100% |
| **Tier 1** | GEO Audit | $197 | Conversión rápida, producto de entrada | ~85% |
| **Tier 2** | GEO Implementation | $1,497 | Revenue principal | ~70% |
| **Tier 3** | GEO Retainer | $1,397/mes | LTV, ingreso recurrente | ~90% |

---

## Detalle por Tier

### Tier 0.5: Migration Audit ($497)

**Qué incluye:**
- Auditoría pre-migración completa
- Mapa de URLs críticas a preservar
- Checklist de 50+ factores GEO
- Validación post-migración
- Garantía: si pierdes tráfico, te lo devolvemos
- Entrega en 24-48h

**Proceso:**
1. Escaneo pre-migración (estado actual del sitio)
2. Identificación de URLs críticas y redirects
3. Checklist de implementación GEO
4. Validación post-migración

**Margen:**
- Precio: $497
- Costo APIs: ~$0.20
- Costo humano: ~$75-100
- **Margen: ~80%**


### Tier 0: GEO Score (GRATIS)

**Qué incluye:**
- Puntuación 0-100 (5 factores básicos)
- 3 recomendaciones genéricas (teasers)
- Captura de email para nurture
- Resultado en 1 minuto (automático)

**Factores evaluados:**
1. Schema.org presente (sí/no)
2. Metadata completa (sí/no)
3. Velocidad de carga (Core Web Vitals pass/fail)
4. Mobile-friendly (sí/no)
5. HTTPS (sí/no)

**Output:**
- Score numérico: "47/100"
- Mensaje: "Tienes 12/50 factores optimizados"
- 3 recomendaciones: "Optimiza schema.org", "Mejora velocidad", etc.

**Costo marginal:** ~$0.02 por lead (Groq API + crawling básico)

---

### Tier 1: GEO Audit ($197)

**Qué incluye:**
- Auditoría de 50+ factores técnicos
- Puntuación GEO detallada por categoría
- Comparativa con 3-5 competidores
- Roadmap priorizado (impacto vs esfuerzo)
- Informe ejecutivo PDF (15-20 páginas)
- Entrega en 24-48h

**Proceso:**
1. Agente escanea → genera borrador (80% del trabajo, ~20 min)
2. Humano revisa → ajusta, valida, contextualiza (20% del trabajo, ~25 min)
3. Agente formatea → entrega final profesional (~5 min)

**Tiempo total:** 45-50 min por auditoría

**Margen:**
- Precio: $197
- Costo APIs: ~$0.15
- Costo humano: ~$15-25 (depende de quien ejecute)
- **Margen: ~85-90%**

---

### Tier 2: GEO Implementation ($1,497)

**Qué incluye:**
- Todo lo de Auditoría
- Implementación de Schema.org completo (JSON-LD)
- Documentación de APIs para agentes
- Optimización de velocidad (Core Web Vitals)
- Validación post-implementación con agentes reales
- Entrega en 1-2 semanas

**Proceso:**
1. Auditoría base (Tier 1)
2. Implementación técnica (dev interno o partner)
3. Validación con 3-5 agentes IA (ChatGPT, Claude, Perplexity, etc.)
4. Reporte final de cumplimiento

**Tiempo total:** 8-15 horas (depende de complejidad del sitio)

**Margen:**
- Precio: $1,497
- Costo APIs: ~$2-5
- Costo humano/dev: ~$400-600
- **Margen: ~60-70%**

---

### Tier 3: GEO Retainer ($1,397/mes)

**Qué incluye:**
- Todo lo de Implementación
- Dashboard en tiempo real (menciones en IA)
- Monitoreo continuo de visibilidad
- Iteraciones mensuales (ajustes de schema, contenido)
- Soporte prioritario (SLA 24h)
- Cancelable cuando quieras

**Proceso:**
1. Setup inicial (1-2 horas)
2. Monitoreo automático (agente)
3. Revisión mensual (2-3 horas humano)
4. Iteraciones según hallazgos

**Margen:**
- Precio: $1,397/mes
- Costo APIs: ~$10-20/mes
- Costo humano: ~$100-150/mes (3-4 horas)
- **Margen: ~85-90%**

---

## Unit Economics (Escenario Conservador)

**Funnel mensual (100 leads en Score):**
```
100 Score → 15% conversión → 15 Audit
15 Audit → 20% conversión → 3 Implementation
3 Implementation → 60% conversión → 2 Retainer
```

**Revenue mensual:**
- Audit: 15 × $197 = **$2,955**
- Implementation: 3 × $1,497 = **$4,491**
- Retainer: 2 × $1,397 = **$2,794/mes recurrente**
- **Total: $10,240/mes**

**Costos variables:**
- APIs: ~$50-100
- Humano: ~20 horas (~$400-600)
- **Total: ~$500-700**

**Margen neto: ~75-80%**

---

## Por qué $197 (no menos)

| Precio | Percepción | Competencia | Filtro |
|--------|------------|-------------|--------|
| < $100 | Commodity | Fiverr, Upwork | Atrae clientes problemáticos |
| $197 | Inversión trivial | Sin competencia directa | No requiere aprobación múltiple |
| $497+ | Decisión estratégica | Consultoras | Requiere budget approval |

**$197 es el sweet spot:**
- Lo suficientemente alto para filtrar curiosos
- Lo suficientemente bajo para no requerir aprobación de múltiples stakeholders
- Margen saludable para operar con calidad

---

## No Canibalización

**Score NO compite con Audit:**
- Score: 5 factores, 3 recomendaciones vagas
- Audit: 50+ factores, roadmap accionable, contexto humano

**Audit NO compite con Implementation:**
- Audit: te dice QUÉ hacer
- Implementation: alguien lo HACE por ti

**Implementation NO compite con Retainer:**
- Implementation: one-time, proyecto
- Retainer: monitoreo continuo, mejora iterativa

---

## Implementación Técnica

### Score (Automático)
```javascript
// Endpoint: GET /api/score?url=example.com
// Response: { score: 47, factors: {...}, recommendations: [...] }
```

### Audit (Humano + Agente)
```javascript
// Endpoint: POST /api/audit
// Payload: { url, company, contact }
// Proceso: agenda escaneo → agente genera borrador → humano revisa → entrega PDF
```

### Implementation (Proyecto)
```javascript
// Endpoint: POST /api/implementation
// Payload: { audit_id, timeline, budget }
// Proceso: scoping → implementación → validación → entrega
```

### Retainer (Recurrente)
```javascript
// Endpoint: POST /api/retainer
// Payload: { implementation_id, billing_cycle }
// Proceso: setup dashboard → monitoreo automático → reporte mensual
```

---

## Métricas de Éxito

| Métrica | Target |
|---------|--------|
| Score → Audit conversión | 15-20% |
| Audit → Implementation conversión | 20-25% |
| Implementation → Retainer conversión | 50-60% |
| LTV promedio | $5,000+ |
| CAC máximo aceptable | $500 |
| Margen neto | >75% |

---

## Actualizado: 2026-04-24
