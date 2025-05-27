import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const [bgLoaded, setBgLoaded] = useState(false);

  // Image optimisée WebP (vérifie que cette URL est bien accessible ou remplace par la tienne)
  const backgroundImage =
    'https://enterprisectr.org/wp-content/uploads/2019/08/9-24-19-Business-Financials-PURCHASED-scaled.jpeg';

 useEffect(() => {
  const img = new Image();
  img.src = backgroundImage;
  img.onload = () => setBgLoaded(true);
  img.onerror = () => setBgLoaded(true); // pour ne pas bloquer si erreur
}, []);


  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-6 py-24 text-white sm:py-32"
      style={{
        backgroundImage: bgLoaded ? `url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#000', // placeholder pendant chargement
      }}
    >
      {/* Overlay dégradé pour lisibilité */}
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-black via-black/80 to-transparent" />

      <motion.div
        className="relative z-10 max-w-xl text-center"
        initial={{ opacity: 0, y: 40, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        {/* Bandeau annonce promo */}
        <motion.div
          className="mb-6 px-4 py-2 bg-yellow-300 text-black font-semibold rounded-full inline-block shadow-md text-sm sm:text-base cursor-pointer"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          role="alert"
          aria-live="polite"
        >
          🎉 Offre spéciale : Taux réduit ce mois-ci ! Profitez-en vite.
        </motion.div>

        <motion.h1
          className="text-3xl sm:text-5xl font-extrabold leading-tight mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Demande de prêt rapide, simple et 100% en ligne
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg mb-6 px-4 sm:px-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Obtenez un prêt personnel ou auto en moins de 24h. Aucun justificatif inutile, démarches simplifiées.
        </motion.p>

        <motion.p
          className="inline-block bg-white text-gray-900 text-xs sm:text-sm font-semibold px-4 py-2 rounded-full shadow mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          🔒 Plateforme sécurisée — Réponse garantie sous 24h
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center px-4 sm:px-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <motion.a
            href="#nos-offres"
            className="flex items-center justify-center bg-yellow-400 text-black px-6 py-3 rounded-full text-sm font-medium hover:bg-yellow-300 transition-all"
            whileHover={{ scale: 1.05, boxShadow: '0 6px 15px rgba(0, 0, 0, 0.25)' }}
            whileTap={{ scale: 0.95 }}
          >
            Simuler ma demande de prêt
            <ArrowRight className="w-4 h-4 ml-2" />
          </motion.a>
          <motion.a
            href="#services"
            className="flex items-center justify-center border-2 border-white text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-white hover:text-black transition-all"
            whileHover={{ scale: 1.05, boxShadow: '0 6px 15px rgba(0, 0, 0, 0.25)' }}
            whileTap={{ scale: 0.95 }}
          >
            Découvrir nos offres de crédit
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
