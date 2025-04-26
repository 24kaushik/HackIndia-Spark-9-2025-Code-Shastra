import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const About = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  // Framer motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 1.2 }
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black min-h-screen text-gray-100 py-16 px-4 sm:px-6 lg:px-8 pt-24">
      <motion.div 
        className="max-w-7xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-20" 
          variants={containerVariants}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 mb-6"
            variants={itemVariants}
          >
            Campus AI Assistant
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Your intelligent companion for all campus-related queries and updates
          </motion.p>
        </motion.div>

        {/* Mission Section */}
        <motion.section 
          className="mb-24" 
          variants={containerVariants}
        >
          <motion.div 
            className="flex flex-col md:flex-row items-center"
            variants={containerVariants}
          >
            <motion.div 
              className="md:w-1/2 mb-10 md:mb-0 md:pr-8"
              variants={itemVariants}
            >
              <h2 className="text-3xl font-bold mb-6 text-purple-300">Our Mission</h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                We created the Campus AI Assistant to revolutionize how students access information about their campus life. 
                Our goal is to eliminate information barriers and provide instant, accurate answers to all campus-related queries.
              </p>
              <p className="text-gray-300 leading-relaxed">
                By leveraging cutting-edge AI technology, we're making campus information more accessible, helping students stay informed 
                about events, deadlines, policies, and everything they need to navigate their academic journey successfully.
              </p>
            </motion.div>
            <motion.div 
              className="md:w-1/2 bg-gradient-to-r from-purple-800/20 to-blue-800/20 p-1 rounded-xl"
              variants={itemVariants}
            >
              <div className="rounded-lg overflow-hidden bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-8 h-full flex items-center justify-center">
                <div className="rounded-full w-64 h-64 bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                  <div className="rounded-full w-56 h-56 bg-gray-900 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-28 w-28 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Features Section */}
        <motion.section 
          className="mb-24"
          variants={containerVariants}
        >
          <motion.h2 
            className="text-4xl font-bold mb-16 text-center"
            variants={itemVariants}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              What We Offer
            </span>
          </motion.h2>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {/* Feature 1 */}
            <motion.div 
              className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 hover:bg-gray-700/30 transition-all duration-300 backdrop-blur-sm"
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <div className="rounded-full bg-purple-500/20 w-16 h-16 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Campus Info</h3>
              <p className="text-gray-400">
                Get instant answers about campus facilities, office hours, contact information, and academic policies.
              </p>
            </motion.div>
            
            {/* Feature 2 */}
            <motion.div 
              className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 hover:bg-gray-700/30 transition-all duration-300 backdrop-blur-sm"
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <div className="rounded-full bg-blue-500/20 w-16 h-16 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Event Updates</h3>
              <p className="text-gray-400">
                Stay informed about upcoming campus events, workshops, seminars, and club activities in real-time.
              </p>
            </motion.div>
            
            {/* Feature 3 */}
            <motion.div 
              className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 hover:bg-gray-700/30 transition-all duration-300 backdrop-blur-sm"
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <div className="rounded-full bg-pink-500/20 w-16 h-16 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Academic Support</h3>
              <p className="text-gray-400">
                Access information about courses, exam schedules, deadlines, and academic resources instantly.
              </p>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Technology Section */}
        <motion.section 
          className="mb-24"
          variants={containerVariants}
        >
          <motion.h2 
            className="text-4xl font-bold mb-16 text-center"
            variants={itemVariants}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-blue-500">
              Powered By Advanced Technology
            </span>
          </motion.h2>
          
          <motion.div 
            className="relative rounded-2xl overflow-hidden bg-gray-800/30 border border-gray-700 p-8"
            variants={fadeIn}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-sm"></div>
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
                  <h3 className="text-2xl font-semibold mb-4 text-white">AI That Understands Campus Life</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    Our AI assistant is specifically trained on campus-specific information, making it uniquely qualified to answer
                    student queries with precision and relevance.
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    Using natural language processing and machine learning, our system continuously improves and stays updated
                    with the latest campus news and information.
                  </p>
                </div>
                <div className="md:w-1/2">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                      <h4 className="text-lg font-medium mb-2 text-purple-300">Natural Language Processing</h4>
                      <p className="text-sm text-gray-400">Understanding complex student queries in natural language</p>
                    </div>
                    <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                      <h4 className="text-lg font-medium mb-2 text-blue-300">Machine Learning</h4>
                      <p className="text-sm text-gray-400">Continuously improving responses based on student interactions</p>
                    </div>
                    <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                      <h4 className="text-lg font-medium mb-2 text-pink-300">Real-time Updates</h4>
                      <p className="text-sm text-gray-400">Always current with the latest campus information</p>
                    </div>
                    <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                      <h4 className="text-lg font-medium mb-2 text-green-300">24/7 Availability</h4>
                      <p className="text-sm text-gray-400">Always ready to assist students whenever they need help</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Team Section */}
        <motion.section 
          className="mb-24"
          variants={containerVariants}
        >
          <motion.h2 
            className="text-4xl font-bold mb-16 text-center"
            variants={itemVariants}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              The Team Behind The Innovation
            </span>
          </motion.h2>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
            variants={containerVariants}
          >
            {/* Team members - Replace with actual team info */}
            {[1, 2, 3, 4].map((i) => (
              <motion.div 
                key={i}
                className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 text-center"
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="w-28 h-28 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 p-1 mx-auto mb-6">
                  <div className="rounded-full w-full h-full bg-gray-800 flex items-center justify-center overflow-hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-1 text-white">Team Member {i}</h3>
                <p className="text-sm text-purple-300 mb-3">Role / Position</p>
                <p className="text-gray-400 text-sm">
                  Computer Science enthusiast passionate about AI and improving campus life.
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          variants={containerVariants}
        >
          <motion.div 
            className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-gray-700 rounded-2xl p-8 md:p-12"
            variants={fadeIn}
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Get In Touch</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Have questions or suggestions about our Campus AI Assistant? We'd love to hear from you!
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 rounded-xl p-6 text-center">
                <div className="rounded-full bg-purple-500/20 w-14 h-14 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2 text-white">Email</h3>
                <p className="text-gray-300">contact@campusai.edu</p>
              </div>
              
              <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 rounded-xl p-6 text-center">
                <div className="rounded-full bg-blue-500/20 w-14 h-14 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2 text-white">Location</h3>
                <p className="text-gray-300">Tech Innovation Center, Campus Main</p>
              </div>
              
              <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 rounded-xl p-6 text-center">
                <div className="rounded-full bg-pink-500/20 w-14 h-14 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2 text-white">Support</h3>
                <p className="text-gray-300">Available 24/7 via chat</p>
              </div>
            </div>
            
            <div className="mt-10 text-center">
              <motion.button
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-3 px-8 rounded-full transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Contact Us
              </motion.button>
            </div>
          </motion.div>
        </motion.section>

      </motion.div>
    </div>
  );
};

export default About;