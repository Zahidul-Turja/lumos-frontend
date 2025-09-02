"use client";
import { useEffect, useState } from "react";
import { getSessions } from "@/lib/auth";

export default function SessionsPage() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    getSessions().then((res) => setSessions(res.data.sessions));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Active Sessions</h1>
      <ul>
        {sessions.map((s) => (
          <li key={s.id}>
            {s.login_method} - {s.ip_address} (
            {s.is_current ? "Current" : "Other"})
          </li>
        ))}
      </ul>
    </div>
  );
}
