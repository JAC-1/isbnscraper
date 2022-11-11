export function addIsbnToBook(isbn, obj) {
  return { [isbn]: obj };
}

export function cleanerHandler(val) {
  if (val == "author") {
    return hasSpace(val);
  } else if (val == "pages") {
    return filterPageNumber(val);
  } else {
    return removeWhitespace(val);
  }
}

const hasSpace = (name) => {
  return name.split(" ")[1] ? name : addSpaceInName(name);
};

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

function filterPageNumber(str) {
  try {
    return str.match(/[1-9]+/g).join("");
  } catch (e) {
    return "";
  }
}
