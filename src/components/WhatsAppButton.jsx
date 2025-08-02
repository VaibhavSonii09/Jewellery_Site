// src/components/WhatsAppButton.jsx
import React from "react";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/919876543210"  // <-- Replace with your WhatsApp number
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed",
        top: 65,
        right: 32,
        background: "#25D366",
        color: "#fff",
        border: "none",
        borderRadius: "50%",
        width: 56,
        height: 56,
        fontSize: 28,
        cursor: "pointer",
        boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textDecoration: "none"
      }}
      aria-label="Chat on WhatsApp"
    >
      <i className="fab fa-whatsapp" style={{ color: "#fff" }}></i>
      
    </a>
  );
}
