// app/dashboard/page.tsx
import { requireUser } from "@/lib/auth";
import SignOutButton from "../components/SignOutButton";

export default async function Dashboard() {
const { dbUser } = await requireUser();
return (
<div className="p-6 space-y-3">
<h1 className="text-xl font-semibold">Welcome, {dbUser?.name || dbUser?.email}</h1>
<p>Your role: {dbUser?.role}</p>
<SignOutButton />
</div>
);
}