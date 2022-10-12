import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'


export default async function readDb() {
    const __dirname = dirname(fileURLToPath(import.meta.url));

    const file = join(__dirname, 'db.json')
    const adapter = new JSONFile(file)
    const db = new Low(adapter)

    await db.read()
    // db.data[0] == "0199535566" ? console.log(a) : console.log("You fucked up")
    for (let i = 0; i < db.data.length; i++) {
        let obj = db.data[i];
        let isbn = Object.keys(obj)
        let {title, author, publisher, about}  = obj[isbn]
        console.log(title)
        
    }
    
    await db.write()
    
}

readDb();