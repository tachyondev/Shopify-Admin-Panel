const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/admin/index.html'));
})

app.get('/list', (req, res) => {
    res.sendFile(path.join(__dirname+'/admin/list.html'));
})

app.get('/add', (req, res) => {
    res.sendFile(path.join(__dirname+'/admin/add.html'));
})
app.listen(port, "192.168.43.122", () => console.log(`Example app listening at http://localhost:${port}`))