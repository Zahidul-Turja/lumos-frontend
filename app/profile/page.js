"use client";
import { useEffect, useState } from "react";
import { getProfile, updateProfile, logout } from "@/lib/auth";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    getProfile()
      .then((res) => {
        setUser(res.data);
        setFirstName(res.data.first_name);
        setLastName(res.data.last_name);
      })
      .catch(() => setUser(null));
  }, []);

  const handleUpdate = async () => {
    const res = await updateProfile({
      first_name: firstName,
      last_name: lastName,
    });
    setUser(res.data);
  };

  const handleLogout = async () => {
    await logout();
    window.location.href = "/auth/login";
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Welcome, {user.full_name || user.email}</h1>
      <p>Email: {user.email}</p>
      <p>Email Verified: {user.is_email_verified ? "Yes" : "No"}</p>

      <h2>Update Profile</h2>
      <input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      <input value={lastName} onChange={(e) => setLastName(e.target.value)} />
      <button onClick={handleUpdate}>Save</button>

      <hr />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
