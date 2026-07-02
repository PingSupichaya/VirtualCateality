import { createContext, useContext, useState, type ReactNode } from "react";
import { googleLogout } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

export type GoogleProfile = {
  name: string;
  email: string;
  picture: string;
};

type AuthContextType = {
  isLoggedIn: boolean;
  isAnonymous: boolean;
  profile: GoogleProfile | null;
  loginWithGoogle: (credential: string) => void;
  loginAsAnonymous: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<GoogleProfile | null>(null);
  const [isAnonymous, setIsAnonymous] = useState(false);

  const loginWithGoogle = (credential: string) => {
    const decoded: any = jwtDecode(credential);
    setProfile({
      name: decoded.name,
      email: decoded.email,
      picture: decoded.picture,
    });
    setIsAnonymous(false);
  };

  const loginAsAnonymous = () => {
    setProfile(null);
    setIsAnonymous(true);
  };

  const logout = () => {
    googleLogout();
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
