'use client';
import { Token } from '@/types/token.dto';
import { createContext, ReactNode, useContext, useState } from 'react';

interface TokenContextType {
  parsedToken: Token | undefined;
  setParsedToken: (parsedToken: Token) => void;
}

const TokenContext = createContext<TokenContextType | null>(null);

export function TokenProvider({ children }: { children: ReactNode }) {
  const [parsedToken, setParsedToken] = useState<Token>();

  return (
    <TokenContext.Provider value={{ parsedToken, setParsedToken }}>
      {children}
    </TokenContext.Provider>
  );
}

// Custom hook to use TokenContext
export function useTokenContext() {
  const context = useContext(TokenContext);
  if (!context) throw new Error('useToken must be used within a TokenProvider');
  return context;
}
