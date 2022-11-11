import { join, dirname } from "path";
import { Low, JSONFile } from "lowdb";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, "../db.json");
const adapter = new JSONFile(file);
const db = new Low(adapter);

export async function getDbData() {
  await db.read();
  return db.data;
}

export async function addContentsToDb(data) {
  await db.read();
  await db.data.push(data);
  return await db.write();
}
