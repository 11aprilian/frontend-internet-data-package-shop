"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const cookies = parseCookies();
    const authUser = cookies.auth_user;

    if (authUser) {
      router.replace("/dashboard");
    } else {
      router.replace("/login");
    }
  }, [router]);

  return null;
}
