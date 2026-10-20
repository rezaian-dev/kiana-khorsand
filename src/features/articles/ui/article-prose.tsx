import { siteProseClassName } from "@/components/shared/prose-styles";
import Markdown from "react-markdown";
import {
  readingHeadingClassName,
  readingProseClassName,
  readingQuoteClassName,
} from "@/components/shared/reading-surface";

/** Markdown text is escaped by default: no raw HTML, scripts or remote images. */
export function ArticleProse({ body }: { body: string }) {
  return (
    <div
      className={`${siteProseClassName} article-prose ${readingProseClassName}`}
      dir="rtl"
    >
      <Markdown
        skipHtml
        disallowedElements={["img"]}
        components={{
          h2: ({ children }) => (
            <h2 className={readingHeadingClassName}>{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className={readingHeadingClassName}>{children}</h3>
          ),
          blockquote: ({ children }) => (
            <blockquote className={readingQuoteClassName}>
              {children}
            </blockquote>
          ),
          ul: ({ children }) => (
            <ul className="my-4 grid list-disc gap-[.35rem] ps-[1.4rem]">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="my-4 grid list-decimal gap-[.35rem] ps-[1.4rem]">
              {children}
            </ol>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              rel="nofollow noopener noreferrer"
              target="_blank"
              className="text-[#176d69] underline underline-offset-[3px] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#398f84] dark:text-[#a0dfd2]"
            >
              {children}
            </a>
          ),
        }}
      >
        {body}
      </Markdown>
    </div>
  );
}
