function addIsbnToBook(isbn, obj) {
  return { [isbn]: obj };
}

function removeWhitespace(string) {
  const cleanedString = string
    .split("\n")
    .map((i) => i.trim())
    .join(" ");
  return cleanedString;
}

function addSpaceInName(name) {
  try {
    const [_, lastInitial] = name.match(/[A-Z]/g);
    const [firstName, lastName] = name.split(lastInitial);
    const fullName = `${firstName} ${lastInitial + lastName}`;
    return fullName;
  } catch (e) {
    return name;
  }
}

const hasSpace = (name) => {
  return name.split(" ")[1] ? name : addSpaceInName(name);
};

function cleanStrings(isbn, rawBookData) {
  const bookInfoObj = Object.entries(rawBookData[isbn]).reduce((acc, i) => {
    const title = i[0];
    const value = i[1];
    const cleanedValue = title == "author" ? hasSpace(value) : removeWhitespace(value);
    return { ...acc, [title]: cleanedValue };
    // const cleanedInfo = key == "author" ? addSpaceInName(value) : removeWhitespace(value);
    // console.log(title, cleanedInfo);
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
