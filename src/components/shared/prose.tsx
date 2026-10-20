import { siteProseClassName, siteListItemClassName } from "./prose-styles";
import { Fragment } from "react";
import {
  readingHeadingClassName,
  readingProseClassName,
  readingQuoteClassName,
} from "./reading-surface";

/** Render the limited Markdown subset in seeded copy as text and semantic elements, never injected HTML. */
export function Prose({
  body,
  className = "",
  reading = false,
}: {
  body: string;
  className?: string;
  reading?: boolean;
}) {
  const blocks = body
    .split(/\n\s*\n/)
    .map((text) => text.trim())
    .filter(Boolean);
  return (
    <div
      className={`${siteProseClassName} ${reading ? readingProseClassName : ""} ${className}`}
    >
      {blocks.map((text, index) => {
        if (text.startsWith("#### "))
          return <h4 key={index}>{text.slice(5)}</h4>;
        if (text.startsWith("### "))
          return (
            <h3 className={reading ? readingHeadingClassName : ""} key={index}>
              {text.slice(4)}
            </h3>
          );
        if (text.startsWith("## "))
          return (
            <h2 className={reading ? readingHeadingClassName : ""} key={index}>
              {text.slice(3)}
            </h2>
          );
        if (text.startsWith("# "))
          return (
            <h2 className={reading ? readingHeadingClassName : ""} key={index}>
              {text.slice(2)}
            </h2>
          );
        if (text.startsWith("- "))
          return (
            <p
              key={index}
              className={
                reading
                  ? `${siteListItemClassName} ps-[1.35rem]! before:text-[#217f77]!`
                  : siteListItemClassName
              }
            >
              {text.slice(2)}
            </p>
          );
        if (text.startsWith("> "))
          return (
            <blockquote
              className={reading ? readingQuoteClassName : ""}
              key={index}
            >
              {text.slice(2)}
            </blockquote>
          );
        return (
          <p key={index}>
            {text.split("\n").map((line, part) => (
              <Fragment key={part}>
                {part > 0 && <br />}
                {line}
              </Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}
