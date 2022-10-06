import ExcelJS from 'exceljs';


// Create new worksheet

const workbook = new ExcelJS.Workbook();


// Add workbook deets

workbook.creator = "Justin";
workbook.lastModifiedBy = 'Justin';
workbook.created = new Date(1985, 8, 30);
workbook.modified = new Date();
workbook.lastPrinted = new Date(2016, 9, 27);

// Add a sheet

const sheet = workbook.addWorksheet('isbnLookup', {views:[{state: 'frozen', xSplit: 1, ySplit: 1}]});

// // Adding some columns

sheet.columns = [
  { header: 'ISBN', key: 'isbn', width: 10 },
  { header: 'Title', key: 'title', width: 10, outlineLevel: 1 },
  { header: 'Author', key: 'author', width: 32 },
];

// Fake data
const data = [
  { isbn: "123124", title: "Some title" },
  { isbn: "123124", title: "Some title" },
  { isbn: "123124", title: "Some title" },
  { isbn: "123124", title: "Some title" },
  { isbn: "123124", title: "Some title" },
  { isbn: "123124", title: "Some title" },
]

// Add some rows using key mapping to columns
sheet.addRow (
  { isbn: "123124", title: "Some title" },
)

// Add multiple rows because addRow frunction doesn't work propperly
const addRows = (data) => {
  data.forEach((datapoint) => sheet.addRow(datapoint))
}


addRows(data)

// Write to file
// workbook.xlsx.writeFile('sample.xlsx').then(() => {console.log("saved");}).catch((err) => {console.log("err", err);});


// Read file, get workseet and make a list of ISBN numbers
export default async function readData() {
  const workbook2 = await new ExcelJS.Workbook().xlsx.readFile("./isbnSamples.xlsx")
  const worksheet = workbook2.getWorksheet(1);
  const col1 = worksheet.getColumn(1);
  const values = col1.values
  const isbns = values.slice(3,);
  return isbns
}

