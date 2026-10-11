import Image from "next/image";
import Link from "next/link";
import { featureLinks } from "@/content/features";
export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <Link href="/" className="footer-brand">
              <Image src="/logo.png" alt="ENPATH" width={175} height={58} />
            </Link>
            <p>英語学習に、あなただけの道筋を。</p>
          </div>
          <nav aria-label="フッターナビゲーション">
            {featureLinks.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.title}
              </Link>
            ))}
            <Link href="/#faq">よくある質問</Link>
          </nav>
        </div>
        <div className="footer-bottom">
          <small>© {new Date().getFullYear()} ENPATH</small>
          <div>
            <Link href="/privacy">プライバシーポリシー</Link>
            <Link href="/legal">運営者情報・サービス条件</Link>
            <a href="#top">ページの先頭へ ↑</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
