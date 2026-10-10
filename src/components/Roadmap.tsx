"use client";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  Flag,
  MessageCircle,
} from "lucide-react";
import { roadmaps } from "@/content/site";
import { track } from "@/lib/analytics";
import { SectionHeading } from "./SectionHeading";

export function Roadmap() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  useEffect(() => {
    const chooseGoal = (event: MouseEvent) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey)
        return;
      const link =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>("[data-roadmap-goal]")
          : null;
      const index = roadmaps.findIndex(
        (item) => item.id === link?.dataset.roadmapGoal,
      );
      if (index >= 0) {
        setActive(index);
        track("roadmap_interaction", { goal: roadmaps[index].id });
      }
    };
    document.addEventListener("click", chooseGoal);
    return () => document.removeEventListener("click", chooseGoal);
  }, []);
  const plan = roadmaps[active];
  const select = (i: number, focus = false) => {
    setActive(i);
    track("roadmap_interaction", { goal: roadmaps[i].id });
    if (focus) tabs.current[i]?.focus();
  };
  return (
    <section id="roadmap" className="section roadmap-section">
      <div className="container">
        <div className="roadmap-heading">
          <SectionHeading label="YOUR LEARNING ROADMAP">
            あなたの目標から、
            <br />
            毎日の学習まで。
          </SectionHeading>
          <div>
            <p>
              「何をすればいい？」が、
              <br />
              「今日はこれをやろう」に変わる。
            </p>
            <p className="muted">
              目標と暮らしをつなぐ、学習計画の一例をご覧ください。
            </p>
          </div>
        </div>
        <div
          className="roadmap-tabs"
          role="tablist"
          aria-label="学習計画のサンプル"
        >
          {roadmaps.map((item, i) => (
            <button
              ref={(el) => {
                tabs.current[i] = el;
              }}
              id={`tab-${item.id}`}
              key={item.id}
              role="tab"
              aria-selected={i === active}
              aria-controls="roadmap-panel"
              tabIndex={i === active ? 0 : -1}
              onClick={() => select(i)}
              onKeyDown={(e) => {
                let next = i;
                if (e.key === "ArrowRight") next = (i + 1) % roadmaps.length;
                else if (e.key === "ArrowLeft")
                  next = (i + roadmaps.length - 1) % roadmaps.length;
                else if (e.key === "Home") next = 0;
                else if (e.key === "End") next = roadmaps.length - 1;
                else return;
                e.preventDefault();
                select(next, true);
              }}
            >
              {item.label}
              <ArrowRight size={17} />
            </button>
          ))}
        </div>
        <div
          id="roadmap-panel"
          key={plan.id}
          role="tabpanel"
          aria-labelledby={`tab-${plan.id}`}
          tabIndex={0}
          className="roadmap-panel"
        >
          <div className="plan-top">
            <div>
              <span className="sample-label">学習計画サンプル</span>
              <h3>{plan.goal}</h3>
            </div>
            <span className="plan-mark">
              MY
              <br />
              ENPATH.
            </span>
          </div>
          <dl className="plan-facts">
            <div>
              <dt>
                <Flag size={15} />
                現在の英語力
              </dt>
              <dd>{plan.level}</dd>
            </div>
            <div>
              <dt>
                <CalendarDays size={15} />
                目標達成の期限
              </dt>
              <dd>{plan.deadline}</dd>
            </div>
            <div>
              <dt>
                <Clock3 size={15} />
                学習できる時間
              </dt>
              <dd>{plan.time}</dd>
            </div>
          </dl>
          <div className="weekly-title">
            <h4>1週間の学習スケジュール</h4>
            <span>{plan.total}</span>
          </div>
          <div className="week-grid">
            {plan.schedule.map(([day, content, time], i) => (
              <div key={day} className={i > 4 ? "weekend" : ""}>
                <span className="day">{day}</span>
                <p>{content}</p>
                <span className="minutes">{time}</span>
              </div>
            ))}
          </div>
          <div className="milestones">
            {plan.milestones.map(([month, title, detail], i) => (
              <div key={month}>
                <span className="milestone-dot" />
                <span className="milestone-month">{month}</span>
                <h4>{title}</h4>
                <p>{detail}</p>
                {i < 2 && <ArrowRight size={18} />}
              </div>
            ))}
          </div>
          <div className="plan-bottom">
            <p>
              <MessageCircle size={20} />
              {plan.note}
            </p>
            <div>
              <span>進捗を確かめる指標</span>
              <strong>{plan.metric}</strong>
            </div>
          </div>
        </div>
        <p className="sample-note">
          ※説明用のサンプルであり、成果を保証するものではありません。実際の計画はカウンセリング・現状分析後に個別に作成します。
        </p>
      </div>
    </section>
  );
}
