import Image from "next/image";
import { CalendarCheck, Flag, RefreshCw } from "lucide-react";
import { shortcuts } from "@/content/resources";
import s from "./resources.module.css";

const icons = { calendar: CalendarCheck, refresh: RefreshCw, flag: Flag } as const;

export function ResourcesHero() {
  return (
    <section className={s.hero} aria-labelledby="resources-title">
      <div className={s.heroPhoto}>
        <Image
          src="/images/resources/hero.webp"
          alt="木のテーブルに斜めに並べられた、4冊のENPATH学習ガイド"
          width={734}
          height={318}
          priority
          sizes="(max-width: 767px) 100vw, 62vw"
          quality={90}
        />
      </div>
      <div className={s.heroInner}>
        <div className={s.heroCopy}>
          <h1 id="resources-title">
            学びを支える、
            <br />
            小さなガイドを。
          </h1>
          <p>
            英語学習をはじめるとき、つまずいたとき、
            <br />
            もう一度前を向きたいときに。
            <br />
            ENPATHがこれまでのコーチングで培った知見をもとに、
            <br />
            あなたの学びを支える資料をご用意しました。
          </p>
        </div>
        <ul className={s.shortcuts} aria-label="目的から資料を探す">
          {shortcuts.map(({ icon, title, sub, target }) => {
            const Icon = icons[icon];
            return (
              <li key={target}>
                <a href={`#res-${target}`}>
                  <span className={s.shortcutIcon}>
                    <Icon size={22} strokeWidth={1.4} aria-hidden="true" />
                  </span>
                  <span>
                    <strong>{title}</strong>
                    <small>{sub}</small>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
