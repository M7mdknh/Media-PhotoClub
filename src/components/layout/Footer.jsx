import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  const { t, i18n } = useTranslation();

  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com/kfupm_photoclub', label: 'Instagram' },
    { icon: Twitter, href: 'https://twitter.com/kfupm_photoclub', label: 'Twitter' },
    { icon: Youtube, href: 'https://youtube.com/@kfupmphotoclub', label: 'YouTube' },
  ];

  const quickLinks = [
    { name: t('nav.about'), href: '/about' },
    { name: t('nav.events'), href: '/events' },
    { name: t('nav.magazine'), href: '/magazine' },
    { name: t('nav.gallery'), href: '/gallery' },
  ];

  return (
    <footer className="bg-dark text-light">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Club Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-brand"></div>
              <span className="text-xl font-bold text-brand">
                {i18n.language === 'ar' ? 'نادي الإعلام والتصوير' : 'Media & Photo Club'}
              </span>
            </div>
            <p className="text-sm text-gray-300">
              {i18n.language === 'ar' 
                ? 'نلتقط اللحظات، ننشئ الذكريات، ونحكي القصص من خلال عدسة الإبداع والابتكار.'
                : 'Capturing moments, creating memories, and telling stories through the lens of creativity and innovation.'
              }
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-brand">
              {i18n.language === 'ar' ? 'روابط سريعة' : 'Quick Links'}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-300 hover:text-brand transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-brand">
              {i18n.language === 'ar' ? 'معلومات التواصل' : 'Contact Info'}
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-brand" />
                <span className="text-sm text-gray-300">
                  {t('contact.info.address')}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-brand" />
                <span className="text-sm text-gray-300">
                  {t('contact.info.email')}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-brand" />
                <span className="text-sm text-gray-300">
                  {t('contact.info.phone')}
                </span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-brand">
              {i18n.language === 'ar' ? 'تابعنا' : 'Follow Us'}
            </h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-gray-800 hover:bg-brand transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-400">
            {i18n.language === 'ar' 
              ? `© ${new Date().getFullYear()} نادي الإعلام والتصوير - جامعة الملك فهد للبترول والمعادن. جميع الحقوق محفوظة.`
              : `© ${new Date().getFullYear()} KFUPM Media & Photo Club. All rights reserved.`
            }
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

