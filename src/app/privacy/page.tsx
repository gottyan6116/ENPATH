import Link from "next/link";
export const metadata = {
  title: "プライバシーポリシー（公開準備中）",
  robots: { index: false, follow: false },
  alternates: { canonical: null },
};
export default function Privacy() {
  return (
    <main className="legal-page container">
      <Link className="text-link" href="/">
        ← ENPATHへ戻る
      </Link>
      <p className="eyebrow">PRIVACY</p>
      <h1>プライバシーポリシー</h1>
      <p className="legal-status">公開準備中 — 正式なポリシーは未確定です。</p>
      <p>
        現在、このサイトには個人情報を送信するフォームは設置していません。予約受付やアクセス解析の導入前に、運営主体と実際の運用に合わせた方針を公開します。
      </p>
      <h2>公開前に確定する事項</h2>
      <ul>
        <li>運営者名、連絡先、個人情報管理責任者</li>
        <li>取得する情報、利用目的、保存期間、削除方法</li>
        <li>予約サービスや解析サービスへの情報提供・委託</li>
        <li>Cookieなどの利用と、必要な同意・拒否の方法</li>
        <li>開示・訂正・削除等の請求窓口</li>
        <li>安全管理措置と改定日</li>
      </ul>
      <p>
        このページは公開準備状況の案内です。正式なサービス運用・法務確認を経て更新します。
      </p>
    </main>
  );
}
