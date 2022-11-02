import { join, dirname } from "path";
import { Low, JSONFile } from "lowdb";
import { fileURLToPath } from "url";

export async function dbReader(jsonDb) {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const file = join(__dirname, jsonDb);
  const adapter = new JSONFile(file);
  const db = new Low(adapter);

  await db.read();
  return db.data;
}

export async function dbWriter(jsonDb) {
  await db.write();
}
