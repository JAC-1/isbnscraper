import { join, dirname } from "path";
import { Low, JSONFile } from "lowdb";
import { fileURLToPath } from "url";

function accessDb() {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const file = join(__dirname, jsonDb);
  const adapter = new JSONFile(file);
  const db = new Low(adapter);
  return db

}

export async function readDb(jsonDb) {
  await db.read();
  return db.data;
}

export async function writeToDb(jsonDb) {
  await db.write();
}
