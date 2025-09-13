// app/login/page.tsx
"use client";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

export default function LoginPage() {
  const supabase = createSupabaseBrowserClient();
  const params = useSearchParams();
  const router = useRouter();
  const next = params.get("next") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function signIn(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setMsg(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) return setMsg(error.message);
    router.replace(next);
  }

  // Sign up: if confirmations OFF you might get a session immediately;
  // otherwise Supabase emails a link that must hit /auth/callback.
  async function doSignUp() {
    setLoading(true); setMsg(null);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(
          next
        )}`,
      },
    });
    setLoading(false);
    if (error) return setMsg(error.message);
    if (data.session) {
      // auto-confirm is ON → already signed in
      router.replace(next);
    } else {
      setMsg("Check your email to confirm your account.");
    }
  }

  async function magicLink() {
    setLoading(true); setMsg(null);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(
          next
        )}`,
      },
    });
    setLoading(false);
    if (error) return setMsg(error.message);
    setMsg("Magic link sent! Check your email.");
  }

  async function oauth(provider: "google" | "github") {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}` },
    });
    if (error) return setMsg(error.message);
    if (data.url) window.location.href = data.url;
  }

  return (
    <div className="mx-auto max-w-sm space-y-4 p-6">
      <h1 className="text-xl font-semibold">Sign in</h1>

      <form className="space-y-3" onSubmit={signIn}>
        <input className="border p-2 w-full" placeholder="Email" type="email"
               value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="border p-2 w-full" placeholder="Password" type="password"
               value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button disabled={loading} className="border px-3 py-2 w-full" type="submit">
          {loading ? "…" : "Sign in"}
        </button>
      </form>

      <div className="flex gap-2">
        <button type="button" onClick={doSignUp} className="border px-3 py-2 w-1/2">Sign up</button>
        <button type="button" onClick={magicLink} className="border px-3 py-2 w-1/2">Magic link</button>
      </div>

      <div className="flex gap-2">
        <button type="button" onClick={() => oauth("google")} className="border px-3 py-2 w-1/2">Google</button>
        <button type="button" onClick={() => oauth("github")} className="border px-3 py-2 w-1/2">GitHub</button>
      </div>

      {msg && <p className="text-sm">{msg}</p>}
    </div>
  );
}
