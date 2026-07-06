import { createContext, useContext, useState, type ReactNode } from "react";
import { googleLogout } from "@react-oauth/google";
import { loginWithGoogleAPI, clearStoredToken, setStoredToken } from "../services/api";

export type GoogleProfile = {
  name: string;
};

type AuthContextType = {
  isLoggedIn: boolean;
  isAnonymous: boolean;
  profile: GoogleProfile | null;
  loginWithGoogle: (credential: string) => Promise<void>;
  loginAsAnonymous: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<GoogleProfile | null>(null);
  const [isAnonymous, setIsAnonymous] = useState(false);

  const loginWithGoogle = async (credential: string) => {
    const { token, user } = await loginWithGoogleAPI(credential);
    setStoredToken(token);
    setProfile({ name: user.name ?? "Cat lover" });
    setIsAnonymous(false);
  };

  const loginAsAnonymous = () => {
    // Anonymous sessions are never persisted to the backend, so there's nothing
    // to store beyond local UI state.
    setProfile(null);
    setIsAnonymous(true);
  };

  const logout = () => {
    googleLogout();
    clearStoredToken();
    setProfile(null);
    setIsAnonymous(false);
  };

  const isLoggedIn = !!profile || isAnonymous;

  return (
    <AuthContext.Provider value={{ isLoggedIn, isAnonymous, profile, loginWithGoogle, loginAsAnonymous, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
