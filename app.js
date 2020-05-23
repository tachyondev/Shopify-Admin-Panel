const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json())
app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', (req, res) => {
var data =`<a href="/admin">Admin</a> <br/> <a href="/driver"> Driver</a>`;
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


// delete api
app.post('/delete', (req, res) => {
    console.log(req.body);
    res.send(`{"deleted":true}`);
});

// fetch table data api
app.get('/getTableData', (req, res)=>{
    var type = req.query.type;
    if (type === "products"){
        res.send(JSON.stringify(getProductData()));
    }else if (type === "orders"){
    res.send(JSON.stringify(getOrdersData()));
    }
});

//add item api
app.post("/add", (req, res)=>{
    var type = req.body.type;
    console.log(req.body);
    res.send(`{"added":true}`)
});

// get stats api
app.get("/getStats", (req, res)=>{
    res.send(`{"userCount":1000, "shopCount":100,"productCount":1000, "driverCount":100}`)
});

// get order for driver
app.get("/getOrderForDriver", (req, res)=> {
 res.send(getOrderForDriver());
});

// update order status

app.post("/updateOrderStatus", (req, res) => {
    console.log(req.body)
res.send(`{"updated":true}`);
});

function getOrderForDriver(){
    return `{
        "deliveryBoyName":"Test",
        "orderId":"ID-1234",
        "orderStatus": "Received",
        "orderShopAddress":"Shop Address",
        "orderDeliveryAddress":"Delivery Address",
        "acceptedMyMe": false
    }`
}

function getProductData(){
    return `[
        {
          "product_id": "1",
          "product_name": "TEST One",
          "sell_price": 100,
          "actual_price": 200,
          "product_image":"http://google.com"
        }
      ]`;
}
function getOrdersData(){
    return `[
        {
          "order_id": "1",
          "user_name": "TEST One",
          "cart_price": 100,
          "status": "RECEIVED"
        }
      ]`;
}


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))