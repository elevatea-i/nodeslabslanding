import React from 'react';
import { Mail } from 'lucide-react';
import { FooterSEOLinks } from '@/components/SEOLinks';
import { InternalLink } from '@/components/InternalLinks';
import { useLanguage } from '@/context/LanguageContext';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { language } = useLanguage();

  return (
    <footer className="bg-black border-t border-gray-800/30">
      <div className="top-tier-container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column - Company Info */}
          <div className="lg:col-span-4 space-y-4">
            {/* Company Name and Logo */}
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold font-sora" style={{ color: '#FFFFFF' }}>
                NodesLabs
              </h2>
            </div>
            
            {/* Company Description */}
            <p className="text-gray-400 font-inter text-sm leading-relaxed max-w-sm">
              {language === 'es'
                ? 'El laboratorio donde la IA se encuentra con tu negocio | Líderes en automatización y contenido.'
                : 'The lab where AI meets your business | Leaders in automation and content.'}
            </p>

            {/* Contact Email */}
            <a
              href="mailto:axel@nodeslabs.com"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200 group"
              aria-label="Enviar correo a axel@nodeslabs.com"
            >
              <Mail size={16} className="group-hover:scale-110 transition-transform duration-200" />
              <span className="text-sm font-inter">axel@nodeslabs.com</span>
            </a>

          </div>

          {/* Right Columns - Navigation Links */}
          <div className="lg:col-span-8">
            <FooterSEOLinks />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-8 mt-8 border-t border-gray-800/30 gap-4">
          {/* Copyright */}
          <p className="text-xs text-gray-400 font-inter">
            © {currentYear} NodesLabs. {language === 'es' ? 'Todos los derechos reservados' : 'All rights reserved.'}.
          </p>

          {/* Bottom Links */}
          <div className="flex items-center gap-6">
            <InternalLink
              to="/aviso-privacidad"
              variant="secondary"
              className="text-xs text-gray-400 hover:text-white"
            >
              {language === 'es' ? 'Aviso de Privacidad.' : 'Privacy Policy.'}
            </InternalLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;