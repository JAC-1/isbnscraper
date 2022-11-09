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
  const numOfDbEntries= db.data.map((i) => parseInt(Object.keys(i))).flat();
  const unscrapedIbns = excelIsbns.slice(numOfDbEntries)

  return unscrapedIbns;
}
