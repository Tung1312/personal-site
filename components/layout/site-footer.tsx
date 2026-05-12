import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { siteData } from "@/lib/site-data";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto pb-2 pt-8">
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200/70 pt-4 text-sm text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
        <p>
          {year} — {siteData.person.footerStatus}/{siteData.person.pronouns}
        </p>
        <div className="flex flex-wrap items-center gap-1 sm:gap-2">
          <ThemeToggle />
          <div className="ml-1 flex flex-wrap items-center gap-2 sm:gap-3">
            {siteData.socials.map((social, index) => (
              <span key={social.label} className="inline-flex items-center gap-2">
                {index > 0 ? <span className="text-zinc-400">·</span> : null}
                <Link
                  href={social.href}
                  className="hover:text-zinc-900 dark:hover:text-zinc-100"
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noreferrer" : undefined}
                >
                  {social.handle}
                </Link>
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
