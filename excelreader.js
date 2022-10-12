import ExcelJS from 'exceljs';


// Read file, get workseet and make a list of ISBN numbers
export default async function readData(path) {
  const workbook2 = await new ExcelJS.Workbook().xlsx.readFile(path)
  const worksheet = workbook2.getWorksheet(1);
  const col1 = worksheet.getColumn(1);
  const values = col1.values
  const isbns = values.slice(3,);
  return isbns
}

