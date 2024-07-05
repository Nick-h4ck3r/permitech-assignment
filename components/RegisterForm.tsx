"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { register, setAuthToken } from "@/lib/api";
import Image from "next/image";
import { useAuth } from "@/hooks/AuthContext";

export function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { checkAuthStatus } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { token } = await register(username, password);
      setAuthToken(token);
      checkAuthStatus();
      router.push("/notes");
    } catch (error) {
      console.error("Registration failed:", error);
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {" "}
      {loading ? (
        <div className="flex items-center gap-4">
          <p>Creating your account...</p>
          <Image
            height={15}
            width={15}
            priority
            src={"/ring-resize.svg"}
            alt="loading spinner"
            className="inline-flex"
          />
        </div>
      ) : (
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
          <Button type="submit">Register</Button>
        </form>
      )}
    </>
  );
}
