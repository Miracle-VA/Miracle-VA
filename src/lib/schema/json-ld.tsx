/**
 * Renders JSON-LD safely. `<` is escaped so content can never close the
 * script tag early (build-system/03, SEO: typed helper in lib/schema).
 */
export interface JsonLdProps {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
}

export function JsonLd({ data }: JsonLdProps) {
  const graph = Array.isArray(data) ? { "@context": "https://schema.org", "@graph": data } : data;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }}
    />
  );
}
