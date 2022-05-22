const express = require('express');
const path = require('path');
const app = express();
app.use(express.static('www'));
app.get('/*', function(req,res) {
res.sendFile(path.join('www'));});
app.listen(process.env.PORT || 8080);