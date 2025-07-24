"use client";

import { Button } from "./ui/button";
import { supabase } from "@/lib/utils";

export function LoginButton() {
  const handleLogin = async () => {
    await supabase?.auth.signInWithOAuth({ provider: "google" });
  };

  return (
    <Button onClick={handleLogin} variant="default">
      Login
    </Button>
  );
} 