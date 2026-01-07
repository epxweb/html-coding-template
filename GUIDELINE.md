# EPX studio HTMLコーディングガイドライン v1.2

このドキュメントは、EPX studioにおけるWeb制作案件の標準的なコーディング規約を定義するものである。AIアシスタントおよび開発者は、本ガイドラインに準拠してコーディングを行うこと。

## 1. ディレクトリ構成と基本ルール

Gulp環境（Dart Sass + EJS/HTML）を前提とした `src` ディレクトリでの開発を行う。

```
src/
├── index.html          # トップページ
├── about/index.html    # 下層ページ
└── assets/
    ├── scss/           # Sassファイル
    │   ├── _config.scss  # 変数・Mixin（変更禁止エリアあり）
    │   ├── _reset.scss   # リセットCSS
    │   ├── _global.scss  # 基本タグ設定
    │   ├── _layout.scss  # ヘッダー・フッター・コンテナ（l-）
    │   ├── _utility.scss # 汎用クラス（u-）
    │   ├── base.scss     # 共通スタイル統括
    │   └── top.scss      # ページ固有スタイル（p-）
    ├── images/         # 画像
    └── js/             # JavaScript
```

* **文字コード**: UTF-8 (BOMなし)
* **改行コード**: LF
* **インデント**: スペース2つ

## 2. クラス命名規則 (Class Naming Convention)

HTML/CSSのクラス名は **Kebab-Case（全て小文字、ハイフン区切り）** を採用し、役割に応じた **プレフィックス（接頭辞）** を付与する。

### プレフィックス一覧

| 接頭辞 | 分類 | 意味・用途 | 例 |
| :--- | :--- | :--- | :--- |
| **`l-`** | **Layout** | サイト共通の枠組み | `.l-header`, `.l-footer`, `.l-inner` |
| **`p-`** | **Page** | ページ固有のセクション | `.p-top-mv`, `.p-about-detail` |
| **`c-`** | **Component** | 再利用可能な部品 | `.c-btn`, `.c-card`, `.c-title` |
| **`u-`** | **Utility** | 単一機能・調整用 | `.u-mb20`, `.u-pc-only`, `.u-text-center` |
| **`is-`** | **State** | JSで付与する状態 | `.is-active`, `.is-open` |
| **`js-`** | **JavaScript** | JSフック専用（スタイルなし） | `.js-slider`, `.js-modal-btn` |

### 良い例 vs 悪い例
```html
<div class="topMv">
  <h2 class="mvTitle">タイトル</h2>
</div>

<section class="p-top-mv">
  <h2 class="p-top-mv-title">タイトル</h2> </section>
```

## 3. HTMLコーディングルール

### ドキュメント構造
* HTML5 `<!DOCTYPE html>` を使用。言語は `<html lang="ja">`。
* `<body>` タグには、ページ固有のスタイルスコープ用IDを付与することを推奨（例: `<body id="top">`）。

### コメント記法
セクションの区切りや主要なブロックには、以下の形式で日本語コメントを記述する。

```html
<section class="p-top-mv">
  ...
</section>
```

### リンクとボタンのマークアップ
* **ボタンの入れ子禁止**: `<button>` タグの中に `<a>` タグを入れる（またはその逆）記述は禁止する。
    * **正**: `<a href="#" class="c-btn">詳しく見る</a>`
    * **誤**: `<button class="btn"><a href="#">詳しく見る</a></button>`
* 外部リンクには `target="_blank" rel="noopener noreferrer"` を付与する。

### セマンティックHTML
`div` ばかりを使用せず、適切なタグを使用すること。
* 主要エリア: `header`, `footer`, `main`, `nav`, `section`, `article`
* リスト・定義: `ul/li`, `dl/dt/dd`（企業概要やスペック表などに推奨）
* 画像: `figure/figcaption`（キャプションがある場合）

### レスポンシブ対応
* **表示切り替え**: テンプレートの `_utility.scss` に定義された `.u-pc-only` / `.u-sp-only` を使用する。
* **改行の制御**: スマホのみ改行したい場合は `<br class="u-sp-only">` を使用する。

## 4. SCSS/CSS 設計ガイドライン

### デスクトップファースト (Desktop First)
基本スタイルはPC向け（1366px〜）とし、`mq(sp)` ミキシンでSP向けスタイルを上書きする。

```scss
.p-top-mv {
  width: 100%;
  padding: 80px 0;

  @include mq(sp) { // ~720px
    padding: 40px 0;
  }
}
```

### 単位と計算
* **フォントサイズ**: `px` 指定禁止。`rem` を使用し、Mixin `@include fz(サイズ, 行送り)` で記述する。
* **数値計算**: Dart Sass 対応のため、割り算は `/` ではなく `math.div()` を使用する。

## 5. 画像ファイル命名規則 (Image Naming)

画像ファイル名は **Snake_Case（小文字、アンダースコア区切り）** を採用する。
これにより、ハイフン区切りのHTMLクラス名と明確に区別し、ファイル管理上の視認性を高める。

**基本フォーマット**: `[ページ/カテゴリ]_[セクション]_[要素]_[連番/状態].[拡張子]`

### 具体例
* トップページのMVスライド1枚目: `top_mv_slide01.jpg`
* 共通のメールアイコン: `common_icon_mail.svg`
* 送信ボタンのホバー画像: `btn_submit_hover.png`

### ルール詳細
* **連番**: `01`, `02` のように2桁にする。
* **区切り文字**: 原則として `_` (アンダースコア) を使用する。

## 6. JavaScript (jQuery) 実装方針

* **記述場所**: `src/assets/js/common.js`（共通）またはページ固有JSファイル。
* **状態管理**: スタイルの直接操作（`.css()`）は避け、クラスの付け替え（`.addClass('is-active')`）で制御する。
* **スムーススクロール**: 全ページ共通で実装済みとする。

## 7. 納品前のチェックリスト

1.  **ビルド**: `npm run build` を実行し、`dist` フォルダが生成されているか。
2.  **バリデーション**: タグの閉じ忘れ、不正なネストがないか。
3.  **レスポンシブ**: PC (1366px~), SP (~720px) の実機またはエミュレータで崩れがないか。
4.  **画像パス**: コンパイル後のCSSやHTMLで画像パスが切れていないか。
5.  **不要ファイル**: `.DS_Store` や `Thumbs.db` が含まれていないか（`.gitignore` で除外済み確認）。

---
**Guideline End**