var dao = new DAOBooks();

const whiteHeart = '\u2661';
window.addEventListener('load', (event) => {
    document.getElementById("search_button").addEventListener("click", displaySearchResults);
});

var books = [];

var search_books = "{{#books}} <p>{{title}}</p> {{/books}}";
var template = Handlebars.compile(search_books);

function displaySearchResults() {
    // delete previous results if there are any
    var outer_article = document.getElementById("search_results");
    outer_article.classList.add("search_outer");
    outer_article.style.padding = "2%";
    outer_article.innerHTML = "";
    var input = document.getElementById("search").value;
   
    if (input!=""){
        var books = SearchStub.search(input);
        console.log(books);

        outer_article.innerHTML += template(books);

    }
    // // get input
    // var input = document.getElementById("search").value;
    // if (input!=""){
    //     // search...
    //     books = SearchStub.search(input);
        

    //     // create results
    //     var title = document.createElement("h3");
    //     title.textContent = "Search results for: ".concat(input);
    //     outer_article.appendChild(title);
        
    //     for (i = 0; i < books.length; i++) {
    //         // create article for each book
    //         var article = document.createElement("article");

    //         // create content
    //         var title = document.createElement("h3");
    //         title.textContent = books[i].title;
    //         article.classList.add("search_item");

    //         // create button, add to my list
    //         var button = document.createElement("button");
    //         button.classList.add("search_button");
    //         button.id = i;
    //         button.textContent = whiteHeart;
    //         button.style.fontSize = '15px';
    //         button.onclick = function() {addToMyList(button.id)};


    //         // add all of them
    //         article.appendChild(title);
    //         article.appendChild(button);

            
    //         // add it to the outer article
    //         outer_article.appendChild(article);
    //     }
    // }else{
    //     var outer_article = document.getElementById("search_results");
    //     var message = document.createElement("h3");
    //     message.textContent = "Enter a title..";
    //     outer_article.appendChild(message);
    // }
  }

  function addToMyList(id) {
    dao.add(books[id]);
  }