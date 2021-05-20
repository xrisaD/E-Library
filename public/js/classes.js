
class BooksDAO {
    constructor() {
        this.books = [];
    }  
}

class BooksDAOImpl extends BooksDAO {
    constructor() {
        super();
        //create 3 books
        for (var i = 0; i < 3; i++) {
            this.books[i] = { title: "title".concat(i), pages: i };
        }
        this.i = 4;
    }
    
    add(book){
        this.books[this.i] = book;
        this.i ++;
    }
}

class BooksDAODB extends BooksDAO {
    constructor() {
        super();
        //create 3 books
        for (var i = 0; i < 3; i++) {
            this.books[i] = { title: "title".concat(i), pages: i };
        }
        this.i = 4;
    }
    
    add(book){
        this.books[this.i] = book;
        this.i ++;
    }
}