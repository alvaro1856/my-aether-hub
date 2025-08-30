import ClientContent from "./ClientContent";
import { frontmatter } from "./content.meta"; 

export const metadata = {
  title: frontmatter.title,
  description: frontmatter.description,
};

export default function Page() {
  return (
    <article className="prose prose-invert prose-docs max-w-none">
      <ClientContent />
    </article>
  );
}
