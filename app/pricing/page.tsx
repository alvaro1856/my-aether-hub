const plans = [
  { name: "Starter", price: "$0", perks:["Community support","Manual updates"]},
  { name: "Pro", price: "$12/mo", perks:["Email support","Auto-updates","Priority fixes"]},
  { name: "Team", price: "$29/mo", perks:["Team seats","SSO (soon)","Priority roadmap"]},
];

export default function Pricing(){
  return (
    <section className="space-y-8">
      <h1 className="text-3xl font-bold">Pricing</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {plans.map(p=>(
          <div
            key={p.name}
            className="rounded-2xl bg-[var(--panel)] p-6 border border-[var(--ink-border)]"
          >
            <h3 className="text-xl font-semibold">{p.name}</h3>
            <p className="text-2xl font-black mt-2">{p.price}</p>
            <ul className="mt-4 space-y-2 text-[var(--ink-soft)]">
              {p.perks.map(s=> <li key={s}>• {s}</li>)}
            </ul>
            <a
              className="btn mt-6 w-full border border-[var(--ink-border)]"
              href={`/support?plan=${p.name.toLowerCase()}`}
            >
              Get {p.name}
            </a>
          </div>
        ))}
      </div>
      <p className="text-[var(--ink-soft)] text-sm">
        Payments coming later; buttons act as sign-up/contact for now.
      </p>
    </section>
  );
}

