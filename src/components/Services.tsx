/* eslint-disable @typescript-eslint/no-unused-vars */
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CreditCard, Home, DollarSign, Shield, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import CountUp from 'react-countup';
import { Users, Banknote, CheckCircle2, FileText } from 'lucide-react';

const loanServices = [
  {
    icon: CreditCard,
    title: 'Prêt Personnel',
    description: 'Obtenez un prêt pour des projets personnels ou des besoins urgents.',
  },
  {
    icon: Home,
    title: 'Prêt Immobilier',
    description: 'Financez l’achat de votre maison ou appartement avec des taux compétitifs.',
  },
  {
    icon: DollarSign,
    title: 'Prêt Auto',
    description: 'Accédez à un financement pour l’achat de votre véhicule neuf ou d’occasion.',
  },
  {
    icon: Shield,
    title: 'Prêt Professionnel',
    description: 'Solution de financement pour les entrepreneurs et les petites entreprises.',
  },
];

export default function Services() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const [amount, setAmount] = useState(10000);
  const [duration, setDuration] = useState(12);
  const [interestRate, setInterestRate] = useState(5);

  const calculateMonthlyPayment = () => {
    const rate = interestRate / 100 / 12;
    const monthlyPayment = (amount * rate) / (1 - Math.pow(1 + rate, -duration));
    return isFinite(monthlyPayment) ? monthlyPayment.toFixed(2) : "0.00";
  };

  const testimonials = [
    {
      name: 'Sophie L.',
      feedback: 'Grâce à ce prêt, j’ai pu acheter ma maison de rêve. Le processus a été rapide et transparent.',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    {
      name: 'Michel D.',
      feedback: 'Un prêt simple et flexible pour acheter ma voiture. Les conditions étaient parfaites.',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
      name: 'Julien R.',
      feedback: 'Je recommande vivement. Le prêt professionnel m’a permis de financer mon entreprise.',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    },
  ];

  const stats = [
    { label: 'Clients satisfaits', value: 8500, icon: Users },
    { label: 'Montant prêté (€)', value: 125000, icon: Banknote },
    { label: 'Taux d’approbation (%)', value: 92, icon: CheckCircle2 },
    { label: 'Demandes traitées', value: 10420, icon: FileText },
  ];

  // Témoignages : carrousel
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 7000); // 7 secondes

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const goToPrev = () => {
    setTestimonialIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setTestimonialIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section id="services" className="bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-200 py-20 text-gray-800">
      <div className="container mx-auto px-4">
        {/* Titre Section */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Nos Services de Prêt</h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Des solutions de financement personnalisées pour tous vos besoins
          </p>
        </motion.div>

        {/* Statistiques */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: index * 0.2,
                type: 'spring',
                stiffness: 100,
              }}
              className="bg-gradient-to-br from-yellow-50 to-white p-6 rounded-xl shadow-lg border-t-4 border-yellow-400 hover:scale-105 hover:shadow-xl transition-transform duration-300"
            >
              <h3 className="text-4xl font-bold text-yellow-600">
                {inView && <CountUp end={stat.value} duration={2} />}
              </h3>
              <p className="text-lg text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {loanServices.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                type: 'spring',
                stiffness: 100,
              }}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-xl shadow-lg transition-transform hover:shadow-xl"
            >
              <div className="bg-yellow-300 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                <service.icon className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">{service.title}</h3>
              <p className="text-gray-600 text-center">{service.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Calculateur de Prêt */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Calculez votre Prêt</h2>
          <p className="text-xl text-gray-700 mb-6">Estimez vos mensualités en quelques clics</p>

          <div className="space-y-6 max-w-2xl mx-auto">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Montant du prêt (€)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:ring-2 transition-all duration-200 ease-in-out"
                placeholder="Montant du prêt"
                aria-label="Montant du prêt"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Durée (en mois)</label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:ring-2"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Taux d'intérêt (%)</label>
              <input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:ring-2"
              />
            </div>

            <div className="text-xl font-semibold ">
              <p>
                Mensualité estimée : <span className="text-yellow-600">{calculateMonthlyPayment()} €</span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Témoignages - Carrousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 px-4"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Avis de nos Clients</h2>
          <div className="relative max-w-xl mx-auto bg-transparent p-6 rounded-xl shadow-lg text-center">
            <button
              onClick={goToPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-yellow-100"
              aria-label="Témoignage précédent"
              style={{ zIndex: 2 }}
            >
              <ChevronLeft className="w-5 h-5 text-yellow-600" />
            </button>
            <div aria-live="polite">
              <img
                src={testimonials[testimonialIndex].avatar}
                alt={testimonials[testimonialIndex].name}
                className="w-16 h-16 rounded-full mx-auto mb-4"
              />
              <h3 className="font-semibold text-gray-900 text-lg">{testimonials[testimonialIndex].name}</h3>
              <p className="text-gray-600 italic">"{testimonials[testimonialIndex].feedback}"</p>
            </div>
            <button
              onClick={goToNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-yellow-100"
              aria-label="Témoignage suivant"
              style={{ zIndex: 2 }}
            >
              <ChevronRight className="w-5 h-5 text-yellow-600" />
            </button>
            <div className="flex justify-center mt-4 gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setTestimonialIndex(idx)}
                  className={`w-3 h-3 rounded-full ${testimonialIndex === idx ? 'bg-yellow-500' : 'bg-gray-300'}`}
                  aria-label={`Aller au témoignage ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}