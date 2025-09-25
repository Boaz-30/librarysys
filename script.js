
const button = document.getElementById('newBookBtn');
const dialog = document.getElementById('newBookDialog');
const form = document.getElementById('bookForm');
const addBookBtn = document.getElementById('addBookBtn');
const libraryContainer = document.getElementById('library'); // Add this div in your HTML

// Book constructor
function Book(bookId, bookName, author, title, pages, read = false) {
    this.bookId = crypto.randomUUID(); // always unique
    this.bookName = bookName;
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
}

// Prototype method to toggle read status
Book.prototype.toggleRead = function () {
    this.read = !this.read;
};

const bookStorage = [];

function addBookToLibrary(book) {
    bookStorage.push(book);
    displayBooks();
}

// Show modal
button.addEventListener('click', function () {
    dialog.showModal();
});


// Add book form
addBookBtn.addEventListener('click', function (event) {
    event.preventDefault();

    const newBook = new Book(
        3,
        document.getElementById('bookName').value,
        document.getElementById('author').value,
        document.getElementById('title').value,
        document.getElementById('pages').value
    );

    addBookToLibrary(newBook);
    dialog.close();
    form.reset();
});

// Display books
function displayBooks() {
    libraryContainer.innerHTML = "";

    bookStorage.forEach((book) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.setAttribute('data-id', book.bookId);

        const bookName = document.createElement('h2');
        bookName.textContent = book.bookName;

        const author = document.createElement('p');
        author.textContent = `Author: ${book.author}`;

        const title = document.createElement('p');
        title.textContent = `Title: ${book.title}`;

        const pages = document.createElement('p');
        pages.textContent = `Pages: ${book.pages}`;

        const status = document.createElement('p');
        status.textContent = `Status: ${book.read ? "Read" : "Not Read"}`;

        // Toggle Read button
        const readButton = document.createElement('button');
        readButton.classList.add('read-button');
        readButton.textContent = 'Toggle Read';
        readButton.addEventListener('click', function () {
            book.toggleRead();
            displayBooks(); // re-render to update status
        });

        // Remove button
        const removeButton = document.createElement('button');
        removeButton.classList.add('remove-button');
        removeButton.textContent = 'Remove Book';
        removeButton.addEventListener('click', function () {
            const index = bookStorage.findIndex(b => b.bookId === book.bookId);
            if (index !== -1) {
                bookStorage.splice(index, 1);
                displayBooks();
            }
        });

        // Append elements
        bookCard.appendChild(bookName);
        bookCard.appendChild(author);
        bookCard.appendChild(title);
        bookCard.appendChild(pages);
        bookCard.appendChild(status);
        bookCard.appendChild(readButton);
        bookCard.appendChild(removeButton);

        libraryContainer.appendChild(bookCard);
    });
}

//  default book
addBookToLibrary(new Book(1, 'JavaScript Basics', 'John Doe', 'Intro to JS', 150, false));

