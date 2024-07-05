"use client";

import { useAuth } from "@/hooks/AuthContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function PublicRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/notes");
    }
  }, [isLoggedIn, router]);

  if (isLoggedIn) {
    return (
      <div className="flex min-h-screen items-center justify-center gap-4">
        <div>Redirecting</div>
        <Image
          height={15}
          width={15}
          priority
          src={"/ring-resize.svg"}
          alt="loading spinner"
          className="inline-flex"
        />
      </div>
    );
  }

  return <>{children}</>;
}
