import Image from "next/image";
import { Check } from "lucide-react";
import { ConsultationCta } from "./ConsultationCta";
import s from "./resources.module.css";

export function ResourcesBottomCTA() {
  return (
    <section className={s.bottom} aria-labelledby="bottom-title">
      <div className={`${s.wrap} ${s.bottomInner}`}>
        <div className={s.bottomCopy}>
          <p className={s.eyebrow}>DOWNLOAD → NEXT STEP</p>
          <h2 id="bottom-title">
            資料だけで終わらせず、
            <br />
            あなた専用の学習計画へ。
          </h2>
          <p>
            資料でENPATHの考え方を知っていただいたあとは、ぜひ無料カウンセリングで、あなたに合った学習プランを一緒に見つけましょう。
          </p>
        </div>
        <div className={s.bottomAction}>
          <div className={s.bottomButton}>
            <ConsultationCta placement="resources_bottom" />
          </div>
          <ul>
            {["あなたの目標に合わせた学習プランをご提案", "英語学習の悩みをプロのコーチに相談", "オンラインで気軽にご相談いただけます"].map((t) => (
              <li key={t}>
                <Check size={14} strokeWidth={1.8} aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className={s.bottomPhoto}>
          <Image
            src="/images/resources/woman.webp"
            alt="湯気の立つカップを手に、窓の外を穏やかに見つめる女性"
            width={1080}
            height={1337}
            sizes="(max-width: 767px) 60vw, 280px"
            quality={85}
          />
        </div>
      </div>
    </section>
  );
}
