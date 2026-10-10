"use client";
import { useEffect } from "react";
import { track } from "@/lib/analytics";
export function ServiceObserver() {
  useEffect(() => {
    const node = document.getElementById("about");
    if (!node || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          track("service_section_view");
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return null;
}
