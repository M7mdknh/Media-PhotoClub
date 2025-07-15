import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Camera, Users, Award, Calendar, BookOpen, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useRef, useState } from 'react';

// CountUp component for animated numbers
function CountUp({ end, duration = 2000, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    let start = 0;
    let cancelled = false;
    const isPlus = typeof end === 'string' && end.trim().endsWith('+');
    const target = parseInt(end);
    const startTime = performance.now();
    function animate(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.floor(progress * target);
      setCount(value);
      if (progress < 1 && !cancelled) {
        requestAnimationFrame(animate);
      } else if (!cancelled) {
        setCount(target);
      }
    }
    requestAnimationFrame(animate);
    return () => { cancelled = true; };
  }, [end, duration]);
  return <span ref={ref}>{count}{suffix}{typeof end === 'string' && end.trim().endsWith('+') ? '+' : ''}</span>;
}

const Home = () => {
  const { t, i18n } = useTranslation();

  const stats = [
    {
      icon: Users,
      value: '150+',
      label: i18n.language === 'ar' ? 'عضو نشط' : 'Active Members'
    },
    {
      icon: Calendar,
      value: '50+',
      label: i18n.language === 'ar' ? 'فعالية منظمة' : 'Events Organized'
    },
    {
      icon: Camera,
      value: '100+',
      label: i18n.language === 'ar' ? 'مشروع مكتمل' : 'Projects Completed'
    },
    {
      icon: Award,
      value: '25+',
      label: i18n.language === 'ar' ? 'جائزة محققة' : 'Awards Won'
    }
  ];

  return (
    <div className="min-h-screen w-full bg-light dark:bg-dark">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex flex-col justify-center items-center bg-dark text-light w-full p-0 m-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brandBlue to-brandRed opacity-90 w-full h-full p-0 m-0"></div>
        <div className="relative z-10 text-center flex flex-col items-center w-full">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 w-full text-dark dark:text-light">
            {i18n.language === 'ar' ? (
              <span dir="rtl">لأنَّ الصورةَ تُحكى</span>
            ) : (
              'Because Every Picture Tells a Story'
            )}
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-brandYellow">
            {i18n.language === 'ar' ? (
              <span dir="rtl">نادي الإعلام والتصوير - جامعة الملك فهد</span>
            ) : (
              'KFUPM Media & Photo Club'
            )}
          </h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
            {i18n.language === 'ar' ? (
              <span dir="rtl">نلتقط اللحظات، ننشئ الذكريات، ونحكي القصص من خلال عدسة الإبداع والابتكار</span>
            ) : (
              'Capturing moments, creating memories, and telling stories through the lens of creativity and innovation.'
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-brandBlue hover:bg-brandRed text-white font-semibold px-8 py-3">
              <Link to="/contact">
                <span dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
                  {i18n.language === 'ar' ? 'انضمّ إلينا' : 'Join Our Community'}
                </span>
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="font-semibold px-8 py-3">
              <Link to="/gallery">
                {i18n.language === 'ar' ? 'استكشف أعمالنا' : 'Explore Our Work'}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-light dark:bg-dark w-full">
        <div className="w-full mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full mx-auto justify-items-center">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-brandBlue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-brandBlue" />
                </div>
                <div className="text-3xl font-bold text-dark dark:text-light mb-2">
                  <CountUp end={stat.value} duration={2000} />
                </div>
                <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Sections */}
      <section className="py-16 w-full">
        <div className="w-full mx-auto">
          <div className="grid md:grid-cols-3 gap-8 w-full mx-auto justify-items-center">
            {/* Latest Events */}
            <Card className="shadow-md hover:shadow-lg transition-shadow mx-auto w-full max-w-md flex flex-col justify-between">
              <div className="h-48 bg-gradient-to-br from-brandBlue to-brandYellow rounded-t-xl"></div>
              <CardHeader>
                <CardTitle className="text-xl text-dark dark:text-light">
                  {i18n.language === 'ar' ? 'أحدث الفعاليات' : 'Latest Events'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {i18n.language === 'ar' 
                    ? 'انضم إلى ورش العمل والفعاليات التي ننظمها لتطوير مهاراتك'
                    : 'Join our workshops and events to develop your skills'
                  }
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/events">
                    {i18n.language === 'ar' ? 'عرض الفعاليات' : 'View Events'}
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Digital Magazine */}
            <Card className="shadow-md hover:shadow-lg transition-shadow mx-auto w-full max-w-md flex flex-col justify-between">
              <div className="h-48 bg-gradient-to-br from-brandRed to-brandYellow rounded-t-xl"></div>
              <CardHeader>
                <CardTitle className="text-xl text-dark dark:text-light">
                  {i18n.language === 'ar' ? 'المجلة الرقمية' : 'Digital Magazine'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {i18n.language === 'ar' 
                    ? 'اطلع على أحدث إصداراتنا من المجلة الرقمية'
                    : 'Explore our latest digital magazine publications'
                  }
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/magazine">
                    {i18n.language === 'ar' ? 'قراءة المجلة' : 'Read Magazine'}
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Gallery */}
            <Card className="shadow-md hover:shadow-lg transition-shadow mx-auto w-full max-w-md flex flex-col justify-between">
              <div className="h-48 bg-gradient-to-br from-brandYellow to-brandGreen rounded-t-xl"></div>
              <CardHeader>
                <CardTitle className="text-xl text-dark dark:text-light">
                  {i18n.language === 'ar' ? 'معرض الأعمال' : 'Gallery'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {i18n.language === 'ar' 
                    ? 'استكشف مجموعتنا من الصور والأفلام الإبداعية'
                    : 'Explore our collection of creative photos and films'
                  }
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/gallery">
                    {i18n.language === 'ar' ? 'عرض المعرض' : 'View Gallery'}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Sticky Join Banner */}
      <section className="py-12 bg-brandBlue text-white w-full">
        <div className="mx-auto text-center flex flex-col items-center w-full">
          <h2 className="text-3xl font-bold mb-4">
            {i18n.language === 'ar' ? (
              <span dir="rtl">معاً نصنع قصة الجامعة بصورة وصوت وإبداع!</span>
            ) : (
              'Together we create the university story with image, sound and creativity!'
            )}
          </h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            {i18n.language === 'ar' ? (
              <span dir="rtl">يهدف نادي الإعلام والصورة إلى تأهيل جيل مبدع من المصورين وصناع المحتوى وصحفيي المستقبل</span>
            ) : (
              'The Media & Photo Club aims to qualify a creative generation of photographers, content creators and journalists of the future'
            )}
          </p>
          <Button asChild size="lg" className="bg-brandRed hover:bg-brandYellow text-white font-semibold">
            <Link to="/contact">
              {i18n.language === 'ar' ? 'انضم إلينا الآن' : 'Join Us Now'}
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;

