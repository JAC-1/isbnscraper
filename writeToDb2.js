import { join, dirname } from "path";
import { Low, JSONFile } from "lowdb";
import { fileURLToPath } from "url";

export default async function writeToDb(data) {
  const __dirname = dirname(fileURLToPath(import.meta.url));

  const file = join(__dirname, "db.json");
  const adapter = new JSONFile(file);
  const db = new Low(adapter);

  await db.read();
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
  let [incomingKey] = Object.keys(data);
  if (incomingKey == undefined) incomingKey = { [data]: {"title": "unknown"} };
  console.log(incomingKey)

  // Check if isbn entry is already in Database
  
  allStoredKeys.includes(incomingKey)
    ? console.log(`${incomingKey} already in db. Aborting write.`)
    : db.data.push(incomingKey);
  await db.write();
}
