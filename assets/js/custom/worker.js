$(document).ready(function () {
  $.LoadingOverlay('show');
  loadDashboardData(document);
});

function loadDashboardData(document) {
  loadCardData(document);
  loadTabelData(document, "orders","latest_orders_table_body");
  loadTabelData(document, "users", "latest_users_table_body");
  $.LoadingOverlay('hide');
}

function setTableBody(document, tableRowID, tableData) {
  var latestOrdersTableBodyElement = document.getElementById(tableRowID);
  let row, column;
  tableData.forEach((element) => {
    row = document.createElement("tr");
    for (let key in element) {
      if (element.hasOwnProperty(key)) {
        column = document.createElement("td");
        column.innerHTML = element[key];
        row.appendChild(column);
      }
    }
    latestOrdersTableBodyElement.appendChild(row);
  });
}

/**
 * Fetch Required Data.
 */
function loadTabelData(document, type, elementID) {
  fetch(`http://localhost:3000/getTableData?type=${type}`)
  .then(response => {return response.json()})
  .then(data => {
    setTableBody(document, "latest_orders_table_body", JSON.parse(data));
  });
}

function loadCardData(document) {
  fetch(`http://localhost:3000/getStats`)
  .then(response => {return response.json()})
  .then(data => {
    var totalUserElement = document.getElementById("total_users");
    var totalShopElement = document.getElementById("total_shops");
    var totalProductsElement = document.getElementById("total_products");
    var totalDeliveryBoysElement = document.getElementById("total_delivery_boys");
  
    totalUserElement.innerText = data.userCount;
    totalShopElement.innerText = data.shopCount;
    totalProductsElement.innerText = data.productCount;
    totalDeliveryBoysElement.innerText = data.driverCount;
  });
}
