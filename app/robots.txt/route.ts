export function GET() {
  const body = [
    "User-agent: *",
    "Allow: /",
    "",
    "Sitemap: https://your-domain.com/sitemap.xml",
  ].join("\n");

  return new Response(body, {
    headers: { "content-type": "text/plain" },
  });
}
