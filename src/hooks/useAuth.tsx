import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { api, token as tokenStore } from "@/lib/api";

export interface AdminUser {
  userId: number;
  email:  string;
  role:   string;
}

interface AuthContextType {
  user:    AdminUser | null;
  isAdmin: boolean;
  loading: boolean;
  signIn:  (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user,    setUser]    = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  // On mount — verify stored token
  useEffect(() => {
    const t = tokenStore.get();
    if (!t) { setLoading(false); return; }

    api.get<{ user: AdminUser }>('/api/auth/me')
      .then(({ user: u }) => setUser(u))
      .catch(() => tokenStore.clear())
      .finally(() => setLoading(false));
  }, []);

  const signIn = async (email: string, password: string): Promise<{ error: Error | null }> => {
    try {
      const { token, user: u } = await api.post<{ token: string; user: AdminUser }>(
        '/api/auth/login',
        { email, password }
      );
      tokenStore.set(token);
      setUser(u);
      return { error: null };
    } catch (err) {
      return { error: err as Error };
    }
  };

  const signOut = () => {
    tokenStore.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAdmin: user?.role === 'admin',
      loading,
      signIn,
      signOut,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
