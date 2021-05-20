window.addEventListener('load', (event) => {
    document.getElementById("search_button").addEventListener("click", displaySearchResults);
});


var result;
var outer_article;

// get input and search for it
function displaySearchResults() {
    // delete previous results if there are any
    outer_article = document.getElementById("search_results");
    outer_article.classList.add("search_outer");
    // this style should be added after we search something
    outer_article.style.padding = "2%";
    // set the previous result to empty
    outer_article.innerHTML = "";

    // get value
    var input = document.getElementById("search").value;
    if (input!=""){
        // search for books based on input
        // Call start
        search(outer_article, input);
    }else{
      outer_article.innerHTML = "<h4> Please enter an input <h4>";
    }
  }

  // add a book to my list
  function addToMyList(id) {
    if(dao.exists(result.books[id].id)){
      // already exists to my list
      alert("This book already exists to your list!");
    }else{
      dao.add(result.books[id]);
      // set delete button
      result.books[id].state = 1;
      // re-render result
      outer_article.innerHTML = templates.searchResult(result);
    }
  }

  function deleteFromMyList(id) {
    if(dao.exists(result.books[id].id)){
      // already exists to my list
      dao.remove(result.books[id].id);
      // set add button
      result.books[id].state = 0;
      // re-render result
      outer_article.innerHTML = templates.searchResult(result);
    }else{
       alert("This book is not saved to your list!");
    }
  }

  function searchStub(outer_article, input){
    let result = { 
        books: [ {
            title: "title1",
            id: "10",
            author: "name1",
            state: 0
        },
        {
            title: "title2",
            id: "20",
            author: "name2",
            state: 0
        }]
    };
    
    outer_article.innerHTML = templates.searchResult(result);
}


function search (outer_article, input){
    let url = 'https://reststop.randomhouse.com/resources/works?search=' + input;
    let myHeaders = new Headers();
    myHeaders.append('Accept','application/json');

    let init = {
        method: "GET",
        headers: myHeaders
    }

    fetch(url, init)
    .then(response => response.json())
    .then(data =>{      
          if(typeof data.work !== 'undefined'){
            result = parseData(data); 
            outer_article.innerHTML = templates.searchResult(result);
          }else{
            outer_article.innerHTML = "<p> Not found</p>";
          }
        }
    )
}

function parseData(data){
    var books = {};
    var arrayWithBooks = [];
    for (let work of data.work) {
        var tmpDict = {};
        tmpDict.title = work.titleweb;
        tmpDict.id = work.workid;
        tmpDict.author = work.authorweb;
        tmpDict.state = 0;
        arrayWithBooks.push(tmpDict);
    }
    books["books"] = arrayWithBooks;
    return books;
  }