function Book(title, author, numPages, read) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.read = read;
    this.id = crypto.randomUUID();
    this.info = function() {
        return (`${this.title}, ${this.author}, ${this.numPages}, ${this.read}.`);
    };
} 

let myLibrary = [];

function addBookToLibrary(title, author, numPages, read) {
    let book1 = new Book(title, author, numPages, read);
    myLibrary.push(book1); 
}

addBookToLibrary("The Hobbit by J.R.R.", "Tolkien", "295 pages", "not read yet");
addBookToLibrary("Title2", "Author2", "320 pages", "read");
addBookToLibrary("Title3", "Author3", "270 pages", "not read yet");
addBookToLibrary("Title4", "Author4", "259 pages", "not read yet");

console.log(myLibrary);

let cardDisplay = document.querySelector(".display-cards");

function displayBooks() {
    myLibrary.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `Title: ${item.title}, Author: ${item.author}, Number of pages: ${item.numPages}, Have: ${item.read}, ID: ${item.id}`;
        cardDisplay.appendChild(listItem);
    });
}

displayBooks();