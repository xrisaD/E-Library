window.addEventListener('load', (event) => {
    displayList(); // display list with all books
    document.getElementById('list').onkeyup = function(){
        
    }

});

var outer_article;
var myList;

function displayList() {
    // delete previous results
    outer_article = document.getElementById("list_results");
    outer_article.classList.add("list_outer");
    outer_article.style.padding = "2%";
    outer_article.innerHTML = "";

    getAllBooks(outer_article);

}

function getAllBooks(outer_article){
    let url = 'http://localhost:8080/books/list';
    let myHeaders = new Headers();
    myHeaders.append('Accept','application/json');

    let init = {
        method: "GET",
        headers: myHeaders
    }

    fetch(url, init)
    .then(response => response.json())
    .then(data =>{      
          if(data.books.length>0){ 
            myList = data;
            outer_article.innerHTML = templates.list(data);
          }else{
            outer_article.innerHTML = "<p> Your list is empty </p>";
          }
        }
    )
}

function edit(index){
    // render the page for editing for the book with this id
    sessionStorage.setItem('id', myList.books[index].id);
    window.location.href = "http://localhost:8080/eLib/edit.html";
}