# ENPATH

英語コーチングサービスの公式サイト。Next.js App Router / TypeScript / React / Tailwind CSS / Lucide Icons。

## プレビュー

このフォルダーで以下を実行してください。Node.js 24 LTSを推奨します。

```powershell
npm ci
npm run dev
```

ブラウザで **http://127.0.0.1:3000** を開きます。最終納品時にローカルプレビューを起動しています。終了後は上記で再開できます。

本番用の確認:

```powershell
npm run build
npm start
```

同じポートを使用する開発サーバーは先に終了してください。

## 実装済み

- 全12セクション、PC/スマートフォン対応、正式ロゴ、自己ホストのNoto Sans JP・Inter。
- 3チャプターに連動する画像・説明切り替え。動画ファイル設定時のミュート・ループ・再生/停止・シーク。未設定/失敗時の静止画表示。
- 3種類の学習ロードマップ（目的・現在地・期限・時間・週間予定・マイルストーン・確認指標）。サンプルであることを明示。
- 6段階の学習設計、5つのサポート、比較表、受講の流れ、FAQ。
- キーボード対応タブ、Escapeで閉じるモバイルナビ、スキップリンク、Reduced Motion。
- 予約URL設定用の導線。未設定時は準備中へ移動。予約URLにはGoogleフォーム（回答用URL）を設定。サイト自体は個人情報を収集せず、偽の予約完了表示もありません。
- 日本語メタデータ、OGP、robots、sitemap、運営情報・プライバシー準備ページ。
- GTM設定用の環境変数とdataLayerイベント。

## 主なファイル

| ファイル | 役割 |
| --- | --- |
| `src/app/page.tsx` | トップページの組み立て |
| `src/app/globals.css` | ブランド色・書体・各セクション・レスポンシブ |
| `src/components/Hero.tsx` | チャプター・動画・フォールバック |
| `src/components/Photo.tsx` | 提供画像のCSS表示領域と正式写真への差し替え |
| `src/components/Roadmap.tsx` | 目的別の学習計画とキーボード操作 |
| `src/components/TrustSections.tsx` | コーチ・料金・FAQ・相談 |
| `src/components/BookingLink.tsx` | 予約導線・未接続時の状態 |
| `src/content/site.ts` | コーチ、料金、写真、動画、計画サンプル、FAQの編集 |
| `src/lib/config.ts` | HTTPS URL検証と公開状態 |
| `src/lib/analytics.ts` | 個人情報を含まないイベント |
| `src/app/privacy/page.tsx`, `src/app/legal/page.tsx` | 正式情報の入力が必要なページ |
| `docs/master-brief.md` | ユーザー提供仕様と素材プロンプト全文 |
| `docs/design.md`, `docs/implementation-plan.md` | 設計と実装計画 |
| `docs/assets.md` | 素材一覧と差し替え仕様 |

## 外部サービス・環境変数

`.env.example` を `.env.local` にコピーして、確定した項目だけ設定します。

| 変数 | 内容 | 未設定時 |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | 正式なHTTPSのサイトURL | canonicalなし、ローカルOGP URL |
| `NEXT_PUBLIC_BOOKING_URL` | 予約サービスのHTTPS URL | 受付準備中へスクロール |
| `NEXT_PUBLIC_GTM_ID` | `GTM-`から始まるコンテナID | 外部計測スクリプトを読み込まない |
| `SITE_READY_FOR_INDEXING` | 正式公開の内容確認後に`true` | `noindex, nofollow`、robots拒否、空sitemap |

環境変数の更新後は開発サーバーを再起動、本番環境は再ビルド/再デプロイが必要です。`NEXT_PUBLIC_`値は公開されるので秘密鍵を入れないでください。予約先はHTTPSのみ許可します。

### 予約

実際の予約サービスを用意し、日時・料金・個人情報の取り扱い・キャンセル条件を確認してからURLを設定してください。外部サービスは別タブで開きます。URLの設定だけでは予約完了を確認できません。

`consultation_booking_complete` は意図的に発火しません。予約事業者の署名付きWebhookまたは信頼できる予約完了連携を実装した後に追加してください。クリック、単なるURLのクエリ、任意アクセスできる完了ページを予約完了と数えないでください。

### GA4 / GTM

GTM側にGA4タグを設定し、以下のカスタムイベントをマッピングします。

`hero_cta_click`, `hero_video_play`, `hero_chapter_select`, `service_section_view`, `roadmap_interaction`, `consultation_booking_click`

GTM IDを未設定の状態ではdataLayerはブラウザのメモリにだけ存在します。Analytics導入前にプライバシーポリシーと実際のデータ運用を確定し、必要な同意管理をGTM/適切なCMP側で構成してください。

## 素材と未確定情報

Higgsfield新規生成素材は **0点**。2026-10-09の接続確認ではfreeプラン・10クレジット、無料生成カウンタなし、Unlimited無効。Nano Banana 2・16:9・1枚の見積は1.5クレジットでした。無料生成と断定できないため、生成・購入・契約・クレジット消費は行っていません。

ロゴは提供された`logo.png`。人物写真は提供された`Hero-section.png`の人物部分をCSSで暫定表示しています。元画像のテキストやボタンをサイトの操作として使用していません。特に2・3番目のシーンは小さいサムネイル領域のため、本番には原寸素材への差し替えが必要です。詳細は`docs/assets.md`。

コーチ氏名・経歴、料金、面談頻度、契約条件、運営者情報は未提供です。`src/content/site.ts` のnullを正式情報に置き換え、準備中の文章とFAQも一緒に更新してください。コーチの写真は実在の担当者を使用してください。

## Vercelへのデプロイ手順

1. このフォルダーをプライベートGitリポジトリに保存。`node_modules`、`.next`、`.env.local`を含めない。
2. VercelでNew Projectからリポジトリを選択。Framework PresetはNext.js、ルートはこのフォルダー。
3. Install Commandは`npm ci`、Build Commandは`npm run build`。Output DirectoryはNext.js既定値。
4. 上記環境変数をPreview/Productionそれぞれに設定。レビュー段階は`SITE_READY_FOR_INDEXING=false`を維持。
5. Preview DeploymentでPC・スマホ・予約先・画像・各操作を確認。
6. 下記の公開前項目を解消後、Production用ドメインを設定し、正式URLと公開フラグを更新して再デプロイ。

この作業では外部デプロイを実行していません。[Vercel公式Next.jsガイド](https://vercel.com/docs/frameworks/full-stack/nextjs)を参照してください。

## 公開前に確認すること

- [ ] 正式な料金、契約期間、面談頻度、対応範囲、キャンセル・返金条件。
- [ ] コーチの実際の写真・経歴・専門性と掲載同意。
- [ ] 提供画像の利用権。Higgsfield製作素材の規約とウォーターマークの扱い。
- [ ] 原寸写真と15秒のブランドフィルムへの差し替え（静止画で公開する場合は動画を公開しない判断を確定）。
- [ ] 運営者情報・連絡先・正式なプライバシーポリシーと必要な法定表示。
- [ ] 予約サービスの本番接続と、実予約完了までの確認。
- [ ] GA4/GTMを使う場合の計測・同意管理・外部予約との連携。
- [ ] 正式URL、OGP、canonical、sitemap、robotsと公開フラグ。
- [ ] 実機Safari/Android、支援技術、本番ネットワークでの表示速度・Core Web Vitals。

## 検証

```powershell
npm test
npm run typecheck
npm run build
npm run test:e2e
```

E2Eは設定済みの予約リンクと、予約URL未設定時の準備中表示に対応しています。開発中の目視・操作検証はCodex内蔵ブラウザでも実施しています。画面操作、原寸1536×1024、390×844のモバイル、横溢れ、読み込みエラー、コンソールを確認。予約事業者への送信や未提供動画の実再生は未検証です。

自動ブラウザテストはインストール済みのChromeを既定で使用します。別の環境ではChromeを用意するか、`PLAYWRIGHT_CHANNEL=msedge`でEdgeを指定してください。

### 最終確認記録

2026-10-10: URL検証3件合格、型チェック・本番ビルド成功、PC/モバイルのE2E 9件合格・PCで対象外のモバイルナビ検証1件を除外。初回E2EはPlaywright専用ブラウザ未導入で起動に失敗しましたが、既存Chromeへ切り替えて解消しています。

参考画像との比較: ①正式ロゴを提供ファイルに統一、②指定ネイビー/ミントを維持しCTAは文字のコントラスト用に濃色化、③主コピーとCTAをHTML化、④人物の顔と見出しの重なりを解消、⑤チャプター選択と説明を同期、⑥モバイルでは写真とコピーを縦配置。書体は画像の明朝ではなく仕様指定のNoto Sans JP、チャプター数は画像の4つではなく仕様指定の3つを採用。波形の装飾は省き、明快なセクション区切りへ変更しています。

動画と2・3番目の原寸写真は未制作のため、参考画像の完全再現や映像品質の完成を表すものではありません。実装は素材差し替えに対応しています。正式情報・予約・素材の未確定項目を解消するまでは公開準備版です。

## 2026-10-10 追加改修：画質と回遊体験

- Planning / Onlineのサムネイル拡大を廃止し、内蔵画像生成で制作した1672×941の独立写真へ差し替え。WebP配信は約130〜160KB。原版とプロンプトは`public/media/`、`docs/assets.md`に保存。
- GSAP ScrollTriggerで見出し・要素の順次表示、ヒーロー写真の小さな視差移動、学習設計の6段階とSVGの道筋をスクロール同期。
- 画面下に現在地と「次の見どころ」を表示。目的カードから対応する学習計画を直接開く。
- PCの幅1001px以上・高さ800px以上でのみ学習設計をsticky表示。スマホ・小画面・Reduced Motionでは番号選択を主体にする。スクロールの強制スナップは行わない。
- Three.jsは未使用。今回の道筋表現はSVGで描き、読めるHTMLと軽量なスクロール演出を組み合わせている。
- 本番ビルド成功、E2E 14件合格・デバイス対象外2件除外。通常のモーション設定とReduced Motionの両方を検証。

初回納品記録の「2・3番目の原寸写真は未制作」は、この改修で解消。Listening用の独立した原寸写真とブランド動画、正式情報・予約先の未確定項目は引き続き残っています。


## 2026-10-11 詳細ページとナビゲーション

- 「ENPATHの特徴」から6ページへ移動。PCはホバー・クリック・キーボード、モバイルは開閉メニューに対応。
- `/features`：サービスの特徴と英会話レッスン・独学との比較。
- `/textbooks`：既存の教材紹介を維持し、共通ヘッダーと関連記事を追加。
- `/features/steps`：英会話習得までの5段階。
- `/features/learning-plan`：個別計画の考え方と目的別の計画サンプル。
- `/features/support`：学習の振り返りと見直しの例。
- `/features/counseling`：申し込みから相談までの流れ。
- 各ページ末尾に関連する2ページと予約CTA。既存のGoogleフォームへの設定を共通利用。
- 本文・メニュー定義：`src/content/features.ts`。ページごとのタイトル・説明・サイトマップに対応。
- 検証：型チェック・本番ビルド・URL単体テスト3件成功。E2Eは新規14件と既存14件成功、デバイス対象外の4件はスキップ。
