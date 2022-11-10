export function removeStringFormating(data) {
  const [incomingKey] = Object.keys(data);
  let values = Object.entries(data[incomingKey]).reduce((arr, i) => {
    const key = i[0];
    if (key == "pages") {
      const [num] = i[1].match(/\d+/g); // Remove all extra text and keep only the number
      return { ...arr, [key]: num };
    } else if (key == "about") {
      const words = i[1].replaceAll("\n", " ").trim();
      return { ...arr, [key]: words };
    } else {
      return { ...arr, [key]: i[1] };
    }
  }, {});
  return { [incomingKey]: values };
}
