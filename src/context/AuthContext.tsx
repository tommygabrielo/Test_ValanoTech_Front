import React, { createContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  role: string | null;
  login: (role: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  role: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<string | null>(null);

  const login = (userRole: string) => {
    setIsAuthenticated(true);
    setRole(userRole);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
