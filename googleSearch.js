import dbWriter from "./writeToDb2.js";

const boilerFields = {
  title: (json) => json.title,
  subtitle: (json) => json.subtitle,
  authors: (json) => json.authors[0],
  publisher: (json) => json.publisher,
  About: (json) => json.description,
  categories: (json) => json.categories,
  pages: (json) => json.pageCount,
};

let noIsbnInfo = new Array();

const getBooks = () => async (data, isbn) => {
  await data;
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
    );
    const data = await response.json();
    const rawBookInfo = data.items[0].volumeInfo;
    if (rawBookInfo) {
      const bookInfo = Object.entries(boilerFields).reduce(
        (acc, [field, value]) => {
          const val = value(rawBookInfo);
          return { ...acc, [field]: val };
        },
        {}
      );
      const result = { [isbn]: bookInfo };
      console.log("Writing to db");
      return await dbWriter(result);
    }
  } catch (e) {
    console.log(`Book ${isbn} not found`);
    // noIsbnInfo.push(isbn);
    dbWriter(isbn)
  }
};

export default async function main(isbns) {
  console.log(isbns);
  const isbnList = await isbns;
  const result = await isbnList.reduce(await getBooks(), {});
  return noIsbnInfo;
}

// getBook(isbn).then(data => console.log(data));
