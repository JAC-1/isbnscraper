export function removeStringFormating(data) {
  try {
    const isbn = Object.keys(data);
    const newObject = Object.entries(data[isbn]).reduce((acc, i) => {
      const valTitle = i[0];
      const valNoEscape = i[1]
        .split("\n")
        .map((i) => i.trim())
        .join(" ");
      return { ...acc, [valTitle]: valNoEscape };
    }, {});
    return newObject;
  } catch (e) {
    console.log(e);
  }
}
