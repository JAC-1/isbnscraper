export const urls = [
  {
    name: "Booklog",
    url: (isbn) =>
      `https://booklog.jp/search?service_id=1&index=Books&keyword=${isbn}`,
    // url: (isbn) => `https://booklog.jp/item/1/${isbn}`,
    waitSelector: ".item-info-author",
    fields: {
      title: "[itemprop=name]",
      author: "[itemprop=author]",
      publisher: "[itemprop=publisher]",
      about: "[itemprop=description]",
      pages: ".info-area > ul > li",
    },
  },
  {
    name: "English Books",
    url: (isbn) => `https://www.englishbooks.jp/catalog/advanced_search_result.php/en?keywords_phone=Enter+keywords+here&search_criteria=0&keywords=${isbn}`,
    waitSelector: ".product_img",
    fields: {
      title: ".name",
      author: ".listing > table > tbody > tr:nth-child(2) > td:nth-child(2)",
      publisher: () => document.querySelectorAll("table")[1].querySelector(".last .td_right").innerHTML,
      about: ".description",
    }
  },
  {
    name: "Bookfinder",
    url: (isbn) =>
      `https://www.bookfinder.com/search/?isbn=${isbn}&mode=isbn&st=sr&ac=qr`,
    waitSelector: ".attributes",
    fields: {
      title: "#describe-isbn-title",
      author: "[itemprop=author]",
      publisher: "[itemprop=publisher]",
      about: "[itemprop=description]",
    },
  },
];
