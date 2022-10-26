import { join, dirname } from "path";
import { Low, JSONFile } from "lowdb";
import { fileURLToPath } from "url";

export default async function isInDb(excelIsbns) {
  // Returns array of numbers that are not already in local db
  
  const __dirname = dirname(fileURLToPath(import.meta.url));

  const file = join(__dirname, "db.json");
  const adapter = new JSONFile(file);
  const db = new Low(adapter);

  await db.read();
  const isbnInDb = db.data.map(i => parseInt(Object.keys(i))).flat();
  const count = isbnInDb.length
  const numAdvance = isbnInDb.length 
  const isbns = excelIsbns.filter(i => !isbnInDb.includes(i))
  console.log("Already in the db: \n" + isbnInDb.join("\n") + `\nResuming from ${isbns[0]}`)
  return isbns
}
