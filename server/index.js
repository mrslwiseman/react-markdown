const express = require('express')
const app = express();
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require("fs"));
const path = require('path');


app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get('/api/sample', (req, res) => {
    fs.readFileAsync(path.resolve(__dirname, '../client/build', 'markdown.md'))
        .then(data => data.toString())
        .then(data => res.json(data) )
        .catch(e => console.log('Error sending sample data.'))
})

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});
  
app.set('port', process.env.PORT || 5000);

const server = app.listen(app.get('port'), () => {
    console.log(`Express running → PORT ${server.address().port}`);

});