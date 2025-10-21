"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Lock, Mail } from "lucide-react";
import { loginBasic } from "@/lib/auth";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    loginBasic(form.email, form.password).finally(() => {
      setLoading(false);
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
      <Card className="w-full max-w-md rounded-2xl border border-gray-800 bg-gray-900/70 p-6 shadow-2xl backdrop-blur-xl">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl font-bold tracking-wide text-white">
            Welcome Back
          </CardTitle>
          <p className="text-sm text-gray-400">
            Login to continue to your account
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <Mail className="absolute top-3 left-3 text-gray-400" size={18} />
              <Input
                type="email"
                placeholder="Email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="border-gray-700 bg-gray-800 py-1 pl-10 text-gray-100 placeholder:text-gray-400 focus:ring-gray-500"
              />
            </div>

            <div className="relative">
              <Lock className="absolute top-3 left-3 text-gray-400" size={18} />
              <Input
                type="password"
                placeholder="Password"
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="border-gray-700 bg-gray-800 py-1 pl-10 text-gray-100 placeholder:text-gray-400 focus:ring-gray-500"
              />
            </div>

            <Button
              type="submit"
              className="w-full rounded-lg bg-gray-700 font-semibold text-white hover:bg-gray-600"
              disabled={loading}
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Login"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-gray-300 underline hover:text-white"
          >
            Sign up
          </a>
        </CardFooter>
      </Card>
    </div>
  );
}
