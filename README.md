# ISBN lookup scraper

Currently under development and testing.

## Process

1. Read isbn .xlsx file
2. Search defined urls for book information connected to the isbn
3. Pass new book data to a database
4. Used stored book data to generate a new .xlsx with all the information

TODO:

- Efficent way to query multiple sites if the main site fails to return anything (pageScraper.js)
- Set up an local db to store returned data
- Use stored data in db to generate an .xlsx file
