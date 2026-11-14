import type { ReactNode } from "react";

/**
 * Sets one short phrase of a heading in the script face (client request,
 * 2026-11-14: "a little cursive, not too much"). Use sparingly: one phrase,
 * in a handful of headings, never body text or the LCP cover line.
 * The phrase must appear verbatim in the text; otherwise the text renders
 * unchanged.
 */
export function withAccent(text: string, phrase?: string): ReactNode {
  if (!phrase) return text;
  const at = text.indexOf(phrase);
  if (at < 0) return text;
  return (
    <>
      {text.slice(0, at)}
      <span className="font-script">{phrase}</span>
      {text.slice(at + phrase.length)}
    </>
  );
}
