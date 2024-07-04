"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { removeAuthToken } from "@/lib/api";

export function Navigation() {
  const router = useRouter();

  const handleLogout = () => {
    removeAuthToken();
    router.push("/login");
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <span className="text-xl font-bold">Notes App</span>
        </Link>
        <div className="space-x-4">
          <Link href="/notes">
            <Button
              className="duration-300"
              variant="ghost"
            >
              My Notes
            </Button>
          </Link>
          <Button
            className="duration-300"
            variant="destructive"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
}
