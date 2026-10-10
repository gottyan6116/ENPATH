"use client";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { bookingUrl } from "@/lib/config";
import { track } from "@/lib/analytics";

export function BookingLink({
  hero = false,
  compact = false,
  light = false,
  final = false,
}: {
  hero?: boolean;
  compact?: boolean;
  light?: boolean;
  final?: boolean;
}) {
  if (final && !bookingUrl)
    return (
      <div className="booking-unavailable" role="status">
        <span className="status-dot" />
        無料カウンセリングの予約受付は準備中です
      </div>
    );
  return (
    <a
      className={`button ${compact ? "button-small" : ""} ${light ? "button-light" : ""}`}
      href={bookingUrl ?? "#consultation"}
      target={bookingUrl ? "_blank" : undefined}
      rel={bookingUrl ? "noopener noreferrer" : undefined}
      onClick={() => {
        if (hero) track("hero_cta_click", { connected: Boolean(bookingUrl) });
        if (bookingUrl)
          track("consultation_booking_click", {
            placement: hero ? "hero" : final ? "consultation" : "page",
          });
      }}
    >
      無料カウンセリングを予約する
      {bookingUrl ? <ArrowUpRight size={19} /> : <ArrowRight size={19} />}
    </a>
  );
}
