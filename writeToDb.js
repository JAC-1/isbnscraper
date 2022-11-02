import { join, dirname } from "path";
import { Low, JSONFile } from "lowdb";
import { fileURLToPath } from "url";

export default async function writeToDb(data) {
  const __dirname = dirname(fileURLToPath(import.meta.url));

  const file = join(__dirname, "db.json");
  const adapter = new JSONFile(file);
  const db = new Low(adapter);

  await db.read();
  // Loop through all the keys in the db
  // Get key from incoming data
  // See if incoming key is in list of keys
  // Incoming data is {
  // isbnNum : {
  //  title:,
  //  author:,
  //  publisher:,
  //  about:,
  //  pages:,
  //
  // }}

  const allStoredKeys = db.data.map((i) => Object.keys(i)).flat();
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
  const cleanData = { [incomingKey]: values };

  // Check if isbn entry is already in Database
  allStoredKeys.includes(incomingKey)
    ? console.log(`${incomingKey} already in db. Aborting write.`)
    : db.data.push(cleanData);

  await db.write();
}
