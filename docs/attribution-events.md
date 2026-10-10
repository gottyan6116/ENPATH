# 教材選定ページの計測設計（アトリビューション）

参照スキル: attribution（Webマーケティング部）

## 目的

`/textbooks` が「予約リクエスト」にどれだけ貢献しているかを、GA4で見られるようにする。月間CVが少ない想定のため、ラストクリックだけで評価せず「教材ページを経由したか」を別軸で持つ。

## イベント（GTMのdataLayerに送信）

| イベント | 発火タイミング | 主なパラメータ |
| --- | --- | --- |
| `textbook_page_link_click` | トップのサポート02・03から教材ページへ遷移 | `placement`: `support_02` / `support_03` |
| `textbook_guide_select` | 教材ページで目的タブを選択 | `guide`: `business` / `toeic` / `daily` / `eiken` |
| `consultation_booking_click` | 予約フォームへのリンクをクリック（既存） | `placement`: `hero` / `page` / `consultation` / `textbooks_header` / `textbooks_footer` |

## GA4での見方（推奨設定）

- キーイベント: `consultation_booking_click` のみ。実際のフォーム送信は計測できない（Googleフォームは別ドメイン）ため、「予約リクエストの意向」として扱う。
- カスタムディメンション（イベントスコープ）: `placement`, `guide`
- 探索レポートで、`placement` が `textbooks_*` のクリック数 ÷ 教材ページのセッション数を、教材ページ経由CVRとして見る。
- 評価モデルは、キーイベントが月50件未満の間は線形か接点ベース。50件以上でデータドリブン。

## 注意

- GTM未設定（`NEXT_PUBLIC_GTM_ID` が空）の間は、イベントはどこにも送信されない。
- 広告を出す場合は、UTMの命名規則（例: `google / cpc`, `meta / paid_social`）を統一する。
