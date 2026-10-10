import Link from "next/link";
export default function NotFound() {
  return (
    <main className="legal-page container">
      <p className="eyebrow">404 — PAGE NOT FOUND</p>
      <h1>ページが見つかりませんでした。</h1>
      <p>ページが移動したか、URLが異なっている可能性があります。</p>
      <Link className="button" href="/">
        ENPATHのトップへ戻る
      </Link>
    </main>
  );
}
