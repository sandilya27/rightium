import {
  type JSXConvertersFunction,
  LinkJSXConverter,
  RichText as PayloadRichText,
} from "@payloadcms/richtext-lexical/react";
import type { Post } from "@/lib/post";

type LexicalNode = {
  type?: string;
  tag?: string;
  text?: string;
  children?: LexicalNode[];
};

/** Flattened text of a node and everything under it. */
function nodeText(node: LexicalNode): string {
  if (typeof node.text === "string") return node.text;
  return (node.children ?? []).map(nodeText).join("");
}

export function slugifyHeading(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * The article's h2s, for the in-page contents rail. Read straight off
 * the Lexical tree so the rail and the rendered headings are generated
 * from the same source and the anchors cannot drift apart.
 */
export function extractHeadings(content: NonNullable<Post["content"]>) {
  const root = content as unknown as { root?: LexicalNode };
  return (root.root?.children ?? [])
    .filter((n) => n.type === "heading" && n.tag === "h2")
    .map((n) => {
      const text = nodeText(n);
      return { id: slugifyHeading(text), text };
    })
    .filter((h) => h.id.length > 0);
}

/**
 * Renders an article body from the CMS with the site's reading
 * typography: Plex at 17.5px over a 1.75 leading, serif for headings
 * and pull quotes. Lists use a short teal rule instead of a bullet —
 * the same mark the rest of the site uses for an item in a set.
 */
const converters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({
    internalDocToHref: ({ linkNode }) => {
      const doc = linkNode.fields.doc?.value;
      return typeof doc === "object" && doc && "slug" in doc ? `/blog/${doc.slug}` : "/";
    },
  }),
  heading: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children });
    return node.tag === "h3" ? (
      <h3 className="font-serif mt-10 mb-3 text-[1.5rem] leading-[1.25] text-ink-heading balance">
        {children}
      </h3>
    ) : (
      <h2
        id={slugifyHeading(nodeText(node as LexicalNode))}
        className="font-serif mt-11 mb-4.5 scroll-mt-[calc(var(--nav-h)+2rem)] text-[1.875rem] leading-[1.2] tracking-[-0.01em] text-ink-heading balance"
      >
        {children}
      </h2>
    );
  },
  paragraph: ({ node, nodesToJSX }) => (
    <p className="mb-6.5 text-pretty">{nodesToJSX({ nodes: node.children })}</p>
  ),
  list: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children });
    return node.tag === "ol" ? (
      <ol className="mb-6.5 flex list-decimal flex-col gap-3 pl-6 marker:text-accent">
        {children}
      </ol>
    ) : (
      // A short teal rule instead of a bullet, drawn per item so the
      // list-item converter does not need to know its parent tag.
      <ul className="mb-6.5 flex list-none flex-col gap-3 p-0 [&>li]:relative [&>li]:pl-[1.625rem] [&>li]:before:absolute [&>li]:before:top-[15px] [&>li]:before:left-0 [&>li]:before:h-px [&>li]:before:w-3.5 [&>li]:before:bg-accent [&>li]:before:content-['']">
        {children}
      </ul>
    );
  },
  listitem: ({ node, nodesToJSX }) => <li>{nodesToJSX({ nodes: node.children })}</li>,
  quote: ({ node, nodesToJSX }) => (
    <blockquote className="font-serif my-9 border-l-2 border-accent py-2 pl-7 text-[1.625rem] leading-[1.3] italic text-ink-heading">
      {nodesToJSX({ nodes: node.children })}
    </blockquote>
  ),
  upload: ({ node }) => {
    const media = node.value;
    if (!media || typeof media !== "object" || !("url" in media) || !media.url) return null;
    const { url, alt, width, height } = media as {
      url: string;
      alt?: string;
      width?: number;
      height?: number;
    };
    return (
      <figure className="my-10">
        {/* Served from R2 through Payload; next/image would re-proxy it. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={url}
          alt={alt ?? ""}
          width={width}
          height={height}
          loading="lazy"
          className="w-full border border-line"
        />
        {alt && (
          <figcaption className="mt-3 text-[0.8125rem] text-ink-2">{alt}</figcaption>
        )}
      </figure>
    );
  },
});

export function RichText({ content }: { content: NonNullable<Post["content"]> }) {
  return (
    <PayloadRichText
      data={content}
      converters={converters}
      className="text-[1.09375rem] leading-[1.75] text-ink-body [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-4"
    />
  );
}
