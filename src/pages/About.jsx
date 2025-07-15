import { useTranslation } from 'react-i18next';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { Camera, Users, Award, Target, Heart, Lightbulb } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  const { t, i18n } = useTranslation();

  const timelineEvents = [
    {
      date: '2020',
      title: i18n.language === 'ar' ? 'تأسيس النادي' : 'Club Foundation',
      description: i18n.language === 'ar' 
        ? 'تأسس نادي الإعلام والتصوير بجامعة الملك فهد للبترول والمعادن'
        : 'Media & Photo Club was founded at King Fahd University of Petroleum & Minerals',
      icon: Camera
    },
    {
      date: '2021',
      title: i18n.language === 'ar' ? 'أول مجلة رقمية' : 'First Digital Magazine',
      description: i18n.language === 'ar'
        ? 'إطلاق أول إصدار من المجلة الرقمية للنادي'
        : 'Launch of the club\'s first digital magazine issue',
      icon: Award
    },
    {
      date: '2022',
      title: i18n.language === 'ar' ? 'توسع الأنشطة' : 'Activity Expansion',
      description: i18n.language === 'ar'
        ? 'توسع النادي ليشمل ثلاثة قطاعات رئيسية: الإنتاج والتصوير والإعلام'
        : 'Club expanded to include three main sectors: Production, Photography, and Media',
      icon: Users
    },
    {
      date: '2023',
      title: i18n.language === 'ar' ? 'الجوائز والتقدير' : 'Awards & Recognition',
      description: i18n.language === 'ar'
        ? 'حصول النادي على عدة جوائز في مسابقات التصوير والإعلام'
        : 'Club received multiple awards in photography and media competitions',
      icon: Target
    }
  ];

  const values = [
    {
      icon: Camera,
      title: i18n.language === 'ar' ? 'الإبداع' : 'Creativity',
      description: i18n.language === 'ar' 
        ? 'نؤمن بقوة الإبداع في التعبير والتواصل'
        : 'We believe in the power of creativity in expression and communication'
    },
    {
      icon: Users,
      title: i18n.language === 'ar' ? 'التعاون' : 'Collaboration',
      description: i18n.language === 'ar'
        ? 'نعمل معاً لتحقيق أهدافنا المشتركة'
        : 'We work together to achieve our common goals'
    },
    {
      icon: Award,
      title: i18n.language === 'ar' ? 'التميز' : 'Excellence',
      description: i18n.language === 'ar'
        ? 'نسعى للتميز في كل ما نقوم به'
        : 'We strive for excellence in everything we do'
    },
    {
      icon: Target,
      title: i18n.language === 'ar' ? 'الهدف' : 'Purpose',
      description: i18n.language === 'ar'
        ? 'نهدف لخدمة المجتمع الجامعي والمحلي'
        : 'We aim to serve the university and local community'
    },
    {
      icon: Heart,
      title: i18n.language === 'ar' ? 'الشغف' : 'Passion',
      description: i18n.language === 'ar'
        ? 'الشغف يحرك كل أعمالنا وإنجازاتنا'
        : 'Passion drives all our work and achievements'
    },
    {
      icon: Lightbulb,
      title: i18n.language === 'ar' ? 'الابتكار' : 'Innovation',
      description: i18n.language === 'ar'
        ? 'نبتكر حلولاً جديدة ونطور أساليب عملنا'
        : 'We innovate new solutions and develop our working methods'
    }
  ];

  return (
    <div className="min-h-screen w-full bg-light dark:bg-dark">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-brandBlue to-brandRed text-white w-full">
        <div className="w-full text-center">
          <h1 className="text-5xl font-bold mb-12">
            {i18n.language === 'ar' ? (
              <span dir="rtl">عن النادي</span>
            ) : (
              'About Our Club'
            )}
          </h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed text-black dark:text-white mb-12">
            {i18n.language === 'ar' ? (
              <span dir="rtl">
                نادي الإعلام والتصوير بجامعة الملك فهد للبترول والمعادن هو منصة إبداعية 
                تهدف إلى تطوير مهارات الطلاب في مجالات التصوير والإعلام وصناعة المحتوى
              </span>
            ) : (
              'The Media & Photo Club at King Fahd University of Petroleum & Minerals is a creative platform aimed at developing students\' skills in photography, media, and content creation'
            )}
          </p>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 w-full">
        <div className="w-full mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-brandBlue">
            {i18n.language === 'ar' ? (
              <span dir="rtl">رحلتنا عبر الزمن</span>
            ) : (
              'Our Journey Through Time'
            )}
          </h2>
          <div className="mx-auto" style={{maxWidth: '900px'}}>
            <VerticalTimeline lineColor="#4F4F4F">
              {timelineEvents.map((event, index) => (
                <VerticalTimelineElement
                  key={index}
                  className="vertical-timeline-element--work"
                  contentStyle={{ 
                    background: '#f8fafc', 
                    color: '#000',
                    border: '2px solid #00A4E1'
                  }}
                  contentArrowStyle={{ borderRight: '7px solid #00A4E1' }}
                  date={<span className="text-gray-400">{event.date}</span>}
                  iconStyle={{ background: '#00A4E1', color: '#fff' }}
                  icon={<event.icon />}
                >
                  <h3 className="vertical-timeline-element-title text-xl font-bold !text-black mb-2 text-center">
                    {event.title}
                  </h3>
                  <p className="mt-2 text-center !text-black">
                    {event.description}
                  </p>
                </VerticalTimelineElement>
              ))}
            </VerticalTimeline>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-brandYellow/10 w-full">
        <div className="w-full mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-brandBlue">
            {i18n.language === 'ar' ? (
              <span dir="rtl">قيمنا</span>
            ) : (
              'Our Values'
            )}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 w-full mx-auto justify-items-stretch items-stretch">
            {values.map((value, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow h-full min-h-[300px] flex flex-col justify-between">
                <CardContent className="pt-6 flex flex-col flex-1 justify-between">
                  <div className="w-16 h-16 bg-brandYellow/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-brandYellow" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-brandBlue">
                    {value.title}
                  </h3>
                  <p className="text-black dark:text-white">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 w-full">
        <div className="w-full mx-auto">
          <div className="grid md:grid-cols-2 gap-12 w-full mx-auto justify-items-center">
            <div className="text-center">
              <h3 className="text-3xl font-bold mb-6 text-brandRed">
                {i18n.language === 'ar' ? (
                  <span dir="rtl">رؤيتنا</span>
                ) : (
                  'Our Vision'
                )}
              </h3>
              <p className="text-lg text-black leading-relaxed dark:text-white">
                {i18n.language === 'ar' ? (
                  <span dir="rtl">
                    أن نكون النادي الرائد في مجال الإعلام والتصوير على مستوى الجامعات السعودية، 
                    ونساهم في إعداد جيل مبدع من المصورين وصناع المحتوى
                  </span>
                ) : (
                  'To be the leading club in media and photography among Saudi universities, contributing to preparing a creative generation of photographers and content creators'
                )}
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold mb-6 text-brandGreen">
                {i18n.language === 'ar' ? (
                  <span dir="rtl">رسالتنا</span>
                ) : (
                  'Our Mission'
                )}
              </h3>
              <p className="text-lg text-black leading-relaxed dark:text-white">
                {i18n.language === 'ar' ? (
                  <span dir="rtl">
                    تطوير مهارات الطلاب في مجالات التصوير والإعلام وصناعة المحتوى من خلال 
                    الورش التدريبية والفعاليات والمشاريع الإبداعية
                  </span>
                ) : (
                  'Developing students\' skills in photography, media, and content creation through training workshops, events, and creative projects'
                )}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

