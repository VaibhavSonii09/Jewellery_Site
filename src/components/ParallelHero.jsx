import React, { useRef } from "react";
import styled from "styled-components";

const ParallaxHeroWrapper = styled.section`
  background: linear-gradient(120deg, #fffbe6 60%, #ffd700 100%);
  padding: 0;
  text-align: center;
  position: relative;
  overflow: hidden;
  border-radius: 0 0 32px 32px;
  min-height: 340px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ParallaxImage = styled.div`
  background: url('/products/GoldSet.png') center/cover no-repeat;
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  opacity: 0.18;
  z-index: 1;
  transition: transform 0.2s;
  will-change: transform;
`;

const ParallaxContent = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  padding: 4rem 2rem 2rem 2rem;
`;

export default function ParallaxHero({ children }) {
  const imgRef = useRef(null);

  const handleMouseMove = (e) => {
    const { width, height, left, top } = imgRef.current.parentNode.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 18;
    const y = (e.clientY - top - height / 2) / 18;
    imgRef.current.style.transform = `translate(${x}px, ${y}px) scale(1.04)`;
  };

  const handleMouseLeave = () => {
    imgRef.current.style.transform = "translate(0,0) scale(1)";
  };

  return (
    <ParallaxHeroWrapper
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <ParallaxImage ref={imgRef} />
      <ParallaxContent>
        {children}
      </ParallaxContent>
    </ParallaxHeroWrapper>
  );
}
