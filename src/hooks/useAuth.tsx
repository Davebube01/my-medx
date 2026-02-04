import {
  useState,
  useEffect,
  createContext,
  useContext,
  type ReactNode,
} from "react";

import { MOCK_PHARMACY, MOCK_PHC } from "../data/mockData";
import type { Role, User } from "../types";

// Mock user state
interface AuthState {
  user: User | null;
  loading: boolean;
  signInWithGoogle: (role?: Role) => Promise<void>;
  signOut: () => Promise<void>;
  setUserRole: (role: Role) => Promise<void>;
}

const AuthContext = createContext<AuthState>({} as AuthState);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate checking local storage or firebase auth state
    const storedUser = localStorage.getItem("mymedx_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const signInWithGoogle = async (role?: Role) => {
    // Simulate Google Sign In
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    const newUser: User = {
      uid: "user123",
      phone: "+2348055555555",
      role: role || "user", // Default to user if not specified
      createdAt: new Date().toISOString(),
    };

    setUser(newUser);
    localStorage.setItem("mymedx_user", JSON.stringify(newUser));
    setLoading(false);
  };

  const signOut = async () => {
    localStorage.removeItem("mymedx_user");
    setUser(null);
  };

  const setUserRole = async (role: Role) => {
    if (!user) return;

    const updatedUser = { ...user, role };
    setUser(updatedUser);
    localStorage.setItem("mymedx_user", JSON.stringify(updatedUser));

    // In real app, we would write to Firestore here
    // For Pharmacy/PHC, we might need to link to their doc
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, signInWithGoogle, signOut, setUserRole }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// Hook to get current entity details based on role
export const useEntity = () => {
  const { user } = useAuth();

  if (!user) return { entity: null, type: null };

  if (user.role === "pharmacy") {
    return { entity: MOCK_PHARMACY, type: "pharmacy" as const };
  }

  if (user.role === "phc") {
    return { entity: MOCK_PHC, type: "phc" as const };
  }

  return { entity: null, type: "user" as const };
};
