// Drawn on a 32-unit grid with the same ink line as the illustrations, plus one palette fill each.
const icons = {
  guitar: (
    <>
      <path className="fill-wood" d="M13.06 17.94A4.6 4.6 0 1 1 18.94 17.94A6.2 6.2 0 1 1 13.06 17.94Z" />
      <path d="M14.8 10.2V4.8h2.4v5.4M14.2 4.8h3.6V2.4h-3.6z" />
      <circle cx="16" cy="21" r="1.9" fill="currentColor" stroke="none" />
      <path d="M13.6 25.8h4.8" />
    </>
  ),
  piano: (
    <>
      <rect className="fill-paper" x="3" y="7" width="26" height="18" rx="2.5" />
      <path d="M8.2 7v18M13.4 7v18M18.6 7v18M23.8 7v18" strokeWidth={1.5} />
      <path d="M6.6 7h3.2v10H6.6zM11.8 7h3.2v10h-3.2zM22.2 7h3.2v10h-3.2z" fill="currentColor" stroke="none" />
    </>
  ),
  mic: (
    <>
      <rect className="fill-dusk" x="11.5" y="2.5" width="9" height="15" rx="4.5" />
      <path d="M11.5 8.5h9M11.5 12h9" strokeWidth={1.5} />
      <path d="M7.5 13.5a8.5 8.5 0 0 0 17 0M16 22v6.5M11 28.5h10" />
    </>
  ),
  gamepad: (
    <>
      <path
        className="fill-sun"
        d="M9.5 9h13a6 6 0 0 1 5.8 4.5l1.4 5.6a3.5 3.5 0 0 1-6 3.2L21.2 20h-10.4l-2.5 2.3a3.5 3.5 0 0 1-6-3.2l1.4-5.6A6 6 0 0 1 9.5 9z"
      />
      <path d="M10 12.2v5M7.5 14.7h5" />
      <circle cx="21.6" cy="16" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="24.4" cy="13.2" r="1.3" fill="currentColor" stroke="none" />
    </>
  ),
  android: (
    <>
      <path className="fill-leaf" d="M5 22.5a11 11 0 0 1 22 0z" />
      <path d="M10.5 13 8.7 9.9M21.5 13l1.8-3.1" />
      <circle cx="11.5" cy="18" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="20.5" cy="18" r="1.3" fill="currentColor" stroke="none" />
    </>
  ),
  laptop: (
    <>
      <path className="fill-studio" d="M6 21.5V8.5A1.5 1.5 0 0 1 7.5 7h17A1.5 1.5 0 0 1 26 8.5v13" />
      <path className="stroke-paper" d="M10 12h5M10 15.5h8" strokeWidth={1.5} />
      <path className="fill-paper" d="M2.5 21.5h27V23a2.5 2.5 0 0 1-2.5 2.5H5A2.5 2.5 0 0 1 2.5 23z" />
    </>
  ),
};

/** A small ink-outlined hobby icon. Decorative: the label next to it carries the meaning. */
export function HobbyIcon({ name }: { name: keyof typeof icons }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className="size-10 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {icons[name]}
    </svg>
  );
}
