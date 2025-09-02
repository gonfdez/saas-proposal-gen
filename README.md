# Proposal Wizard MVP

A multi-step wizard for generating business proposals with internationalization support (Spanish/English).

## Features

- 3-step wizard: Audience → Proposal Content → Format & Parameters
- Internationalization (ES/EN) for UI elements
- JSON-driven configuration with presets
- Mock backend that echoes input data
- Responsive design with shadcn/ui components
- Form validation and error handling
- Copy/Download JSON functionality

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000/mvp-proposal](http://localhost:3000/mvp-proposal) in your browser.

## Testing the Wizard

### Manual Test Steps

1. **Load Preset**: Click "Load Preset" to populate the form with example data
2. **Step 1 - Audience**: Enter target audience (minimum 3 characters required)
3. **Step 2 - Proposals**: Add/edit proposal items with title, description, and details
4. **Step 3 - Format**: Select format (Text/Email/PDF), language (ES/EN), and tone
5. **Generate**: Click "Generate Proposal" to submit to mock API
6. **Result**: View JSON preview, copy to clipboard, or download as file

### Example Preset Data

```json
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
```

## API Endpoints

- `POST /api/mock-echo`: Mock endpoint that echoes the input JSON with additional metadata

## File Structure

- `components/ProposalWizard.tsx`: Main wizard component
- `lib/translations.ts`: Internationalization strings
- `lib/wizard-config.ts`: Configuration and types
- `app/mvp-proposal/page.tsx`: Main page
- `pages/api/mock-echo.ts`: Mock API endpoint

## Validation Rules

- Audience: Required, minimum 3 characters
- Proposals: At least one proposal with title required
- All other fields have sensible defaults

## Language Support

Switch between Spanish (ES) and English (EN) using the language selector in the top right corner. All UI elements are translated while maintaining the same functionality.
