import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { featureLinks } from "@/content/features";
export function FeatureExplorer({ related }: { related?: number[] }) {
  const items = related
    ? related.map((index) => featureLinks[index])
    : featureLinks;
  return (
    <section className="feature-explorer">
      <div className="container">
        <h2>
          {related
            ? "あわせて知りたい、ENPATHのこと。"
            : "あなたが知りたいことから、ENPATHを。"}
        </h2>
        <div className="feature-explorer-links">
          {items.map((item) => (
            <Link href={item.href} key={item.href}>
              <span>
                <strong>{item.title}</strong>
                <small>{item.description}</small>
              </span>
              <ArrowRight size={20} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
