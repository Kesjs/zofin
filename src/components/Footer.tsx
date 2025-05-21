import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-blue-950 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/" className="flex items-center space-x-2">
    <img
      src="https://img.icons8.com/ios-filled/50/eab308/topup-payment.png"
      alt="Logo Services-Prêt"
      className="w-8 h-8"
    />
    <span className="text-2xl font-bold text-yellow-500">Zofin</span>
  </Link>
            <p className="text-gray-400">
              Des solutions de crédit personnalisées pour donner vie à vos projets personnels ou professionnels.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-xl font-bold mb-4">Nos Prêts</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#nos-offres" className="hover:text-yellow-400 transition">Prêt Auto</a></li>
              <li><a href="#nos-offres" className="hover:text-yellow-400 transition">Prêt Immobilier</a></li>
              <li><a href="#nos-offres" className="hover:text-yellow-400 transition">Prêt Professionnel</a></li>
              <li><a href="#nos-offres" className="hover:text-yellow-400 transition">Prêt Personnel</a></li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>42 Avenue de la Marina</li>
              <li>75008 Cotonou</li>
              <li>+229 0197914922</li>
              <li>support@finances-service.com</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-xl font-bold mb-4">Réseaux Sociaux</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-yellow-400 transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-yellow-400 transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-yellow-400 transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-yellow-400 transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </motion.div>

        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400"
        >
          <p>&copy; {new Date().getFullYear()} Zofin. Tous droits réservés.</p>
        </motion.div>
      </div>
    </footer>
  );
}
