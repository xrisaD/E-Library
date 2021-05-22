const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/booksDB', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:false})
    .then( () =>{
        console.log("connection open!");
    })
    .catch(err=>{
        console.log("error!");
        console.log(err);
    });

const bookSchema = new mongoose.Schema({
    id: String,
    title: String,
    author: String,
    description: String
});


const Books = mongoose.model('Books', bookSchema);


async function add(book){
    await Books.create(book);
}

async function remove(id){
    await Books.deleteOne({ id: id });
}

async function getAllBooks(){
    return await Books.find({});
    
}

async function exists(id){
    return await Books.exists({ id: id });
}

async function get(id){
    return await Books.find({ id: id }).exec();
}

async function update(id, newBook){
    const query = {id: id}
    await Books.findOneAndUpdate(query, newBook);
}

module.exports = {
    addBook: add,
    deleteBook: remove,
    getAllBooks: getAllBooks,
    bookExists :exists,
    getBook: get,
    updateBook: update
}