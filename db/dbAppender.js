const fake = [
  {
    9784023316843: {
      title: "TOEIC L&R TEST 出る単特急 銀のフレーズ (TOEIC TEST 特急シリーズ)",
      author: "TEX加藤",
      publisher: "朝日新聞出版",
      about:
        "【語学/英米語】あの「金フレ」に基本編「銀フレ」が登場！ 新形式改定後も全13回連続990点、約100回の受験後に書きためた「TEXファイル」や公式教材のデータから、「TOEICに頻出の基本単語」のみを掲載。全音声無料ダウンロード付き。スマホ対応。",
      pages: "280",
    },
  },
  {
    9784023316843: {
      title: "TOEIC L&R TEST 出る単特急 銀のフレーズ (TOEIC TEST 特急シリーズ)",
      author: "TEX加藤",
      publisher: "朝日新聞出版",
      about:
        "【語学/英米語】あの「金フレ」に基本編「銀フレ」が登場！ 新形式改定後も全13回連続990点、約100回の受験後に書きためた「TEXファイル」や公式教材のデータから、「TOEICに頻出の基本単語」のみを掲載。全音声無料ダウンロード付き。スマホ対応。",
      pages: "280",
    },
  },
  {
    9784757428096: {
      title: "【音声DL付】 TOEIC(R)テスト 中学英文法で600点!",
      author: "小石裕子",
      publisher: "アルク",
      about: "https://elib.maruzen.co.jp/elib/html/BookDetail/Id/3000031576",
      pages: "239",
    },
  },
];

function something(db) {
  // Look ahead at next object if object has same name change current and future key (isbn)
  // Object.entries(db).forEach((entry) => console.log(entry[1].keys));
  const isbnArray = db.forEach((entry) => Object.keys(entry));
  console.log(isbnArray);
}

lookAhead(fake);
