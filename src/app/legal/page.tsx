import Link from "next/link";
export const metadata = {
  title: "運営者情報・サービス条件（公開準備中）",
  robots: { index: false, follow: false },
  alternates: { canonical: null },
};
export default function Legal() {
  return (
    <main className="legal-page container">
      <Link className="text-link" href="/">
        ← ENPATHへ戻る
      </Link>
      <p className="eyebrow">INFORMATION</p>
      <h1>運営者情報・サービス条件</h1>
      <p className="legal-status">
        公開準備中 — 現在、決済や契約の受け付けは行っていません。
      </p>
      <dl>
        {[
          "運営者・代表者",
          "所在地・連絡先",
          "料金・追加費用",
          "支払い方法・支払い時期",
          "提供時期・契約期間",
          "キャンセル・解約・返金条件",
        ].map((label) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>正式情報の確認後に掲載します。</dd>
          </div>
        ))}
      </dl>
      <p>
        お申し込みや契約の受け付けを開始する前に、適用される表示事項を確認し、このページに正式な情報を掲載します。
      </p>
    </main>
  );
}
