
class SearchStub {
  
    // search for the input
    static search(input) {
        // search for an input and return a list with Books
        var books=[]

        for (var i = 0; i < 3; i++) {
            books[i] = { title: "title".concat(i), pages: i };
        }
        return books;
    }
}

class Book{
    constructor(title, pages) {
        this.title = title;
        this.pages = pages;
    }
}


class DAOBooks {
    constructor() {
        this.books=[];
        //create 3 books
        for (var i = 0; i < 3; i++) {
            this.books[i] = { title: "title".concat(i), pages: i };
        }
        this.i = 4;
    }
    
    getBooks(){
        return this.books;
    }

    add(book){
        console.log(this.i);
        this.books[this.i] = book;
        this.i ++;
    }
}