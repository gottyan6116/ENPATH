"use client";
import { useEffect, useRef, useState } from "react";
import type { TocItem } from "@/lib/journalToc";
import s from "./article.module.css";

/** Highlights the section being read: the last heading that has passed the top offset. */
function useActiveId(items: TocItem[]) {
  const [active, setActive] = useState(items[0]?.id ?? "");
  // A clicked item stays current until the reader scrolls by hand (short pages can't reach the top offset).
  const locked = useRef<string | null>(null);
  useEffect(() => {
    if (!items.length) return;
    let raf = 0;
    const unlock = () => {
      locked.current = null;
    };
    const update = () => {
      raf = 0;
      if (locked.current) return setActive(locked.current);
      let current = items[0].id;
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= 140) current = item.id;
      }
      // At the very bottom the last section can never reach the top offset; treat it as current.
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      setActive(atBottom && window.scrollY > 0 ? items[items.length - 1].id : current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    for (const type of ["wheel", "touchmove", "keydown"] as const)
      window.addEventListener(type, unlock, { passive: true });
    return () => {
      for (const type of ["wheel", "touchmove", "keydown"] as const)
        window.removeEventListener(type, unlock);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [items]);
  const pick = (id: string) => {
    locked.current = id;
    setActive(id);
  };
  return [active, pick] as const;
}

function List({ items, active, onPick }: { items: TocItem[]; active: string; onPick: (id: string) => void }) {
  // Keep the list short: every H2 is shown, H3s only under the section being read.
  const parentOf = new Map<string, string>();
  let parent = "";
  for (const item of items) {
    if (item.level === 2) parent = item.id;
    parentOf.set(item.id, parent);
  }
  const openParent = parentOf.get(active);
  const visible = items.filter((item) => item.level === 2 || parentOf.get(item.id) === openParent);
  return (
    <ol className={s.tocList}>
      {visible.map((item) => (
        <li key={item.id} data-level={item.level}>
          <a
            href={`#${item.id}`}
            aria-current={item.id === active ? "location" : undefined}
            onClick={(e) => {
              const el = document.getElementById(item.id);
              if (!el) return;
              e.preventDefault();
              const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
              el.scrollIntoView({ behavior: still ? "auto" : "smooth", block: "start" });
              window.history.replaceState(null, "", `#${item.id}`);
              onPick(item.id);
            }}
          >
            {item.text}
          </a>
        </li>
      ))}
    </ol>
  );
}

/** `sidebar`: always-open, sticky on desktop. `inline`: collapsible, for phones/tablets. */
export function ArticleToc({ items, variant }: { items: TocItem[]; variant: "sidebar" | "inline" }) {
  const [active, setActive] = useActiveId(items);
  const box = useRef<HTMLElement>(null);
  // Keep the current item visible inside the (scrollable) sidebar list without moving the page.
  useEffect(() => {
    const nav = box.current;
    const link = nav?.querySelector<HTMLElement>('a[aria-current="location"]');
    if (!nav || !link) return;
    const top = link.offsetTop;
    if (top < nav.scrollTop + 40) nav.scrollTop = Math.max(0, top - 40);
    else if (top + link.offsetHeight > nav.scrollTop + nav.clientHeight - 24)
      nav.scrollTop = top + link.offsetHeight - nav.clientHeight + 24;
  }, [active]);
  if (items.length < 2) return null;
  if (variant === "inline")
    return (
      <details className={s.tocInline}>
        <summary>目次</summary>
        <List items={items} active={active} onPick={setActive} />
      </details>
    );
  return (
    <nav ref={box} className={s.tocSide} aria-label="目次">
      <p className={s.sideLabel}>目次</p>
      <List items={items} active={active} onPick={setActive} />
    </nav>
  );
}
