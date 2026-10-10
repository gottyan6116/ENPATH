type EventName =
  | "hero_cta_click"
  | "hero_video_play"
  | "hero_chapter_select"
  | "service_section_view"
  | "roadmap_interaction"
  | "consultation_booking_click"
  | "textbook_page_link_click"
  | "textbook_guide_select";
declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}
export function track(
  event: EventName,
  fields: Record<string, string | number | boolean> = {},
) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...fields });
}
