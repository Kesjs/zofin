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
    description:
      'Obtenez un prêt adapté à vos projets personnels, qu’il s’agisse de travaux, d’études, ou de dépenses imprévues. Des conditions claires et un processus simplifié vous garantissent un financement rapide.',
  },
  {
    icon: Home,
    title: 'Prêt Immobilier',
    description:
      "Réalisez l’achat de votre maison ou appartement grâce à notre prêt immobilier aux taux avantageux. Profitez d’une offre sur-mesure avec un suivi expert tout au long de votre projet.",
  },
  {
    icon: DollarSign,
    title: 'Prêt Auto',
    description:
      "Financer l’achat de votre véhicule neuf ou d’occasion n’a jamais été aussi simple. Bénéficiez d’un prêt auto avec des mensualités adaptées à votre budget et des démarches simplifiées.",
  },
  {
    icon: Shield,
    title: 'Prêt Professionnel',
    description:
      "Soutenez la croissance de votre entreprise grâce à notre prêt professionnel. Que vous soyez entrepreneur ou dirigeant de PME, bénéficiez d’un financement flexible et d’un accompagnement personnalisé.",
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

  // Témoignages 
const testimonials = [
  {
    name: 'Sophie L.',
    feedback:
      "J’ai enfin pu devenir propriétaire grâce à ce prêt ! L'accompagnement a été exemplaire et les démarches ultra simples. Je recommande vivement.   ",
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
  {
    name: 'Michel D.',
    feedback:
      "J’ai obtenu mon prêt auto très rapidement, sans tracas. Les conditions étaient excellentes, et j’ai pu acheter la voiture qu’il me fallait !",
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    name: 'Julien R.',
    feedback:
      "Grâce au prêt professionnel, j’ai pu lancer mon activité sereinement. Un service rapide, fiable et transparent. Merci pour ce vrai coup de pouce !",
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
    <section
      id="services"
      className="bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-200 py-20 text-gray-800"
    >
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
                          {/* <div className="border-t-4 border-yellow-500 w-16 flo"></div> */}

          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Nos services de prêt sont conçus pour s’adapter à vos besoins spécifiques, que ce soit pour financer un projet personnel, un achat immobilier, ou soutenir votre activité professionnelle. Grâce à des taux compétitifs, une approche transparente et un accompagnement personnalisé, nous vous offrons des solutions rapides et flexibles pour réaliser vos projets en toute sérénité.
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
          <p className="text-xl text-gray-700 mb-6">
            Estimez vos mensualités en quelques clics grâce à notre calculateur simple et précis. Adaptez le montant, la durée et le taux d’intérêt pour obtenir une simulation personnalisée. Cette estimation vous aide à mieux planifier votre budget avant de faire votre demande de prêt.
          </p>

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
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Avis de nos Clients</h2>
          <p className="text-gray-700 max-w-xl mx-auto mb-8">
            La satisfaction de nos clients est notre priorité. Découvrez leurs expériences et comment nos solutions de prêt leur ont permis de concrétiser leurs projets rapidement et en toute confiance.
          </p>

          <div className="max-w-xl mx-auto relative bg-white p-8 rounded-xl shadow-lg">
            <div className="flex items-center justify-center mb-6">
              <img
                src={testimonials[testimonialIndex].avatar}
                alt={`Avatar de ${testimonials[testimonialIndex].name}`}
                className="w-16 h-16 rounded-full border-2 border-yellow-400"
              />
            </div>
            <p className="italic text-gray-700 mb-4">"{testimonials[testimonialIndex].feedback}"</p>
            <p className="font-semibold text-yellow-600">{testimonials[testimonialIndex].name}</p>

            {/* Contrôles du carrousel */}
            <div className="flex justify-between mt-8">
              <button
                aria-label="Précédent"
                onClick={goToPrev}
                className="p-2 rounded-full bg-yellow-100 hover:bg-yellow-300 transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-yellow-600" />
              </button>
              <button
                aria-label="Suivant"
                onClick={goToNext}
                className="p-2 rounded-full bg-yellow-100 hover:bg-yellow-300 transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-yellow-600" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
