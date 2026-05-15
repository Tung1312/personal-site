import Link from "next/link";
import type { ReactNode } from "react";

export function renderInline(text: string): ReactNode[] {
  const segments = text.split(/(@homelab|@work|\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return segments.map((seg, i) => {
    if (seg === "@homelab")
      return (
        <Link key={i} href="/homelab" className="font-medium underline underline-offset-2 decoration-zinc-400 dark:decoration-zinc-600">
          @homelab
        </Link>
      );
    if (seg === "@work")
      return (
        <Link key={i} href="/work" className="font-medium underline underline-offset-2 decoration-zinc-400 dark:decoration-zinc-600">
          @work
        </Link>
      );
    if (seg.startsWith("**") && seg.endsWith("**"))
      return <strong key={i}>{seg.slice(2, -2)}</strong>;
    if (seg.startsWith("*") && seg.endsWith("*"))
      return <strong key={i}>{seg.slice(1, -1)}</strong>;
    return seg;
  });
}
