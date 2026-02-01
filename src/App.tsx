import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import HotlineBar from '@/components/layout/HotlineBar';
import InfoBar from '@/components/layout/InfoBar';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { SiteConfigProvider } from '@/contexts/SiteConfigContext';
import { Outlet } from 'react-router-dom';

export default function App() {
  return (
    <SiteConfigProvider>
      <LanguageProvider>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <HotlineBar />
        <Header />
        <InfoBar />
        <main id="main-content">
          <Outlet />
        </main>
        <Footer />
      </LanguageProvider>
    </SiteConfigProvider>
  );
}
