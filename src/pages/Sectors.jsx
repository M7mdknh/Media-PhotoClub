import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const Sectors = () => {
  const { t, i18n } = useTranslation();
  const [sectors, setSectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedSector, setExpandedSector] = useState(null);

  useEffect(() => {
    fetchSectors();
  }, []);

  const fetchSectors = async () => {
    try {
      const response = await fetch('/data/sectors.json');
      if (!response.ok) {
        throw new Error('Failed to fetch sectors');
      }
      const data = await response.json();
      setSectors(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleSector = (sectorId) => {
    setExpandedSector(expandedSector === sectorId ? null : sectorId);
  };

  if (loading) {
    return (
      <div className="min-h-screen py-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand mx-auto mb-4"></div>
          <p>{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen py-16 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{t('common.error')}: {error}</p>
          <button onClick={fetchSectors} className="text-brand hover:underline">
            {t('common.retry')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-dark dark:text-light">
            {t('sectors.title')}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12">
            {t('sectors.subtitle')}
          </p>
        </div>

        {/* Sectors Accordion */}
        <div className="max-w-4xl mx-auto space-y-8">
          {sectors.map((sector) => (
            <Card key={sector.id} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow p-0 border-2 border-brand/20 bg-brand/10 rounded-xl cursor-pointer group">
              <CardHeader 
                className="rounded-t-xl px-6 py-4 bg-brand/10 group-hover:bg-brand/20 transition-colors"
                onClick={() => toggleSector(sector.id)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className={`text-xl text-dark dark:text-light font-semibold ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}>
                      {i18n.language === 'ar' ? sector.title_ar : sector.title_en}
                    </CardTitle>
                    <p className={`text-gray-600 dark:text-gray-300 mt-2 ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}>
                      {i18n.language === 'ar' ? sector.desc_ar : sector.desc_en}
                    </p>
                  </div>
                  {expandedSector === sector.id ? (
                    <ChevronUp className="h-6 w-6 text-brand" />
                  ) : (
                    <ChevronDown className="h-6 w-6 text-brand" />
                  )}
                </div>
              </CardHeader>
              
              {expandedSector === sector.id && (
                <CardContent className="pt-6 bg-white/70 dark:bg-dark/40 border-t border-brand/10 px-6 pb-6 rounded-b-xl">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {sector.units.map((unit) => (
                      <Badge
                        key={unit.id}
                        variant="secondary"
                        className="p-3 text-base bg-brandBlue text-white rounded-full shadow-md hover:bg-brandRed transition-colors cursor-pointer text-center font-semibold min-w-[160px] flex items-center justify-center"
                      >
                        <span dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
                          {i18n.language === 'ar' ? unit.name_ar : unit.name_en}
                        </span>
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center bg-light dark:bg-dark/50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4 text-dark dark:text-light">
            {i18n.language === 'ar' ? 'انضم إلى أحد قطاعاتنا' : 'Join One of Our Sectors'}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            {i18n.language === 'ar' 
              ? 'اكتشف شغفك وطور مهاراتك من خلال الانضمام إلى إحدى وحداتنا المتخصصة'
              : 'Discover your passion and develop your skills by joining one of our specialized units'
            }
          </p>
          <Button className="bg-brand hover:bg-brand/90 text-white px-8 py-3 rounded-lg font-medium transition-colors">
            {i18n.language === 'ar' ? 'تقدم بطلب الانضمام' : 'Apply to Join'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sectors;

