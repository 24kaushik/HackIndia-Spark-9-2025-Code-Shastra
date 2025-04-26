import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiMail, FiPhoneCall, FiMapPin } from 'react-icons/fi';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic here
    console.log(formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-gray-900 text-white py-16 pt-20 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-500 to-indigo-600">
            Get in Touch
          </h1>
          <p className="mt-4 text-xl text-gray-400 max-w-3xl mx-auto">
            Our AI campus assistant is here to help. Have questions or feedback? Reach out to us!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-gray-800 rounded-2xl p-8 shadow-xl"
          >
            <motion.h2 variants={itemVariants} className="text-2xl font-bold mb-6">
              Send us a message
            </motion.h2>
            <form onSubmit={handleSubmit}>
              <motion.div variants={itemVariants} className="mb-6">
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="Your name"
                />
              </motion.div>
              
              <motion.div variants={itemVariants} className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="you@example.com"
                />
              </motion.div>
              
              <motion.div variants={itemVariants} className="mb-6">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="How can we help you?"
                />
              </motion.div>
              
              <motion.div variants={itemVariants} className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                  placeholder="Your message..."
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-medium flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg"
                >
                  <span>Send Message</span>
                  <FiSend className="ml-2" />
                </motion.button>
                
                {submitted && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4 text-green-400 text-center"
                  >
                    Thanks for your message! We'll get back to you soon.
                  </motion.p>
                )}
              </motion.div>
            </form>
          </motion.div>
          
          {/* Contact Info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-gray-300"
          >
            <motion.h2 variants={itemVariants} className="text-2xl font-bold mb-8">
              Contact Information
            </motion.h2>
            
            <div className="space-y-8">
              <motion.div 
                variants={itemVariants}
                whileHover={{ x: 5 }}
                className="flex items-start"
              >
                <div className="bg-gray-800 p-3 rounded-lg">
                  <FiMail size={24} className="text-blue-400" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-white">Email</h3>
                  <p className="mt-1">campusai@university.edu</p>
                  <p className="mt-1 text-sm text-gray-400">We'll respond as quickly as possible</p>
                </div>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                whileHover={{ x: 5 }}
                className="flex items-start"
              >
                <div className="bg-gray-800 p-3 rounded-lg">
                  <FiPhoneCall size={24} className="text-blue-400" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-white">Phone</h3>
                  <p className="mt-1">+1 (555) 123-4567</p>
                  <p className="mt-1 text-sm text-gray-400">Monday - Friday, 9am - 5pm</p>
                </div>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                whileHover={{ x: 5 }}
                className="flex items-start"
              >
                <div className="bg-gray-800 p-3 rounded-lg">
                  <FiMapPin size={24} className="text-blue-400" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-white">Office</h3>
                  <p className="mt-1">Innovation Center, Room 42</p>
                  <p className="mt-1 text-sm text-gray-400">University Campus, Building A</p>
                </div>
              </motion.div>
            </div>
            
            <motion.div
              variants={itemVariants}
              className="mt-12 bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-700"
            >
              <h3 className="text-xl font-bold mb-4">FAQs</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-white">How does the AI assistant work?</h4>
                  <p className="text-sm text-gray-400">Our AI assistant uses advanced natural language processing to answer your campus-related queries accurately.</p>
                </div>
                <div>
                  <h4 className="font-medium text-white">Is my data secure with the AI assistant?</h4>
                  <p className="text-sm text-gray-400">Yes, we prioritize your privacy and security. All conversations are encrypted and handled according to our privacy policy.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="mt-24 text-center"
        >
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Campus AI Assistant. All rights reserved.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Contact;