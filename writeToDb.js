import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'


export default async function writeToDb(data) {
    const __dirname = dirname(fileURLToPath(import.meta.url));

    const file = join(__dirname, 'db.json')
    const adapter = new JSONFile(file)
    const db = new Low(adapter)

    await db.read()
    db.data.push(data)
    await db.write()
    
}
