'use client';

import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const PrivacyNotice: React.FC = () => {
  const router = useRouter();
  const [backHover, setBackHover] = useState(false);

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: '#0B0D14' }}>
      <div className="relative z-10">
        <button
          onClick={() => router.push('/')}
          className="fixed top-4 left-4 transition-colors duration-300 flex items-center gap-2 z-20"
          style={{ color: backHover ? '#FFFFFF' : 'rgba(255,255,255,0.5)' }}
          onMouseEnter={() => setBackHover(true)}
          onMouseLeave={() => setBackHover(false)}
        >
          <ArrowLeft size={20} />
          <span>Volver</span>
        </button>

        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <motion.div
            className="prose prose-invert max-w-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="backdrop-blur-lg rounded-2xl p-6 sm:p-8 shadow-xl border"
              style={{ backgroundColor: 'rgba(26,37,64,0.85)', borderColor: '#2D4460' }}
            >
              {/* Header */}
              <h1
                className="text-2xl sm:text-3xl font-bold text-center mb-6"
                style={{ color: '#E4EDF4' }}
              >
                AVISO DE PRIVACIDAD | PRIVACY NOTICE
              </h1>

              <p className="italic mb-8 text-center text-sm sm:text-base" style={{ color: 'rgba(255,255,255,0.4)' }}>
                Este aviso aplica a todos los visitantes y usuarios del sitio.
              </p>

              <hr className="my-8" style={{ borderColor: '#2D4460' }} />

              {/* Spanish Section */}
              <section className="mb-12">
                <h2
                  className="text-xl sm:text-2xl font-bold mb-6 flex items-center gap-3"
                  style={{ color: '#ADC9E0' }}
                >
                  ESPAÑOL.
                </h2>

                <div className="space-y-8">
                  {/* Responsable */}
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-3 flex items-center gap-2" style={{ color: '#E4EDF4' }}>
                      RESPONSABLE DEL TRATAMIENTO.
                    </h3>
                    <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
                      NodesLabs, con domicilio en México, es responsable del tratamiento de tus datos personales conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.
                    </p>
                  </div>

                  {/* Finalidades */}
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-3 flex items-center gap-2" style={{ color: '#E4EDF4' }}>
                      FINALIDADES DEL TRATAMIENTO.
                    </h3>
                    <p className="mb-3 text-sm sm:text-base" style={{ color: 'rgba(255,255,255,0.65)' }}>
                      Utilizamos tu información personal para:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4 text-sm sm:text-base" style={{ color: 'rgba(255,255,255,0.65)' }}>
                      <li>Contactarte y responder a tus solicitudes de servicios.</li>
                      <li>Proporcionar cotizaciones y propuestas de automatización.</li>
                      <li>Implementar y dar soporte a nuestros agentes de IA.</li>
                      <li>Mejorar nuestros servicios y experiencia del usuario.</li>
                      <li>Enviar información comercial relevante. (solo si lo autorizas)</li>
                    </ul>
                  </div>

                  {/* Almacenamiento */}
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-3 flex items-center gap-2" style={{ color: '#E4EDF4' }}>
                      ALMACENAMIENTO Y SEGURIDAD.
                    </h3>
                    <ul className="list-disc list-inside space-y-2 ml-4 text-sm sm:text-base" style={{ color: 'rgba(255,255,255,0.65)' }}>
                      <li>Tus datos se almacenan de forma segura en una base de datos SQL. (infraestructura certificada)</li>
                      <li>Integraciones seguras con herramientas especializadas para gestión de contactos.</li>
                      <li>Implementamos medidas técnicas y administrativas para proteger tu información.</li>
                      <li>No utilizamos cookies de seguimiento ni compartimos datos con terceros.</li>
                    </ul>
                  </div>

                  {/* Derechos ARCO */}
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-3 flex items-center gap-2" style={{ color: '#E4EDF4' }}>
                      TUS DERECHOS. (ARCO)
                    </h3>
                    <p className="mb-3 text-sm sm:text-base" style={{ color: 'rgba(255,255,255,0.65)' }}>
                      Tienes derecho a:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4 text-sm sm:text-base" style={{ color: 'rgba(255,255,255,0.65)' }}>
                      <li>Acceder a tus datos personales.</li>
                      <li>Rectificar información incorrecta.</li>
                      <li>Cancelar tu registro.</li>
                      <li>Oponerte al tratamiento de tus datos en cualquier momento.</li>
                    </ul>
                  </div>
                </div>

                <hr className="my-8" style={{ borderColor: '#2D4460' }} />

                {/* Términos y Condiciones */}
                <h2
                  className="text-xl sm:text-2xl font-bold mb-6"
                  style={{ color: '#ADC9E0' }}
                >
                  TÉRMINOS Y CONDICIONES DE USO.
                </h2>

                <div className="space-y-8">
                  {/* Aceptación */}
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-3 flex items-center gap-2" style={{ color: '#E4EDF4' }}>
                      ACEPTACIÓN.
                    </h3>
                    <p className="text-sm sm:text-base" style={{ color: 'rgba(255,255,255,0.65)' }}>
                      Al usar nodeslabs.com aceptas estos términos.
                    </p>
                  </div>

                  {/* Servicios */}
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-3 flex items-center gap-2" style={{ color: '#E4EDF4' }}>
                      SERVICIOS.
                    </h3>
                    <ul className="list-disc list-inside space-y-2 ml-4 text-sm sm:text-base" style={{ color: 'rgba(255,255,255,0.65)' }}>
                      <li>Implementación del servicio.</li>
                      <li>Garantía de funcionamiento por 30 días.</li>
                      <li>Soporte técnico incluido durante implementación.</li>
                    </ul>
                  </div>

                  {/* Política de Reembolsos */}
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-3 flex items-center gap-2" style={{ color: '#E4EDF4' }}>
                      POLÍTICA DE REEMBOLSOS.
                    </h3>
                    <ul className="list-disc list-inside space-y-2 ml-4 text-sm sm:text-base" style={{ color: 'rgba(255,255,255,0.65)' }}>
                      <li>Garantía de satisfacción en primeros 30 días.</li>
                      <li>Cambios menores sin costo adicional.</li>
                    </ul>
                  </div>

                  {/* Limitaciones */}
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-3 flex items-center gap-2" style={{ color: '#E4EDF4' }}>
                      LIMITACIONES.
                    </h3>
                    <ul className="list-disc list-inside space-y-2 ml-4 text-sm sm:text-base" style={{ color: 'rgba(255,255,255,0.65)' }}>
                      <li>NodesLabs no se hace responsable por interrupciones de terceros (WhatsApp, Telegram, CRM externos, etc)</li>
                      <li>Cliente debe proporcionar accesos necesarios para implementación.</li>
                    </ul>
                  </div>
                </div>
              </section>

              <hr className="my-8" style={{ borderColor: '#2D4460' }} />

              {/* English Section */}
              <section className="mb-12">
                <h2
                  className="text-xl sm:text-2xl font-bold mb-6 flex items-center gap-3"
                  style={{ color: '#ADC9E0' }}
                >
                  ENGLISH.
                </h2>

                <div className="space-y-8">
                  {/* Data Controller */}
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-3 flex items-center gap-2" style={{ color: '#E4EDF4' }}>
                      DATA CONTROLLER.
                    </h3>
                    <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
                      NodesLabs, located in Mexico, is responsible for the processing of your personal data in accordance with the Federal Law on Protection of Personal Data Held by Private Parties.
                    </p>
                  </div>

                  {/* Purpose */}
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-3 flex items-center gap-2" style={{ color: '#E4EDF4' }}>
                      PURPOSE OF PROCESSING.
                    </h3>
                    <p className="mb-3 text-sm sm:text-base" style={{ color: 'rgba(255,255,255,0.65)' }}>
                      We use your personal information to:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4 text-sm sm:text-base" style={{ color: 'rgba(255,255,255,0.65)' }}>
                      <li>Contact you and respond to your service requests.</li>
                      <li>Provide quotes and automation proposals.</li>
                      <li>Implement and support our AI agents.</li>
                      <li>Improve our services and user experience.</li>
                      <li>Send relevant commercial information. (only if you authorize it)</li>
                    </ul>
                  </div>

                  {/* Storage and Security */}
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-3 flex items-center gap-2" style={{ color: '#E4EDF4' }}>
                      STORAGE AND SECURITY.
                    </h3>
                    <ul className="list-disc list-inside space-y-2 ml-4 text-sm sm:text-base" style={{ color: 'rgba(255,255,255,0.65)' }}>
                      <li>Your data is securely stored in a SQL database. (certified infrastructure)</li>
                      <li>Secure integrations with specialized tools for contact management.</li>
                      <li>We implement technical and administrative measures to protect your information.</li>
                      <li>We do not use tracking cookies or share data with third parties.</li>
                    </ul>
                  </div>

                  {/* Rights */}
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-3 flex items-center gap-2" style={{ color: '#E4EDF4' }}>
                      YOUR RIGHTS. (ARCO)
                    </h3>
                    <p className="mb-3 text-sm sm:text-base" style={{ color: 'rgba(255,255,255,0.65)' }}>
                      You have the right to:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4 text-sm sm:text-base" style={{ color: 'rgba(255,255,255,0.65)' }}>
                      <li>Access your personal data.</li>
                      <li>Rectify incorrect information.</li>
                      <li>Cancel your registration.</li>
                      <li>Object to the processing of your data at any time.</li>
                    </ul>
                  </div>
                </div>

                <hr className="my-8" style={{ borderColor: '#2D4460' }} />

                {/* Terms and Conditions */}
                <h2
                  className="text-xl sm:text-2xl font-bold mb-6"
                  style={{ color: '#ADC9E0' }}
                >
                  TERMS AND CONDITIONS OF USE.
                </h2>

                <div className="space-y-8">
                  {/* Acceptance */}
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-3 flex items-center gap-2" style={{ color: '#E4EDF4' }}>
                      ACCEPTANCE.
                    </h3>
                    <p className="text-sm sm:text-base" style={{ color: 'rgba(255,255,255,0.65)' }}>
                      By using nodeslabs.com you accept these terms.
                    </p>
                  </div>

                  {/* Services */}
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-3 flex items-center gap-2" style={{ color: '#E4EDF4' }}>
                      SERVICES.
                    </h3>
                    <ul className="list-disc list-inside space-y-2 ml-4 text-sm sm:text-base" style={{ color: 'rgba(255,255,255,0.65)' }}>
                      <li>Service implementation.</li>
                      <li>30-day operation guarantee.</li>
                      <li>Technical support included during implementation.</li>
                    </ul>
                  </div>

                  {/* Refund Policy */}
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-3 flex items-center gap-2" style={{ color: '#E4EDF4' }}>
                      REFUND POLICY.
                    </h3>
                    <ul className="list-disc list-inside space-y-2 ml-4 text-sm sm:text-base" style={{ color: 'rgba(255,255,255,0.65)' }}>
                      <li>Satisfaction guarantee in the first 30 days.</li>
                      <li>Minor changes at no additional cost.</li>
                    </ul>
                  </div>

                  {/* Limitations */}
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-3 flex items-center gap-2" style={{ color: '#E4EDF4' }}>
                      LIMITATIONS.
                    </h3>
                    <ul className="list-disc list-inside space-y-2 ml-4 text-sm sm:text-base" style={{ color: 'rgba(255,255,255,0.65)' }}>
                      <li>NodesLabs is not responsible for third-party interruptions (WhatsApp, Telegram, external CRMs, etc)</li>
                      <li>Client must provide necessary access for implementation.</li>
                    </ul>
                  </div>
                </div>
              </section>

              <hr className="my-8" style={{ borderColor: '#2D4460' }} />

              <p className="text-xs sm:text-sm text-center" style={{ color: 'rgba(255,255,255,0.4)' }}>
                Última actualización: Junio 2026.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyNotice;
