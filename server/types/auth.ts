import type { AuthProvider } from 'database';


export type PayloadType = {
  provider: AuthProvider;
  authId: string;
};

export type JwtType = PayloadType & {
  iat: number;
  exp: number;
};
