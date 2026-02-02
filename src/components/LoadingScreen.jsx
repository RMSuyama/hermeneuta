import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="loading-container">
      <motion.div
        className="loading-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="logo-wrapper">
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <BookOpen size={64} className="loading-icon" />
          </motion.div>
          <h1 className="loading-title">HERMENEUTA</h1>
          <div className="loading-line"></div>
          <p className="loading-subtitle">Informativo Jurídico do Vale do Ribeira</p>
        </div>

        <div className="loading-bar-container">
          <motion.div
            className="loading-bar"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default LoadingScreen;
