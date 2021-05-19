console.log("xx");
const express = require('express')
const path = require('path')
const app = express()
const port = 8080

app.listen(port)


/* 
    Serve static content from directory "public",
    it will be accessible under path /static, 
    e.g. http://localhost:8080/eLib/index.html
*/
app.use('/eLib', express.static(__dirname + '/public'))


// parse url-encoded content from body
app.use(express.urlencoded({ extended: false }))

// parse application/json content from body
app.use(express.json())

// serve index.html as content root
app.get('/', function(req, res){

    var options = {
        root: path.join(__dirname, 'public')
    }

    res.sendFile('index.html', options, function(err){
        console.log(err)
    })
})

// serve index.html as content root
app.get('/search/', function(req, res){
    let name =  req.query.name;
    let body = req.body;
    //req.status(202).send('')
})
