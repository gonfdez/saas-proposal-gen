export const translations = {
  es: {
    wizard: {
      title: "Construye tu propuesta/post",
    },
    help: {
      step1: {
        title: "Paso 1: Define tu audiencia",
        content:
          "Especifica a quién va dirigida tu propuesta. Puede ser una persona específica (ej: 'Director de Marketing de TechGrowth') o un tipo de cliente (ej: 'Empresas de tecnología con 50-200 empleados'). Esto ayudará a personalizar el tono y contenido de tu propuesta.",
      },
      step2: {
        title: "Paso 2: Define tu propuesta",
        content:
          "Describe qué servicios o productos quieres ofrecer. Puedes agregar múltiples propuestas. El título debe ser claro y conciso, la descripción puede incluir beneficios clave, y los detalles pueden contener información adicional como casos de éxito o entregables específicos.",
      },
      step3: {
        title: "Paso 3: Formato y parámetros",
        content:
          "Selecciona el formato de salida (texto, email o PDF), el idioma del contenido final y el tono que quieres usar. Estos parámetros determinarán cómo se estructura y presenta tu propuesta final.",
      },
    },
    step1: {
      badgeTitle: "Destinatario",
      title: "¿A quién va dirigida tu propuesta?",
      placeholder: "Ej: Director de marketing de TechGrowth",
    },
    step2: {
      badgeTitle: "Contenido",
      title: "¿Qué quieres proponer?",
      placeholder: "Ej: Servicios de SEO mensual para mejorar tráfico y leads",
      optionalDetails: "Detalles opcionales (beneficios, entregables, pruebas sociales)...",
      addAnother: "Agregar otro servicio/idea",
      titleLabel: "Titulo",
      descriptionLabel: "Descripcion",
      detailsLabel: "Detalles",
    },
    step3: {
      badgeTitle: "Formato",
      title: "Formato de la propuesta",
      options: {
        text: "Texto",
        email: "Correo electrónico",
        pdf: "PDF 1 página",
      },
      language: "Idioma del output",
      tone: "Tono",
      toneOptions: {
        Profesional: "Profesional",
        Amigable: "Amigable",
        Persuasivo: "Persuasivo",
        Directo: "Directo",
      },
    },
    buttons: {
      next: "Siguiente",
      back: "Atrás",
      generate: "Generar propuesta",
      copy: "Copiar",
      download: "Descargar JSON",
      remove: "Eliminar",
      edit: "Editar",
    },
    validation: {
      required: "Este campo es obligatorio",
      minLength: "Debe tener al menos 3 caracteres",
    },
    result: {
      title: "Propuesta generada",
      subtitle: "Tu propuesta ha sido generada exitosamente",
      jsonPreview: "Vista previa del JSON",
    },
    language: {
      label: "Idioma",
      es: "Español",
      en: "English",
    },
  },
  en: {
    wizard: {
      title: "Build your proposal/post",
    },
    help: {
      step1: {
        title: "Step 1: Define your audience",
        content:
          "Specify who your proposal is for. It can be a specific person (e.g., 'Marketing Director at TechGrowth') or a type of client (e.g., 'Technology companies with 50-200 employees'). This will help personalize the tone and content of your proposal.",
      },
      step2: {
        title: "Step 2: Define your proposal",
        content:
          "Describe what services or products you want to offer. You can add multiple proposals. The title should be clear and concise, the description can include key benefits, and details can contain additional information like success stories or specific deliverables.",
      },
      step3: {
        title: "Step 3: Format and parameters",
        content:
          "Select the output format (text, email, or PDF), the language of the final content, and the tone you want to use. These parameters will determine how your final proposal is structured and presented.",
      },
    },
    step1: {
      badgeTitle: "Destinatary",
      title: "Who is your proposal for?",
      placeholder: "Ex: Marketing Director at TechGrowth",
    },
    step2: {
      badgeTitle: "Content",
      title: "What do you want to propose?",
      placeholder: "Ex: Monthly SEO services to increase traffic and leads",
      optionalDetails: "Optional details (benefits, deliverables, social proof)...",
      addAnother: "Add another service/idea",
      titleLabel: "Title",
      descriptionLabel: "Description",
      detailsLabel: "Details",
    },
    step3: {
      badgeTitle: "Format",
      title: "Proposal format",
      options: {
        text: "Text",
        email: "Email",
        pdf: "1-page PDF",
      },
      language: "Output language",
      tone: "Tone",
      toneOptions: {
        Profesional: "Professional",
        Amigable: "Friendly",
        Persuasivo: "Persuasive",
        Directo: "Direct",
      },
    },
    buttons: {
      next: "Next",
      back: "Back",
      generate: "Generate proposal",
      copy: "Copy",
      download: "Download JSON",
      remove: "Remove",
      edit: "Edit",
    },
    validation: {
      required: "This field is required",
      minLength: "Must be at least 3 characters",
    },
    result: {
      title: "Proposal generated",
      subtitle: "Your proposal has been generated successfully",
      jsonPreview: "JSON Preview",
    },
    language: {
      label: "Language",
      es: "Español",
      en: "English",
    },
  },
} as const

export type Language = keyof typeof translations
export type TranslationKey = keyof typeof translations.es
