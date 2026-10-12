import Image from "next/image";
import { Children, isValidElement, type ComponentProps, type ReactNode } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { headingId, textOf } from "@/lib/journalToc";
import { Bars, Faq, FaqItem, Ref, Reference, References, makeCta } from "./ArticleParts";
import s from "./article.module.css";

/** `<Note>` / `<Note type="caution">` — supplementary or cautionary remark inside an article. */
function Note({ type = "info", children }: { type?: "info" | "caution"; children?: ReactNode }) {
  return (
    <aside className={`${s.note} ${type === "caution" ? s.caution : ""}`} role="note">
      <strong>{type === "caution" ? "ご注意" : "補足"}</strong>
      <div>{children}</div>
    </aside>
  );
}

type Heading = ComponentProps<"h2">;
const h2 = ({ children, ...rest }: Heading) => (
  <h2 {...rest} id={headingId(textOf(children))}>
    {children}
  </h2>
);
const h3 = ({ children, ...rest }: Heading) => (
  <h3 {...rest} id={headingId(textOf(children))}>
    {children}
  </h3>
);

function Img({ src, alt, title }: ComponentProps<"img">) {
  const local = typeof src === "string" && src.startsWith("/");
  return (
    <figure className={s.figure}>
      {local ? (
        <Image
          src={src}
          alt={alt ?? ""}
          width={1280}
          height={720}
          sizes="(max-width: 1000px) 100vw, 760px"
        />
      ) : null}
      {title && <figcaption>{title}</figcaption>}
    </figure>
  );
}

/** Renders the MDX body with the shared article typography. Server-side, no client JS. */
export function ArticleBody({
  source,
  fields,
  preview,
}: {
  source: string;
  fields: { slug: string; category: string; title: string };
  preview: boolean;
}) {
  const Cta = makeCta(fields, preview);
  return (
    <div className={s.prose}>
      <MDXRemote
        source={source}
        options={{ blockJS: true, mdxOptions: { remarkPlugins: [remarkGfm] } }}
        components={{
          h1: h2,
          h2,
          h3,
          Note,
          Ref,
          Bars,
          Faq,
          FaqItem,
          References,
          Reference,
          Cta,
          img: Img,
          // A paragraph that only wraps an image must not be a <p> (a <figure> cannot live inside it).
          p: ({ children, ...rest }) => {
            const only = Children.toArray(children);
            if (only.length === 1 && isValidElement(only[0]) && only[0].type === Img)
              return <>{only[0]}</>;
            return <p {...rest}>{children}</p>;
          },
          table: (props) => (
            <div className={s.tableScroll} tabIndex={0} role="region" aria-label="表（横にスクロールできます）">
              <table {...props} />
            </div>
          ),
          a: (props) => {
            const external = props.href?.startsWith("https://");
            return (
              <a
                {...props}
                {...(external ? { rel: "noopener noreferrer", target: "_blank" } : {})}
              />
            );
          },
        }}
      />
    </div>
  );
}
