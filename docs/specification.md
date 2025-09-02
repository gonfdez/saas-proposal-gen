System (instrucciones al modelo V0):
Eres un asistente experto en generar componentes y páginas Next.js (TypeScript + Tailwind + shadcn/ui). Tu tarea: crear un MVP funcional de un wizard para generar propuestas comerciales.

Todo el código debe ser autocontenido y listo para ejecutar en un proyecto Next.js.

El backend será un mock que simplemente devuelve (echo) el JSON que recibe.

El wizard debe ser JSON-driven, editable fácilmente, y tener soporte de internacionalización de la UI (ES/EN).

Los textos de la UI (labels, placeholders, botones, validaciones) deben leerse de un objeto translations.

Incluir al menos un preset de ejemplo en los inputs libres, para poder testear.

Evita llamadas a IA real, persistencia o librerías pesadas para PDF.

User (requerimientos funcionales):

Wizard
Nombre del componente: ProposalWizard
Stack: Next.js + TypeScript + Tailwind + shadcn/ui

Pasos del Wizard (orden final):

Paso 1 — Audiencia (required)
Pregunta: "¿A quién va dirigida tu propuesta?"
Input: campo corto de texto (string)
Placeholder ES: Ej: Director de marketing de TechGrowth
Placeholder EN: Ex: Marketing Director at TechGrowth
Validación: mínimo 3 caracteres
Preset de ejemplo: "Director de marketing de TechGrowth"

Paso 2 — Contenido de la propuesta (required)
Pregunta: "¿Qué quieres proponer?"
Input: lista dinámica de propuestas/servicios
Cada item tiene:

title: string (required)

description: string (opcional)

details: string (opcional, para beneficios, entregables, pruebas sociales)

Placeholder ES para el primer item: Ej: Servicios de SEO mensual para mejorar tráfico y leads

Placeholder EN: Ex: Monthly SEO services to increase traffic and leads

Preset de ejemplo:
[
{
"title": "Servicios de SEO mensual",
"description": "Optimización de contenido y linkbuilding",
"details": "Auditoría técnica, mapa de keywords, optimización on-page, linkbuilding. Caso similar: +120% tráfico en 4 meses."
}
]

Botón “Agregar otro servicio/idea” para añadir más items.

Edición inline de cada item.

Paso 3 — Formato y parámetros (required)
Pregunta: "Formato de la propuesta"
Opciones radio ES: Texto | Correo electrónico | PDF 1 página
Opciones radio EN: Text | Email | 1-page PDF
Campos adicionales:
Idioma del output: select ES/EN (default ES)
Tono: chips opcional: Profesional, Amigable, Persuasivo, Directo (default Profesional)

Comportamiento tras completar wizard:

Construir un JSON de inputs (INPUT_SCHEMA) con los datos del usuario.

Enviar JSON al endpoint /api/mock-echo (POST).

Backend devuelve el mismo JSON + echoedAt y serverMock:true tras delay 800–1200ms.

Frontend muestra:

Preview del JSON (tal cual) en pantalla a modo de resultado final.

Editable inline opcional, cambios solo en cliente.

Botones de acción: Copiar y Descargar JSON.

JSON de entrada (INPUT_SCHEMA)

{
"audience": "string (required)",
"proposals": [
{
"title": "string (required)",
"description": "string (optional)",
"details": "string (optional)"
}
],
"format": "text | email | pdf",
"language": "ES | EN",
"tone": "Profesional | Amigable | Persuasivo | Directo",
"meta": {
"createdAt": "ISO timestamp",
"appVersion": "string"
}
}

Ejemplo de preset

{
"audience": "Director de marketing de TechGrowth",
"proposals": [
{
"title": "Servicios de SEO mensual",
"description": "Optimización de contenido y linkbuilding",
"details": "Auditoría técnica, mapa de keywords, optimización on-page, linkbuilding. Caso similar: +120% tráfico en 4 meses."
}
],
"format": "email",
"language": "ES",
"tone": "Profesional",
"meta": {
"createdAt": "2025-09-02T12:00:00.000Z",
"appVersion": "0.1.0"
}
}

Internacionalización de UI (ES / EN)

Labels, placeholders, botones, validaciones deben venir de translations.

Ejemplo:

export const translations = {
es: {
step1: { title: "¿A quién va dirigida tu propuesta?", placeholder: "Ej: Director de marketing de TechGrowth" },
step2: { title: "¿Qué quieres proponer?", placeholder: "Ej: Servicios de SEO mensual...", optionalDetails: "Detalles opcionales..." },
step3: { title: "Formato de la propuesta", options: { text: "Texto", email: "Correo electrónico", pdf: "PDF 1 página" }, language: "Idioma del output", tone: "Tono" },
buttons: { next: "Siguiente", back: "Atrás", generate: "Generar propuesta" },
validation: { required: "Este campo es obligatorio", minLength: "Debe tener al menos 3 caracteres" }
},
en: {
step1: { title: "Who is your proposal for?", placeholder: "Ex: Marketing Director at TechGrowth" },
step2: { title: "What do you want to propose?", placeholder: "Ex: Monthly SEO services...", optionalDetails: "Optional details..." },
step3: { title: "Proposal format", options: { text: "Text", email: "Email", pdf: "1-page PDF" }, language: "Output language", tone: "Tone" },
buttons: { next: "Next", back: "Back", generate: "Generate proposal" },
validation: { required: "This field is required", minLength: "Must be at least 3 characters" }
}
}

Elección de idioma al inicio (useState o useContext).

Todos los textos del wizard usan translations[lang].

Archivos a generar

components/ProposalWizard.tsx (default export)

pages/mvp-proposal.tsx (o ruta app equivalent)

pages/api/mock-echo.ts (backend mock echo)

lib/wizard-config.ts (pasos + seed data + preset)

lib/translations.ts (ES / EN)

styles/globals.css

README.md con instrucciones de prueba y test manual

Validaciones / UX

Required fields: no avanzar si vacíos

MinLength 3 caracteres para texto corto

Progress bar con 3 pasos

Botones: Siguiente, Atrás, Generar propuesta

Responsive y accesible

Restricciones

NO autenticación

NO persistencia

NO llamadas reales a IA

NO librerías pesadas para PDF; usar window.print

Criterios de aceptación (QA)

Wizard carga paso 1 (Audiencia).

Rellenando los 3 pasos y pulsando Generar propuesta, POST a /api/mock-echo y muestra JSON tal cual en pantalla como preview.

Edición inline de preview funciona solo en cliente.

Botones Copiar, Descargar JSON funcionan correctamente.

Endpoint mock devuelve JSON + echoedAt + serverMock:true.

Ejemplo de preset integrado

audience: "Director de marketing de TechGrowth"

proposals: [{"title":"Servicios de SEO mensual","description":"Optimización de contenido y linkbuilding","details":"Auditoría técnica, mapa de keywords, optimización on-page, linkbuilding. Caso similar: +120% tráfico en 4 meses."}]

format: "email"

language: "ES"

tone: "Profesional"

meta.createdAt: "2025-09-02T12:00:00.000Z"

meta.appVersion: "0.1.0"
