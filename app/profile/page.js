"use client";

import { useEffect, useState } from "react";
import { getProfile, updateProfile, logout } from "@/lib/auth";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Image from "next/image";
import { LogOut, Save } from "lucide-react";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProfile()
      .then((res) => {
        setUser(res.data);
        setFirstName(res.data.first_name || "");
        setLastName(res.data.last_name || "");
      })
      .catch(() => setUser(null));
  }, []);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const res = await updateProfile({
        first_name: firstName,
        last_name: lastName,
      });
      setUser(res.data);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    window.location.href = "/auth/";
  };

  if (!user)
    return (
      <div className="flex h-screen items-center justify-center bg-gray-950 text-gray-300">
        Loading your profile...
      </div>
    );

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black p-6 text-white">
      <Card className="w-full max-w-lg rounded-2xl border border-gray-800 bg-gray-900/80 shadow-2xl backdrop-blur-xl">
        <CardHeader className="flex flex-col items-center gap-3 text-center">
          <Image
            src={user.avatar_url || "/default-avatar.png"}
            alt="Avatar"
            width={80}
            height={80}
            className="rounded-full border border-gray-700 shadow-md"
          />
          <CardTitle className="text-2xl font-bold tracking-wide text-white">
            {user.full_name || "Your Profile"}
          </CardTitle>
          <p className="text-sm text-gray-400">{user.email}</p>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex flex-col gap-3">
            <label className="text-sm text-gray-400">First Name</label>
            <Input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="border-gray-700 bg-gray-800 text-gray-100"
            />

            <label className="text-sm text-gray-400">Last Name</label>
            <Input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="border-gray-700 bg-gray-800 text-gray-100"
            />
          </div>
        </CardContent>

        <CardFooter className="mt-4 flex justify-between">
          <Button
            onClick={handleUpdate}
            disabled={loading}
            className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600"
          >
            <Save size={18} />
            {loading ? "Saving..." : "Save Changes"}
          </Button>

          <Button
            variant="destructive"
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut size={18} />
            Logout
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
