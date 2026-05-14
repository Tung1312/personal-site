export type NavLink = {
  title: string;
  href: string;
};

export type SocialLink = {
  label: string;
  handle: string;
  href: string;
};

export type WorkEntry = {
  company: string;
  role: string;
  period: string;
  highlights: string[];
};

export type HomelabService = {
  name: string;
  status: "Operational" | "Monitoring" | "Scaling";
  latency: string;
};

export type InfoPill = {
  text: string;
  icon: string;
  href?: string;
  iconClassName?: string;
};

export type InfoPage = {
  aliases: readonly string[];
  pills: InfoPill[];
  bioParagraph: string;
  tagline: string;
};

export type HomelabPage = {
  title: string;
  subtitle: string;
  placeholder: string;
};

export type UsesPage = {
  title: string;
  subtitle: string;
  description: string;
  categories: readonly string[];
};

export type WorkPage = {
  title: string;
  subtitle: string;
  placeholder: string;
};
