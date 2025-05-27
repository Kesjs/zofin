import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-blue-950 text-white py-12" aria-labelledby="footer-heading">
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FinancialService",
          "name": "Zofin",
          "url": "https://zofin.space",
          "logo": "https://img.icons8.com/ios-filled/50/eab308/topup-payment.png",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "42 Avenue de la Marina",
            "addressLocality": "Cotonou",
            "postalCode": "75008",
            "addressCountry": "BJ"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+2290197914922",
            "contactType": "customer support",
            "email": "support-contact@zofin.space"
          },
          "sameAs": [
            "#", "#", "#", "#"
          ],
          "description": "Solutions de crédit personnalisées : prêt auto, prêt immobilier, prêt professionnel et prêt personnel à Cotonou."
        })
      }} />
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8" role="presentation">
          
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            aria-labelledby="footer-brand"
          >
            <Link to="/" className="flex items-center space-x-2" aria-label="Accueil Zofin">
              <img
                src="https://img.icons8.com/ios-filled/50/eab308/topup-payment.png"
                alt="Logo Services-Prêt Zofin"
                className="w-8 h-8"
              />
              <span id="footer-brand" className="text-2xl font-bold text-yellow-500">Zofin</span>
            </Link>
            <p className="text-gray-400 mt-2">
              <strong>Crédit personnalisé</strong> : Donnez vie à vos <strong>projets personnels</strong> ou <strong>professionnels</strong> grâce à nos solutions de <strong>prêt rapide</strong> et <strong>flexible</strong>.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            aria-labelledby="footer-loans"
          >
            <h3 id="footer-loans" className="text-xl font-bold mb-4">Nos Prêts</h3>
            <ul className="space-y-2 text-gray-400" aria-label="Types de prêts proposés">
              <li>
                <a href="#nos-offres" className="hover:text-yellow-400 transition focus:outline-none focus:ring-2 focus:ring-yellow-400" aria-label="Prêt Auto">
                  Prêt Auto
                </a>
              </li>
              <li>
                <a href="#nos-offres" className="hover:text-yellow-400 transition focus:outline-none focus:ring-2 focus:ring-yellow-400" aria-label="Prêt Immobilier">
                  Prêt Immobilier
                </a>
              </li>
              <li>
                <a href="#nos-offres" className="hover:text-yellow-400 transition focus:outline-none focus:ring-2 focus:ring-yellow-400" aria-label="Prêt Professionnel">
                  Prêt Professionnel
                </a>
              </li>
              <li>
                <a href="#nos-offres" className="hover:text-yellow-400 transition focus:outline-none focus:ring-2 focus:ring-yellow-400" aria-label="Prêt Personnel">
                  Prêt Personnel
                </a>
              </li>
            </ul>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            aria-labelledby="footer-contact"
          >
            <h3 id="footer-contact" className="text-xl font-bold mb-4">Contact</h3>
            <address className="not-italic space-y-2 text-gray-400" aria-label="Coordonnées de contact">
              <div>
                <span aria-label="Adresse">Zurich</span>
              </div>
              <div>
                <span aria-label="Code postal et ville">Suisse</span>
              </div>
              <div>
                <a href="tel:+2290197914922" className="hover:text-yellow-400 transition focus:outline-none focus:ring-2 focus:ring-yellow-400" aria-label="Téléphone">
                  +229 0197914922
                </a>
              </div>
              <div>
                <a href="mailto:support-contact@zofin.space" className="hover:text-yellow-400 transition focus:outline-none focus:ring-2 focus:ring-yellow-400" aria-label="Email">
                  support-contact@zofin.space
                </a>
              </div>
            </address>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            aria-labelledby="footer-social"
          >
            <h3 id="footer-social" className="text-xl font-bold mb-4">Réseaux Sociaux</h3>
            <nav aria-label="Réseaux sociaux">
              <ul className="flex space-x-4">
                <li>
                  <a href="#" className="hover:text-yellow-400 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400" aria-label="Facebook Zofin">
                    <Facebook className="w-6 h-6" aria-hidden="true" />
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400" aria-label="Twitter Zofin">
                    <Twitter className="w-6 h-6" aria-hidden="true" />
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400" aria-label="Instagram Zofin">
                    <Instagram className="w-6 h-6" aria-hidden="true" />
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400" aria-label="LinkedIn Zofin">
                    <Linkedin className="w-6 h-6" aria-hidden="true" />
                  </a>
                </li>
              </ul>
            </nav>
          </motion.section>

        </div>

    

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400"
        >
          <p>
            &copy; {new Date().getFullYear()} Zofin. Tous droits réservés.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}