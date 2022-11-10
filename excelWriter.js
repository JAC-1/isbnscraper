import ExcelJS from "exceljs";
import { getDbData } from "./dbManager.js";
// Create new worksheet
export default async function writeToExcel() {
  const db = await getDbData();

  // Create and add workbook deets
  const workbook = new ExcelJS.Workbook();

  workbook.creator = "Justin";
  workbook.lastModifiedBy = "Justin";
  workbook.created = new Date(1985, 8, 30);
  workbook.modified = new Date();
  workbook.lastPrinted = new Date(2016, 9, 27);

  // Add a sheet

  const sheet = workbook.addWorksheet("isbnLookup", {
    views: [{ state: "frozen", xSplit: 1, ySplit: 1 }],
  });

  // // Adding some columns

  sheet.columns = [
    { header: "ISBN", key: "isbn", width: 10 },
    { header: "Title", key: "title", width: 10, outlineLevel: 1 },
    { header: "Author", key: "author", width: 32 },
    { header: "Publisher", key: "publisher", width: 32 },
    { header: "Pages", key: "pages", width: 32 },
    { header: "About", key: "about", width: 32 },
    // { header: 'Categories', key: 'categories', width: 32 },
  ];

  let allBooks = new Array();
  for (let i = 0; i < db.length; i++) {
    const obj = db[i]; // Get entry object
    const [isbn] = Object.keys(obj);
    try {
      // Get ISBN Number
      const bookinfo = db[i][isbn]; // Get book object via isbn
      const allKeys = Object.keys(bookinfo); // get all keys from book object
      const books = allKeys.reduce((arr, key) => {
        arr.isbn = isbn;
        if ([key] == "about") {
          return { ...arr, [key]: bookinfo[key].trim() };
        } else {
          return { ...arr, [key]: bookinfo[key] };
        }
      }, {});
      allBooks.push(books);
    } catch (e) {
      console.log(`Book information ${isbn}`);
      allBooks.push(isbn);
    }
  }
  // Loop through allBooks and add into excel rows
  const addRows = async (data) => {
    await data.forEach((datapoint) => sheet.addRow(datapoint));
  };
  addRows(allBooks);
  try {
    await workbook.xlsx.writeFile("./output/Science-Books.xlsx");
    console.log("saved");
  } catch (err) {
    console.log(err);
  }
}
writeToExcel();
