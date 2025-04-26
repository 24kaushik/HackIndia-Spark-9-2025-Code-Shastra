import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-4 gap-10"
        >
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              Company Name
            </h3>
            <p className="text-gray-300 mt-2">
              Creating amazing experiences through innovative technology solutions.
            </p>
            <div className="flex space-x-4 mt-4">
              {[FaGithub, FaTwitter, FaLinkedinIn, FaInstagram].map((Icon, index) => (
                <motion.a 
                  key={index}
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon className="text-xl" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-100">Products</h4>
            <ul className="space-y-2">
              {["Features", "Pricing", "Documentation", "Guides"].map((item, index) => (
                <li key={index}>
                  <motion.a 
                    href="#" 
                    className="text-gray-400 hover:text-white transition-colors block"
                    whileHover={{ x: 5 }}
                  >
                    {item}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-100">Company</h4>
            <ul className="space-y-2">
              {["About Us", "Blog", "Careers", "Contact"].map((item, index) => (
                <li key={index}>
                  <motion.a 
                    href="#" 
                    className="text-gray-400 hover:text-white transition-colors block"
                    whileHover={{ x: 5 }}
                  >
                    {item}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-100">Subscribe</h4>
            <p className="text-gray-400">Stay updated with our latest news and updates</p>
            <div className="relative mt-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-gray-700 rounded-lg py-2 px-4 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-2 w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all"
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-gray-400 text-sm">
            © {currentYear} Company Name. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item, index) => (
              <motion.a 
                key={index}
                href="#" 
                className="text-gray-400 hover:text-white text-sm transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                {item}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="bg-black bg-opacity-50 py-3 text-center text-gray-400 text-xs"
      >
        Designed with ♥ for exceptional digital experiences
      </motion.div>
    </motion.footer>
  );
};

export default Footer;