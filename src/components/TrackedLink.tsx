"use client";
import Link from "next/link";
import type { ReactNode } from "react";
import { track } from "@/lib/analytics";

export function TrackedLink({
  href,
  placement,
  className,
  children,
}: {
  href: string;
  placement: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => track("textbook_page_link_click", { placement })}
    >
      {children}
    </Link>
  );
}
