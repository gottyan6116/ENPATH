import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { BookingLink } from "./BookingLink";

const scenes = [
  { label: "キャリアに", src: "/images/home-mobile/scene-career.webp", w: 420, h: 270, alt: "朝日に輝く都市の高層ビル群" },
  { label: "海外生活に", src: "/images/home-mobile/scene-abroad.webp", w: 420, h: 272, alt: "青空を飛ぶ旅客機" },
  { label: "日常会話に", src: "/images/home-mobile/scene-daily.webp", w: 420, h: 240, alt: "笑顔で会話する二人の女性" },
  { label: "やり直しに", src: "/images/home-mobile/scene-restart.webp", w: 420, h: 330, alt: "ノートとペンとコーヒーのある学習机" },
] as const;

/**
 * Phones only (shown by CSS at <=760px, hidden on desktop). The desktop hero is untouched.
 * Images are lazy + high fetch priority so desktop (display:none) never downloads them.
 */
export function MobileHero() {
  return (
    <section className="mfv" aria-labelledby="mfv-title">
      <div className="mfv-visual">
        <Image className="mfv-london" src="/images/home-mobile/london.webp" alt="" width={1000} height={679} sizes="90vw" fetchPriority="low" />
        <Image className="mfv-woman" src="/images/home-mobile/woman.webp" alt="ノートパソコンを抱え、前を向いて微笑むビジネスウーマン" width={790} height={1371} sizes="(max-width: 760px) 70vw, 0px" quality={82} fetchPriority="high" />
        <Image className="mfv-hand" src="/images/home-mobile/handwriting.webp" alt="英語で、行ける場所がもっと広がる。" width={900} height={517} sizes="60vw" fetchPriority="high" />
      </div>
      <div className="mfv-body">
        <p className="mfv-label">YOUR ENGLISH. YOUR PATH.</p>
        <h1 id="mfv-title" className="mfv-title">
          学びが変わると、
          <br />
          未来が動き出す。
        </h1>
        <p className="mfv-text">
          一人ひとりの目標に合わせた学習計画と、
          <br />
          コーチによる継続サポートで、
          <br />
          あなたの英語の可能性を広げます。
        </p>
        <div className="mfv-cta">
          <BookingLink hero placement="hero_mobile" />
        </div>
        <a className="mfv-more" href="#about">
          ENPATHについて詳しく見る
          <ArrowRight size={16} aria-hidden="true" />
        </a>
      </div>
      <ul className="mfv-scenes">
        {scenes.map((s) => (
          <li key={s.label}>
            <Image src={s.src} alt={s.alt} width={s.w} height={s.h} sizes="25vw" />
            <span>{s.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
