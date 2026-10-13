import { useCases } from "@/content/resources";
import { JournalReveal } from "@/components/journal/JournalReveal";
import s from "./resources.module.css";

/** Real customer reviews do not exist yet, so this shows how each resource can be used. */
export function ResourcesUseCases() {
  return (
    <section className={s.usecases} aria-labelledby="usecases-title">
      <div className={`${s.wrap} ${s.usecasesInner}`}>
        <div className={s.usecasesCopy}>
          <p className={s.eyebrow}>HOW TO USE</p>
          <h2 id="usecases-title">
            ENPATHの考え方を、
            <br />
            資料で気軽に体験できます。
          </h2>
          <p>学習を始める前にも、つまずいたときにも。目的に合わせて、小さなところから使えます。</p>
        </div>
        <JournalReveal className={s.usecaseList}>
          {useCases.map((u, i) => (
            <article key={u.title}>
              <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <h3>{u.title}</h3>
              <p>{u.text}</p>
            </article>
          ))}
        </JournalReveal>
      </div>
    </section>
  );
}
