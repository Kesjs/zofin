import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';

import Home from './pages/Home';
import NosOffres from './pages/NosOffres';
import PretAuto from './components/PretAuto';
import PretImmo from './components/PretImmo';
import PretPerso from './components/PretPerso';
import PretPro from './components/PretPro';
import Header from './components/Header';
import Footer from './components/Footer';
import Breadcrumb from './components/Breadcrumb';
import Loader from './components/Loader';
import CookieBanner from './pages/CookieBanner';
import PolitiqueDeConfidentialite from './pages/PolitiqueDeConfidentialite';
import ConditionsUtilisation from './pages/ConditionsUtilisation';
import ScrollToTop from './components/ScrollToTop';

// import PolitiqueDeConfidentialite from './pages/PolitiqueDeConfidentialite';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Router>
        <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Toaster position="top-center" />
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nos-offres" element={<NosOffres />} />
            <Route path="/nos-offres/pret-personnel" element={<WithBreadcrumb component={<PretPerso />} title="Prêt Personnel" />} />
            <Route path="/nos-offres/pret-immobilier" element={<WithBreadcrumb component={<PretImmo />} title="Prêt Immobilier" />} />
            <Route path="/nos-offres/pret-auto" element={<WithBreadcrumb component={<PretAuto />} title="Prêt Auto" />} />
            <Route path="/nos-offres/pret-pro" element={<WithBreadcrumb component={<PretPro />} title="Prêt Professionnel" />} />
            <Route path="/politique-de-confidentialite" element={<PolitiqueDeConfidentialite />} /> 
            <Route path="/conditions-utilisation" element={<ConditionsUtilisation />} /> 
            <Route path="*" element={<div className="text-center text-gray-600">Page non trouvée</div>} />
          </Routes>
        </main>
        <Footer />
        <CookieBanner />
      </div>
    </Router>
  );
}

const WithBreadcrumb = ({ component, title }: { component: JSX.Element; title: string }) => (
  <div className="container mx-auto px-4 py-6">
    <Breadcrumb
      items={[
        { label: 'Accueil', path: '/' },
        { label: 'Nos Offres', path: '/nos-offres' },
        { label: title }
      ]}
    />
    {component}
  </div>
);

export default App;