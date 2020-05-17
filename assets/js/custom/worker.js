$(document).ready(function () {
  $.LoadingOverlay('show');
  loadDashboardData(document);
});

function loadDashboardData(document) {
  loadDataForCard(document);
  loadDataForTables(document, "latest_orders_table_body", loadLocalData());
  loadDataForTables(document, "latest_users_table_body", loadLocalData());
  $.LoadingOverlay('hide');
}

function loadDataForCard(document) {
  var totalUserElement = document.getElementById("total_users");
  var totalShopElement = document.getElementById("total_shops");
  var totalProductsElement = document.getElementById("total_products");
  var totalDeliveryBoysElement = document.getElementById("total_delivery_boys");

  totalUserElement.innerText = 100;
  totalShopElement.innerText = 500;
  totalProductsElement.innerText = 1000;
  totalDeliveryBoysElement.innerText = 5000;
}

function loadDataForTables(document, tableRowID, tableData) {
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

// function fetchDataFromServer(document) {
//     $.ajax({
//         method: "GET",
//         async:false,
//         url:"http://dummy.restapiexample.com/api/v1/employees",
//         success: function(data){
//             // loadDataForTables(document, "latest_orders_table_body", data.data);
//         },
//         error: function(error){
//             console.log(error);
//         }
//     });
// }

function loadLocalData() {
  return [
    {
      id: "1",
      userid: "TEST One",
      totalAmount: 100,
      status: "Received",
    },
    {
      id: "2",
      userid: "TEST Two",
      totalAmount: 200,
      status: "Received",
    },
    {
      id: "3",
      userid: "TEST Three",
      totalAmount: 100,
      status: "Received",
    },
    {
      id: "4",
      userid: "TEST Four",
      totalAmount: 100,
      status: "Received",
    },
    {
      id: "5",
      userid: "TEST Five",
      totalAmount: 100,
      status: "Received",
    },
  ];
}
