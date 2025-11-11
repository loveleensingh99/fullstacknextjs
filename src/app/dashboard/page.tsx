"use client";
import React from "react";
import { signOut, useSession } from "next-auth/react";

const page = () => {
  const { data: session, status } = useSession();

  if (status === "loading") return <div>Loading...</div>;
  if (!session) return <div>You are not logged in.</div>;

  return (
    <div>
      <h1>Welcome, {session.user?.name}</h1>
      <p>Email: {session.user?.email}</p>
      {/* Add more user details as needed */}

      {session && <button onClick={() => signOut()}></button>}
    </div>
  );
};

export default page;
