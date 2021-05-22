var id;
window.addEventListener('load', (event) => {
    id = sessionStorage.getItem('id');
    getBook(id);
});

function getBook(id){
    let myForm = window.document.getElementById("myForm"); 

    let url = 'http://localhost:8080/books?id=' + id;
   
    let init = {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    fetch(url, init)
    .then(response => response.json())
    .then(data =>{ 
        myForm.innerHTML = templates.edit(data); 
    });
}

function update(){
    let url = 'http://localhost:8080/books/'+id;

    // create new book
    var book={};
    let title = window.document.getElementById("title"); 
    let author = window.document.getElementById("author");
    let description = window.document.getElementById("description");
    book["title"] = title.value;
    book["author"] = author.value;
    book["description"] = description.value;

    let init = {
        method: "PUT",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
    }

    fetch(url, init)
    .then(response => {
      console.log(response.status);
      if(response.status == 200){
        window.location.href = "http://localhost:8080/eLib/list.html";
      }else if(response.status == 404){
        alert("This book is not saved to your list!");
      }else{
        alert("Something went wrong!");
      }
    });
}

function remove(){
    let url = 'http://localhost:8080/books/'+id;
    let init = {
        method: "DELETE",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
    }

    fetch(url, init)
    .then(response => {
      console.log(response.status);
      if(response.status == 200){
        // go back to my list
        window.location.href = "http://localhost:8080/eLib/list.html";
      }else if(response.status == 404){
        alert("This book is not saved to your list!");
      }else{
        alert("Something went wrong!");
      }
    });
    
}