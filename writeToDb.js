import { join, dirname } from "path";
import { Low, JSONFile } from "lowdb";
import { fileURLToPath } from "url";

export default async function writeToDb(data) {
  const __dirname = dirname(fileURLToPath(import.meta.url));

  const file = join(__dirname, "db.json");
  const adapter = new JSONFile(file);
  const db = new Low(adapter);

  await db.read();
  // Loop through all the keys in the db
  // Get key from incoming data
  // See if incoming key is in list of keys

  const allStoredKeys = db.data.map((i) => Object.keys(i)).flat();
  const [incomingKey] = Object.keys(data);


  let values = Object.entries(data[incomingKey]).reduce((arr, i) => {
    const key = i[0]
    if (key == "pages") {
      const [num] = i[1].match(/\d+/g) // Remove all extra text and keep only the number
      return { ...arr, [key]: num }
    } else if (key == "about") {
      const words = i[1].replaceAll("\n", " ");
      return { ...arr, [key]: words}
    } else {
      return { ...arr, [key]: i[1] }
    }
  }, {})
  const cleanData = { [incomingKey] : values }

  // Check if isbn entry is already in Database
  allStoredKeys.includes(incomingKey)
    ? console.log(`${incomingKey} already in db. Aborting write.`)
    : db.data.push(cleanData);

  await db.write();
}
const testData = {
  "0199535561": {
    title: "Test",
    author: "Austen, Jane",
    publisher: "Oxford University Press, 2008",
    about:
      "Pride and Prejudice has delighted generations of readers with its unforgettable cast of characters, carefully choreographed plot, and a hugely entertaining view of the world and its absurdities. With the arrival of eligible young men in their neighborhood, the lives of Mr. and Mrs. Bennet and their five daughters are turned inside out and upside down. Pride encounters prejudice, upward-mobility confronts social disdain, and quick-wittedness challenges sagacity, as misconceptions and hasty judgements lead to heartache and scandal, but eventually to true understanding, self-knowledge, and love. In this supremely satisfying story, Jane Austen balances comedy with seriousness, and witty observation with profound insight. This new edition includes a new introduction, updated notes, and new appendices onsocial rank and dancing in 19th-century England.About the Series: For over 100 years Oxford World's Classics has made available the broadest spectrum of literature from around the globe. Each affordable volume reflects Oxford's commitment to scholarship, providing the most accurate text plus a wealth of other valuable features, including expert introductions by leading authorities, voluminous notes to clarify the text, up-to-date bibliographies for further study, and much more.",
    pages: "\n            Amazon.co.jp ・本 (264ページ)          "

  },
};

// writeToDb(testData);
