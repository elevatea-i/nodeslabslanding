'use client';

import React, { createContext, useContext, useState } from 'react';

type Language = 'es' | 'en';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => any;
};

const translations = {
  es: {
    // Navbar
    'nav.home': 'Inicio',
    'nav.services': 'Servicios',
    'nav.whyChooseUs': 'La solución',
    'nav.contact': 'Contacto',
    'nav.switchLang': 'Change to English',

    // Hero Section
    'hero.title': 'Construimos sistemas de IA para que vendas más, gastes menos y crezcas más rápido',
    'hero.subtitle': 'Agentes IA que atienden, agendan y venden por tu negocio.',
    'hero.pain': 'Sin IA en tu negocio: Más costos, menos clientes y tu competencia ganándote.',
    'hero.cta': 'Agenda tu sesión sin costo →',
    'hero.proof': '✓ Sin compromisos',
    'hero.proof.nocommit': 'Sin compromisos',
    'hero.proof.results': 'Resultados desde la primera semana',
    'hero.card.support.title': 'Agente de Atención',
    'hero.card.support.sub': 'Respondiendo clientes',
    'hero.card.support.badge': '24/7',
    'hero.card.lead.title': 'Lead Capture',
    'hero.card.appointments.title': 'Citas Agendadas',
    'hero.card.appointments.sub': '3 confirmadas hoy',
    'hero.card.appointments.badge': 'Sincronizado',
    'hero.card.workflow.title': 'Workflow Activo',
    'hero.card.workflow.sub': 'CRM → WhatsApp → Seguimiento',
    'hero.card.workflow.badge': 'Ejecutando...',

    // Automation Section
    'automation.heading': 'Automatiza tu',
    'automation.phrase1': 'Captura de leads.',
    'automation.phrase2': 'Atención al cliente.',
    'automation.phrase3': 'Agendamiento Automático.',
    'automation.phrase4': 'Seguimiento de ventas.',
    'automation.phrase5': 'Calificación de prospectos.',
    'automation.primaryText': 'Agentes IA que trabajan\ncomo tu mejor empleado.\nAhorra tiempo automatizando\nrespuestas y genera más leads\nsin contratar más personal.',

    // Automation Service Buttons
    'automation.buttons.title': '¿Qué quieres automatizar?',
    'automation.buttons.customerSupport': 'Atención al cliente.',
    'automation.buttons.receptionist': 'Recepcionista.',
    'automation.buttons.leadGeneration': 'Generación de leads.',
    'automation.buttons.outboundSales': 'Call center.',
    'automation.buttons.rentalService': 'Servicios de renta.',
    'automation.buttons.appointmentBooking': 'Reserva de citas.',
    'automation.buttons.inboundQualification': 'Calificación de prospectos.',
    'automation.buttons.productRecommendation': 'Recomendación de productos.',

    // Automation messages for each service
    'automation.messages.customerSupport': 'Responde +200 mensajes en segundos.',
    'automation.messages.receptionist': 'Tu recepción perfecta 24/7, incluso los domingos.',
    'automation.messages.leadGeneration': 'El 73% de nuestros clientes duplica sus leads con esto.',
    'automation.messages.outboundSales': '3x más cierres de venta sin aumentar tu equipo.',
    'automation.messages.rentalService': 'Renta autos, casas, equipos sin perder un solo prospecto.',
    'automation.messages.appointmentBooking': 'Tus clientes reservan solos, incluso a las 2am.',
    'automation.messages.inboundQualification': 'Solo hablas con prospectos listos para comprar.',
    'automation.messages.productRecommendation': 'Venta cruzada automática que aumenta tu ticket promedio.',

    // Why Choose Us Modal
    'whyChooseUs.title': '¿Por qué nuestros clientes eligen NodesLabs? | Tu negocio merece más.',
    'whyChooseUs.intro': '¿Listo para escalar? Nosotros hacemos lo contrario a las agencias: menos promesas, más resultados. Funciona desde la primera semana.',
    'whyChooseUs.benefits': [
      {
        title: 'Automatiza, crece y olvídate del estrés.',
        desc: 'Deja que la IA se encargue de clientes, citas y ventas mientras tú te enfocas en crecer.'
      },
      {
        title: 'Más ventas, menos esfuerzo, mejor servicio.',
        desc: 'Capta clientes, agiliza respuestas y mejora la atención sin contratar más personal.'
      },
      {
        title: 'Escala tu negocio sin complicaciones.',
        desc: 'Automatiza procesos clave y crece sin los límites de la operación manual.'
      },
      {
        title: 'Atiende más rápido y sin interrupciones.',
        desc: 'IA disponible 24/7 para responder, resolver dudas y agendar en segundos.'
      },
      {
        title: 'Convierte cada interacción en una oportunidad.',
        desc: 'Cada mensaje puede ser una venta. No pierdas clientes por falta de respuesta.'
      }
    ],

    // PAS Section
    // PAS Section - New card content
    'pas.card1': 'Son las 11 PM.\nUn cliente quiere respuesta.\nNadie contesta.\n\nNo es falta de ganas.\nEs falta de sistema.',
    'pas.card2': 'Todo lo que depende de ti\npersonalmente tiene un límite.\n\nTu tiempo. Tu energía.\nTus resultados no tienen por qué tenerlo.',
    'pas.card3': 'Agentes que atienden.\nPlataformas que convierten.\nContenido que posiciona.\n\nUn laboratorio.\nTodo lo que necesitas.',

    // Benefits Section
    'benefits.title': 'Escala tu negocio con IA.',
    'benefits.aiAgent.title': 'Agentes IA',
    'benefits.aiAgent.desc': 'Ahorra tiempo y automatiza tu atención al cliente 24/7 con un procesamiento avanzado de lenguaje.',
    'benefits.leadCapture.title': 'Lead capture.',
    'benefits.leadCapture.desc': 'Captura más leads y cierra ventas con nuestro sistema conectado a tu CRM.',
    'benefits.calendar.title': 'Gestión de citas.',
    'benefits.calendar.desc': 'Agenda citas automáticamente y nunca pierdas una oportunidad.',
    'benefits.website.title': 'Creación de sitios web.',
    'benefits.website.desc': 'Destaca con un sitio web moderno y optimizado para tu negocio.',

    // Process Section
    'process.title': '¿Cómo elevamos tu negocio?',
    'process.step1': 'Agenda tu sesión sin costo.',
    'process.step2': 'Automatizamos tus procesos clave.',
    'process.step3': 'Crece, atrae más clientes y escala sin límites.',

    // CTA Section
    'cta.competition': 'Tu competencia',
    'cta.waiting': 'no espera...',
    'cta.button': 'Automatiza y Gana Más',

    // Contact Form
    'contact.title': 'Hablemos de tu negocio.',
    'contact.back': 'Volver',
    'contact.fullName': 'Nombre completo',
    'contact.email': 'Correo electrónico',
    'contact.company': 'Nombre de la empresa',
    'contact.service': 'Servicio seleccionado',
    'contact.problems': '¿En que podemos ayudarte?',
    'contact.additionalInfo': 'Información adicional (opcional)',
    'contact.submit': 'Enviar',
    'contact.sending': 'Enviando...',
    'contact.required': 'Este campo es requerido',
    'contact.invalidEmail': 'Correo electrónico inválido',
    'contact.selectService': 'Selecciona un servicio',
    'contact.error': 'Hubo un error al enviar el formulario. Por favor, intente nuevamente.',
    'contact.fullNameMinLength': 'Tu nombre debe tener al menos 2 caracteres.',
    'contact.fullNameMaxLength': 'Tu nombre no puede exceder 100 caracteres.',
    'contact.emailMaxLength': 'Tu email no puede exceder 254 caracteres.',
    'contact.companyNameMinLength': 'El nombre de la empresa debe tener al menos 2 caracteres.',
    'contact.companyNameMaxLength': 'El nombre de la empresa no puede exceder 100 caracteres.',
    'contact.problemsMinLength': 'Describe tu problema en al menos 10 caracteres.',
    'contact.problemsMaxLength': 'La descripción no puede exceder 1000 caracteres.',
    'contact.additionalInfoMaxLength': 'La información adicional no puede exceder 500 caracteres.',
    'contact.success': '¡Gracias! Tu información ha sido enviada correctamente.',

    // Enhanced validation messages
    'contact.fullNameTwoWords': 'Por favor ingresa tu nombre y apellido.',
    'contact.fullNameTwoWordsHelp': 'Necesitamos tu nombre completo (nombre y apellido) para contactarte adecuadamente.',
    'contact.fullNameInvalidChars': 'El nombre solo debe contener letras y espacios.',
    'contact.nameInvalidCharsHelp': 'Por favor evita usar números o caracteres especiales en tu nombre.',
    'contact.nameMinLengthHelp': 'Tu nombre es muy corto. Verifica que sea correcto.',
    'contact.nameTooLongHelp': 'El nombre es demasiado largo. Por favor usa un formato más breve.',
    'contact.emailTypo': '¿Quisiste decir',
    'contact.emailFormatHelp': 'Verifica que tu email tenga el formato correcto: ejemplo@dominio.com',
    'contact.emailTooLongHelp': 'El correo electrónico es demasiado largo.',
    'contact.companyMinLengthHelp': 'El nombre de la empresa es muy corto.',
    'contact.companyTooLongHelp': 'El nombre de la empresa es demasiado largo.',
    'contact.problemsMinLengthHelp': 'Por favor describe tu situación con más detalle para poder ayudarte mejor.',
    'contact.problemsTooLongHelp': 'La descripción es muy extensa. Intenta resumir los puntos principales.',
    'contact.problemsTooShort': 'Proporciona más detalles sobre cómo podemos ayudarte.',
    'contact.problemsMoreDetailHelp': 'Mientras más detalles proporciones, mejor podremos ayudarte con tu situación.',
    'contact.additionalInfoTooLongHelp': 'La información adicional es muy extensa. Intenta ser más conciso.',
    'contact.charactersRemaining': 'caracteres restantes',
    'contact.validationErrors': 'Por favor corrige los siguientes errores:',
    'contact.duplicateEmail': 'Ya recibimos una solicitud con este correo recientemente.',
    'contact.duplicateEmailHelp': 'Si necesitas actualizar tu información, contáctanos directamente.',
    'contact.dbNotConfigured': 'Base de datos no configurada. Contacte al administrador.',
    'contact.rateLimitError': 'Demasiadas solicitudes. Por favor, espera unos minutos antes de intentar nuevamente.',
    'contact.invalidContent': 'Contenido inválido detectado. Por favor, revisa tu mensaje.',
    'contact.placeholderFullName': 'Ej: Juan Pérez',
    'contact.placeholderEmail': 'ejemplo@empresa.com',
    'contact.placeholderCompany': 'Ej: Mi Empresa S.A.',
    'contact.placeholderProblems': 'Describe cómo podemos ayudarte a automatizar tu negocio...',
    'contact.placeholderAdditionalInfo': 'Información adicional que consideres relevante...',
    'contact.progressLabel': 'Progreso del formulario',
    'contact.formComplete': '¡Formulario completo!',
    'contact.sendingAccessible': 'Enviando formulario, por favor espera',
    'contact.fieldRemaining': 'campo más para enviar',
    'contact.fieldsRemaining': 'campos más para enviar',
    'contact.completeFields': 'Completa',
    'contact.service.aiAgents': 'AI Agents',
    'contact.service.productosDigitales': 'Productos Digitales',
    'contact.service.contentMedia': 'Content & Media',

    // Hero lab section
    'hero.labHeadline': 'El laboratorio de IA detrás de tu siguiente nivel.',
    'hero.labSubtitle': 'Construimos los sistemas que tu negocio necesita para crecer.',
    'hero.labCta1': 'Empecemos a construir →',
    'hero.labCta2': 'Ver nuestro trabajo',

    // Automation section headers
    'automation.sectionTitle': 'Un agente para cada parte de tu operación.',
    'automation.sectionSubtitle': 'Cada caso de uso es un agente distinto, entrenado para resolver exactamente eso.',
    'automation.mobileHint': 'Toca cada opción para explorar',

    // Modal
    'modal.close': 'Cerrar',

    // Thank You Page
    'thanks.title': '¡Gracias por contactarnos!',
    'thanks.message': 'Alguien del laboratorio te escribirá en las próximas 24 horas.',
    'thanks.redirect': 'Redirigiendo en',
    'thanks.redirect.seconds': 'segundos...',
    'thanks.back': 'Volver al inicio'
  },
  en: {
    // Navbar
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.whyChooseUs': 'The solution',
    'nav.contact': 'Contact',
    'nav.switchLang': 'Cambiar a Español',

    // Hero Section
    'hero.title': 'We build AI systems so you sell more, spend less, and grow faster',
    'hero.subtitle': 'AI Agents that answer, book, and sell for your business — nonstop.',
    'hero.pain': 'No AI in your business means higher costs, fewer clients, and your competition winning.',
    'hero.cta': 'Book your free session →',
    'hero.proof': '✓ No commitment',
    'hero.proof.nocommit': 'No commitment',
    'hero.proof.results': 'Results from week one',
    'hero.card.support.title': 'Support Agent',
    'hero.card.support.sub': 'Responding to clients',
    'hero.card.support.badge': '24/7',
    'hero.card.lead.title': 'Lead Capture',
    'hero.card.appointments.title': 'Appointments Booked',
    'hero.card.appointments.sub': '3 confirmed today',
    'hero.card.appointments.badge': 'Synced',
    'hero.card.workflow.title': 'Active Workflow',
    'hero.card.workflow.sub': 'CRM → WhatsApp → Follow-up',
    'hero.card.workflow.badge': 'Running...',

    // Automation Section
    'automation.heading': 'Automate Your',
    'automation.phrase1': 'Lead capture',
    'automation.phrase2': 'Customer service',
    'automation.phrase3': 'Automatic scheduling',
    'automation.phrase4': 'Sales tracking',
    'automation.phrase5': 'Prospect qualification',
    'automation.primaryText': 'AI agents that work\nlike your best employee.\nSave time automating responses\nand generate more leads\nwithout hiring more staff.',

    // Automation Service Buttons
    'automation.buttons.title': 'What do you want to automate?',
    'automation.buttons.customerSupport': 'Customer support',
    'automation.buttons.receptionist': 'Receptionist',
    'automation.buttons.leadGeneration': 'Lead generation',
    'automation.buttons.outboundSales': 'Outbound sales',
    'automation.buttons.rentalService': 'Rental service',
    'automation.buttons.appointmentBooking': 'Appointment booking',
    'automation.buttons.inboundQualification': 'Prospect qualification',
    'automation.buttons.productRecommendation': 'Product recommendation',

    // Automation messages for each service
    'automation.messages.customerSupport': 'Answer +200 messages in seconds.',
    'automation.messages.receptionist': 'Your perfect reception 24/7, even on Sundays.',
    'automation.messages.leadGeneration': '73% of our clients double their leads with this.',
    'automation.messages.outboundSales': '3x more sales closures without expanding your team.',
    'automation.messages.rentalService': 'Rent cars, houses, equipment without losing a single prospect.',
    'automation.messages.appointmentBooking': 'Your clients book alone, even at 2am.',
    'automation.messages.inboundQualification': 'You only talk to prospects ready to buy.',
    'automation.messages.productRecommendation': 'Automatic cross-selling that increases your average ticket.',

    // Why Choose Us Modal
    'whyChooseUs.title': 'Why do our clients choose NodesLabs? | Your business deserves more.',
    'whyChooseUs.intro': 'Ready to scale? We do the opposite of agencies: less promises, more results. It works from the first week.',
    'whyChooseUs.benefits': [
      {
        title: 'Automate, grow and forget about stress.',
        desc: 'Let AI handle customers, appointments, and sales while you focus on growth.'
      },
      {
        title: 'More sales, less effort, better service.',
        desc: 'Capture leads, streamline responses, and improve service without hiring more staff.'
      },
      {
        title: 'Scale your business without complications.',
        desc: 'Automate key processes and grow without the limitations of manual operations.'
      },
      {
        title: 'Respond faster without interruptions.',
        desc: 'AI available 24/7 to respond, solve queries, and schedule in seconds.'
      },
      {
        title: 'Turn every interaction into an opportunity.',
        desc: 'Every message can be a sale. Don\'t lose customers due to lack of response.'
      }
    ],

    // PAS Section
    // PAS Section - New card content
    'pas.card1': 'It\'s 11 PM.\nA customer wants an answer.\nNo one responds.\n\nNot lack of effort.\nLack of system.',
    'pas.card2': 'Everything that depends on you\npersonally has a limit.\n\nYour time. Your energy.\nYour results don\'t have to.',
    'pas.card3': 'Agents that respond.\nPlatforms that convert.\nContent that positions.\n\nOne lab.\nEverything you need.',

    // Benefits Section
    'benefits.title': 'Unlock growth with AI.',
    'benefits.aiAgent.title': 'AI Agents',
    'benefits.aiAgent.desc': 'Save time and automate your customer service 24/7 with advanced language processing.',
    'benefits.leadCapture.title': 'Lead Capture',
    'benefits.leadCapture.desc': 'Capture more leads and close sales with our CRM-connected system.',
    'benefits.calendar.title': 'Appointment Management',
    'benefits.calendar.desc': 'Schedule appointments automatically and never miss an opportunity.',
    'benefits.website.title': 'Website Creation',
    'benefits.website.desc': 'Stand out with a modern and optimized website for your business.',

    // Process Section
    'process.title': 'How do we elevate your business?',
    'process.step1': 'Schedule your free session.',
    'process.step2': 'We automate your key processes.',
    'process.step3': 'Grow, attract more customers and scale without limits.',

    // CTA Section
    'cta.competition': 'Competition',
    'cta.waiting': 'isn\'t waiting...',
    'cta.button': 'Automate & Gain More',

    // Contact Form
    'contact.title': 'Let\'s talk about your business.',
    'contact.back': 'Back',
    'contact.fullName': 'Full Name',
    'contact.email': 'Email',
    'contact.company': 'Company Name',
    'contact.service': 'Selected Service',
    'contact.problems': 'How can we help you?',
    'contact.additionalInfo': 'Additional Information (optional)',
    'contact.submit': 'Submit',
    'contact.sending': 'Sending...',
    'contact.required': 'This field is required',
    'contact.invalidEmail': 'Invalid email',
    'contact.selectService': 'Select a service',
    'contact.error': 'There was an error submitting the form. Please try again.',
    'contact.fullNameMinLength': 'Your name must be at least 2 characters long.',
    'contact.fullNameMaxLength': 'Your name cannot exceed 100 characters.',
    'contact.emailMaxLength': 'Your email cannot exceed 254 characters.',
    'contact.companyNameMinLength': 'Company name must be at least 2 characters long.',
    'contact.companyNameMaxLength': 'Company name cannot exceed 100 characters.',
    'contact.problemsMinLength': 'Please describe your problem in at least 10 characters.',
    'contact.problemsMaxLength': 'Description cannot exceed 1000 characters.',
    'contact.additionalInfoMaxLength': 'Additional info cannot exceed 500 characters.',
    'contact.success': 'Thank you! Your information has been sent successfully.',

    // Enhanced validation messages
    'contact.fullNameTwoWords': 'Please enter your first and last name.',
    'contact.fullNameTwoWordsHelp': 'We need your full name (first and last name) to contact you properly.',
    'contact.fullNameInvalidChars': 'Name should only contain letters and spaces.',
    'contact.nameInvalidCharsHelp': 'Please avoid using numbers or special characters in your name.',
    'contact.nameMinLengthHelp': 'Your name is too short. Please verify it\'s correct.',
    'contact.nameTooLongHelp': 'The name is too long. Please use a shorter format.',
    'contact.emailTypo': 'Did you mean',
    'contact.emailFormatHelp': 'Make sure your email has the correct format: example@domain.com',
    'contact.emailTooLongHelp': 'The email address is too long.',
    'contact.companyMinLengthHelp': 'The company name is too short.',
    'contact.companyTooLongHelp': 'The company name is too long.',
    'contact.problemsMinLengthHelp': 'Please describe your situation in more detail so we can help you better.',
    'contact.problemsTooLongHelp': 'The description is too long. Try to summarize the main points.',
    'contact.problemsTooShort': 'Provide more details about how we can help you.',
    'contact.problemsMoreDetailHelp': 'The more details you provide, the better we can help with your situation.',
    'contact.additionalInfoTooLongHelp': 'The additional information is too long. Try to be more concise.',
    'contact.charactersRemaining': 'characters remaining',
    'contact.validationErrors': 'Please correct the following errors:',
    'contact.duplicateEmail': 'We already received a request with this email recently.',
    'contact.duplicateEmailHelp': 'If you need to update your information, contact us directly.',
    'contact.dbNotConfigured': 'Database not configured. Please contact the administrator.',
    'contact.rateLimitError': 'Too many requests. Please wait a few minutes before trying again.',
    'contact.invalidContent': 'Invalid content detected. Please review your message.',
    'contact.placeholderFullName': 'Ex: John Smith',
    'contact.placeholderEmail': 'example@company.com',
    'contact.placeholderCompany': 'Ex: My Company Inc.',
    'contact.placeholderProblems': 'Describe how we can help you automate your business...',
    'contact.placeholderAdditionalInfo': 'Additional information you consider relevant...',
    'contact.progressLabel': 'Form progress',
    'contact.formComplete': 'Form complete!',
    'contact.sendingAccessible': 'Sending form, please wait',
    'contact.fieldRemaining': 'more field to submit',
    'contact.fieldsRemaining': 'more fields to submit',
    'contact.completeFields': 'Complete',
    'contact.service.aiAgents': 'AI Agents',
    'contact.service.productosDigitales': 'Digital Products',
    'contact.service.contentMedia': 'Content & Media',

    // Hero lab section
    'hero.labHeadline': 'The AI lab behind your next level.',
    'hero.labSubtitle': 'We build the systems your business needs to grow.',
    'hero.labCta1': "Let's start building →",
    'hero.labCta2': 'See our work',

    // Automation section headers
    'automation.sectionTitle': 'One agent for every part of your operation.',
    'automation.sectionSubtitle': 'Each use case is a distinct agent, trained to solve exactly that.',
    'automation.mobileHint': 'Tap each option to explore',

    // Modal
    'modal.close': 'Close',

    // Thank You Page
    'thanks.title': 'Thank you for contacting us!',
    'thanks.message': 'Someone from the lab will reach out within the next 24 hours.',
    'thanks.redirect': 'Redirecting in',
    'thanks.redirect.seconds': 'seconds...',
    'thanks.back': 'Back to home'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('es');

  const t = (key: string): any => {
    return translations[language][key as keyof typeof translations.es] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};