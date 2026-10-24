import type { FaqItem } from '@/data/faq';

type L = { es: string; en: string };

export type Niche = {
  slug: string;
  path: string;
  navLabel: L;
  meta: { title: string; description: string };
  eyebrow: L;
  h1: L;
  subtitle: L;
  problems: L[];
  capabilitiesTitle: L;
  capabilities: L[];
  faq: FaqItem[];
  ctaTitle: L;
  service: { name: string; description: string; audience: string };
};

export const niches: Record<string, Niche> = {
  medicos: {
    slug: 'medicos',
    path: '/medicos',
    navLabel: { es: 'Médicos y clínicas', en: 'Doctors and clinics' },
    meta: {
      title: 'Agentes de IA para clínicas, dentistas y médicos | NodesLabs',
      description:
        'Chatbot y agente de IA para clínicas, dentistas y consultorios: agenda, confirma y recuerda citas por WhatsApp y llamada, a cualquier hora.',
    },
    eyebrow: { es: 'Para médicos, dentistas y clínicas', en: 'For doctors, dentists and clinics' },
    h1: {
      es: 'Agentes de IA que agendan las citas de tu clínica por WhatsApp y llamada.',
      en: `AI agents that book your clinic's appointments by WhatsApp and phone.`,
    },
    subtitle: {
      es: 'Atienden a tus pacientes a cualquier hora, confirman y recuerdan cada cita, y se conectan a tu agenda.',
      en: 'They take care of your patients at any hour, confirm and remind every appointment, and plug into your calendar.',
    },
    problems: [
      {
        es: 'Son las 10 PM y un paciente quiere una cita. Nadie contesta.',
        en: `It's 10 PM and a patient wants an appointment. Nobody answers.`,
      },
      {
        es: 'Tu recepción responde lo mismo todo el día: horarios, ubicación, indicaciones.',
        en: 'Your front desk answers the same questions all day: hours, location, instructions.',
      },
      {
        es: 'Las citas se cancelan o no llegan, y ese hueco ya no se recupera.',
        en: `Appointments get cancelled or missed, and that gap can't be recovered.`,
      },
    ],
    capabilitiesTitle: {
      es: 'Trabaja mientras tu equipo atiende pacientes.',
      en: 'It works while your team sees patients.',
    },
    capabilities: [
      {
        es: 'Agenda, confirma y reprograma citas en tu calendario.',
        en: 'Books, confirms and reschedules appointments on your calendar.',
      },
      {
        es: 'Responde dudas frecuentes con la información que tú apruebas.',
        en: 'Answers common questions with the information you approve.',
      },
      { es: 'Recuerda cada cita antes de que ocurra.', en: 'Reminds each appointment before it happens.' },
      {
        es: 'Pasa a una persona de tu equipo los casos urgentes o clínicos.',
        en: 'Hands urgent or clinical cases to someone on your team.',
      },
      {
        es: 'Contesta llamadas con voz natural en español mexicano.',
        en: 'Answers calls with a natural voice in Mexican Spanish.',
      },
      {
        es: 'Registra a cada paciente nuevo donde tu equipo ya trabaja.',
        en: 'Registers each new patient where your team already works.',
      },
    ],
    faq: [
      {
        id: 'diagnosticos',
        q: {
          es: '¿Puede el agente dar diagnósticos o consejos médicos?',
          en: 'Can the agent give diagnoses or medical advice?',
        },
        a: {
          es: 'No. Responde solo con la información que tú apruebas: horarios, tratamientos, indicaciones. Si el paciente describe una urgencia o hace una pregunta clínica, pasa la conversación a una persona de tu equipo.',
          en: 'No. It answers only with the information you approve: hours, treatments, instructions. If a patient describes an emergency or asks a clinical question, it hands the conversation to someone on your team.',
        },
      },
      {
        id: 'citas',
        q: {
          es: '¿Cómo confirma y reprograma las citas?',
          en: 'How does it confirm and reschedule appointments?',
        },
        a: {
          es: 'Se conecta a tu calendario: ofrece los horarios disponibles, agenda, recuerda la cita y reprograma si el paciente no puede asistir. Tu equipo lo ve todo en la agenda de siempre.',
          en: `It connects to your calendar: it offers available times, books, reminds the appointment and reschedules if the patient can't make it. Your team sees everything in the same calendar as always.`,
        },
      },
      {
        id: 'datos',
        q: {
          es: '¿Qué pasa con los datos de mis pacientes?',
          en: `What happens with my patients' data?`,
        },
        a: {
          es: 'En la llamada de descubrimiento definimos qué información recopila el agente, por ejemplo nombre, teléfono y motivo de la cita, y cuál no. Se maneja con las herramientas que ya usas y bajo tu aviso de privacidad.',
          en: `In the discovery call we define what information the agent collects, for example name, phone and reason for the appointment, and what it doesn't. It is handled with the tools you already use and under your privacy notice.`,
        },
      },
      {
        id: 'consultorio-pequeno',
        q: {
          es: '¿Sirve un chatbot con IA para un consultorio o una clínica dental pequeña?',
          en: 'Does an AI chatbot work for a small practice or dental clinic?',
        },
        a: {
          es: 'Sí. Se configura al tamaño de tu operación, desde un consultorio con un solo médico hasta una clínica con varios especialistas. Empieza con lo que más te quita tiempo, como agendar y confirmar citas.',
          en: 'Yes. It is set up to the size of your operation, from a practice with a single doctor to a clinic with several specialists. It starts with what takes up most of your time, like booking and confirming appointments.',
        },
      },
      {
        id: 'whatsapp',
        q: {
          es: '¿Se puede usar con el WhatsApp de mi clínica?',
          en: `Can it work with my clinic's WhatsApp?`,
        },
        a: {
          es: 'Sí, con la API oficial de WhatsApp Business de Meta. Tus pacientes escriben a tu número de negocio y la conversación llega al agente.',
          en: 'Yes, through the official WhatsApp Business API from Meta. Your patients message your business number and the conversation reaches the agent.',
        },
      },
    ],
    ctaTitle: { es: 'Hablemos de tu clínica.', en: `Let's talk about your clinic.` },
    service: {
      name: 'Agentes de IA para clínicas, dentistas y médicos',
      description:
        'Agentes de IA que agendan, confirman y recuerdan citas por WhatsApp y llamada para clínicas, dentistas y consultorios.',
      audience: 'Médicos, dentistas y clínicas',
    },
  },
};
