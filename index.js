var express = require('express');
const path = require('path');
var app = express();
const port = process.env.PORT || 3000

app.use(express.static(__dirname + '/biznap/dist/'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/biznap/dist/index.html'));
})

app.all('*', function(req, res) {
    res.send("<h1>Bad request</h1><br><p>Please use base url, click <a href='https://biznap-admin.herokuapp.com/'>BizNap-Admin</a> and proceed</p>")
})

app.listen(port, function() {

    console.log("listening at http://%s:%s")
})