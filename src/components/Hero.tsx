import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

const images = [
  'https://enterprisectr.org/wp-content/uploads/2019/08/9-24-19-Business-Financials-PURCHASED-scaled.jpeg',
  'https://static.vecteezy.com/system/resources/previews/010/110/875/large_2x/businessman-holding-pen-document-graph-accounting-finance-paper-work-analysis-chart-marketing-investment-and-report-economy-with-computer-laptop-on-desk-at-office-free-photo.jpg',
  'https://uploads-ssl.webflow.com/5ef5fb258bc09d0963403900/62e838e08d9d2ba1943f1f80_masterminds_capitalempreendedor_image_487.jpeg',
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const length = images.length;
  const [direction, setDirection] = useState(1);

  // Auto-slide toutes les 5 secondes
  useEffect(() => {
    const timer = setTimeout(() => {
      paginate(1);
    }, 5000);
    return () => clearTimeout(timer);
  }, [current]);

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
    }),
  };

  function paginate(newDirection: number) {
    setDirection(newDirection);
    setCurrent((prev) => {
      let next = prev + newDirection;
      if (next < 0) next = length - 1;
      else if (next >= length) next = 0;
      return next;
    });
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-6 py-24 text-white sm:py-32 overflow-hidden"
    >
      {/* Carrousel d'images */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={current}
            src={images[current]}
            alt={`Slide ${current + 1}`}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.7, ease: 'easeInOut' }}
            className="w-full h-full object-cover select-none"
            draggable={false}
          />
        </AnimatePresence>

        {/* Overlay dégradé */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
      </div>

      {/* Boutons précédents / suivants */}
      <button
        onClick={() => paginate(-1)}
        aria-label="Image précédente"
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black bg-opacity-40 hover:bg-opacity-70 text-white rounded-full p-3 z-20 focus:outline-none"
      >
        <ChevronLeft size={28} />
      </button>
      <button
        onClick={() => paginate(1)}
        aria-label="Image suivante"
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black bg-opacity-40 hover:bg-opacity-70 text-white rounded-full p-3 z-20 focus:outline-none"
      >
        <ChevronRight size={28} />
      </button>

      {/* Contenu texte au-dessus */}
      <motion.div
        className="relative z-10 max-w-xl text-center px-4"
        initial={{ opacity: 0, y: 40, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
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

      {/* Indicateurs en bas */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
        {images.map((_, i) => (
          <button
            key={i}
            aria-label={`Aller à l'image ${i + 1}`}
            className={`w-4 h-4 rounded-full ${
              i === current ? 'bg-yellow-400' : 'bg-white bg-opacity-50'
            }`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
    </section>
  );
}
