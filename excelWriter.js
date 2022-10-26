import ExcelJS from 'exceljs';
import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'


// Create new worksheet
export default async function writeToExcel() {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const file = join(__dirname, 'db.json')
    const adapter = new JSONFile(file)
    const db = new Low(adapter)

    await db.read();
    const data2 = db.data

    // Create and add workbook deets
    const workbook = new ExcelJS.Workbook();

    workbook.creator = "Justin";
    workbook.lastModifiedBy = 'Justin';
    workbook.created = new Date(1985, 8, 30);
    workbook.modified = new Date();
    workbook.lastPrinted = new Date(2016, 9, 27);

    // Add a sheet

    const sheet = workbook.addWorksheet('isbnLookup', { views: [{ state: 'frozen', xSplit: 1, ySplit: 1 }] });

    // // Adding some columns

    sheet.columns = [
        { header: 'ISBN', key: 'isbn', width: 10 },
        { header: 'Title', key: 'title', width: 10, outlineLevel: 1 },
        { header: 'Author', key: 'author', width: 32 },
        { header: 'Publisher', key: 'publisher', width: 32 },
        { header: 'Pages', key: 'pages', width: 32 },
        { header: 'About', key: 'about', width: 32 },
        // { header: 'Categories', key: 'categories', width: 32 },
    ];

    function createColumns(header, key) {
        { head }

    }

    let allBooks = new Array();
    for (let i = 0; i < data2.length; i++) {
        const obj = db.data[i]; // Get entry object
        const [isbn] = Object.keys(obj) // Get ISBN Number
        const bookinfo = db.data[i][isbn] // Get book object via isbn
        const allKeys = Object.keys(bookinfo) // get all keys from book object
        const books = allKeys.reduce((arr, key) => {
            arr.isbn = isbn
          if ([key] == "about") {
            return { ...arr, [key]: bookinfo[key].trim() }
          } else {
            return { ...arr, [key]: bookinfo[key] }
          }
        }, {})
        allBooks.push(books);
    }
    // Loop through allBooks and add into excel rows
    const addRows = async (data) => {
        await data.forEach((datapoint) => sheet.addRow(datapoint))
    }
    addRows(allBooks)
    try {
        await workbook.xlsx.writeFile('output.xlsx')
        console.log("saved")
    } catch (err) {
        console.log(err)
    }
}
writeToExcel()
