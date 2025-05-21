import { motion } from 'framer-motion';
import { FileText, ThumbsUp, Clock } from 'lucide-react';

export default function About() {
  return (
    <section id="à propos" className="bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-200 py-20 text-gray-800">
      <div className="container mx-auto px-6">
        {/* Titre */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-yellow-900">À propos de notre société</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Depuis 1987, nous accompagnons nos clients avec des solutions de financement sur-mesure. 
            Notre objectif ? Votre réussite financière.
          </p>
        </motion.div>

        {/* Bloc d’intro avec image équipe */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="md:flex md:items-center md:gap-12 mb-20"
        >
          <img
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80"
            alt="Notre équipe"
            className="w-full md:w-1/2 rounded-xl shadow-lg mb-8 md:mb-0"
          />
          <div className="md:w-1/2">
            <h3 className="text-2xl font-semibold mb-4 text-yellow-900">Une équipe engagée et expérimentée</h3>
            <p className="text-gray-700 mb-3">
              Nous sommes dans ce métier depuis <strong>1987</strong> et nous fournissons les meilleurs services. 
              Découvrez comment nos services peuvent transformer votre vie financière.
            </p>
            <p className="text-gray-700">
              Une société de financement spécialisée dans le crédit à la consommation. 
              Nous vous proposons des <strong>offres adaptées</strong> à tous vos besoins de financement.
            </p>
          </div>
        </motion.div>

        {/* Étapes du processus de prêt */}
        <div className="grid md:grid-cols-3 gap-10 mb-20">
          {[ 
            {
              icon: <FileText className="w-8 h-8 text-yellow-600" />,
              title: '1. Remplissez votre demande',
              desc: 'Accédez au formulaire en ligne en quelques clics. Renseignez vos informations personnelles et le montant souhaité.'
            },
            {
              icon: <Clock className="w-8 h-8 text-yellow-600" />,
              title: '2. Traitement rapide',
              desc: 'Notre équipe examine votre demande et vous donne une réponse sous 24h, selon votre profil et vos besoins.'
            },
            {
              icon: <ThumbsUp className="w-8 h-8 text-yellow-600" />,
              title: '3. Financement immédiat',
              desc: 'Une fois validée, vous recevez les fonds rapidement et pouvez réaliser vos projets sans attendre.'
            }
          ].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition"
            >
              <div className="mb-4">{step.icon}</div>
              <h4 className="text-xl font-semibold mb-2 text-yellow-800">{step.title}</h4>
              <p className="text-gray-600">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Statistiques / Performances */}
        <div className="grid md:grid-cols-3 gap-10 text-center">
          {[ 
            { value: '90%', label: 'Satisfaction client' },
            { value: '80%', label: 'Performance' },
            { value: '70%', label: 'Expérience' }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="bg-yellow-50 py-8 rounded-xl shadow text-yellow-900"
            >
              <div className="text-4xl font-bold mb-2">{stat.value}</div>
              <div className="text-gray-700 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
