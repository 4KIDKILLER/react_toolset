import { useState, type ReactNode } from 'react';
import { AuthContext, type User, type AuthContextType } from './AuthContext';

const getInitialUser = (): User | null => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    try {
      return JSON.parse(storedUser);
    } catch {
      localStorage.removeItem('user');
    }
  }
  return null;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(getInitialUser);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (username: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 800));

    if (username === 'admin' && password === 'admin123') {
      const userData: User = {
        username,
        email: `${username}@example.com`,
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      setIsLoading(false);
      return { success: true };
    }

    setIsLoading(false);
    return { success: false, error: '用户名或密码错误' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
