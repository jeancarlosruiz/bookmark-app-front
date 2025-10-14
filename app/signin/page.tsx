"use client";

import { Button } from "@/components/atoms/button";
import { useStackApp } from "@stackframe/stack";

export default function Page() {
  const app = useStackApp();
  const handlerSignin = async () => {
    try {
      console.log("Primero esto");

      const options = {
        email: "jean@dev.com",
        password: "123456",
      };

      const result = await app.signInWithCredential(options);
      console.log({ result });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Custom signup in page</h1>
      <Button onClick={handlerSignin}>Sign in with credentials</Button>
    </div>
  );
}
