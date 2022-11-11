import { cleanerHandler, addIsbnToBook } from "./cleaningHelpers.js";

function cleanStrings(isbn, rawBookData) {
  const bookInfoObj = Object.entries(rawBookData[isbn]).reduce((acc, i) => {
    const title = i[0];
    const value = i[1];
    const cleanedValue = cleanerHandler(value);
    return { ...acc, [title]: cleanedValue };
  }, {});
  return bookInfoObj;
}

export function removeStringFormating(data) {
  try {
    const isbn = Object.keys(data);
    const bookInfoObj = cleanStrings(isbn, data);
    const completeBook = addIsbnToBook(isbn, bookInfoObj);
    return completeBook;
  } catch (e) {
    console.log(e);
  }
}
