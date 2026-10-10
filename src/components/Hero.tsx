"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight, Pause, Play } from "lucide-react";
import { chapters, service } from "@/content/site";
import { track } from "@/lib/analytics";
import { BookingLink } from "./BookingLink";
import { Photo } from "./Photo";

export function Hero() {
  const [chapter, setChapter] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const [allowVideo, setAllowVideo] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  const failedSources = useRef(new Set<string>());
  const configured = Boolean(service.film.mp4 || service.film.webm);
  const sourceFailed = (format: string) => {
    failedSources.current.add(format);
    const count =
      Number(Boolean(service.film.mp4)) + Number(Boolean(service.film.webm));
    if (failedSources.current.size >= count) {
      setFailed(true);
      setPlaying(false);
    }
  };
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 700px)");
    const sync = () => {
      const permitted = !motion.matches && !mobile.matches;
      setAllowVideo(permitted);
      if (!permitted) video.current?.pause();
    };
    sync();
    motion.addEventListener("change", sync);
    mobile.addEventListener("change", sync);
    return () => {
      motion.removeEventListener("change", sync);
      mobile.removeEventListener("change", sync);
    };
  }, []);
  const hasVideo = configured && allowVideo && !failed;
  const select = (index: number) => {
    setChapter(index);
    if (video.current && hasVideo)
      video.current.currentTime = chapters[index].start;
    track("hero_chapter_select", { chapter: chapters[index].id });
  };
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-stage">
        <div
          className={`hero-visual visual-${chapter} ${service.photos[chapters[chapter].photo] ? "has-original" : ""}`}
        >
          <Photo
            key={chapters[chapter].photo}
            kind={chapters[chapter].photo}
            priority
            decorative={false}
          />
          {hasVideo && (
            <video
              ref={video}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={service.film.poster ?? undefined}
              onError={(event) => {
                if (event.target === event.currentTarget) {
                  setFailed(true);
                  setPlaying(false);
                }
              }}
              onPlay={() => {
                setPlaying(true);
                track("hero_video_play");
              }}
              onPause={() => setPlaying(false)}
              onTimeUpdate={() => {
                const time = video.current?.currentTime ?? 0;
                setChapter(time < 4 ? 0 : time < 8 ? 1 : 2);
              }}
            >
              {service.film.webm && (
                <source
                  src={service.film.webm}
                  type="video/webm"
                  onError={() => sourceFailed("webm")}
                />
              )}
              {service.film.mp4 && (
                <source
                  src={service.film.mp4}
                  type="video/mp4"
                  onError={() => sourceFailed("mp4")}
                />
              )}
            </video>
          )}
        </div>
        <div className="hero-wash" />
        <div className="container hero-content">
          <p className="eyebrow">YOUR ENGLISH. YOUR PATH.</p>
          <h1 id="hero-title">
            英語学習に、
            <br />
            あなただけの<span className="path-word">道筋</span>を。
          </h1>
          <p className="hero-description">
            あなたの目標から逆算した学習計画と、
            <br className="desktop-break" />
            コーチによる伴走サポートで、
            <br className="desktop-break" />
            英語学習をもっと確かなものに。
          </p>
          <div className="hero-actions">
            <BookingLink hero />
            <a className="text-link" href="#about">
              ENPATHについて詳しく見る
              <ArrowRight size={19} />
            </a>
          </div>
        </div>
        <div className="hero-caption">
          <span className="caption-line" />
          <span>一人ひとりに、向き合う英語学習。</span>
        </div>
        {hasVideo && (
          <button
            className="play-toggle"
            onClick={() => {
              const el = video.current;
              if (!el) return;
              if (el.paused) void el.play().catch(() => setPlaying(false));
              else el.pause();
            }}
            aria-label={playing ? "動画を一時停止" : "動画を再生"}
          >
            {playing ? <Pause size={18} /> : <Play size={18} />}
            {playing ? "一時停止" : "動画を再生"}
          </button>
        )}
      </div>
      <div className="chapter-band">
        <div className="container chapter-layout">
          <div className="chapter-intro">
            <span className="eyebrow">YOUR PATH WITH US</span>
            <p>
              出会いから、
              <br />
              その先の一歩まで。
            </p>
            <a href="#about" aria-label="サービス紹介へスクロール">
              <ArrowDown size={20} />
            </a>
          </div>
          <div className="chapter-list" aria-label="コーチングのチャプター">
            {chapters.map((item, index) => (
              <button
                key={item.id}
                className={`chapter ${chapter === index ? "is-active" : ""}`}
                aria-pressed={chapter === index}
                onClick={() => select(index)}
              >
                <Photo kind={item.photo} thumbnail />
                <div className="chapter-label">
                  <span className="chapter-number">0{index + 1}</span>
                  <span>
                    <strong>{item.label}</strong>
                    <small>{item.en}</small>
                  </span>
                  <ArrowRight size={17} />
                </div>
                <span className="chapter-line" />
              </button>
            ))}
          </div>
        </div>
        <div className="container chapter-detail">
          <p aria-live="polite">
            <strong>{chapters[chapter].title}</strong>
            {chapters[chapter].description}
          </p>
          <small>
            {hasVideo ? "BRAND FILM" : "静止画プレビュー｜写真はイメージです"}
          </small>
        </div>
      </div>
    </section>
  );
}
