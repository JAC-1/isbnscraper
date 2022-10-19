import ExcelJS from 'exceljs';


// const path = "./test.xlsx";
// Read file, get workseet and make an array of ISBN numbers
export default async function readData(path) {
  const workbook2 = await new ExcelJS.Workbook().xlsx.readFile(path)
  const worksheet = workbook2.getWorksheet(1);
  const col1 = worksheet.getColumn(1);
  const values = col1.values
  const isbns = values.slice(3,);
  let cleanIsbns = new Array();
  isbns.forEach((isbn) => {
    cleanIsbns.push(isbn.replaceAll("-", ""))
  })
  return cleanIsbns
}


