var dao = new DAOBooks();

const whitePen = '✎';

window.addEventListener('load', (event) => {
    displayList();
});

function displayList() {
    // delete previous results
    var outer_article = document.getElementById("list_results");
    outer_article.classList.add("list_outer");
    outer_article.style.padding = "2%";
    outer_article.innerHTML = "";

    // get books
    var books = dao.getBooks();

    if (books.length > 0){
        // create results
        var title = document.createElement("h3");
        title.textContent = "Your List:";
        outer_article.appendChild(title);
        
        var buttonIdToTitle = {}; // maybe kati allo, oxi title

        for (i = 0; i < books.length; i++) {
            // create article for each book
            var article = document.createElement("article");

            // create content
            var title = document.createElement("h3");
            title.textContent = books[i].title;
            article.classList.add("list_item");

            // create button for edit
            var button = document. createElement("button");
            button.classList.add("list_button");
            button.id = i;
            button.textContent = whitePen;
            button.onclick = function() {showBook(button.id)};

            // add all of them
            article.appendChild(title);
            article.appendChild(button);

            
            // add it to the outer article
            outer_article.appendChild(article);
        }
    }else{
        var outer_article = document.getElementById("list_results");
        var message = document.createElement("h3");
        message.textContent = "Your list is empty";
        outer_article.appendChild(message);
    }
}