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


let cardDisplay = document.querySelector(".display-cards");
let listItem = "";

function displayBooks() {
    myLibrary.forEach(item => {
        listItem = document.createElement('li');
        listItem.textContent = `Title: ${item.title}, Author: ${item.author}, Number of pages: ${item.numPages}, Have: ${item.read}, ID: ${item.id}`;
        cardDisplay.appendChild(listItem);
        addRemoveBookButton(item);
    });
}

displayBooks();

let newBookButton = document.getElementById("new-book-button");

let dialog = document.querySelector("#new-book-dialog");

let closeButton = document.querySelector("#close-button");

let submitButton = document.querySelector("#submit-button");

newBookButton.addEventListener("click", () => {
    dialog.showModal();
});

closeButton.addEventListener("click", () => {
    dialog.close();
});


let userBookTitleInput = document.getElementById("book-title");
let userBookAuthorInput = document.getElementById("book-author");
let userBookPagesInput = document.getElementById("book-pages");


let radioRead = document.getElementById("option-a");
let radioNotRead = document.getElementById("option-b");


let userBookTitle = "";
let userBookAuthor = "";
let userBookPages = "";
let userBookRead = "";

function getUserBookInput() {
    userBookTitle = userBookTitleInput.value;
    userBookAuthor = userBookAuthorInput.value;
    userBookPages = userBookPagesInput.value;

    if (radioRead.checked) {
        userBookRead = radioRead.value;
    } else {
        userBookRead = radioNotRead.value;
    };
}

submitButton.addEventListener("click", () => {
    getUserBookInput();
    addBookToLibrary(userBookTitle, userBookAuthor, userBookPages, userBookRead);
    cardDisplay.innerHTML = "";
    displayBooks();
});

function addRemoveBookButton(item) {
    let removeBookButton = document.createElement("button");
    removeBookButton.type = "button";
    removeBookButton.textContent = "Remove"
    removeBookButton.dataset.bookId = item.id
    listItem.appendChild(removeBookButton);
}

cardDisplay.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON" && event.target.dataset.bookId) {
        const bookId = event.target.dataset.bookId
        myLibrary = myLibrary.filter(book => book.id != bookId);
        cardDisplay.innerHTML = "";
        displayBooks();
    }
});