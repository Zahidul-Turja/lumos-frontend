"use client";
import { useState } from "react";
import { loginWithMagicLink } from "@/lib/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginWithMagicLink(email, false);
      setMessage("Magic link sent! Check your email.");
    } catch (err) {
      setMessage(err.response?.data?.error || "Failed to send magic link");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Login with Magic Link</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Magic Link</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
