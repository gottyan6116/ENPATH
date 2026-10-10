"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { BookingLink } from "./BookingLink";
const links = [
  ["サービス紹介", "#about"],
  ["特徴", "#support"],
  ["教材選定", "/textbooks"],
  ["コーチ", "#coach"],
  ["料金", "#pricing"],
  ["よくある質問", "#faq"],
];
export function Header() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header className="header">
      <div className="header-inner">
        <a href="#top" className="brand" aria-label="ENPATH ホーム">
          <Image
            src="/logo.png"
            width={180}
            height={60}
            alt="ENPATH"
            priority
          />
          <span>YOUR ENGLISH. YOUR PATH.</span>
        </a>
        <nav aria-label="メインナビゲーション" className="desktop-nav">
          {links.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <div className="header-cta">
          <BookingLink compact />
        </div>
        <button
          ref={toggle}
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <nav
        id="mobile-menu"
        aria-label="モバイルナビゲーション"
        className="mobile-nav"
        hidden={!open}
      >
        {links.map(([label, href]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>
            {label}
            <Arrow />
          </a>
        ))}
        <a href="#consultation" onClick={() => setOpen(false)}>
          無料カウンセリング
          <Arrow />
        </a>
      </nav>
    </header>
  );
}
function Arrow() {
  return <span aria-hidden="true">↗</span>;
}
