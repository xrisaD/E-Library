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
                            <article class='search_item'> \
                            <h4> {{title}} </h4>    \
                            <p>ID: {{id}},  Author: {{author}}</p> \
                            {{#ifState state 0}}\
                                <button class='search_button' id='{{@index}}' onclick=addToMyList({{@index}}) > \u2661 </button>\
                            {{else}} \
                                <button class='search_button' id='{{@index}}' onclick=deleteFromMyList({{@index}}) > ✖ </button>\
                            {{/ifState}} \
                        </article> \
                    {{/books}} \
                {{else}}    \
                    <p>There are no books. Please type something different</p> \
                {{/if}}";
templates.searchResult = Handlebars.compile(searchString);


listString = "<h3>My List</h3> \
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

