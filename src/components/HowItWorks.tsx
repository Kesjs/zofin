
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function HowItWorks() {
  const eligibilityConditions: string[] = [
    "Être âgé de 21 à 65 ans",
    "Résider en Suisse ou dans un pays partenaire",
    "Avoir des revenus stables (salaire, retraite ou activité déclarée)",
    "Fournir les justificatifs demandés",
    "Nous acceptons aussi les auto-entrepreneurs et professions libérales"
  ];

  return (
    <section className="max-w-5xl mx-auto px-4 py-16 space-y-12">
      <h2 className="text-4xl font-bold text-center text-yellow-600 mb-12">
        Comment ça marche ?
      </h2>

      {/* Montants & Durée */}
      <motion.div
        className="bg-yellow-50 border-l-4 border-yellow-400 shadow rounded-2xl p-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h3 className="text-2xl font-semibold text-yellow-700 mb-4">Montants & Durée</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Montants disponibles : de 1 000 € à 50 000 €</li>
          <li>Durée de remboursement : de 6 à 60 mois</li>
        </ul>
      </motion.div>

      {/* Conditions d’Éligibilité */}
      <motion.div
        className="bg-yellow-50 border-l-4 border-yellow-400 shadow rounded-2xl p-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <h3 className="text-2xl font-semibold text-yellow-700 mb-4">Conditions d’Éligibilité</h3>
        <ul className="space-y-3 text-gray-700">
          {eligibilityConditions.map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              <CheckCircle className="text-yellow-600 w-5 h-5 mt-1" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Taux & Coûts */}
      <motion.div
        className="bg-yellow-50 border-l-4 border-yellow-400 shadow rounded-2xl p-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <h3 className="text-2xl font-semibold text-yellow-700 mb-4">Taux & Coûts</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Taux d’intérêt : à partir de 3,5 % (selon montant et durée)</li>
          <li>Aucun frais caché</li>
          <li>Frais de dossier : 0 € à 3 % selon la formule choisie</li>
          <li>Un simulateur sera bientôt disponible pour estimer votre mensualité</li>
        </ul>
      </motion.div>
    </section>
  );
}
