"use client";
import { useEffect, useRef, useState } from "react";
import { PathDrawing } from "./PathDrawing";
import { ArrowRight, RefreshCw } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
const steps = [
  [
    "目標設定",
    "「なりたい自分」を言葉にする。",
    "仕事で意見を伝えたい、旅先で会話を楽しみたい。その先の姿と、目標までの期限を一緒に整理します。",
  ],
  [
    "現状分析",
    "今のあなたを、出発点に。",
    "現在の英語力だけでなく、これまでの学習経験や得意・不得意、生活リズムを丁寧に確認します。",
  ],
  [
    "個別学習計画",
    "毎日の一歩まで、具体的に。",
    "いつ、何を、どのくらい。目標から逆算して、日々の生活の中で実行できる計画に落とし込みます。",
  ],
  [
    "学習実践",
    "無理なく続く形を見つける。",
    "決めた計画をもとに、日々の学習へ。忙しさやつまずきも共有しながら、習慣を育てます。",
  ],
  [
    "進捗確認",
    "変化を、一緒に確かめる。",
    "学習の記録と実際にできることを振り返り、取り組みが目標につながっているかを確認します。",
  ],
  [
    "計画改善",
    "今のあなたに、道筋を更新。",
    "進捗や生活の変化に合わせて、内容・量・方法を調整。計画は、つくって終わりではありません。",
  ],
];
export function Approach() {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};
    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (disposed) return;
        gsap.registerPlugin(ScrollTrigger);
        const media = gsap.matchMedia();
        media.add(
          "(min-width: 1001px) and (min-height: 800px) and (prefers-reduced-motion: no-preference)",
          () => {
            ScrollTrigger.create({
              trigger: root.current,
              start: "top 110px",
              end: "bottom bottom",
              onUpdate: (self) =>
                setActive(Math.min(5, Math.floor(self.progress * 6))),
            });
          },
        );
        cleanup = () => media.revert();
      },
    );
    return () => {
      disposed = true;
      cleanup();
    };
  }, []);
  return (
    <section ref={root} id="approach" className="section approach">
      <div className="container">
        <div className="approach-top">
          <SectionHeading label="OUR APPROACH">
            目標が違えば、
            <br />
            学び方も違う。
          </SectionHeading>
          <p>
            決まったコースに、あなたを合わせるのではなく。
            <br />
            あなたの目標に、学び方を合わせていく。
            <br />
            それが、ENPATHの英語コーチングです。
          </p>
        </div>
        <div className="approach-steps" aria-label="学習設計の6つのステップ">
          {steps.map(([label], i) => (
            <button
              key={label}
              aria-pressed={active === i}
              onClick={() => setActive(i)}
              className={active === i ? "is-active" : ""}
            >
              <span>0{i + 1}</span>
              {label}
              {i < 5 ? <ArrowRight size={17} /> : <RefreshCw size={17} />}
            </button>
          ))}
        </div>
        <div className="path-experience">
          <div className="path-visual">
            <PathDrawing active={active} />
            <p>スクロール、または番号を選んで、学びの道筋をたどる。</p>
          </div>
          <div className="approach-detail" key={active}>
            <span className="detail-number">0{active + 1}</span>
            <h3>{steps[active][1]}</h3>
            <p>{steps[active][2]}</p>
          </div>
        </div>
        <a className="path-next" href="#roadmap">
          あなたの目標で、学習計画を見てみる <ArrowRight size={18} />
        </a>
      </div>
    </section>
  );
}
