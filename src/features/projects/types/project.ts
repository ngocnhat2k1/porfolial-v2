export type ProjectCategory = 'store' | 'learning' | 'saas' | 'ai' | 'lab';

export type Project = {
  slug: string;
  name: string;
  category: ProjectCategory;
  /** What kind of product it is, in two or three words. */
  kind: string;
  /** One sentence about the product itself. */
  what: string;
  /** Only where master-profile.md confirms it; the projects added from git history leave it out. */
  role?: string;
  period: string;
  stack: string[];
  /** What Nhật did, for the résumé. Faithful to master-profile.md; no new claims. */
  points?: string[];
  /** Live site. Its screenshot lives in `public/work/<slug>.jpg`. */
  url?: string;
  /** Shown instead of a screenshot when there is no public site. */
  status?: string;
  featured?: boolean;
  /** Short handwritten note on the card. */
  note?: string;
};
