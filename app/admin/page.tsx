// app/admin/page.tsx
import { requireAdmin } from "@/lib/auth";

export default async function AdminPage() {
  const { dbUser } = await requireAdmin();
  return (
    <div className="p-6 space-y-3">
      <h1 className="text-xl font-semibold">Admin</h1>
      <p>Welcome, {dbUser?.email}</p>
      <ul className="list-disc pl-5">
        <li>Review feedback</li>
        <li>Manage users</li>
        <li>System settings</li>
      </ul>
    </div>
  );
}
