window.addEventListener('load', (event) => {
    displayList();
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

function edit(id){
    // render the page for editing for the book with this id
    myList.books[id]
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
            outer_article.innerHTML = templates.list(data);
          }else{
            outer_article.innerHTML = "<p> Your list is empty </p>";
          }
        }
    )
}