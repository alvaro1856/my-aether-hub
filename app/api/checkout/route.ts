export async function POST() {
  // TODO: call Stripe checkout sessions here later
  return new Response(JSON.stringify({ ok: false, todo: "Stripe wiring later" }), {
    status: 501,
    headers: { "content-type": "application/json" },
  });
}
