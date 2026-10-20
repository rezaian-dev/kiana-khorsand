type JsonLd = Record<string, unknown>;

/** Server-rendered, inert structured data; escape HTML tag openings from editorial copy. */
export function StructuredData({ data }: { data: JsonLd }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
