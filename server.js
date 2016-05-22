/**
 * Created by alexs_000 on 21.05.2016.
 */
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/build'));

//app.set('views', __dirname + '/views');
//app.set('view engine', 'jade');

app.get('/', function (req, res) {
    res.sendFile('index.html');
    //res.render('index');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});