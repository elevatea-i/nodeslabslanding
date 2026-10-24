export type FaqItem = { id: string; q: { es: string; en: string }; a: { es: string; en: string } };

export const faqItems: FaqItem[] = [
  {
    id: 'costo',
    q: {
      es: '¿Cuánto cuesta un chatbot con IA, una automatización o un sitio web?',
      en: 'How much does an AI chatbot, an automation or a website cost?',
    },
    a: {
      es: 'Depende de lo que necesites. En una llamada de descubrimiento revisamos tu caso y te enviamos una propuesta clara, sin compromiso.',
      en: 'It depends on what you need. In a discovery call we review your case and send you a clear proposal, no commitment.',
    },
  },
  {
    id: 'botones-vs-agente',
    q: {
      es: '¿Qué diferencia hay entre un chatbot de botones y un agente de IA?',
      en: `What's the difference between a button-based chatbot and an AI agent?`,
    },
    a: {
      es: `El chatbot de botones sigue un menú fijo ("presiona 1"). El agente de IA entiende lo que el cliente escribe o dice con sus propias palabras y conversa de forma natural: resuelve dudas, califica y agenda sin menús.`,
      en: `A button-based chatbot follows a fixed menu ("press 1"). An AI agent understands what the customer writes or says in their own words and talks naturally: it answers questions, qualifies leads and books appointments without menus.`,
    },
  },
  {
    id: 'whatsapp-api',
    q: {
      es: '¿Cómo conectar un chatbot a WhatsApp Business sin que bloqueen mi número?',
      en: 'How do I connect a chatbot to WhatsApp Business without getting my number blocked?',
    },
    a: {
      es: 'Con la API oficial de WhatsApp Business de Meta, no con herramientas no oficiales de código QR, que van contra las condiciones de WhatsApp y pueden provocar bloqueos. Tus clientes escriben a tu número de negocio y la conversación llega al agente.',
      en: `With the official WhatsApp Business API from Meta, not with unofficial QR-code tools, which go against WhatsApp's terms and can lead to blocks. Your customers message your business number and the conversation reaches the agent.`,
    },
  },
  {
    id: 'proceso',
    q: {
      es: '¿Cuánto tarda y cómo es el proceso?',
      en: 'How long does it take and what is the process?',
    },
    a: {
      es: 'Empezamos con una llamada de descubrimiento, analizamos tu operación y te hacemos una propuesta. Una vez aprobada, desarrollamos e implementamos en menos de 15 días.',
      en: 'We start with a discovery call, analyze your operation and send you a proposal. Once approved, we build and deploy in under 15 days.',
    },
  },
  {
    id: 'respuestas-correctas',
    q: {
      es: '¿Cómo evito que el agente invente datos o responda algo incorrecto?',
      en: 'How do I keep the agent from making things up or giving wrong answers?',
    },
    a: {
      es: 'El agente responde solo desde una base de conocimientos que tú apruebas: servicios, precios, horarios y reglas. Si la respuesta no está ahí, no improvisa: pasa la conversación a una persona de tu equipo con un resumen, o abre un ticket de seguimiento.',
      en: `The agent answers only from a knowledge base that you approve: services, prices, hours and rules. If the answer isn't there, it doesn't improvise: it hands the conversation to someone on your team with a summary, or opens a follow-up ticket.`,
    },
  },
  {
    id: 'voz',
    q: {
      es: '¿Existe un agente de voz con IA que conteste llamadas en español mexicano?',
      en: 'Is there an AI voice agent that answers calls in Mexican Spanish?',
    },
    a: {
      es: `Sí. Contesta llamadas con voz natural en español mexicano, resuelve dudas, califica y agenda citas en tu calendario, a cualquier hora. No suena a contestador de "presiona 1": conversa.`,
      en: `Yes. It answers calls with a natural voice in Mexican Spanish, resolves questions, qualifies leads and books appointments on your calendar, at any hour. It doesn't sound like a "press 1" answering machine: it holds a conversation.`,
    },
  },
  {
    id: 'automatizacion',
    q: {
      es: '¿Qué procesos puedo automatizar y con qué herramientas se conecta?',
      en: 'What can I automate, and which tools does it connect to?',
    },
    a: {
      es: 'Lo repetitivo entre tus herramientas: captura de leads, seguimiento, confirmación de citas, recordatorios y reportes. Nos conectamos con Google Calendar, Cal.com, HubSpot, Airtable, Gmail y, con Make o n8n, la mayoría de las apps con conexión.',
      en: 'The repetitive work between your tools: lead capture, follow-up, appointment confirmations, reminders and reports. We connect with Google Calendar, Cal.com, HubSpot, Airtable, Gmail and, through Make or n8n, most apps that offer a connection.',
    },
  },
  {
    id: 'web',
    q: {
      es: '¿Desarrollan sitios web y productos digitales a la medida?',
      en: 'Do you build custom websites and digital products?',
    },
    a: {
      es: 'Sí. Diseñamos y desarrollamos sitios web, plataformas y MVPs a la medida, conectados a tu WhatsApp, CRM y pagos, para que además de verse bien conviertan y se integren a tu operación.',
      en: 'Yes. We design and build custom websites, platforms and MVPs connected to your WhatsApp, CRM and payments, so they look good, convert and plug into how you operate.',
    },
  },
];
