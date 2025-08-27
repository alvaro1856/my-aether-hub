"use client";

import { Suspense, useActionState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { sendSupport } from "./actions";

type State = { ok?: boolean; error?: string };

// Outer page: ONLY provides a Suspense boundary
export default function SupportPage() {
  return (
    <Suspense
      fallback={
        <section className="space-y-6 max-w-xl">
          <h1 className="text-3xl font-bold">Support</h1>
          <div className="rounded-xl p-3 border border-[var(--ink-border)] bg-[var(--panel)]">
            Loading…
          </div>
        </section>
      }
    >
      <SupportInner />
    </Suspense>
  );
}

// Inner component: safe to use useSearchParams() here
function SupportInner() {
  const router = useRouter();
  const params = useSearchParams();
  const plan = (params.get("plan") || "").toLowerCase();
  const sent = params.get("sent") === "1";

  const [state, formAction, pending] = useActionState<State, FormData>(
    async (_prev, fd) => {
      const res = await sendSupport(fd);
      if (res.ok) return { ok: true };
      return { error: res.errors?.join(" ") || "Something went wrong" };
    },
    {}
  );

  useEffect(() => {
    if (state.ok) {
      router.replace(`/support?sent=1${plan ? `&plan=${plan}` : ""}`);
    }
  }, [state.ok, plan, router]);

  return (
    <section className="space-y-6 max-w-xl">
      <h1 className="text-3xl font-bold">Support</h1>

      {plan && (
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--ink-border)] bg-[var(--panel)] px-3 py-1 text-sm">
          <span className="opacity-70">Plan:</span>
          <span className="font-medium capitalize">{plan}</span>
        </div>
      )}

      {sent && (
        <div className="rounded-xl p-3 border border-[var(--ink-border)] bg-[var(--panel)]">
          Thanks! We’ll get back to you shortly{plan ? ` about the ${plan} plan` : ""}.
        </div>
      )}

      {state.error && (
        <div className="rounded-xl p-3 border border-[var(--ink-border)] bg-[var(--panel)]">
          {state.error}
        </div>
      )}

      <form action={formAction} className="space-y-4">
        <input type="hidden" name="plan" value={plan} />
        <input
          name="email"
          placeholder="you@example.com"
          className="w-full rounded-xl bg-[var(--panel)] border border-[var(--ink-border)] p-3"
          required
        />
        <textarea
          name="message"
          placeholder="How can we help?"
          className="w-full rounded-xl bg-[var(--panel)] border border-[var(--ink-border)] p-3 h-40"
          minLength={10}
          required
        />
        <button disabled={pending} className="btn bg-[var(--brand)] text-[var(--brand-ink)]">
          {pending ? "Sending…" : "Send"}
        </button>
      </form>
    </section>
  );
}
