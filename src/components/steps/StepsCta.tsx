"use client";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { bookingUrl } from "@/lib/config";
import { track } from "@/lib/analytics";

/** Booking CTA with a custom label. Same destination and tracking as BookingLink. */
export function StepsCta({ label, placement, className }: { label: string; placement: string; className?: string }) {
  return (
    <a
      className={className}
      href={bookingUrl ?? "/#consultation"}
      target={bookingUrl ? "_blank" : undefined}
      rel={bookingUrl ? "noopener noreferrer" : undefined}
      onClick={() => {
        if (bookingUrl) track("consultation_booking_click", { placement });
      }}
    >
      {label}
      {bookingUrl ? <ArrowUpRight size={19} aria-hidden="true" /> : <ArrowRight size={19} aria-hidden="true" />}
    </a>
  );
}
