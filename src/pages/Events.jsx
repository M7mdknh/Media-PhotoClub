import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, Clock, Users, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Events = () => {
  const { t, i18n } = useTranslation();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('/data/events.json');
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      const data = await response.json();
      setEvents(data);
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

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString(i18n.language === 'ar' ? 'ar-SA' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleRegister = (eventId) => {
    // TODO: Implement registration modal
    alert(`Registration for event ${eventId} - Coming soon!`);
  };

  const handleSignIn = (eventId) => {
    // TODO: Implement event sign-in logic
    alert(`Sign in for event ${eventId} - Coming soon!`);
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
          <Button onClick={fetchEvents}>{t('common.retry')}</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-dark dark:text-light">{t('events.title')}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12">
            {t('events.subtitle')}
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow p-6">
              {/* Event Cover Image */}
              <div className="h-48 relative w-full rounded-lg overflow-hidden">
                <img
                  src={event.image || '/images/Intro.jpg'}
                  onError={e => { e.target.onerror = null; e.target.src = '/images/Intro.jpg'; }}
                  alt={i18n.language === 'ar' ? event.title_ar : event.title_en}
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-white text-dark">
                    {event.quota} {t('events.quota')}
                  </Badge>
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-xl text-center">
                  {i18n.language === 'ar' ? event.title_ar : event.title_en}
                </CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                  {i18n.language === 'ar' ? event.desc_ar : event.desc_en}
                </p>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Event Details */}
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2 text-brand" />
                    {formatDate(event.date)}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2 text-brand" />
                    {formatTime(event.date)}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-2 text-brand" />
                    {t('events.speaker')}: {i18n.language === 'ar' ? event.speaker_ar : event.speaker_en}
                  </div>
                </div>

                {/* Register & Sign In Buttons */}
                <div className="flex gap-2">
                  <Button 
                    className="w-1/2 bg-white text-black border border-primary font-semibold h-10 px-4 py-2 hover:bg-primary hover:text-white transition-colors"
                    style={{ minHeight: '40px' }}
                    onClick={() => handleRegister(event.id)}
                  >
                    {t('events.register')}
                  </Button>
                  <Button 
                    className="w-2/3 bg-brandRed hover:bg-brandRed/90 font-semibold text-base"
                    onClick={() => handleSignIn(event.id)}
                  >
                    {i18n.language === 'ar' ? 'حجز الفعالية' : 'Book Event'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {events.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
              {i18n.language === 'ar' ? 'لا توجد فعاليات حالياً' : 'No events available'}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {i18n.language === 'ar' 
                ? 'تابعنا على وسائل التواصل الاجتماعي للحصول على آخر التحديثات'
                : 'Follow us on social media for the latest updates'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;

