const fs = require('fs');
const parse = require('csv-parse/lib/sync');
const stringify = require('csv-stringify/lib/sync');
// Read CSV files
const authorsCsv = fs.readFileSync('authors.csv');
const booksCsv = fs.readFileSync('books.csv');
const magazinesCsv = fs.readFileSync('magazines.csv');

// Parse CSV files
const authors = parse(authorsCsv, { columns: true, delimiter: ';' });
const books = parse(booksCsv, { columns: true, delimiter: ';' });
const magazines = parse(magazinesCsv, { columns: true, delimiter: ';' });

// Print all books and magazines
console.log('All books and magazines:');
console.log('-----------------------');
[...books, ...magazines].forEach((item) => {
  console.log(`Title: ${item.title}`);
  console.log(`ISBN: ${item.isbn}`);
  console.log(`Authors: ${item.authors}`);
  if (item.description) {
    console.log(`Description: ${item.description}`);
  }
  if (item.publishedAt) {
    console.log(`Published at: ${item.publishedAt}`);
  }
  console.log('-----------------------');
});

// Find a book or magazine by its ISBN
const findItemByIsbn = (isbn) => {
  const item = [...books, ...magazines].find((item) => item.isbn === isbn);
  if (item) {
    console.log(`Found item with ISBN ${isbn}:`);
    console.log(`Title: ${item.title}`);
    console.log(`ISBN: ${item.isbn}`);
    console.log(`Authors: ${item.authors}`);
    if (item.description) {
      console.log(`Description: ${item.description}`);
    }
    if (item.publishedAt) {
      console.log(`Published at: ${item.publishedAt}`);
    }
  } else {
    console.log(`Item with ISBN ${isbn} not found.`);
  }
};

findItemByIsbn('5554-5545-4518');

// Find all books and magazines by author's email
const authorEmail = 'null-rabe@echocat.org'
const booksByAuthor = books.filter((book) => book.authors.split(';').includes(authorEmail));
const magazinesByAuthor = magazines.filter((magazine) => magazine.authors.split(';').includes(authorEmail));
console.log(`All books and magazines by ${authorEmail}:`);
console.log([...booksByAuthor, ...magazinesByAuthor]);

// Sort all books and magazines by title
const sortedBooksAndMagazines = [...books, ...magazines].sort((a, b) => a.title.localeCompare(b.title));
console.log('All books and magazines sorted by title:');
console.log(sortedBooksAndMagazines);

// Add a book and a magazine to the data structure
const newBook = {
  title: 'New Book',
  isbn: '1234-5678-9012',
  authors: 'null-walter@echocat.org',
  description: 'A new book added to the library'
};

const newMagazine = {
  title: 'New Magazine',
  isbn: '6666-6666-6666',
  authors: 'null-john@echocat.org',
  publishedAt: '04.03.2023'
};

books.push(newBook);
magazines.push(newMagazine);

// Export the data to a new CSV file
const newBooksCsv = stringify(books, { header: true, delimiter: ';' });
const newMagazinesCsv = stringify(magazines, { header: true, delimiter: ';' });

fs.writeFileSync('new-books.csv', newBooksCsv);
fs.writeFileSync('new-magazines.csv', newMagazinesCsv);