import { StackClientApp } from "@stackframe/stack";

export const stackClientApp = new StackClientApp({
  tokenStore: "nextjs-cookie",
  urls: {
    signIn: "/signin",
    signUp: "/signup",
    signOut: "/",
    afterSignIn: "/",
    afterSignOut: "/signin",
  },
});
