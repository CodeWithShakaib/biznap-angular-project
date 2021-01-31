var express = require('express');
const path = require('path');
var app = express();

app.use(express.static(__dirname + '/biznap/dist/'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/biznap/dist/index.html'));
})

app.listen(8081, function() {

    console.log("listening at http://%s:%s")
})
