import type { ReactNode } from "react";
import { JournalBooking } from "../JournalTracking";
import s from "./article.module.css";

/** `<Ref n="3" />` or `<Ref n="1,2" />` — superscript footnote marker linking to the reference list. */
export function Ref({ n }: { n: string }) {
  return (
    <sup className={s.refMark}>
      {n.split(",").map((value, index) => {
        const id = value.trim();
        return (
          <a key={id} href={`#ref-${id}`} id={index === 0 ? `refmark-${id}` : undefined} aria-label={`注釈${id}`}>
            [{id}]
          </a>
        );
      })}
    </sup>
  );
}

/**
 * `<Bars rows="30分:66:約5年6か月, 1時間:33:約2年9か月" head1="…" head2="…">note</Bars>`
 * A table whose bars are drawn in proportion to the numeric value (second field), so a longer
 * bar always means a larger number. The text columns carry the exact figures for readers and crawlers.
 */
export function Bars({
  rows,
  head1,
  head2,
  unit = "か月",
  children,
}: {
  rows: string;
  head1: string;
  head2: string;
  unit?: string;
  children?: ReactNode;
}) {
  const data = rows.split(",").map((row) => {
    const [label, value, text] = row.split(":").map((part) => part.trim());
    return { label, value: Number(value), text };
  });
  const max = Math.max(...data.map((row) => row.value));
  return (
    <figure className={s.bars}>
      <div className={s.tableScroll} tabIndex={0} role="region" aria-label="表（横にスクロールできます）">
        <table>
          <thead>
            <tr>
              <th scope="col">{head1}</th>
              <th scope="col">{head2}</th>
              <th scope="col">
                <span className="sr-only">期間の長さ（棒グラフ）</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.label}>
                <th scope="row">{row.label}</th>
                <td>
                  {row.text}
                  <span className={s.barInline} aria-hidden="true">
                    <span className={s.bar} style={{ width: `${(row.value / max) * 100}%` }} />
                  </span>
                </td>
                <td className={s.barCell} aria-hidden="true">
                  <span className={s.bar} style={{ width: `${(row.value / max) * 100}%` }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption>棒の長さは、必要な期間（{unit}換算）に比例しています。</figcaption>
      {children && <div className={s.barsNote}>{children}</div>}
    </figure>
  );
}

/** `<Faq>` with `<FaqItem q="…">answer</FaqItem>` children. Answers stay in the HTML even when closed. */
export function Faq({ children }: { children?: ReactNode }) {
  return <div className={s.faq}>{children}</div>;
}
export function FaqItem({ q, children }: { q: string; children?: ReactNode }) {
  return (
    <details className={s.faqItem}>
      <summary>
        <span className={s.faqQ} aria-hidden="true">
          Q
        </span>
        <span>{q}</span>
      </summary>
      <div className={s.faqA}>{children}</div>
    </details>
  );
}

/** `<References>` containing `<Reference n title publisher date href />` entries. */
export function References({ children }: { children?: ReactNode }) {
  return <ol className={s.refs}>{children}</ol>;
}
export function Reference({
  n,
  title,
  publisher,
  date,
  href,
}: {
  n: string;
  title: string;
  publisher: string;
  date?: string;
  href: string;
}) {
  return (
    <li id={`ref-${n}`} value={Number(n)}>
      <span className={s.refBody}>
        {publisher}「{title}」{date ? `（${date}）` : ""}
        <br />
        <a href={href} target="_blank" rel="noopener noreferrer">
          {href}
        </a>
      </span>
      <a className={s.refBack} href={`#refmark-${n}`} aria-label={`本文の注釈${n}へ戻る`}>
        ↩
      </a>
    </li>
  );
}

/** Closing call to action used inside an article body (replaces the template's default CTA). */
export function makeCta(fields: { slug: string; category: string; title: string }, preview: boolean) {
  return function Cta({ title, children }: { title: string; children?: ReactNode }) {
    return (
      <section className={s.endCta} aria-labelledby="end-cta-title">
        <h2 id="end-cta-title" data-skip-toc="">
          {title}
        </h2>
        <div className={s.endCtaBody}>{children}</div>
        <JournalBooking preview={preview} fields={fields} />
      </section>
    );
  };
}
