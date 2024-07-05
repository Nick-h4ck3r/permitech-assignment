"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import LogInOutButton from "@/components/LogInOutButton";
import { useAuth } from "@/hooks/AuthContext";
import { useEffect } from "react";

export function Navigation() {
  const { isLoggedIn, checkAuthStatus } = useAuth();

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <span className="text-xl font-bold">Notes App</span>
        </Link>

        <div className="flex ic space-x-4">
          {isLoggedIn && (
            <Link href="/notes">
              <Button
                className="duration-300"
                variant="default"
              >
                My Notes
              </Button>
            </Link>
          )}

          <LogInOutButton />
        </div>
      </div>
    </nav>
  );
}
