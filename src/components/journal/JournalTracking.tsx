"use client";
import Link from "next/link";
import { useEffect, useRef, type ReactNode } from "react";
import { track } from "@/lib/analytics";
import { BookingLink } from "@/components/BookingLink";
type Fields = { slug: string; category: string; title: string };
export function JournalLink({
  href,
  event,
  fields,
  preview,
  children,
  className,
  current,
}: {
  href: string;
  event?: "journal_category_select" | "journal_related_article_click";
  fields: Fields;
  preview?: boolean;
  children: ReactNode;
  className?: string;
  current?: boolean;
}) {
  return (
    <Link
      href={href}
      className={className}
      aria-current={current ? "page" : undefined}
      onClick={() => {
        if (event && !preview) track(event, fields);
      }}
    >
      {children}
    </Link>
  );
}
export function ArticleTracking({
  fields,
  preview,
}: {
  fields: Fields;
  preview: boolean;
}) {
  const viewed = useRef<string | null>(null);
  useEffect(() => {
    if (!preview && viewed.current !== fields.slug) {
      viewed.current = fields.slug;
      track("journal_article_view", fields);
    }
  }, [fields, preview]);
  return null;
}
export function JournalBooking({
  fields,
  preview,
}: {
  fields: Fields;
  preview: boolean;
}) {
  return (
    <div
      onClickCapture={(event) => {
        if (
          !preview &&
          event.target instanceof Element &&
          event.target.closest("a")
        )
          track("journal_cta_click", fields);
      }}
    >
      <BookingLink placement="journal" />
    </div>
  );
}
