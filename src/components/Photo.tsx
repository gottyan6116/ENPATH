import Image from "next/image";
import { service } from "@/content/site";
import type { CSSProperties } from "react";

export type PhotoKind = keyof typeof service.photos;
const crops = {
  listening: { x: 730, y: 93, width: 806, height: 494 },
  planning: { x: 487, y: 707, width: 262, height: 93 },
  online: { x: 788, y: 707, width: 265, height: 93 },
  future: { x: 1101, y: 707, width: 265, height: 93 },
};
export function Photo({
  kind = "listening",
  className = "",
  priority = false,
  decorative = true,
  thumbnail = false,
}: {
  kind?: PhotoKind;
  className?: string;
  priority?: boolean;
  decorative?: boolean;
  thumbnail?: boolean;
}) {
  const real = service.photos[kind];
  const crop =
    thumbnail && kind === "listening"
      ? { x: 170, y: 707, width: 265, height: 93 }
      : crops[kind];
  const alt = decorative
    ? ""
    : kind === "planning"
      ? "学習スケジュールを相談する場面のAI生成イメージ。実際のサービス画面ではありません。"
      : kind === "online"
        ? "オンラインで英語学習を相談する人物のAI生成イメージ。実際の担当コーチではありません。"
        : "英語学習を相談する人物のイメージ。実際の担当コーチではありません。";
  return (
    <div
      className={`photo ${real ? "photo-original" : "photo-reference"} ${className}`}
      style={
        { "--photo-ratio": `${crop.width}/${crop.height}` } as CSSProperties
      }
    >
      {real ? (
        <Image
          src={real}
          alt={alt}
          fill
          sizes={
            thumbnail
              ? "(max-width: 700px) 33vw, 25vw"
              : "(max-width: 700px) 100vw, 70vw"
          }
          priority={priority}
          loading={priority ? "eager" : "lazy"}
        />
      ) : (
        <Image
          src="/hero-reference.png"
          alt={alt}
          width={1536}
          height={1024}
          sizes="(max-width: 700px) 150vw, 140vw"
          priority={priority}
          loading="eager"
          style={{
            width: `${(1536 / crop.width) * 100}%`,
            height: `${(1024 / crop.height) * 100}%`,
            left: `${(-crop.x / crop.width) * 100}%`,
            top: `${(-crop.y / crop.height) * 100}%`,
          }}
        />
      )}
    </div>
  );
}
