const express = require('express');
const db = require('./DAOImpl');
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


app.get('/books/list', function(req, res){
    let books = db.getAllBooks();
    console.log(books);
    res.type('application/json');
    res.status(200);
    res.send(JSON.stringify(books));

})

app.get('/books', function(req, res){
    let id = req.query.id;
    if(id === undefined){
        res.type('application/json');
        res.status(400);
        res.send('{"message": "id parameter is missing"}');
    }else{
        let book = db.getBook(id);
        if(book !== null){
            res.type('application/json');
            res.status(200);
            res.send(JSON.stringify(book));
        }else{
            res.type('application/json');
            res.status(404);
            res.send('{"message": "Something went wrong!"}');
        }
    }

})

app.post('/books', function(req, res){
    console.log("POST"+req.body);
    // create a new book
    let obj = req.body;
    let id = obj.id;
    if (id === undefined){
        res.type('application/json');
        res.status(400);
        res.send('{"message": "id parameter is missing"}');
    }else if(db.bookExists(id)){
        res.type('application/json');
        res.status(404);
        res.send('{"message": "This book exists"}');
    }else{
        db.addBook(obj);
        res.type('application/json');
        res.status(201);
        res.send('{"message": "Book posted successfully"}');
    }
    
})

app.put('/books/:id', function(req, res){
    console.log("PUTTT");
    // update a book with a specific id
    // get book's id
    let id = req.params.id;
    let newBook = req.body;
    if (id === undefined || newBook === undefined){
        res.type('application/json');
        res.status(400);
        res.send('{"message": "wrong put"}');
    }else if (!db.bookExists(id)){
        res.type('application/json');
        res.status(404);
        res.send('{"message": "Not found"}');
    }else{
        // book exists so update it
        console.log(newBook);
        db.updateBook(id, newBook);
        res.type('application/json');
        res.status(200);
        res.send('{"message": "Book deleted successfully"}');
    }
})

app.delete('/books/:id', function(req, res){
    // delete a book with a specific id
    // get book's id
    let id = req.params.id;
    if (id === undefined){
        res.type('application/json');
        res.status(400);
        res.send('{"message": "id parameter is missing"}');
    }else if (!db.bookExists(id)){
        res.type('application/json');
        res.status(404);
        res.send('{"message": "Not found"}');
    }else{
        // book exists so delete it
        db.deleteBook(id);
        res.type('application/json');
        res.status(200);
        res.send('{"message": "Book deleted successfully"}');
    }

})

const port = 8080
app.listen(port)