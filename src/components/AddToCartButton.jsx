import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const StyledButton = styled(motion.button)`
  padding: 12px 32px;
  border-radius: 8px;
  border: none;
  background: #fff;
  color: #b4884a;
  font-weight: bold;
  font-size: 18px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  margin-top: 12px;
  transition: background 0.2s, color 0.2s;
  display: inline-block;
`;

export default function AddToCartButton({ onClick, children = "Add to Cart" }) {
  return (
    <StyledButton
      whileTap={{ scale: 0.92 }}
      whileHover={{ scale: 1.08, backgroundColor: "#b4884a", color: "#fff" }}
      transition={{ type: "spring", stiffness: 400 }}
      onClick={onClick}
      aria-label="Add to cart"
    >
      {children}
    </StyledButton>
  );
}
