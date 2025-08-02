// src/pages/About.jsx
import React from "react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, delay: 0.3 } },
  hover: { scale: 1.05, boxShadow: "0 8px 32px rgba(0,0,0,0.15)" },
};

export default function About() {
  return (
    <motion.div
      className="about-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{
        maxWidth: 800,
        margin: "40px auto",
        padding: 32,
        background: "#fff",
        borderRadius: 16,
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
      }}
    >
      <motion.h1
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        style={{ fontSize: 36, marginBottom: 16 }}
      >
        About Us
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.7 }}
        style={{ fontSize: 18, lineHeight: 1.7, marginBottom: 32 }}
      >
        Welcome to our jewellery store! We craft unique, elegant pieces with the finest materials and attention to detail. Our passion is to help you shine on every occasion.
      </motion.p>
      <motion.img
        src="./products/Shop1.png"
        alt="Our Jewellery"
        variants={imageVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        style={{
          width: "100%",
          maxWidth: 400,
          borderRadius: 12,
          display: "block",
          margin: "0 auto",
        }}
      />
    </motion.div>
  );
}