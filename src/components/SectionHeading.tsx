import type { ReactNode } from "react";
export function SectionHeading({
  label,
  children,
  description,
}: {
  label: string;
  children: ReactNode;
  description?: string;
}) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{label}</p>
      <h2>{children}</h2>
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}
