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

    // get books
    //myList = dao.getBooks();

    // if (books.length > 0){
       
        
    // }else{
    //     outer_article.innerHTML = "<h4> Your list is empty <h4>";
    // }

}

function edit(id){
    // render the page for editing for the book with this id
    myList.books[id]
}