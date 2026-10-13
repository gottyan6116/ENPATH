"use client";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import s from "./resources.module.css";

export type OpenDetail = { id: string; title: string; pdf: string | null };
export const OPEN_EVENT = "resource:open";

/**
 * Single dialog for every "ダウンロードする" button (they dispatch OPEN_EVENT).
 * The e-mail form and the PDFs do not exist yet, so the dialog says so plainly instead of
 * pretending to work. Wire the form to a real endpoint, and fire resource_form_start /
 * resource_form_submit / resource_download (only after a successful download), when the back end is ready.
 */
export function ResourceDownloadDialog() {
  const ref = useRef<HTMLDialogElement>(null);
  const [item, setItem] = useState<OpenDetail | null>(null);

  useEffect(() => {
    const open = (e: Event) => {
      setItem((e as CustomEvent<OpenDetail>).detail);
      ref.current?.showModal();
    };
    window.addEventListener(OPEN_EVENT, open);
    return () => window.removeEventListener(OPEN_EVENT, open);
  }, []);

  return (
    <dialog
      ref={ref}
      className={s.dialog}
      aria-labelledby="resource-dialog-title"
      onClick={(e) => {
        if (e.target === ref.current) ref.current?.close();
      }}
    >
      <button type="button" className={s.dialogClose} aria-label="閉じる" onClick={() => ref.current?.close()}>
        <X size={20} aria-hidden="true" />
      </button>
      <p className={s.dialogBadge}>準備中</p>
      <h2 id="resource-dialog-title">資料のダウンロードは、現在準備中です。</h2>
      {item && <p className={s.dialogItem}>「{item.title}」</p>}
      <p>
        ダウンロード用のフォームとPDFを準備しています。公開まで、いましばらくお待ちください。
      </p>
      <form className={s.dialogForm} onSubmit={(e) => e.preventDefault()} aria-describedby="resource-dialog-note">
        <label htmlFor="resource-email">メールアドレス</label>
        <input id="resource-email" type="email" placeholder="example@email.com" disabled />
        <button type="submit" disabled>
          ダウンロードする（準備中）
        </button>
        <p id="resource-dialog-note">※ 現在はご利用いただけません。</p>
      </form>
    </dialog>
  );
}
