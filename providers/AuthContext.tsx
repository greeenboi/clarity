import { AuthSession, Session, User } from '@supabase/supabase-js';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { supabase } from '~/utils/supabase';

type State = {
  session: AuthSession | null | undefined;
};

const AuthContext = createContext<State | undefined>(undefined);
const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuthContext must be used within a AuthContextProvider.`);
  }
  return context;
};

const useAuthUser = () => {
  const { session } = useAuthContext();
  if (session === undefined) return undefined;
  return session?.user ?? null;
};

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null | undefined>(null);
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session && session.user) {
        setUser(session.user);
        setIsLogged(true);
      } else {
        setUser(null);
        setIsLogged(false);
      }
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session && session.user) {
        setUser(session.user);
        setIsLogged(true);
      } else {
        setUser(null);
        setIsLogged(false);
      }
    });
  }, [session]);

  const value = useMemo(
    () => ({
      session,
    }),
    [session]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthProvider, useAuthContext, useAuthUser };
