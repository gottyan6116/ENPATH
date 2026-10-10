# ENPATH 素材一覧・制作仕様

## 利用状況

| 素材 | 出典 | 用途・状態 |
| --- | --- | --- |
| `public/logo.png` | ユーザー提供の正式ロゴ | ヘッダー・フッター |
| `public/hero-reference.png` | ユーザー提供Hero-section.png | 写真領域をCSSで暫定表示。デザイン参考。利用権は公開前に確認 |
| ブランドカラー | 提供スクリーンショット | Navy #0F2D4A、Teal #14B8A6、Mint #E8F6F1、Gray #F4F6F8、Text #2E2E2E |
| Higgsfield新規写真 | 未生成 | クレジット無消費枠を確認できず実行していない |
| Higgsfieldブランドフィルム | 未生成 | 静止画フォールバックを実装 |
| OGP | HTML/CSSの文字レイアウト | 写真・イラストの生成ではなくコードによるUIレイアウト |

2026-10-09確認: Free / 10 credits / free_gensなし / Unlimited無効 / trial pending。画像モデルカタログはNano Banana 2等を返却。静止画1枚見積1.5 credits。動画は生成しておらず、総消費量は未見積。新規制作時はモデルの対応解像度・秒数・残高・費用を再確認し、有料の実行前に許可を得る。自動課金に移る無料トライアルも開始しない。

[Higgsfield利用規約](https://higgsfield.ai/terms-of-use-agreement)、[商用利用の公式案内](https://higgsfield.ai/creator-hub/help-center/account/who-owns-my-generations-and-can-i-use-them-commercially)、[クレジットの公式案内](https://higgsfield.ai/creator-hub/help-center/credits/how-credits-work)、[ウォーターマーク](https://higgsfield.ai/creator-hub/help-center/credits/watermark-and-how-to-remove)。公式案内は出力の商用利用を制限しないと説明。入力素材の権利・出演者の同意・生成モデル別条件は別途確認する。

## 優先順と納品仕様

1. `listening.webp`: 1920×1080以上。自然光、日本人成人コーチと受講者の対話。人物は右側中心、左はコピー用の静かな余白。実在担当者と誤認させない。
2. `planning.webp`: 同じ人物がPC上の学習計画を一緒に確認。1920×1080以上。画面の可読文字は不要。
3. `online.webp`: 自宅でオンライン面談する成人学習者。1920×1080以上。
4. `future.webp`: 自信を感じる自然な表情。1920×1080以上。
5. `brand-film.mp4` / `brand-film.webm`: 15秒、16:9、24〜30fps、音声なし。推奨MP4 H.264とWebM、目安3〜6MB。無理な圧縮で顔を崩さない。
6. `brand-poster.webp`: 最初の映像と一致する静止画。写真として単独表示可能な品質。

動画タイムライン: 0–4秒 Listening、4–8秒 Planning、8–12秒 Online Coaching、12–15秒 Moving Forward。サイトの3チャプターは0/4/8秒へシーク。最後のシーンは3番目の続きとして再生。尺変更時は`chapters[].start`とHeroの時間判定も更新。

元の英語プロンプト4本は`master-brief.md`の「Higgsfield用の生成プロンプト」に保存済みです。静止画版は冒頭の“cinematic footage”を“editorial brand photography”に変更。共通条件: same consistent adult Japanese coach and learner, soft daylight, natural skin texture, authentic expressions, navy and neutral wardrobe, no readable screen text, no logos, no subtitles。参照画像機能があれば同一人物の容姿を維持する。

## 差し替え

素材を`public/media/`に配置して、`src/content/site.ts`を編集します。

```ts
photos: {
  listening: '/media/listening.webp',
  planning: '/media/planning.webp',
  online: '/media/online.webp',
  future: '/media/future.webp',
},
film: {
  mp4: '/media/brand-film.mp4',
  webm: '/media/brand-film.webm',
  poster: '/media/brand-poster.webp',
},
```

写真はPhotoコンポーネントがCSSクロップ版から通常のNext.js Imageへ切り替えます。人物位置に合わせて`object-position`を調整し、全チャプターの顔・文字が重ならないことを確認してください。

動画はデスクトップ・Reduced Motionなしの場合のみ読み込みます。スマートフォンまたはReduced Motion時は静止画で軽量表示します。動画読み込みエラーでも静止画へ戻ります。実動画で15秒ループ、0/4/8秒のシーク、一時停止、復帰、形式フォールバックを必ず検証してください。映像内のウォーターマークを隠す・切り取る・削除する対応は行わないでください。

画像の注記は生成素材でも維持します。実際のコーチ紹介枠には、生成人物を登録しないでください。

## 2026-10-10：画質・回遊・スクロール演出の改修

ユーザーの追加指示「フリー素材など…もしくはあなたが生成」に基づき、この改修では内蔵imagegenを使用。Higgsfieldクレジットは使用していません。

- `public/media/planning-original.png` / `planning.webp`: 学習計画の相談。原寸1672×941、WebP約129KB。
- `public/media/online-original.png` / `online.webp`: オンライン相談。原寸1672×941、WebP約156KB。
- 両画像は独立した写真として生成。従来の262〜265×93のサムネイル拡大表示を置き換え。PNGを原版として保存し、同寸WebPをサイト配信。
- 生成画像は実在のコーチ・受講者・サービス画面を示すものではありません。
- Listeningは提供画像の大きな写真領域を引き続き使用。ブランド動画は未制作。

生成プロンプト：

1. Planning: High-resolution wide 16:9 editorial photograph for a premium Japanese English coaching website hero. Bright serene modern office, pale oak table, soft daylight, white walls, green plants. Silver laptop displaying a generic weekly learning schedule with teal/navy blocks and no legible words; open notebook and pen. Japanese female coach in navy and learner in cream discussing the plan, center-right composition with uncluttered space at left. Natural skin and hands, fine material detail, medium depth of field. No text overlays, logos, watermark, collage or website mockup.
2. Online: High-resolution wide 16:9 commercial editorial photograph. Japanese professional woman in cream blouse with slim headset at a silver laptop, friendly engaged natural smile during online English coaching, one hand gently gesturing. Bright serene home office, pale oak desk, white walls, green plant, tall window. Waist-up center-right composition, laptop foreground, airy space at left. Crisp face and eyes, natural skin/fabric, restrained navy/teal/cream accents. No text, branding, watermark, collage or website mockup.

アニメーションはGSAP ScrollTrigger + SVG。PCの十分な高さがある画面で学習設計をsticky表示し、スクロールに応じて6段階を進めます。スマホ・低い画面・Reduced Motionではクリック操作を主体にして固定表示を解除。OS設定を変更した場合もmatchMediaが追従し、アンマウント時に全トリガーを解除します。通常のブラウザスクロールを維持し、強制スナップは使いません。
