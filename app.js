var express = require('express')
var app = express()
var port = 3005
var http = require('http');
var server = http.createServer(app);
var bodyParser = require("body-parser");

var accesskey ="c871d3dfb14e08ad4ab93aa425fecb5e"
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname+'/public'))

app.set('views','./views')
app.set('view engine', 'ejs');

app.get('',(req,res)=> {
    res.render('index')
})

app.listen(port,()=> console.log(`Server running on ${port}`))