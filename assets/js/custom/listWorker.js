var pageTitelElement, navItem, titleTitle, subtitleTitle, addItemButton;

$(document).ready(function () {
  $.LoadingOverlay("show");
  pageTitelElement = document.getElementById("list_page_title");
  titleTitle = document.getElementById("table_title");
  subtitleTitle = document.getElementById("table_subtitle");
  addItemButton = document.getElementById("add_new_item_button");
  setupPage(window, document);
});

// local functions
function setupPage(window, document) {
  var locationValue = window.location.toString();
  var array = locationValue.split("=");
  var type = array[1];
  if (type === "orders") {
    setupOrdersPage(document);
  } else if (type === "products") {
    setupProductPage(document);
  } else if (type === "users") {
    setupUsersPage(document);
  } else if (type === "shops") {
    setupShopsPage(document);
  } else if (type === "drivers") {
    setupDeliveryBoysPage(document);
  }
  $.LoadingOverlay("hide");
}

function setupOrdersPage(document) {
  pageTitelElement.innerText = "Orders List";
  titleTitle.innerText = "Orders";
  subtitleTitle.innerText = "List of All the orders";
  // addItemButton.innerText = "Add new order";
  // addItemButton.href = "./add?type=orders";
  addItemButton.style.visibility = "hidden";
  navItem = document.getElementById("orders_nav_item");
  navItem.classList.add("active");
  setupTable(document, "orders");
}

function setupProductPage(document) {
  pageTitelElement.innerText = "Product List";
  titleTitle.innerText = "Products";
  subtitleTitle.innerText = "List of All the products";
  addItemButton.innerText = "Add new product";
  addItemButton.href = "./add?type=product";
  navItem = document.getElementById("products_nav_item");
  navItem.classList.add("active");
  setupTable(document, "products");
}

function setupUsersPage(document) {
  pageTitelElement.innerText = "Users List";
  titleTitle.innerText = "Users";
  subtitleTitle.innerText = "List of All the users";
  addItemButton.style.visibility = "hidden";
  navItem = document.getElementById("users_nav_item");
  navItem.classList.add("active");
  setupTable(document, "users");
}

function setupShopsPage(document) {
  pageTitelElement.innerText = "Shop Keepers List";
  titleTitle.innerText = "Shop Keepers";
  subtitleTitle.innerText = "List of All the shop keepers";
  addItemButton.innerText = "Add new Shop";
  addItemButton.href = "./add?type=shop";
  navItem = document.getElementById("shops_nav_item");
  navItem.classList.add("active");
  setupTable(document, "shops");
}

function setupDeliveryBoysPage(document) {
  pageTitelElement.innerText = "Delivery Boy's List";
  titleTitle.innerText = "Delivery Boy's";
  subtitleTitle.innerText = "List of All the delivery boy's";
  addItemButton.innerText = "Add new Delivery Boy";
  addItemButton.href = "./add?type=driver";
  navItem = document.getElementById("drivers_nav_item");
  navItem.classList.add("active");
  setupTable(document, "drivers");
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

function setTableBody(document, bodyData, hasAction, type) {
  var tableBody = document.getElementById("table_body");
  let row, column;
  bodyData.forEach((element) => {
    row = document.createElement("tr");
    for (let key in element) {
      if (element.hasOwnProperty(key)) {
        column = document.createElement("td");
        column.innerHTML = element[key];
        row.appendChild(column);
      }
    }
    if (hasAction) {
      let action = document.createElement("td");
      action.innerHTML = '<button type="button"  id="remove_item_button" class="btn btn-danger" onclick=removeClickListener("' + type + '")>' + 'Remove ' + type + '</button>';
      action.classList.add('td-actions');
      action.classList.add('text-center');
      row.appendChild(action);
    }
    tableBody.appendChild(row);
  });
}


/**
 * Static header for the table.
 */
function getTableHeaders(type) {
  if (type === "orders") {
    return [
      {
        id: "Order ID",
        name: "User Name",
        total_price: "Cart Price",
        status: "Status",
      },
    ];
  } else if (type === "products") {
    return [
      {
        id: "Product ID",
        name: "Product Name",
        sell_price: "Sell Price",
        actual_price: "Actual Price",
        image_link: "Product Image",
        action: "Actions",
      },
    ];
  } else if (type === "users") {
    return [
      {
        id: "User ID",
        name: "User Name",
        mobile_number: "Mobile Number",
        location: "Location",
        referral: "Referred By",
        own_referral: "Number Of referrals",
      },
    ];
  } else if (type === "shops") {
    return [
      {
        id: "Shop ID",
        name: "Shop Name",
        owners_name: "Owner's Name",
        location: "Address",
        mobile_number: "Mobile Number",
        action: "Actions",
      },
    ];
  } else if (type === "drivers") {
    return [
      {
        id: "Delivery Boy ID",
        name: "Name",
        mobile_number: "Mobile Number",
        bike_number: "Bike Number",
        address: "Address",
        action: "Actions",
      },
    ];
  }
}

// network calls region

/**
 * Remove item from the list. 
 */
function removeClickListener(forWhich) {
  //TODO: read ID from table.
  swal({
    text: 'Enter the id for the ' + forWhich + ' (First column from the table)',
    input: "number",
    showCancelButton: true,
  })
    .then(inputData => {
      if (inputData.value == 0) {
        return;
      }
      let data = {
        id: inputData.value,
        type: forWhich,
      };
      return fetch(`http://localhost:3000/delete`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
      });
    })
    .then(results => {
      if (results == null) {
        return swal("Invalid id, Please enter valid ID and try again");
      }
      return results.json();
    })
    .then(json => {
      if (json.deleted) {
        return swal("Deleted. Please refresh page.");
      } else {
        return swal("Somthing went wrong, Please try again")
      }
    })
    .catch(err => {
      if (err) {
        swal("Oh noes!", "The AJAX request failed! Please contact Developer", "error");
      } else {
        swal.stopLoading();
        swal.close();
      }
    });
}


/**
 * Fetch data from given type.
 */
function setupTable(document, type) {
  fetch(`http://localhost:3000/getTableData?type=${type}`)
  .then(response => {return response.json()})
  .then(data=>{
    let tableHeaders = getTableHeaders(type);
    let tableData = JSON.parse(data);
    setTableHeaders(document, tableHeaders);
    setTableBody(document, tableData, tableHeaders[0].action, "Product");
  });
}

// region
