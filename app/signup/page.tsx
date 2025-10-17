"use client";
import { Button } from "@/components/atoms/button";
import { useStackApp } from "@stackframe/stack";

export default function Page() {
  const app = useStackApp();
  const handlerSignup = async () => {
    console.log("Primero esto");

    const options = {
      email: "jean@dev.com",
      password: "12345678",
    };

    const result = await app.signUpWithCredential(options);

    console.log(result);
  };

  const handlerSignOAuth = async () => {
    const result = await app.signInWithOAuth("github", { returnTo: "/" });

    console.log("Desde el github");
    console.log(result);
  };
  return (
    <div>
      <h1>Custom signup in page</h1>
      <Button onClick={handlerSignOAuth}>Sign up with GitHub</Button>
      <Button onClick={handlerSignup}>Sign up with credentials</Button>
    </div>
  );
}
