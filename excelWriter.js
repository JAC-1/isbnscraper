import ExcelJS from 'exceljs';
import readDb from './readDb.js';


// Create new worksheet
export default async function writeToExcel(data) {
    const workbook = new ExcelJS.Workbook();


    // Add workbook deets

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
        { header: 'About', key: 'about', width: 32 },
        { header: 'Pages', key: 'pages', width: 32 },
    ];

    // Fake data
    // const data = [
    //   { isbn: "123124", title: "Some title" },
    //   { isbn: "123124", title: "Some title" },
    //   { isbn: "123124", title: "Some title" },
    //   { isbn: "123124", title: "Some title" },
    //   { isbn: "123124", title: "Some title" },
    //   { isbn: "123124", title: "Some title" },
    // ]

    // Add multiple rows because addRow frunction doesn't work propperly
    const addRows = async (data) => {
       await data.forEach((datapoint) => sheet.addRow(datapoint))
    }


    addRows(data)

    // Write to file
    try {
        await workbook.xlsx.writeFile('output.xlsx')
        console.log("saved")
    } catch(err) {
        console.log(err)
    }
}

