"use client";
import Image from "next/image";
import { useId, useState } from "react";
import { guides } from "@/content/textbooks";
import { track } from "@/lib/analytics";

export function TextbookGuide() {
  const [active, setActive] = useState(0);
  const uid = useId();
  const g = guides[active];
  const select = (i: number) => {
    setActive(i);
    track("textbook_guide_select", { guide: guides[i].id });
  };
  return (
    <div className="guide">
      <div className="guide-tabs" role="tablist" aria-label="学習の目的を選ぶ">
        {guides.map((x, i) => (
          <button
            key={x.id}
            id={`${uid}-tab-${i}`}
            role="tab"
            type="button"
            aria-selected={i === active}
            aria-controls={`${uid}-panel`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => select(i)}
            onKeyDown={(e) => {
              if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
              e.preventDefault();
              const n =
                (i + (e.key === "ArrowRight" ? 1 : guides.length - 1)) %
                guides.length;
              select(n);
              document.getElementById(`${uid}-tab-${n}`)?.focus();
            }}
          >
            {x.label}
          </button>
        ))}
      </div>
      <div
        id={`${uid}-panel`}
        role="tabpanel"
        aria-labelledby={`${uid}-tab-${active}`}
        className="guide-panel"
      >
        <header className="guide-head">
          <p className="guide-goal">{g.goal}</p>
          <p className="guide-level">想定レベル：{g.level}</p>
        </header>
        <div className="guide-grid">
          <div>
            <h3 className="guide-sub">選定する教材の例</h3>
            <ul className="guide-books">
              {g.books.map(({ book, role }) => (
                <li key={book.id}>
                  <Image
                    src={book.src}
                    width={book.w}
                    height={book.h}
                    alt={book.title}
                    sizes="84px"
                  />
                  <div>
                    <strong>{book.title}</strong>
                    <span>{role}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="guide-sub">いつ・どこで・どう進めるか</h3>
            <ol className="guide-steps">
              {g.steps.map((s) => (
                <li key={s.when}>
                  <span className="guide-when">{s.when}</span>
                  <strong>{s.where}</strong>
                  <p>{s.how}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <p className="guide-note">{g.note}</p>
      </div>
    </div>
  );
}
