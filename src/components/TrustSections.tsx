import Image from "next/image";
import { Plus, ArrowUpRight, UserRound } from "lucide-react";
import { faqs, service } from "@/content/site";
import { bookingUrl } from "@/lib/config";
import { SectionHeading } from "./SectionHeading";
import { BookingLink } from "./BookingLink";

export function Coach() {
  const coach = service.coach;
  return (
    <section id="coach" className="section coach-section">
      <div className="container coach-layout">
        <SectionHeading label="MEET YOUR COACH">
          あなたの英語学習に、
          <br />
          伴走するパートナー。
        </SectionHeading>
        <div className="coach-profile">
          {coach.portrait ? (
            <Image
              className="coach-avatar"
              src={coach.portrait}
              width={160}
              height={160}
              alt={coach.name ?? "担当コーチ"}
            />
          ) : (
            <div className="coach-empty" aria-hidden="true">
              <UserRound size={38} strokeWidth={1.2} />
            </div>
          )}
          <div>
            <span className="eyebrow">
              {coach.name ? "ENPATH COACH" : "PROFILE COMING SOON"}
            </span>
            <h3>{coach.name ?? "コーチのご紹介は、ただいま準備中です。"}</h3>
            <p>
              {coach.message ??
                "一人ひとりの目標に向き合い、学びを支えるパートナー。担当コーチのプロフィールは、情報の確認後に掲載します。"}
            </p>
            <dl className="coach-fields">
              <div>
                <dt>経歴・専門性</dt>
                <dd>
                  {coach.experience ?? "公開準備中"}
                  {coach.specialty ? ` / ${coach.specialty}` : ""}
                </dd>
              </div>
              <div>
                <dt>コーチングへの想い</dt>
                <dd>{coach.message ?? "公開準備中"}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
export { PricingSection as Pricing } from "./pricing/PricingSection";
export function FAQ() {
  return (
    <section id="faq" className="section faq-section">
      <div className="container faq-layout">
        <SectionHeading label="FAQ">よくある質問</SectionHeading>
        <div className="faq-list">
          {faqs.map(([q, a]) => (
            <details key={q}>
              <summary>
                <span className="faq-q">Q.</span>
                {q}
                <Plus size={21} aria-hidden="true" />
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
export function Consultation() {
  return (
    <section id="consultation" className="section consultation-section">
      <div className="container consultation-inner">
        <p className="eyebrow">LET’S FIND YOUR PATH.</p>
        <h2>
          あなたの英語学習、
          <br />
          ここから変えていこう。
        </h2>
        <p>
          一人で悩む前に、
          <br className="mobile-break" />
          まずはあなたの目標を聞かせてください。
        </p>
        <BookingLink final light />
        <small>
          {bookingUrl ? (
            <>
              外部の予約サービスが開きます <ArrowUpRight size={12} />
            </>
          ) : (
            "予約サービス接続後に、このページからお申し込みいただけます。"
          )}
        </small>
      </div>
      <div className="consultation-word" aria-hidden="true">
        YOUR PATH.
      </div>
    </section>
  );
}
