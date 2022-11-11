function cleanStrings(isbn, rawBookData) {
  const bookInfoObj = Object.entries(rawBookData[isbn]).reduce((acc, i) => {
    const valTitle = i[0];
    const valNoEscape = i[1]
      .split("\n")
      .map((i) => i.trim())
      .join(" ");
    return { ...acc, [valTitle]: valNoEscape };
  }, {});
  return bookInfoObj;
}

function addIsbnToBook(isbn, obj) {
  return { [isbn]: obj };
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
