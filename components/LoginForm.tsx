"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { login, setAuthToken } from "@/lib/api";

export function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { token } = await login(username, password);
      setAuthToken(token);
      router.push("/notes");
    } catch (error) {
      console.error("Login failed:", error);
      setError("Invalid username or password");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      {error && <div className="text-red-500">{error}</div>}
      <Input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit">Login</Button>
    </form>
  );
}
