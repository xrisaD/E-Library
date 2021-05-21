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
function addToMyList(index) {
  let url = 'http://localhost:8080/books';
  
  let tmpBook = result.books[index];

  // deep copy and delete the status
  // because status is used only for front end purposes
  // and it is independent of the backend
  let book = JSON.parse(JSON.stringify(tmpBook));
  delete book["state"];

  let init = {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(book)
  }
  
  fetch(url, init)
  .then(response => {
    console.log(response.status);
    if(response.status == 201){
      // set delete button
      result.books[index].state = 1;
      // re-render result
      outer_article.innerHTML = templates.searchResult(result);
    }else if(response.status == 404){
      alert("This book is saved to your list!");
    }else{
      alert("Something went wrong!");
    }
  });
}

function deleteFromMyList(index) {
  let tmpBook = result.books[index];
  if (typeof tmpBook.id != 'undefined'){
    let url = 'http://localhost:8080/books/' + tmpBook.id;
    
    // deep copy and delete the status
    // because status is used only for front end purposes
    // and it is independent of the backend
    // we don't want it to be saved to the db
    let book = JSON.parse(JSON.stringify(tmpBook));
    delete book["status"];

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
        // set add button
        result.books[index].state = 0;
        // re-render result
        outer_article.innerHTML = templates.searchResult(result);
      }else if(response.status == 404){
        alert("This book is not saved to your list!");
      }else{
        alert("Something went wrong!");
      }
    });
  }else{
    alert("Something went wrong!");
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


function search(outer_article, input){
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


function parseData(data, ids){
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
