import React, { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const SignupContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 2rem;
`;

const SignupCard = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  padding: 2.5rem;
  width: 100%;
  max-width: 400px;
  border: 1px solid #ffd700;
`;

const Title = styled.h2`
  text-align: center;
  color: #b4884a;
  margin-bottom: 2rem;
  font-size: 1.8rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 600;
  color: #333;
  font-size: 0.9rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: #b4884a;
  }
`;

const SignupButton = styled.button`
  background: #b4884a;
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover {
    background: #ffd700;
    color: #b4884a;
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const LoginLink = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  color: #666;
  
  a {
    color: #b4884a;
    text-decoration: none;
    font-weight: 600;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ErrorMessage = styled.div`
  color: #ff4444;
  text-align: center;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const SuccessMessage = styled.div`
  color: #4CAF50;
  text-align: center;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);

    try {
      const result = signup(email, password, name);
      
      if (result.success) {
        setSuccess("Account created successfully! Redirecting...");
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        setError(result.error || "Failed to create account");
      }
    } catch (err) {
      setError("An error occurred during signup");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SignupContainer>
      <SignupCard>
        <Title>📝 Sign Up</Title>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}
        
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter your full name"
            />
          </InputGroup>
          
          <InputGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </InputGroup>
          
          <InputGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </InputGroup>
          
          <InputGroup>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm your password"
            />
          </InputGroup>
          
          <SignupButton type="submit" disabled={loading}>
            {loading ? "Creating Account..." : "Sign Up"}
          </SignupButton>
        </Form>
        
        <LoginLink>
          Already have an account? <Link to="/login">Login here</Link>
        </LoginLink>
      </SignupCard>
    </SignupContainer>
  );
} 