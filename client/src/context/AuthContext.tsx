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
  profile: GoogleProfile | null;
  loginWithGoogle: (credential: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<GoogleProfile | null>(null);

  const loginWithGoogle = (credential: string) => {
    const decoded: any = jwtDecode(credential);
    setProfile({
      name: decoded.name,
      email: decoded.email,
      picture: decoded.picture,
    });
  };

  const logout = () => {
    googleLogout();
    setProfile(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!profile, profile, loginWithGoogle, logout }}>
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
