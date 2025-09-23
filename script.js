const obj = {
    bookName: 'javascript',
    author: 'xyz',
    title: 'abc',
    pages: 200,
    hasBeenRead: function(){
        return `${this.bookName} has been read`;
    }
}


function Book(bookName, author, title, pages){
    this.bookName = bookName;
    this.author = author;
    this.title = title;
    this.pages = pages;

    this.hasBeenRead = function(){
        return `${this.bookName} has been read`;
    }

    this.bookInfo = function(){
        return `${this.bookName} by ${this.author}, ${this.pages} pages`;
    }
}
 console.log(obj.bookInfo())

