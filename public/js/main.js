var templates = {};

searchString = "<h3>Search results</h3> \
                {{#if books}}   \
                    {{#books}}\
                            <article class='search_item'> \
                            <h4> {{title}} </h4>    \
                            <p>ID: {{id}},  Author: {{author}}</p> \
                            <button class='search_button' id='{{@index}}' onclick=addToMyList({{@index}}) > \u2661 </button>\
                        </article> \
                    {{/books}} \
                {{else}}    \
                    <p>There are no books. Please type something different</p> \
                {{/if}}";
templates.searchResult = Handlebars.compile(searchString);
