const express = require('express')
const app = express();
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require("fs"));
const path = require('path');

app.get('/api/sample', (req, res) => {
    fs.readFileAsync("markdown.md")
        .then(data => data.toString())
        .then(data => res.json(data) )
        .catch(e => res.json('There was an error.'))
})

app.set('port', process.env.PORT || 5000);

const server = app.listen(app.get('port'), () => {
    console.log(`Express running → PORT ${server.address().port}`);

});