// DAO
var books = {};

var arrayWithBooks = [];
for (var i = 0; i < 3; i++) {
    arrayWithBooks.push({ title: "title"+i, id: "i"+i, author:"author"+i});
}
books["books"] = arrayWithBooks;

i++;
    
    
function getAllBooks(){
    console.log("Get all books" + books);
    return books;
}

function add(book){
    console.log("Book added to db");
    books["books"].push(book);
    i ++;
}

function remove(id){
    console.log("Book deleted from db");
    for (var i = 0; i < books["books"].length; i++) {
        if(books["books"][i].id == id){
            books["books"].splice(i, 1);
        }
    } 
}

function exists(id){
    console.log("Book exists?");
    for (var i = 0; i < books["books"].length; i++) {
        if(books["books"][i].id == id){
            return true;
        }
    }
    return false;
}

function get(id){
    console.log("Get book");
    for (var i = 0; i < books["books"].length; i++) {
        if(books["books"][i].id == id){
            return books["books"][i];
        }
    }
    return null;
}

function update(id, newBook){
    console.log("Update book");
    for (var i = 0; i < books["books"].length; i++) {
        if(books["books"][i].id == id){
            books["books"][i] = newBook;
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