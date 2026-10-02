export type Project = {
  slug: string;
  name: string;
  /** What kind of product it is, in two or three words. */
  kind: string;
  /** One sentence about the product itself. */
  what: string;
  role: string;
  period: string;
  stack: string[];
  /** What Nhật did. Faithful to master-profile.md; no new claims. */
  points: string[];
  url?: string;
  /** Shown instead of a link when the product is not public yet. */
  status?: string;
  featured?: boolean;
  /** Short handwritten note on the card. */
  note?: string;
};
