// DAO
var books = [];

for (var i = 0; i < 3; i++) {
    books.push({ title: "title"+i, id: "i"+i, author:"author"+i});
}

i++;
    
async function getAllBooks(){
    return books;
}

async function add(book){
    console.log("Book added to db");
    books.push(book);
    i ++;
}

async function remove(id){
    console.log("Book deleted from db");
    for (var i = 0; i < books.length; i++) {
        if(books[i].id == id){
            books.splice(i, 1);
        }
    } 
}

async function exists(id){
    console.log("Book exists?");
    for (var i = 0; i < books.length; i++) {
        if(books[i].id == id){
            return true;
        }
    }
    return false;
}

async function get(id){
    console.log("Get book");
    let book = [];
    for (var i = 0; i < books.length; i++) {
        if(books[i].id == id){
            book.push(books[i]);
        }
    }
    return book;
}

async function update(id, newBook){
    console.log("Update book");
    for (var i = 0; i < books.length; i++) {
        if(books[i].id == id){
            books[i] = newBook;
        }
    }
}

module.exports = {
    addBook: add,
    deleteBook: remove,
    getAllBooks: getAllBooks,
    bookExists :exists,
    getBook: get,
    updateBook: update
}