"use client";
import { useState } from "react";
import { loginWithMagicLink } from "@/lib/auth";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginWithMagicLink(email, true);
      setMessage("Signup link sent! Check your email.");
    } catch (err) {
      setMessage(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Sign Up with Magic Link</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
