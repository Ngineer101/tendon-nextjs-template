"use client";

import { FormEvent, useState } from "react";
import { authClient } from "@/lib/auth-client";

export function AuthCard() {
  const { data: session, isPending } = authClient.useSession();
  const [email, setEmail] = useState("demo@example.com");
  const [password, setPassword] = useState("password123");
  const [name, setName] = useState("Demo User");
  const [message, setMessage] = useState("");

  const onSignUp = async () => {
    const { error } = await authClient.signUp.email({
      email,
      password,
      name,
    });

    setMessage(error ? (error.message ?? "Sign up failed") : "Account created");
  };

  const onSignIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { error } = await authClient.signIn.email({
      email,
      password,
    });

    setMessage(error ? (error.message ?? "Sign in failed") : "Signed in");
  };

  const onSignOut = async () => {
    await authClient.signOut();
    setMessage("Signed out");
  };

  return (
    <section className="mt-12 w-full max-w-xl rounded-2xl border border-border bg-card p-6 text-left shadow-sm">
      <h2 className="text-lg font-semibold tracking-tight">Better Auth + Turso starter</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        {isPending
          ? "Checking session..."
          : session?.user
            ? `Signed in as ${session.user.email}`
            : "Not signed in"}
      </p>

      <form className="mt-5 grid gap-3" onSubmit={onSignIn}>
        <input
          className="h-10 rounded-lg border border-border bg-background px-3 text-sm"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Name"
        />
        <input
          className="h-10 rounded-lg border border-border bg-background px-3 text-sm"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
          required
        />
        <input
          className="h-10 rounded-lg border border-border bg-background px-3 text-sm"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
          required
        />
        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="submit"
            className="inline-flex h-10 items-center justify-center rounded-full bg-foreground px-4 text-sm font-medium text-background"
          >
            Sign in
          </button>
          <button
            type="button"
            onClick={() => void onSignUp()}
            className="inline-flex h-10 items-center justify-center rounded-full border border-border px-4 text-sm font-medium"
          >
            Sign up
          </button>
          <button
            type="button"
            onClick={() => void onSignOut()}
            className="inline-flex h-10 items-center justify-center rounded-full border border-border px-4 text-sm font-medium"
          >
            Sign out
          </button>
        </div>
      </form>

      {message ? <p className="mt-3 text-sm text-muted-foreground">{message}</p> : null}
    </section>
  );
}
