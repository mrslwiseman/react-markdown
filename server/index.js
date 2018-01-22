const express = require('express')
const app = express();
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require("fs"));
const path = require('path');
const Busboy = require('busboy');


app.post('/api/upload', (req,res) => {
    var busboy = new Busboy({ headers: req.headers });
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
      console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
      file.on('data', function(data) {
        console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
        res.json(String(data))
      });
      file.on('end', function() {
        console.log('File [' + fieldname + '] Finished');
      });
    });
    busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
      console.log('Field [' + fieldname + ']: value: ' + inspect(val));
    });
    busboy.on('finish', function() {
      console.log('Done parsing form!');
    });
    req.pipe(busboy);
})

app.get('/api/sample', (req, res) => {
    console.log('/api/sample');

    fs.readFileAsync("markdown.md")
        .then(data => data.toString())
        .then(data => res.json(data) )
        .catch(e => res.json('There was an error.'))


})




app.set('port', process.env.PORT || 5000);

const server = app.listen(app.get('port'), () => {
    console.log(`Express running → PORT ${server.address().port}`);

});