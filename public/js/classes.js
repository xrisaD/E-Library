
class Book{
    constructor(title, pages) {
        this.title = title;
        this.pages = pages;
    }
}

class Search{
    constructor(){}
}

class SearchStub extends Search{
    constructor(){}
    // search for the input
    static search(input) {
        console.log("Input");
        // search for an input and return a list with Books
        var books=[]
        
        for (var i = 0; i < 3; i++) {
            books[i] = { title: "title".concat(i), pages: i };
        }
        return books;
    }
}
class SearchPenguin  extends Search{
    constructor(){}
    // search for the input
    static search(input) {
        console.log("Input  "+input);

        let url = 'https://reststop.randomhouse.com/resources/works?search=Grisham';
        let myHeaders = new Headers();
        myHeaders.append('Accept','application/json');

        let init = {
            method: "GET",
            headers: myHeaders
        }

        fetch(url, init)
        .then(response => response.json())
        .then(data => {
            for (const work of data.work) {
                console.log(work.titleweb+"   "+work.workid+"   "+work.authorweb); 
            }
        })
        .catch(error =>{console.log(error);})
    }
}

class BooksDAO {
    constructor() {
        this.books=[];
    }

    get books(){
        return this.books;
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
        console.log(this.i);
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
        console.log(this.i);
        this.books[this.i] = book;
        this.i ++;
    }
}