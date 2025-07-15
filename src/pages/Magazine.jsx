import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Download, Eye, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Magazine = () => {
  const { t, i18n } = useTranslation();
  const [magazines, setMagazines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMagazines();
  }, []);

  const fetchMagazines = async () => {
    try {
      const response = await fetch('/data/magazines.json');
      if (!response.ok) {
        throw new Error('Failed to fetch magazines');
      }
      const data = await response.json();
      setMagazines(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(i18n.language === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleDownload = (magazine) => {
    // TODO: Implement actual PDF download
    alert(`Download ${magazine.id} - Coming soon!`);
  };

  const handleView = (magazine) => {
    // TODO: Implement PDF viewer modal
    alert(`View ${magazine.id} - Coming soon!`);
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
          <Button onClick={fetchMagazines}>{t('common.retry')}</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full py-16">
      <div className="w-full px-4 mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-dark dark:text-light">{t('magazine.title')}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12">
            {t('magazine.subtitle')}
          </p>
        </div>

        {/* Magazines Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full">
          {magazines.map((magazine) => {
            const downloadUrl = magazine.downloadUrl || magazine.pdf;
            return (
              <Card key={magazine.id} className="overflow-hidden hover:shadow-lg transition-shadow p-6">
                {/* Magazine Cover */}
                <div className="aspect-[3/4] relative w-full rounded-lg overflow-hidden">
                  <img
                    src={magazine.cover || '/src/assets/gallery/Intro.jpg'}
                    alt={i18n.language === 'ar' ? magazine.title_ar : magazine.title_en}
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-white text-dark">
                      {magazine.id.replace('issue-', 'Issue ')}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="pb-2">
                  <CardTitle className="text-lg leading-tight text-center">
                    {i18n.language === 'ar' ? magazine.title_ar : magazine.title_en}
                  </CardTitle>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 justify-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    {t('magazine.published')}: {formatDate(magazine.published)}
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="flex gap-2 items-center">
                    <Button
                      className="w-1/2 bg-white text-black border border-primary font-semibold h-10 px-4 py-2 hover:bg-primary hover:text-white transition-colors"
                      style={{ minHeight: '40px' }}
                      onClick={() => handleView(magazine)}
                    >
                      {t('magazine.view')}
                    </Button>
                    {downloadUrl ? (
                      <a
                        href={downloadUrl}
                        download
                        className="w-2/3 flex items-center justify-center rounded-md font-semibold text-base bg-brandRed text-white hover:bg-brandRed/90 h-10"
                        style={{ minHeight: '40px' }}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t('magazine.download')}
                      </a>
                    ) : (
                      <Button
                        className="w-2/3 bg-brandRed text-white font-semibold text-base hover:bg-brandRed/90 h-10"
                        style={{ minHeight: '40px' }}
                        onClick={() => handleDownload(magazine)}
                      >
                        {t('magazine.download')}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Empty State */}
        {magazines.length === 0 && (
          <div className="text-center py-12">
            <div className="h-16 w-16 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <Eye className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
              {i18n.language === 'ar' ? 'لا توجد مجلات متاحة' : 'No magazines available'}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {i18n.language === 'ar' 
                ? 'تابعنا للحصول على آخر الإصدارات'
                : 'Follow us for the latest publications'
              }
            </p>
          </div>
        )}

        {/* Featured Section */}
        {magazines.length > 0 && (
          <div className="mt-16 bg-surface rounded-lg p-8 dark:text-light">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4 text-dark dark:text-light">
                {i18n.language === 'ar' ? 'اشترك في نشرتنا الإخبارية' : 'Subscribe to Our Newsletter'}
              </h2>
              <p className="text-gray-600 dark:text-gray-200 mb-6">
                {i18n.language === 'ar' 
                  ? 'احصل على آخر الإصدارات والأخبار مباشرة في بريدك الإلكتروني'
                  : 'Get the latest issues and news delivered directly to your inbox'
                }
              </p>
              <div className="flex max-w-md mx-auto gap-2">
                <input
                  type="email"
                  placeholder={i18n.language === 'ar' ? 'بريدك الإلكتروني' : 'Your email address'}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand"
                />
                <Button className="bg-brand hover:bg-brand/90">
                  {i18n.language === 'ar' ? 'اشترك' : 'Subscribe'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Magazine;

