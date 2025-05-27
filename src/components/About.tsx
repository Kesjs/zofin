import { motion } from 'framer-motion';
import { FileText, ThumbsUp, Clock } from 'lucide-react';

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-200 py-20 text-gray-800"
      itemScope
      itemType="https://schema.org/Organization"
    >
      <div className="container mx-auto px-6">
        {/* Titre principal optimisé SEO */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 id="about-title" className="text-4xl font-bold mb-4 text-yellow-900">
            À propos de notre société de financement et de crédit en ligne
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Depuis 1987, notre <strong>organisme de crédit</strong> accompagne particuliers et professionnels avec des <strong>solutions de financement sur-mesure</strong>. Notre mission: vous offrir un <strong>prêt rapide, sécurisé et adapté</strong> à vos besoins, avec un taux de satisfaction client de 90%. Découvrez notre équipe, nos valeurs et notre engagement pour votre réussite financière.
          </p>
        </motion.header>

        {/* Bloc d’intro avec image équipe */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="md:flex md:items-center md:gap-12 mb-20"
        >
          <img
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80"
            alt="Photo de l'équipe de notre société de crédit et financement"
            className="w-full md:w-1/2 rounded-xl shadow-lg mb-8 md:mb-0"
            loading="lazy"
          />
          <div className="md:w-1/2">
            <h2 className="text-2xl font-semibold mb-4 text-yellow-900">
              Une équipe engagée et expérimentée à votre service
            </h2>
            <p className="text-gray-700 mb-3">
              Forts de plus de <strong>35 ans d’expérience</strong> dans le secteur du crédit, nous mettons notre expertise au service de votre projet. Notre équipe vous accompagne à chaque étape pour garantir un <strong>financement rapide, fiable et personnalisé</strong>.
            </p>
            <p className="text-gray-700">
              Spécialisés dans le <strong>crédit à la consommation</strong> et le <strong>prêt professionnel</strong>, nous proposons des <strong>offres adaptées</strong> à tous vos besoins de financement, que ce soit pour un achat immobilier, un véhicule, des travaux ou le développement de votre entreprise.
            </p>
            <p className="text-gray-700 mt-3">
              <a href="#services" className="text-yellow-700 underline hover:text-yellow-900 transition">
                Découvrez nos services de prêt &rarr;
              </a>
            </p>
          </div>
        </motion.div>

        {/* Étapes du processus de prêt avec données structurées */}
        <section
          className="grid md:grid-cols-3 gap-10 mb-20"
          aria-label="Étapes du processus de demande de prêt"
          itemScope
          itemType="https://schema.org/HowTo"
        >
          {[
            {
              icon: <FileText className="w-8 h-8 text-yellow-600" />,
              title: '1. Remplissez votre demande',
              desc: 'Accédez au formulaire de prêt en ligne en quelques clics. Renseignez vos informations personnelles, le montant souhaité et le type de crédit adapté à votre projet.',
            },
            {
              icon: <Clock className="w-8 h-8 text-yellow-600" />,
              title: '2. Traitement rapide',
              desc: 'Notre équipe analyse votre dossier et vous donne une réponse sous 24h. Profitez d’un accompagnement personnalisé et d’une étude gratuite de votre capacité d’emprunt.',
            },
            {
              icon: <ThumbsUp className="w-8 h-8 text-yellow-600" />,
              title: '3. Financement immédiat',
              desc: 'Une fois votre demande validée, les fonds sont débloqués rapidement. Vous pouvez concrétiser vos projets sans attendre grâce à notre solution de crédit en ligne.',
            },
          ].map((step, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition"
              itemProp="step"
              itemScope
              itemType="https://schema.org/HowToStep"
            >
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-yellow-800" itemProp="name">{step.title}</h3>
              <p className="text-gray-600" itemProp="text">{step.desc}</p>
            </motion.article>
          ))}
        </section>

        {/* Statistiques / Performances SEO */}
        <section
          className="grid md:grid-cols-3 gap-10 text-center"
          aria-label="Statistiques de performance et satisfaction"
        >
          {[
            { value: '90%', label: 'Satisfaction client : nos clients nous recommandent pour la qualité de notre accompagnement.' },
            { value: '80%', label: 'Performance : taux d’acceptation élevé et traitement rapide des dossiers.' },
            { value: '35 ans', label: 'Expérience : acteur reconnu du crédit depuis 1987.' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="bg-yellow-50 py-8 rounded-xl shadow text-yellow-900"
              itemScope
              itemType="https://schema.org/QuantitativeValue"
            >
              <div className="text-4xl font-bold mb-2" itemProp="value">{stat.value}</div>
              <div className="text-gray-700 font-medium" itemProp="description">{stat.label}</div>
            </motion.div>
          ))}
        </section>

        {/* Bloc FAQ SEO */}
        <section
          className="mt-20 max-w-3xl mx-auto"
          aria-label="Questions fréquentes sur le crédit"
          itemScope
          itemType="https://schema.org/FAQPage"
        >
          <h2 className="text-2xl font-bold mb-6 text-yellow-900">Questions fréquentes sur nos crédits</h2>
          <div className="space-y-6">
            <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
              <h3 className="font-semibold text-yellow-800" itemProp="name">Quels types de prêts proposez-vous?</h3>
              <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <p className="text-gray-700" itemProp="text">
                  Nous proposons des prêts personnels, immobiliers, auto et professionnels, adaptés à chaque projet et à chaque profil.
                </p>
              </div>
            </div>
            <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
              <h3 className="font-semibold text-yellow-800" itemProp="name">Combien de temps pour obtenir une réponse?</h3>
              <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <p className="text-gray-700" itemProp="text">
                  Après réception de votre dossier complet, nous vous apportons une réponse sous 24h ouvrées.
                </p>
              </div>
            </div>
            <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
              <h3 className="font-semibold text-yellow-800" itemProp="name">Vos démarches sont-elles sécurisées?</h3>
              <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <p className="text-gray-700" itemProp="text">
                  Oui, toutes vos données sont traitées de façon confidentielle et sécurisée, dans le respect de la réglementation RGPD.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}