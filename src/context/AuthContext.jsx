import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error loading user from localStorage:', error);
      }
    }
    setLoading(false);
  }, []);

  // Save user to localStorage whenever user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const signup = (email, password, name) => {
    // In a real app, this would make an API call
    const newUser = {
      id: Date.now().toString(),
      email,
      name,
      createdAt: new Date().toISOString()
    };
    
    setUser(newUser);
    return { success: true, user: newUser };
  };

  const login = (email, password) => {
    // In a real app, this would make an API call
    // For demo purposes, we'll simulate a login
    const demoUsers = [
      { id: '1', email: 'demo@example.com', password: 'password123', name: 'Demo User' },
      { id: '2', email: 'admin@jewellery.com', password: 'admin123', name: 'Admin User' }
    ];

    const foundUser = demoUsers.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      return { success: true, user: userWithoutPassword };
    } else {
      return { success: false, error: 'Invalid email or password' };
    }
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    login,
    signup,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
} 