"use client";

import { FormEvent, useState } from "react";
import { Mail } from "lucide-react";
import { AppShell } from "@/components/ui/AppShell";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { supabase } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  async function login(event: FormEvent) {
    event.preventDefault();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/home`
      }
    });

    setStatus(error ? error.message : "Magic link sent. Check your email to continue.");
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-xl">
        <Card className="p-6">
          <div className="grid h-12 w-12 place-items-center rounded-md bg-coral text-white">
            <Mail />
          </div>
          <h1 className="mt-5 text-3xl font-black">Log in</h1>
          <p className="mt-2 text-slate-600">Get a magic link and sync your picks, quiz points, and groups.</p>
          <form className="mt-6 space-y-4" onSubmit={login}>
            <label className="block">
              <span className="text-sm font-semibold text-slate-600">Email</span>
              <input
                className="mt-1 min-h-11 w-full rounded-md border border-slate-300 px-3"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </label>
            <Button className="w-full" type="submit">Send magic link</Button>
          </form>
          {status && <p className="mt-4 text-sm font-semibold text-slate-600">{status}</p>}
        </Card>
      </div>
    </AppShell>
  );
}
