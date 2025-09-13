// components/SignOutButton.tsx
"use client";
export default function SignOutButton() {
return (
<form action="/logout" method="POST">
<button className="border px-3 py-2">Sign out</button>
</form>
);
}