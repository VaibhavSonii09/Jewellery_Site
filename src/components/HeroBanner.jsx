// src/components/HeroBanner.jsx
import React, { useRef } from "react";

export default function HeroBanner() {
  const bannerRef = useRef(null);

  const handleMouseMove = (e) => {
    const { width, height, left, top } = bannerRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 20;
    const y = (e.clientY - top - height / 2) / 20;
    bannerRef.current.style.transform = `translate(${x}px, ${y}px) scale(1.03)`;
  };

  const handleMouseLeave = () => {
    bannerRef.current.style.transform = "translate(0,0) scale(1)";
  };

  return (
    <div
      ref={bannerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        background: "url('/images/hero.jpg') center/cover no-repeat",
        height: 350,
        borderRadius: 24,
        margin: "32px 0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontSize: 48,
        fontWeight: "bold",
        boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
        transition: "transform 0.2s",
      }}
    >
      Discover Your Shine
    </div>
  );
}
