// Home.tsx
import Hero from '../components/Hero';  // Composant pour l'introduction
import Services from '../components/Services';  // Composant pour les services
import Contact from '../components/Contact';  // Composant pour le contact
import About from '../components/About';
import NosOffres from '../pages/NosOffres'; // Assure-toi d'avoir un composant NosOffres

export default function Home() {
  return (
    <div>
      <Hero />      {/* Section d'introduction */}
      <Services />  {/* Section des services */}
      <About />
        <NosOffres />


      <Contact />   {/* Section de contact */}
    </div>
  );
}
