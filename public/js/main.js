// handlebars
Handlebars.registerHelper('ifState', function(v1, v2, options) {
    if(v1 === v2) {
      return options.fn(this);
    }
    return options.inverse(this);
  });


var templates = {};

searchString = "<h3>Search results</h3> \
                {{#if books}}   \
                    {{#books}}\
                        <article class='search_item'>  \
                            <h4 > {{title}} </h4>    \
                            <section class='search_info'> \
                                <p>ID: {{id}}</p> \
                                <p>Author: {{author}}</p> \
                            </section> \
                            {{#ifState state 0}}\
                                <button class='search_button' id='{{@index}}' onclick=addToMyList({{@index}}) > \u2661 </button>\
                            {{else}} \
                                <button class='search_button' id='{{@index}}' onclick=deleteFromMyList({{@index}}) > ✖ </button>\
                            {{/ifState}} \
                        </article> \
                    {{/books}} \
                {{else}}    \
                    <p>Please type something different</p> \
                {{/if}}";
templates.searchResult = Handlebars.compile(searchString);


listString = "{{#if books}}   \
                    {{#books}}\
                        <article class='list_item'> \
                            <h4> {{title}} </h4>   \
                            <section class='list_info'> \
                                <p>ID: {{id}}</p> \
                                <p>Author: {{author}}</p>\
                                <p>Description: {{description}}</p>\
                            </section> \
                            <button class='list_button' id='{{id}}' onclick=edit({{id}}) > ✎ </button>\
                        </article> \
                    {{/books}} \
                {{else}}    \
                    <p>Please type something different</p> \
                {{/if}}";
templates.list = Handlebars.compile(listString);

editString = "<h3>Edit book</h3> \
                {{#if books}}   \
                    {{#books}}\
                            <article class='list_item'> \
                            <h4> {{title}} </h4>    \
                            <p>ID: {{id}},  Author: {{author}}</p> \
                            <p>Description: {{description}}</p>\
                            <button class='search_button' id='{{@index}}' onclick=edit({{@index}}) > ✎ </button>\
                        </article> \
                    {{/books}} \
                {{else}}    \
                    <p>There are no books. Please type something different</p> \
                {{/if}}";
templates.list = Handlebars.compile(listString);

editString = "<h3>Editing book with id: {{id}} </h3>\
            <form id='editForm'> \
            <label for='title'>Title:</label><br> \
            <input type='text' id='title' value='{{title}}'> <br><br>\
            <label for='author'>Author:</label><br> \
            <input type='text' id='author' value='{{author}}'><br><br>\
            <label for='description'>Description:</label><br> \
            <input  type='text' id='description' value='{{description}}'> <br><br>\
            <button id='save' onclick=update()>Save</button> \
            <button id='delete' onclick=remove()>Delete</button> \
            </form>";    
templates.edit = Handlebars.compile(editString);