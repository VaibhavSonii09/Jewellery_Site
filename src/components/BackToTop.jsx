// src/components/BackToTop.jsx
import React, { useState, useEffect } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return visible ? (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      style={{
        position: "fixed",
        bottom: 32,
        right: 32,
        background: "#b4884a",
        color: "#fff",
        border: "none",
        borderRadius: "50%",
        width: 48,
        height: 48,
        fontSize: 24,
        cursor: "pointer",
        boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
        zIndex: 1000,
      }}
      aria-label="Back to top"
    >
      ↑
    </button>
  ) : null;
}
