# ISBN lookup scraper

Currently under development and testing.

## Process

1. Read isbn .xlsx file
2. Search defined urls for book information connected to the isbn
3. Pass new book data to a local json file
4. Used stored book data to generate a new .xlsx with all the information

TODO:

- Make the output spreadsheet more sexy
- Remove google books as it often has missing information booklog has
- Make output automated

Future Milstones:

- Set up nest if necessary to write to a cloud based database
- Set up a backend that writes data to a postgres table
