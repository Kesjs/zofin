import Header from '../components/Header';

export default function PolitiqueDeConfidentialite() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-10 text-gray-900 mt-24">
        <h1 className="text-3xl font-bold mb-6">Politique de Confidentialité</h1>
        <p className="mb-4">
          Cette politique de confidentialité décrit comment nous collectons, utilisons et protégeons vos données personnelles lors de l’utilisation de notre site de prêt en ligne.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">1. Collecte des informations</h2>
        <p className="mb-4">
          Nous collectons uniquement les informations nécessaires à l’étude et au traitement de votre demande de prêt (nom, prénom, coordonnées, informations financières, etc.). Certaines données sont collectées automatiquement via des cookies pour assurer le bon fonctionnement du site et améliorer votre expérience utilisateur.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">2. Utilisation des cookies</h2>
        <p className="mb-4">
          Les cookies utilisés sur notre site servent à :
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Assurer la sécurité et le fonctionnement optimal du site</li>
          <li>Analyser la fréquentation et l’utilisation des pages</li>
          <li>Personnaliser votre expérience et faciliter votre navigation</li>
        </ul>
        <p className="mb-4">
          Vous pouvez accepter ou refuser les cookies non essentiels à tout moment via la bannière dédiée.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">3. Utilisation des données</h2>
        <p className="mb-4">
          Vos données sont utilisées exclusivement pour le traitement de votre demande de prêt et pour vous contacter dans le cadre de nos services. Elles ne sont jamais revendues à des tiers.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">4. Sécurité</h2>
        <p className="mb-4">
          Nous mettons en œuvre toutes les mesures techniques et organisationnelles nécessaires pour protéger vos données contre tout accès non autorisé, perte ou divulgation.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">5. Vos droits</h2>
        <p className="mb-4">
          Conformément à la réglementation en vigueur, vous disposez d’un droit d’accès, de rectification, de suppression et d’opposition concernant vos données personnelles. Pour exercer ces droits, contactez-nous à l’adresse indiquée sur notre site.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2">6. Contact</h2>
        <p>
          Pour toute question relative à la protection de vos données, vous pouvez nous contacter via le formulaire de contact ou à l’adresse e-mail indiquée dans nos mentions légales.
        </p>
      </main>
    </>
  );
}