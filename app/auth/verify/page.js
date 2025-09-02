"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { verifyMagicLink } from "@/lib/auth";

export default function VerifyMagicLinkPage() {
  const [status, setStatus] = useState("Verifying...");
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = params.get("token");
    if (token) {
      verifyMagicLink(token)
        .then(() => {
          setStatus("Success! Redirecting...");
          setTimeout(() => router.push("/profile"), 1500);
        })
        .catch(() => setStatus("Invalid or expired link."));
    } else {
      setStatus("No token provided.");
    }
  }, [params, router]);

  return (
    <div style={{ padding: 20 }}>
      <h1>{status}</h1>
    </div>
  );
}
