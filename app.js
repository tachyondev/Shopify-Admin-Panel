const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', (req, res) => {
let data =`<a href="/admin">Admin</a> <br/> <a href="/driver"> Driver</a>`;
res.send(data);
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname+'/admin/index.html'));
});

app.get('/admin/list', (req, res) => {
    res.sendFile(path.join(__dirname+'/admin/list.html'));
});

app.get('/admin/add', (req, res) => {
    res.sendFile(path.join(__dirname+'/admin/add.html'));
});

app.get('/driver/', (req, res) => {
    res.sendFile(path.join(__dirname+'/driver/index.html'));
});

app.listen(port, "192.168.43.122", () => console.log(`Example app listening at http://localhost:${port}`))