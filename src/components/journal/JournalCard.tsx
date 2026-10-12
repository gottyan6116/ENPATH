import Image from "next/image";
import Link from "next/link";
import type { JournalCardItem } from "@/content/journalCards";
import s from "./journal.module.css";

/** Thumbnail, category pill and title. Becomes a link only once `slug` points to a real page. */
export function JournalCard({ item }: { item: JournalCardItem }) {
  const body = (
    <>
      <div className={s.cardImage}>
        <Image
          src={item.image}
          alt=""
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 400px"
        />
      </div>
      <div className={s.cardText}>
        <p className={s.category}>{item.categoryLabel}</p>
        <h3>{item.title}</h3>
      </div>
    </>
  );
  return (
    <article className={s.card} data-card-id={item.id}>
      {item.slug ? (
        <Link href={`/journal/${item.slug}`} className={s.cardLink}>
          {body}
        </Link>
      ) : (
        <div className={s.cardLink}>{body}</div>
      )}
    </article>
  );
}
