import React, { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 2rem;
`;

const LoginCard = styled.div`
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

const LoginButton = styled.button`
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

const SignupLink = styled.div`
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

const DemoCredentials = styled.div`
  background: #fffbe6;
  border: 1px solid #ffd700;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  color: #666;
  
  h4 {
    margin: 0 0 0.5rem 0;
    color: #b4884a;
  }
  
  p {
    margin: 0.25rem 0;
  }
`;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = login(email, password);
      
      if (result.success) {
        navigate("/");
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <Title>🔐 Login</Title>
        
        <DemoCredentials>
          <h4>Demo Credentials:</h4>
          <p><strong>Email:</strong> demo@example.com</p>
          <p><strong>Password:</strong> password123</p>
          <p><strong>Admin:</strong> admin@jewellery.com / admin123</p>
        </DemoCredentials>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <Form onSubmit={handleSubmit}>
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
          
          <LoginButton type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </LoginButton>
        </Form>
        
        <SignupLink>
          Don't have an account? <Link to="/signup">Sign up here</Link>
        </SignupLink>
      </LoginCard>
    </LoginContainer>
  );
} 