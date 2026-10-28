type Heading = { id: string; text: string };

function ContentsLinks({ headings }: { headings: Heading[] }) {
  return (
    <ol className="mt-4 flex list-none flex-col gap-2.5 border-l border-line-strong p-0">
      {headings.map(heading => (
        <li key={heading.id}>
          <a href={`#${heading.id}`} className="-ml-px block border-l-2 border-transparent py-0.5 pl-3.5 text-ink-2 transition-[color,border-color] duration-200 hover:border-accent hover:text-ink-heading">
            {heading.text}
          </a>
        </li>
      ))}
    </ol>
  );
}

/** Keep long case-study contents available without burying the mobile article. */
export function ArticleContents({ headings }: { headings: Heading[] }) {
  return (
    <>
      <details className="lg:hidden">
        <summary className="eyebrow cursor-pointer py-3 text-xs">In this article</summary>
        <nav aria-label="Article contents"><ContentsLinks headings={headings} /></nav>
      </details>
      <nav aria-label="Article contents" className="hidden lg:block">
        <p className="eyebrow m-0 text-xs">In this article</p>
        <ContentsLinks headings={headings} />
      </nav>
    </>
  );
}
