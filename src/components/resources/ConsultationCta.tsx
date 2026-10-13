"use client";
import { BookingLink } from "@/components/BookingLink";
import { track } from "@/lib/analytics";

/** The existing booking link, plus the resource_consultation_click event (no personal data). */
export function ConsultationCta({ placement }: { placement: string }) {
  return (
    <div
      onClickCapture={(e) => {
        if (e.target instanceof Element && e.target.closest("a")) track("resource_consultation_click", { placement });
      }}
    >
      <BookingLink placement={placement} />
    </div>
  );
}
