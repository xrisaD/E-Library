const express = require('express');
const db = require('./DAOmongo');
const path = require('path');
const app = express()

/* 
    Serve static content from directory "public",
    it will be accessible under path /static, 
    e.g. http://localhost:8080/eLib/index.html
*/
app.use('/eLib', express.static(__dirname + '/public'))


// parse url-encoded content from body
app.use(express.urlencoded({ extended: false }))

// parse application/json content from body
app.use(express.json())

// serve index.html as content root
app.get('/', function(req, res){

    var options = {
        root: path.join(__dirname, 'public')
    }

    res.sendFile('index.html', options, function(err){
        console.log(err)
    })
})

/**
 * Get all books
 */
app.get('/books/list', function(req, res){
    db.getAllBooks()
    .then(books=>{
        res.type('application/json');
        res.status(200);
        res.send(JSON.stringify(books));
    })
    .catch(error =>{
        console.log(error)
        res.type('application/json');
        res.status(404);
        res.send('{"message": "Something went wrong!"}');
    });
})

/**
 * Get a book with a specific id
 */
app.get('/books', function(req, res){
    let id = req.query.id;
    if(id === undefined){
        res.type('application/json');
        res.status(400);
        res.send('{"message": "id parameter is missing"}');
    }else{
        db.getBook(id)
        .then(book=>{
            if(book.length === 1 ){
                res.type('application/json');
                res.status(200);
                res.send(JSON.stringify(book.pop()));
            }else{ 
                res.type('application/json');
                res.status(404);
                res.send('{"message": "Something went wrong!"}');
            }
        })
        .catch(error =>{
            console.log(error);
            res.type('application/json');
            res.status(404);
            res.send('{"message": "Something went wrong!"}');
        });
    }

})
/**
 * Create a new book
 */
app.post('/books', function(req, res){
    let obj = req.body;
    let id = obj.id;
    if (id === undefined){
        res.type('application/json');
        res.status(400);
        res.send('{"message": "id parameter is missing"}');
    }else{
        db.bookExists(id)
        .then( exists =>{
            if(exists){
                res.type('application/json');
                res.status(404);
                res.send('{"message": "This book exists"}');
            }else{
                db.addBook(obj);
                res.type('application/json');
                res.status(201);
                res.send('{"message": "Book posted successfully"}');
            }})
        .catch(error =>{
            console.log(error)
            res.type('application/json');
            res.status(404);
            res.send('{"message": "Something went wrong!"}');
        });
    }
    
})

/**
 * Update a book with a specific id
 */
app.put('/books/:id', function(req, res){
    // get book's id
    let id = req.params.id;
    let newBook = req.body;
    if (id === undefined || newBook === undefined){
        res.type('application/json');
        res.status(400);
        res.send('{"message": "wrong put"}');
    }else{
        db.bookExists(id)
        .then( exists =>{
            if(!exists){
                res.type('application/json');
                res.status(404);
                res.send('{"message": "Not found"}');
            }else{
                // book exists so update it
                db.updateBook(id, newBook);
                res.type('application/json');
                res.status(200);
                res.send('{"message": "Book deleted successfully"}');
            }})
        .catch(error =>{
            console.log(error);
            res.type('application/json');
            res.status(404);
            res.send('{"message": "Something went wrong!"}');
        });     
    }
})

/**
 * Delete a book with a specific if
 */
app.delete('/books/:id', function(req, res){
    // get book's id
    let id = req.params.id;
    if (id === undefined){
        res.type('application/json');
        res.status(400);
        res.send('{"message": "id parameter is missing"}');
    }else{
        db.bookExists(id)
        .then(exists=>{
            if(!exists){
                res.type('application/json');
                res.status(404);
                res.send('{"message": "Not found"}');
            }else{
                // book exists so delete it
                db.deleteBook(id);
                res.type('application/json');
                res.status(200);
                res.send('{"message": "Book deleted successfully"}');
            }})
        .catch(error =>{
            console.log(error)
            res.type('application/json');
            res.status(404);
            res.send('{"message": "Something went wrong!"}');
        });
    }
})

const port = 8080
app.listen(port)