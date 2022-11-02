import ExcelJS from "exceljs";

// const path = "./test.xlsx";
// Read file, get workseet and make an array of ISBN numbers
export default async function readData(path) {
  const workbook = await new ExcelJS.Workbook().xlsx.readFile(path);
  const isbns = workbook.getWorksheet(2).getColumn(1).values.slice(3);
  console.log(isbns);
  return isbns;
}
