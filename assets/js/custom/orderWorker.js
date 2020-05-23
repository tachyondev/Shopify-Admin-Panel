
$(document).ready(function () {
    $.LoadingOverlay("show");
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('orderId');
    fetch(`http://localhost:3000/getOrderForDriver?orderId=${orderId}`)
        .then(response => {
            if (response == null) {
                throw null;
            }
            return response.json();
        })
        .then(data => {
            if (data == null) {
                return null;
            }
            let deliveryBoyName = document.getElementById("delivery_boy_name");
            let orderId = document.getElementById('order_id');
            let orderStatus = document.getElementById("order_status");
            let orderShopAddress = document.getElementById("shop_address");
            let orderDeliveryAddress = document.getElementById("delivery_address");
            deliveryBoyName.innerHTML = `Delivery Boy: ${data.deliveryBoyName}`;
            orderId.innerHTML = `Order Id:${data.orderId}`;
            orderStatus.innerHTML = `Order Status:${data.orderStatus}`;
            orderShopAddress.innerHTML = `${data.orderShopAddress}`;
            orderDeliveryAddress.innerHTML = `${data.orderDeliveryAddress}`;
            updateActions(document, data.orderStatus, data.acceptedMyMe);
            $.LoadingOverlay("hide");
        })
        .catch(err => {
            $.LoadingOverlay("hide");
            swal("Error", "Something went wrong, Please try again", 'error');
        });
});

function updateActions(document, orderStatus, acceptedMyMe) {
    let accepteOrderButton = document.getElementById("accpet_order_button");
    let prickOrderButton = document.getElementById("picked_order_button");
    let deliverOrderButton = document.getElementById("delivered_order_button");

    if (orderStatus === "Received") {
        console.log("first if");
        accepteOrderButton.disabled = false;
        prickOrderButton.disabled = true;
        deliverOrderButton.disabled = true;
    } else if(orderStatus === "Accepted" && acceptedMyMe) {
        console.log("second if");
        accepteOrderButton.disabled = true;
        prickOrderButton.disabled = false;
        deliverOrderButton.disabled = true;
    } else if (orderStatus === "Accepted" && !acceptedMyMe) {
        console.log("third if");
        accepteOrderButton.disabled = true;
        prickOrderButton.disabled = true;
        deliverOrderButton.disabled = true;
    }else if (orderStatus === "Picked" && acceptedMyMe) {
        accepteOrderButton.disabled = true;
        prickOrderButton.disabled = true;
        deliverOrderButton.disabled = false;
    }else if (orderStatus === "Picked" && !acceptedMyMe) {
        accepteOrderButton.disabled = true;
        prickOrderButton.disabled = true;
        deliverOrderButton.disabled = true;
    }else if (orderStatus === "Delivered") {
        accepteOrderButton.disabled = true;
        prickOrderButton.disabled = true;
        deliverOrderButton.disabled = true;
    }
}

function updateOrderStatus(status){
    let data = {
        "status":status
    }
    $('#order_details_card').LoadingOverlay("show");
    fetch("http://localhost:3000/updateOrderStatus", {
        method:"POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if(response == null){
            throw null;
        }
        return response.json();
    })
    .then(data => {
        $('#order_details_card').LoadingOverlay("hide");
        if (data == null){
            return null;
        }
        if (data.updated){
            swal("Success", "Order Status Updated", 'success');
        }else {
            swal("Error", "Something went wrong, Please try again", 'error');
        }
    })
    .catch(err => {
        $('#order_details_card').LoadingOverlay("hide");
        swal("Error", "Something went wrong, Please try again", 'error');
    });
}

