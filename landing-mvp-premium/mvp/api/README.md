# Agent-Ready API

Backend simple para el formulario de contacto de agent-ready.

## Setup

1. Instalar dependencias:
```bash
cd api
npm install
```

2. Configurar variables de entorno:
```bash
cp .env.example .env
# Editar .env con tus credenciales
```

3. Configurar Gmail App Password:
   - Ve a https://myaccount.google.com/apppasswords
   - Genera una contraseña de app
   - Copia esa contraseña a GMAIL_PASS en .env

4. Iniciar servidor:
```bash
npm run dev   # Desarrollo con hot reload
npm start     # Producción
```

## Endpoints

### POST /api/contact
Envía un mensaje de contacto.

**Body:**
```json
{
  "name": "Juan Pérez",
  "email": "juan@empresa.com",
  "company": "Empresa SAC",
  "interest": "AEO Implementation",
  "message": "Quiero mejorar mi presencia digital...",
  "lang": "es"
}
```

**Respuestas:**
- `200`: Mensaje recibido exitosamente
- `400`: Validación fallida (errores en el body)
- `429`: Rate limit excedido (30s entre envíos)
- `500`: Error del servidor

### GET /health
Verifica que el servidor está funcionando.

### GET /api/submissions?key=API_KEY
Obtiene todas las submissions (requiere API_KEY).

## Rate Limiting
- 1 solicitud cada 30 segundos por IP
- Ajustable con RATE_LIMIT_WINDOW en .env

## Almacenamiento
Los leads se guardan en `data/submissions.json`.
Cada submission incluye:
- id: ID único
- createdAt: Timestamp ISO
- name, email, company, interest, message
- lang: Idioma del usuario

## Emails
- Notificación al admin cuando llega un nuevo lead
- Auto-responder al usuario confirmando recepción
- Emails en español o inglés según el idioma del formulario
