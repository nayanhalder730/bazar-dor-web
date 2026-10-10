
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL:
    process.env.NEXT_PUBLIC_BETTER_AUTH_URL ||
    "http://localhost:3000",
});

export type AppSession = {
  user: {
    id: string;
    name: string | null;
    email: string;
    image?: string | null;
  };
};

export const { signIn, signUp, signOut, useSession } = authClient;
