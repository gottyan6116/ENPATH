"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { BookingLink } from "./BookingLink";
import { featureLinks } from "@/content/features";
const links = [
  ["コーチ", "/#coach"],
  ["料金", "/#pricing"],
  ["よくある質問", "/#faq"],
  ["アプリ", "/app"],
  ["ENPATH JOURNAL", "/journal"],
];
export function Header() {
  const [open, setOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [mobileFeatures, setMobileFeatures] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const featureToggle = useRef<HTMLButtonElement>(null);
  const group = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const closeAll = () => {
    setOpen(false);
    setFeaturesOpen(false);
    setMobileFeatures(false);
  };
  useEffect(() => {
    closeAll();
  }, [pathname]);
  useEffect(() => {
    const escape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (featuresOpen) {
        setFeaturesOpen(false);
        featureToggle.current?.focus();
      } else if (open) {
        setOpen(false);
        setMobileFeatures(false);
        toggle.current?.focus();
      }
    };
    const outside = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !group.current?.contains(event.target)
      )
        setFeaturesOpen(false);
    };
    document.addEventListener("keydown", escape);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", escape);
      document.removeEventListener("pointerdown", outside);
    };
  }, [featuresOpen, open]);
  return (
    <header className="header">
      <div className="header-inner">
        <Link
          href="/"
          className="brand"
          aria-label="ENPATH ホーム"
          onClick={closeAll}
        >
          <Image
            src="/logo.png"
            width={180}
            height={60}
            alt="ENPATH"
            priority
          />
          <span>YOUR ENGLISH. YOUR PATH.</span>
        </Link>
        <nav aria-label="メインナビゲーション" className="desktop-nav">
          <div
            className="feature-menu-group"
            ref={group}
            onPointerEnter={(event) => {
              if (event.pointerType === "mouse") setFeaturesOpen(true);
            }}
            onPointerLeave={(event) => {
              if (
                event.pointerType === "mouse" &&
                !group.current?.contains(document.activeElement)
              )
                setFeaturesOpen(false);
            }}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node))
                setFeaturesOpen(false);
            }}
          >
            <button
              ref={featureToggle}
              className="feature-toggle"
              aria-expanded={featuresOpen}
              aria-controls="feature-menu"
              onClick={() => setFeaturesOpen((value) => !value)}
              onKeyDown={(event) => {
                if (event.key === "ArrowDown") {
                  event.preventDefault();
                  setFeaturesOpen(true);
                  requestAnimationFrame(() =>
                    group.current
                      ?.querySelector<HTMLAnchorElement>(".feature-dropdown a")
                      ?.focus(),
                  );
                }
              }}
            >
              ENPATHの特徴 <ChevronDown size={15} />
            </button>
            <div
              id="feature-menu"
              className="feature-dropdown"
              hidden={!featuresOpen}
            >
              <p>あなたに合う学び方を、見つける。</p>
              {featureLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  onClick={closeAll}
                >
                  <span>
                    <strong>{item.title}</strong>
                    <small>{item.description}</small>
                  </span>
                  <ArrowRight size={18} />
                </Link>
              ))}
            </div>
          </div>
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              onClick={closeAll}
              aria-current={
                (href === "/journal" && pathname.startsWith("/journal")) ||
                (href === "/app" && pathname.startsWith("/app"))
                  ? "page"
                  : undefined
              }
            >
              {label}
            </Link>
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
          onClick={() => {
            setOpen(!open);
            setMobileFeatures(false);
          }}
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
        <button
          className="mobile-feature-toggle"
          aria-expanded={mobileFeatures}
          aria-controls="mobile-features"
          onClick={() => setMobileFeatures(!mobileFeatures)}
        >
          ENPATHの特徴 <ChevronDown size={18} />
        </button>
        <div
          id="mobile-features"
          className="mobile-feature-links"
          hidden={!mobileFeatures}
        >
          {featureLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeAll}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.title}
              <ArrowRight size={16} />
            </Link>
          ))}
        </div>
        {links.map(([label, href]) => (
          <Link
            key={href}
            href={href}
            onClick={closeAll}
            aria-current={
              (href === "/journal" && pathname.startsWith("/journal")) ||
              (href === "/app" && pathname.startsWith("/app"))
                ? "page"
                : undefined
            }
          >
            {label}
            <ArrowRight size={16} />
          </Link>
        ))}
        <div onClick={closeAll}>
          <BookingLink compact />
        </div>
      </nav>
    </header>
  );
}
