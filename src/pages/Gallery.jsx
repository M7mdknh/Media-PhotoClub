import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Camera, Video, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Masonry from 'react-masonry-css';
import photo1 from '../assets/gallery/photo1.jpg';
import photo2 from '../assets/gallery/photo2.jpg';
import photo3 from '../assets/gallery/photo3.jpg';
import photo4 from '../assets/gallery/photo4.jpg';
import photo5 from '../assets/gallery/photo5.jpg';
import photo6 from '../assets/gallery/photo6.jpg';
import photo7 from '../assets/gallery/photo7.jpg';
import photo8 from '../assets/gallery/photo8.jpg';
import photo9 from '../assets/gallery/photo9.jpg';
import photo10 from '../assets/gallery/photo10.jpg';
import photo11 from '../assets/gallery/photo11.jpg';
import intro from '../assets/gallery/Intro.jpg';
import recap from '../assets/gallery/Recap.jpg';
import tedx from '../assets/gallery/TEDx.jpg';
import tutorial from '../assets/gallery/Tutorial.jpg';
import React from 'react';

const Gallery = () => {
  const { t, i18n } = useTranslation();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedType, setSelectedType] = useState(null); // 'photo' or 'video'

  // Sample gallery data - TODO: Replace with API data
  const photos = [
    { id: 1, src: photo1, alt: 'Campus Sunrise', title: 'Campus Sunrise', title_ar: 'شروق الشمس في الحرم الجامعي', category: 'pictures' },
    { id: 2, src: photo2, alt: 'Creative Collaboration', title: 'Creative Collaboration', title_ar: 'تعاون إبداعي', category: 'pictures' },
    { id: 3, src: photo3, alt: 'Lens of Innovation', title: 'Lens of Innovation', title_ar: 'عدسة الابتكار', category: 'pictures' },
    { id: 4, src: photo4, alt: 'Student Life in Focus', title: 'Student Life in Focus', title_ar: 'حياة الطلاب في بؤرة التركيز', category: 'pictures' },
    { id: 5, src: photo5, alt: 'Artistic Shadows', title: 'Artistic Shadows', title_ar: 'ظلال فنية', category: 'pictures' },
    { id: 6, src: photo6, alt: 'Cultural Celebration', title: 'Cultural Celebration', title_ar: 'احتفال ثقافي', category: 'pictures' },
    { id: 7, src: photo7, alt: 'Teamwork in Action', title: 'Teamwork in Action', title_ar: 'العمل الجماعي في الميدان', category: 'pictures' },
    { id: 8, src: photo8, alt: 'Inspiring Lecture', title: 'Inspiring Lecture', title_ar: 'محاضرة ملهمة', category: 'pictures' },
    { id: 9, src: photo9, alt: 'Campus Architecture', title: 'Campus Architecture', title_ar: 'هندسة الحرم الجامعي', category: 'pictures' },
    { id: 10, src: photo10, alt: 'Festival Lights', title: 'Festival Lights', title_ar: 'أضواء المهرجان', category: 'pictures' },
    { id: 11, src: photo11, alt: 'Portrait of Creativity', title: 'Portrait of Creativity', title_ar: 'صورة للإبداع', category: 'pictures' },
  ];

  const videos = [
    { id: 1, thumbnail: intro, title: 'Welcome to the Club', title_ar: 'مرحباً بكم في النادي', duration: '2:30', category: 'preview' },
    { id: 2, thumbnail: recap, title: 'Annual Recap Highlights', title_ar: 'أبرز أحداث العام', duration: '5:45', category: 'preview' },
    { id: 3, thumbnail: tedx, title: 'TEDx Event Moments', title_ar: 'لحظات فعالية TEDx', duration: '3:10', category: 'preview' },
    { id: 4, thumbnail: tutorial, title: 'Photography Tutorial', title_ar: 'دروس التصوير', duration: '8:20', category: 'preview' },
  ];

  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1
  };

  const openLightbox = (item, type = 'photo') => {
    if (type === 'photo') {
      const idx = photos.findIndex((p) => p.id === item.id);
      setSelectedIndex(idx);
    } else {
      const idx = videos.findIndex((v) => v.id === item.id);
      setSelectedIndex(idx);
    }
    setSelectedImage(item);
    setSelectedType(type);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    setSelectedIndex(null);
    setSelectedType(null);
  };

  const showPrev = () => {
    if (selectedType === 'photo' && selectedIndex > 0) {
      const newIdx = selectedIndex - 1;
      setSelectedIndex(newIdx);
      setSelectedImage(photos[newIdx]);
    } else if (selectedType === 'video' && selectedIndex > 0) {
      const newIdx = selectedIndex - 1;
      setSelectedIndex(newIdx);
      setSelectedImage(videos[newIdx]);
    }
  };

  const showNext = () => {
    if (selectedType === 'photo' && selectedIndex < photos.length - 1) {
      const newIdx = selectedIndex + 1;
      setSelectedIndex(newIdx);
      setSelectedImage(photos[newIdx]);
    } else if (selectedType === 'video' && selectedIndex < videos.length - 1) {
      const newIdx = selectedIndex + 1;
      setSelectedIndex(newIdx);
      setSelectedImage(videos[newIdx]);
    }
  };

  // Keyboard navigation
  React.useEffect(() => {
    if (!selectedImage) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, selectedIndex, selectedType]);

  return (
    <div className="min-h-screen w-full py-16">
      <div className="w-full px-4 mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-dark dark:text-light">{t('gallery.title')}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12">{t('gallery.subtitle')}</p>
        </div>

        {/* Tabs for Photos and Videos */}
        <Tabs defaultValue="photos" className="w-full mx-auto">
          <TabsList className="grid w-full mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="photos" className="flex items-center gap-2">
              <Camera className="h-4 w-4" />
              {t('gallery.photos')}
            </TabsTrigger>
            <TabsTrigger value="videos" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              {t('gallery.videos')}
            </TabsTrigger>
          </TabsList>

          {/* Photos Tab */}
          <TabsContent value="photos">
            <h2 className="text-2xl font-bold mb-6 text-dark dark:text-light w-full text-center">Photo Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full mx-auto justify-items-center items-center">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className="w-full max-w-xs mb-4 bg-white border border-gray-200 dark:bg-neutral-900 dark:border-neutral-800 rounded-xl shadow-sm p-6 flex flex-col items-center cursor-pointer"
                  onClick={() => openLightbox(photo, 'photo')}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-64 object-cover rounded-t-xl"
                  />
                  <div className="w-full text-center mt-2">
                    <p className="text-base font-semibold text-dark dark:text-light">{i18n.language === 'ar' ? photo.title_ar : photo.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Videos Tab */}
          <TabsContent value="videos">
            <h2 className="text-2xl font-bold mb-6 text-dark dark:text-light w-full text-center">Video Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 w-full mx-auto justify-items-center items-center">
              {videos.map((video) => (
                <div
                  key={video.id}
                  className="w-full max-w-xs mb-4 bg-white border border-gray-200 dark:bg-neutral-900 dark:border-neutral-800 rounded-xl shadow-sm p-6 flex flex-col items-center justify-center h-full relative cursor-pointer"
                  onClick={() => openLightbox(video, 'video')}
                >
                  <div className="relative w-full">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-64 object-cover mx-auto rounded-t-xl"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-brand rounded-full p-3 mb-2 mx-auto w-fit shadow-lg">
                        <Play className="h-8 w-8 fill-current text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="w-full text-center mt-2">
                    <p className="text-base font-semibold text-dark dark:text-light mb-1">{i18n.language === 'ar' ? video.title_ar : video.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{video.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            style={{ cursor: 'default' }}
          >
            <div className="relative max-w-4xl max-h-full flex items-center">
              {/* Prev Button */}
              <button
                onClick={showPrev}
                disabled={selectedType === 'photo' ? selectedIndex === 0 : selectedIndex === 0}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full z-10 disabled:opacity-30"
                style={{ left: '-2.5rem' }}
                aria-label="Previous"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
              {/* Content */}
              {selectedType === 'photo' ? (
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="max-w-full max-h-full object-contain mx-8"
                />
              ) : (
                <div className="flex flex-col items-center justify-center mx-8">
                  <img
                    src={selectedImage.thumbnail}
                    alt={selectedImage.title}
                    className="max-w-full max-h-96 object-contain rounded-lg mb-4"
                  />
                  <div className="text-white text-center">
                    <div className="bg-brand rounded-full p-3 mb-2 mx-auto w-fit">
                      <Play className="h-6 w-6 fill-current" />
                    </div>
                    <p className="text-2xl font-semibold mb-1">{selectedImage.title}</p>
                    <p className="text-base text-gray-300 mb-2">{selectedImage.duration}</p>
                  </div>
                </div>
              )}
              {/* Next Button */}
              <button
                onClick={showNext}
                disabled={selectedType === 'photo' ? selectedIndex === photos.length - 1 : selectedIndex === videos.length - 1}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full z-10 disabled:opacity-30"
                style={{ right: '-2.5rem' }}
                aria-label="Next"
              >
                <ChevronRight className="h-8 w-8" />
              </button>
              {/* Exit Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300 bg-black/60 rounded-full w-12 h-12 flex items-center justify-center z-20"
                aria-label="Close"
              >
                ×
              </button>
              {selectedType === 'photo' && (
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-semibold">{selectedImage.title}</h3>
                  <p className="text-sm text-gray-300">{selectedImage.category}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;

