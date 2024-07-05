"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/AuthContext";
import { useEffect } from "react";

export default function LogInOutButton() {
  const router = useRouter();
  const { isLoggedIn, logout, checkAuthStatus } = useAuth();

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const handleClick = () => {
    if (isLoggedIn) {
      logout();
      router.push("/login");
    } else {
      router.push("/login");
    }
  };

  return (
    <Button
      onClick={handleClick}
      className="duration-300"
    >
      {isLoggedIn ? "Log Out" : "Log In"}
    </Button>
  );
}
