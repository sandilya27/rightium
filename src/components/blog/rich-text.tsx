import {
  type JSXConvertersFunction,
  LinkJSXConverter,
  RichText as PayloadRichText,
} from "@payloadcms/richtext-lexical/react";
import type { Post } from "@/lib/post";

/**
 * Renders an article body from the CMS with the site's reading
 * typography. Each Lexical node type maps to the same markup the
 * hand-written articles used.
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
      <h3 className="font-display mt-10 text-[1.3rem] leading-snug tracking-[-0.015em] text-balance md:text-[1.45rem]">
        {children}
      </h3>
    ) : (
      <h2 className="font-display mt-14 text-[1.65rem] leading-tight tracking-[-0.02em] text-balance md:text-[2rem]">
        {children}
      </h2>
    );
  },
  paragraph: ({ node, nodesToJSX }) => (
    <p className="text-[1.0625rem] leading-[1.72] text-ink-2 text-pretty">
      {nodesToJSX({ nodes: node.children })}
    </p>
  ),
  list: ({ node, nodesToJSX }) => {
    const children = nodesToJSX({ nodes: node.children });
    return node.tag === "ol" ? (
      <ol className="list-decimal space-y-3 pl-6 marker:text-accent">{children}</ol>
    ) : (
      <ul className="space-y-3 border-l border-[var(--accent-line)] pl-6">{children}</ul>
    );
  },
  listitem: ({ node, nodesToJSX }) => (
    <li className="text-[1.0625rem] leading-[1.7] text-ink-2">
      {nodesToJSX({ nodes: node.children })}
    </li>
  ),
  quote: ({ node, nodesToJSX }) => (
    <blockquote className="my-10 border-l-2 border-accent pl-6">
      <p className="font-display text-[1.45rem] leading-[1.4] tracking-[-0.015em] text-balance text-ink md:text-[1.7rem]">
        {nodesToJSX({ nodes: node.children })}
      </p>
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
          className="w-full rounded-card border border-[var(--line)]"
        />
        {alt && <figcaption className="mt-3 text-[0.8125rem] text-ink-3">{alt}</figcaption>}
      </figure>
    );
  },
});

export function RichText({ content }: { content: NonNullable<Post["content"]> }) {
  return (
    <PayloadRichText
      data={content}
      converters={converters}
      className="space-y-7 [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-4"
    />
  );
}
