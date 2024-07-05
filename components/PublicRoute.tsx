"use client";

import { getAuthToken } from "@/lib/api";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function PublicRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = getAuthToken();
      if (token) {
        router.push("/notes");
      } else {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center gap-4">
        <div>Loading</div>
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
