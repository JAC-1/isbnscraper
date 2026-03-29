# ISBN Scraper

Takes a spreadsheet of ISBNs, scrapes book metadata from Japanese and international book sites, and outputs a populated Excel file.

**Stack:** Node.js · Puppeteer · ExcelJS

## What it does

1. Reads ISBNs from a `RawBarcodes.xlsx` file
2. Skips any ISBNs already cached in the local JSON database
3. Scrapes [Booklog](https://booklog.jp) and [Bookfinder](https://www.bookfinder.com) for title, author, publisher, description, and page count
4. Saves results to a local JSON database
5. Generates an output `.xlsx` with all collected book data

## Setup

```bash
npm install
node index.js
```

Place your ISBN list in `RawBarcodes.xlsx` in the project root before running.

---
---

# 日本語 / Japanese

## ISBN スクレイパー

ISBN のスプレッドシートを読み込み、日本語・海外の書籍サイトから書誌情報を取得して Excel ファイルに出力するツールです。

**技術スタック：** Node.js · Puppeteer · ExcelJS

## 機能

1. `RawBarcodes.xlsx` から ISBN を読み込む
2. ローカルの JSON キャッシュに既存の ISBN はスキップ
3. [Booklog](https://booklog.jp) と [Bookfinder](https://www.bookfinder.com) からタイトル・著者・出版社・説明・ページ数を取得
4. 結果をローカルの JSON データベースに保存
5. 収集した書誌情報を含む `.xlsx` ファイルを出力

## セットアップ

```bash
npm install
node index.js
```

実行前にプロジェクトルートの `RawBarcodes.xlsx` に ISBN リストを用意してください。
