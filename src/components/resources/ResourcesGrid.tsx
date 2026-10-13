import Image from "next/image";
import { resources, type Resource } from "@/content/resources";
import { JournalReveal } from "@/components/journal/JournalReveal";
import { DownloadButton } from "./DownloadButton";
import s from "./resources.module.css";

function ResourceCard({ r }: { r: Resource }) {
  return (
    <article id={`res-${r.id}`} className={s.card} aria-labelledby={`title-${r.id}`}>
      <div className={s.cardImage}>
        <Image
          src={r.cover.src}
          alt={r.cover.alt}
          width={r.cover.w}
          height={r.cover.h}
          sizes="(max-width: 767px) 40vw, 160px"
          quality={85}
        />
      </div>
      <div className={s.cardBody}>
        <p className={s.cardCat}>{r.categoryLabel}</p>
        <h3 id={`title-${r.id}`}>{r.title}</h3>
        <p className={s.cardText}>{r.description}</p>
        <DownloadButton resource={r} placement="card" />
      </div>
    </article>
  );
}

export function ResourcesGrid() {
  return (
    <section className={s.grid} aria-labelledby="grid-title">
      <div className={s.wrap}>
        <div className={s.gridHead}>
          <h2 id="grid-title">その他の資料</h2>
          <span aria-hidden="true" />
        </div>
        <JournalReveal className={s.cards}>
          {resources.map((r) => (
            <ResourceCard key={r.id} r={r} />
          ))}
        </JournalReveal>
      </div>
    </section>
  );
}
