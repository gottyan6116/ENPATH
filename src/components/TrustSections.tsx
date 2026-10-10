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
export function Pricing() {
  const pricing = service.pricing;
  return (
    <section id="pricing" className="section pricing-section">
      <div className="container pricing-layout">
        <div>
          <SectionHeading label="PRICING">
            あなたに合った
            <br />
            学習サポートを。
          </SectionHeading>
          <p className="body-copy">
            目標も、使える時間も、一人ひとり違うから。
            <br />
            納得して始められるよう、
            <br />
            サポート内容と条件を明確にご案内します。
          </p>
          <BookingLink />
        </div>
        <div className="pricing-panel">
          <div className="pricing-panel-head">
            <span className="eyebrow">PERSONAL ENGLISH COACHING</span>
            <h3>{pricing.price ?? "料金プランは、現在準備中です。"}</h3>
            <p>正式な料金・条件は、確定後にご案内します。</p>
          </div>
          <dl>
            {[
              ["契約期間", pricing.duration],
              ["面談頻度", pricing.meetings],
              ["支援範囲", pricing.support],
              ["契約・解約条件", pricing.conditions],
            ].map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value ?? "準備中"}</dd>
              </div>
            ))}
          </dl>
          <p className="sample-note">
            お申し込み前に、料金・期間・支援内容・各種条件をご確認いただけるようにします。
          </p>
        </div>
      </div>
    </section>
  );
}
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
