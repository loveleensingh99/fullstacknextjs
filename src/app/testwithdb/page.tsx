"use client";

import React, { useEffect, useState } from "react";

interface Demo {
  _id: string;
  name: string;
}

const Page = () => {
  const [demos, setDemos] = useState<Demo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDemos = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/demo");
      if (!res.ok) throw new Error("Failed to fetch demos");
      const data = await res.json();
      setDemos(data);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDemos();
  }, []);

  const handleAddRandom = async () => {
    setError(null);
    try {
      const res = await fetch("/api/demo/add-random", { method: "POST" });
      const data = await res.json();
      if (!res.ok || !data.success)
        throw new Error(data.error || "Failed to add random name");
      await fetchDemos();
    } catch (err: any) {
      setError(err.message || "Unknown error");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Demo List</h1>
      <button onClick={handleAddRandom} style={{ marginBottom: 12 }}>
        Add Random Name
      </button>
      <ul>
        {demos.map((demo) => (
          <li key={demo._id}>{demo.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
