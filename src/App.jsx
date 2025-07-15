import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './i18n';
import './App.css';
import React from 'react';

// Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Page Components
import Home from './pages/Home';
import About from './pages/About';
import Sectors from './pages/Sectors';
import Events from './pages/Events';
import Magazine from './pages/Magazine';
import Gallery from './pages/Gallery';
import Partners from './pages/Partners';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const { i18n } = useTranslation();

  return (
    <Router>
      <ScrollToTop />
      <div dir={i18n.language === 'ar' ? 'rtl' : 'ltr'} className={`min-h-screen bg-background ${i18n.language === 'ar' ? 'font-arabic' : 'font-sans'}`}>
        <Header />
        <main className="w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/sectors" element={<Sectors />} />
            <Route path="/events" element={<Events />} />
            <Route path="/magazine" element={<Magazine />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

