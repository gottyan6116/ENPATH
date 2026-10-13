"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { track } from "@/lib/analytics";
import { fallbackSlides } from "@/content/journalHero";
import s from "./journalHero.module.css";

export type HeroSlide = {
  slug: string;
  href: string;
  title: string;
  category: string;
  categoryLabel: string;
  description: string;
  coverImage: string;
};

const pad = (n: number) => String(n).padStart(2, "0");

/** Stacked stories (grid overlap) so the active one can be animated in place. */
export function FeaturedStory({
  slides,
  active,
  preview,
}: {
  slides: HeroSlide[];
  active: number;
  preview: boolean;
}) {
  return (
    <div className={s.stories} aria-live="polite">
      {Array.from({ length: Math.max(slides.length, fallbackSlides.length) }, (_, i) => {
        const x = slides[i];
        if (!x) {
          const f = fallbackSlides[i % fallbackSlides.length];
          return (
            <div
              key={f.key}
              className={s.story}
              data-story
              style={i === 0 ? undefined : { visibility: "hidden" }}
              aria-hidden={i !== active}
            >
              <p className={`${s.storyLabel} sr-only`} data-in>
                {f.label}
              </p>
              <h2 data-in>
                {f.lines[0]}
                <br />
                {f.lines[1]}
              </h2>
              <p className={s.soon} data-in>
                COMING SOON — 読みものを準備しています
              </p>
            </div>
          );
        }
        return (
        <div
          key={x.slug}
          className={s.story}
          data-story
          style={i === 0 ? undefined : { visibility: "hidden" }}
          aria-hidden={i !== active}
        >
          <p className={`${s.storyLabel} sr-only`} data-in>
            FEATURED STORY / {pad(i + 1)}
            <span>{x.categoryLabel}</span>
          </p>
          <h2 data-in>{x.title}</h2>
          <Link
            href={x.href}
            className={s.read}
            tabIndex={i === active ? 0 : -1}
            data-in
            onClick={() => {
              if (!preview)
                track("journal_category_select", {
                  slug: x.slug,
                  category: x.category,
                  title: x.title,
                });
            }}
          >
            記事を読む <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
        );
      })}
    </div>
  );
}
