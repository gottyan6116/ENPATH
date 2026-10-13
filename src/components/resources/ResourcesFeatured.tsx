import Image from "next/image";
import { Check } from "lucide-react";
import { featured } from "@/content/resources";
import { DownloadButton } from "./DownloadButton";
import s from "./resources.module.css";

export function ResourcesFeatured() {
  const f = featured;
  return (
    <section className={s.featured} aria-labelledby="featured-title">
      <div className={s.wrap}>
        <div className={s.featuredPanel}>
          <span className={s.ribbon}>PICK UP</span>
          <div className={s.featuredBook}>
            <Image
              src={f.cover.src}
              alt={f.cover.alt}
              width={f.cover.w}
              height={f.cover.h}
              sizes="(max-width: 767px) 60vw, 260px"
              quality={88}
            />
          </div>
          <div className={s.featuredBody}>
            <p className={s.kicker}>{f.kicker}</p>
            <h2 id="featured-title">{f.title}</h2>
            <p>{f.description}</p>
            <DownloadButton resource={f} placement="featured" variant="solid" />
          </div>
          <ul className={s.featuredTags} aria-label="掲載内容">
            {f.tags.map((t) => (
              <li key={t}>
                <Check size={16} strokeWidth={1.6} aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
