import ExcelJS from "exceljs";
import { getDbData } from "../db/dbManager.js";
// Create new worksheet

function createWorkbook({ creator, lastModifiedBy, created }) {
  const workbook = new ExcelJS.Workbook();

  workbook.creator = creator;
  workbook.lastModifiedBy = lastModifiedBy;
  workbook.created = created;
  return workbook;
}

function createSheetandAddColumns(workbook, sheetName) {
  const sheet = workbook.addWorksheet(sheetName, {
    views: [{ state: "frozen", xSplit: 1, ySplit: 1 }],
  });

  sheet.columns = [
    { header: "ISBN", key: "isbn", width: 10 },
    { header: "Title", key: "title", width: 10, outlineLevel: 1 },
    { header: "Author", key: "author", width: 32 },
    { header: "Publisher", key: "publisher", width: 32 },
    { header: "Pages", key: "pages", width: 32 },
    { header: "About", key: "about", width: 32 },
  ];
  return sheet;
}

function constructBook() {
  const sheetCreationInfo = {
    creator: "Justin",
    lastModifiedBy: "Justin",
    created: new Date(2022, 11, 11),
  };
  const workbook = createWorkbook(sheetCreationInfo);
  const sheet = createSheetandAddColumns(workbook, "Manga");
  return [sheet, workbook];
}

function filterPgNum(str) {
  try {
    return str.match(/[1-9]+/g).join("");
  } catch (e) {
    return "";
  }
}

const addRows = async (sheet, data) => {
  await data.forEach((datapoint) => sheet.addRow(datapoint));
};

function constructArrayOfBooks(db) {
  const arr = new Array();
  db.forEach((entry) => {
    const [isbn] = Object.keys(entry);
    const { title, author, publisher, about, pages } = entry[isbn];
    const pageNumber = filterPgNum(pages);
    const cleanedObj = {
      isbn: isbn,
      title: title,
      author: author,
      publisher: publisher,
      about: about,
      pages: pageNumber,
    };
    arr.push(cleanedObj);
  });
  return arr;
}

export default async function writeToExcel() {
  const db = await getDbData();
  const [sheet, workbook] = constructBook();
  const arrayOfAllBooks = constructArrayOfBooks(db);
  addRows(sheet, arrayOfAllBooks);
  try {
    await workbook.xlsx.writeFile("./output/SkillBooks.xlsx");
    console.log("saved");
  } catch (err) {
    console.log(err);
  }
}
writeToExcel();
