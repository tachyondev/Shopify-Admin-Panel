
$(document).ready(function () {
    $.LoadingOverlay("show");
    const urlParams = new URLSearchParams(window.location.search);
    const shopId = urlParams.get('shopId');
    const orderId = urlParams.get("orderId");
    setupDashboardPage(document, shopId, orderId, orderId != null);
});

function setupDashboardPage(document, shopId, orderId, isOrderDetailPage) {
    let url = isOrderDetailPage
        ? `http://localhost:3000/getOrderForShopKeeper?shopId=${shopId}&orderId=${orderId}`
        : `http://localhost:3000/getShopDetails?shopId=${shopId}`;
    fetch(url)
        .then(response => {
            if (response == null) {
                return null;
            }
            return response.json();
        })
        .then(data => {
            if (data == null) {
                return null;
            }
            $.LoadingOverlay("hide");
            pageTitelElement = document.getElementById("list_page_title");
            titleTitle = document.getElementById("table_title");
            subtitleTitle = document.getElementById("table_subtitle");
            acceptOrderButton = document.getElementById("accept_order_button");
            if (isOrderDetailPage) {
                pageTitelElement.innerHTML = `Shop Name:${data.shopName}`;
                titleTitle.innerHTML = `Order Id: ${data.orderId}`;
                subtitleTitle.innerHTML = `Order total:${data.totalPrice}`;
                if (data.status === "Accepted By Shop") {
                    acceptOrderButton.style.visibility = "hidden";
                } else {
                    acceptOrderButton.style.visibility = "visible";
                    acceptOrderButton.onclick = function () {
                        acceptOrder(data.orderId);
                    }
                }
            } else {
                pageTitelElement.innerHTML = `Shop Name:${data.shopName}`;
                titleTitle.innerHTML = 'Order Dashboard';
                subtitleTitle.innerHTML = `Order counts:${data.shopOrderCount}`;
                acceptOrderButton.style.visibility = "hidden";
            }
            setTableHeaders(document, getTableHeaders(isOrderDetailPage));
            setTableBody(document, isOrderDetailPage ? data.items : data.orders, !isOrderDetailPage, shopId);

        })
        .catch(err => {
            // show error message
            $.LoadingOverlay("hide");
            swal(`Error`, `Something went wrong, Plese try again`, "error");
        })
}

function setTableHeaders(document, headers) {
    var tableHeaders = document.getElementById("table_header");
    let row, column;
    headers.forEach((element) => {
        row = document.createElement("tr");
        for (let key in element) {
            if (element.hasOwnProperty(key)) {
                column = document.createElement("td");
                column.innerHTML = element[key];
                row.appendChild(column);
            }
        }
        tableHeaders.appendChild(row);
    });
}

function setTableBody(document, bodyData, hasAction, shopId) {
    var tableBody = document.getElementById("table_body");
    let row, column, count = 0;
    let orderIdArray = new Array();
    bodyData.forEach((element) => {
        row = document.createElement("tr");
        for (let key in element) {
            if (element.hasOwnProperty(key)) {
                column = document.createElement("td");
                column.innerHTML = element[key];
                row.appendChild(column);
                if (key === "order_id") {
                    orderIdArray.push(element[key]);
                }
            }
        }
        if (hasAction) {
            let action = document.createElement("td");
            let data = {
                "orderId": orderIdArray[count],
                "shopId": shopId
            }
            let actionButton = document.createElement("button");
            actionButton.classList.add("btn");
            actionButton.classList.add("btn-success");
            actionButton.innerHTML = `Open order`;
            actionButton.onclick = function () {
                openOrder(data);
            }
            action.appendChild(actionButton);
            action.classList.add('td-actions');
            row.appendChild(action);
        }
        count++;
        tableBody.appendChild(row);
    });
}

function getTableHeaders(isOrderDetailPage) {
    if (isOrderDetailPage) {
        return [{
            itemName: "Item Name",
            itemQuntity: "Item Quntity",
            itemQuntityType: "Item Quntity type"
        }]
    }
    return [
        {
            id: "Order ID",
            name: "User Name",
            total_price: "Cart Price",
            status: "Status",
            actions: "ACTIONS"
        },
    ];
}

function openOrder(data) {
    window.location = `http://localhost:3000/shop/?shopId=${data.shopId}&orderId=${data.orderId}`;
}

function acceptOrder(orderId) {
    let data = {
        "orderId": orderId,
        "status": "Accepted By Shop"
    };
    $('#order_detail_card').LoadingOverlay('show');
    fetch(`http://localhost:3000/updateOrderStatus`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (response == null) {
                return null;
            }
            return response.json();
        })
        .then(data => {
            if (data == null) {
                return null;
            }
            $('#order_detail_card').LoadingOverlay("hide");
            if (data.updated) {
                swal(`Success`, `Order Accepted`, "success");
            } else {
                swal(`Error`, `Something went wrong, Plese try again`, "error");
            }
        }).catch(err => {
            // show error message
            $('#order_detail_card').LoadingOverlay("hide");
            swal(`Error`, `Something went wrong, Plese try again`, "error");
        })
}
