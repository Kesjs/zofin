import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqData = [
  {
    question: "Quels types de prêts proposez-vous ?",
    answer:
      "Nous proposons une gamme complète de crédits : prêt personnel, prêt auto, prêt immobilier, prêt professionnel et rachat de crédit. Chaque solution est adaptée à vos besoins et à votre situation.",
  },
  {
    question: "Comment faire une demande de prêt en ligne ?",
    answer:
      "Cliquez sur 'Nos offres', choisissez le type de prêt souhaité puis remplissez le formulaire en ligne. Vous recevrez une réponse rapide par email après étude de votre dossier.",
  },
  {
    question: "Quels documents dois-je fournir pour ma demande ?",
    answer:
      "Vous devrez fournir une pièce d'identité, un justificatif de domicile, vos trois derniers bulletins de salaire ou justificatifs de revenus, et un RIB. Selon le type de prêt, d'autres documents peuvent être demandés.",
  },
  {
    question: "Combien de temps pour obtenir une réponse ?",
    answer:
      "Après réception de votre dossier complet, une réponse vous est généralement apportée sous 48h ouvrées.",
  },
  {
    question: "Est-ce que ma demande m’engage ?",
    answer:
      "Non, la demande de prêt en ligne est sans engagement. Vous pouvez l’annuler à tout moment avant la signature du contrat.",
  },
  {
    question: "Comment suivre l’avancement de ma demande ?",
    answer:
      "Après validation de votre dossier, vous recevrez un numéro de suivi par email. Vous pouvez également nous contacter à tout moment pour connaître l’état d’avancement.",
  },
  {
    question: "Proposez-vous des solutions pour les personnes fichées ?",
    answer:
      "Chaque dossier est étudié individuellement. Nous pouvons parfois proposer des solutions même en cas d’incident bancaire, sous réserve d’acceptation.",
  },
  {
    question: "Mes données sont-elles sécurisées ?",
    answer:
      "Oui, toutes vos données sont traitées de façon confidentielle et sécurisée, conformément à la réglementation RGPD.",
  },
  {
    question: "Quels sont les frais de dossier ?",
    answer:
      "Les frais de dossier varient selon le type de prêt et le montant. Ils sont clairement indiqués avant toute signature.",
  },
  {
    question: "Comment contacter le support client ?",
    answer:
      "Vous pouvez nous joindre par téléphone au +229 0197914922, par email à contact@finance-services.com ou via le formulaire de contact du site.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Séparation en 2 colonnes
  const mid = Math.ceil(faqData.length / 2);
  const col1 = faqData.slice(0, mid);
  const col2 = faqData.slice(mid);

  const renderFaqColumn = (data: typeof faqData, offset = 0) =>
    data.map((item, idx) => (
      <motion.div
        key={idx + offset}
        initial={false}
        animate={{ backgroundColor: openIndex === idx + offset ? "#FEF9C3" : "#fff" }}
        className="rounded-xl shadow-md border border-yellow-200 mb-4"
      >
        <button
          className="w-full flex justify-between items-center px-6 py-4 text-left focus:outline-none"
          onClick={() => setOpenIndex(openIndex === idx + offset ? null : idx + offset)}
          aria-expanded={openIndex === idx + offset}
          aria-controls={`faq-panel-${idx + offset}`}
        >
          <span className="text-lg font-semibold text-yellow-900">{item.question}</span>
          {openIndex === idx + offset ? (
            <ChevronUp className="w-5 h-5 text-yellow-600" />
          ) : (
            <ChevronDown className="w-5 h-5 text-yellow-600" />
          )}
        </button>
        <AnimatePresence initial={false}>
          {openIndex === idx + offset && (
            <motion.div
              id={`faq-panel-${idx + offset}`}
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={{
                open: { height: "auto", opacity: 1 },
                collapsed: { height: 0, opacity: 0 },
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden px-6"
            >
              <div className="py-2 text-gray-700 text-base">{item.answer}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    ));

  return (
    <section id="faq" className="py-20 bg-gradient-to-br from-yellow-50 via-white to-yellow-100">
      <div className="max-w-5xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-yellow-800 mb-10 text-center"
        >
          Foire aux questions
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>{renderFaqColumn(col1, 0)}</div>
          <div>{renderFaqColumn(col2, col1.length)}</div>
        </div>
      </div>
    </section>
  );
}