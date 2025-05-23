import Hero from '../components/Hero';
import Services from '../components/Services';
import Contact from '../components/Contact';
import About from '../components/About';
import NosOffres from '../pages/NosOffres';
import Faq from '../components/Faq'; // Ajout de l'import

export default function Home() {
  return (
    <div>
      <Hero />
      <Services />
      <About />
      <NosOffres />
      <Faq />      {/* Affichage direct de la FAQ sur la page d'accueil */}
      <Contact />
    </div>
  );
}