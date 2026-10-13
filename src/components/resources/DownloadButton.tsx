"use client";
import { ArrowRight } from "lucide-react";
import { track } from "@/lib/analytics";
import type { Resource } from "@/content/resources";
import { OPEN_EVENT, type OpenDetail } from "./ResourceDownloadDialog";
import s from "./resources.module.css";

export function DownloadButton({
  resource,
  placement,
  variant = "outline",
  label = "ダウンロードする",
}: {
  resource: Pick<Resource, "id" | "title" | "pdf" | "category">;
  placement: "featured" | "card";
  variant?: "solid" | "outline";
  label?: string;
}) {
  return (
    <button
      type="button"
      className={`${s.dl} ${variant === "solid" ? s.dlSolid : s.dlOutline}`}
      onClick={() => {
        track("resource_card_click", { resource_id: resource.id, resource_category: resource.category, placement });
        window.dispatchEvent(
          new CustomEvent<OpenDetail>(OPEN_EVENT, {
            detail: { id: resource.id, title: resource.title, pdf: resource.pdf },
          }),
        );
      }}
    >
      {label}
      <ArrowRight size={16} aria-hidden="true" />
    </button>
  );
}
