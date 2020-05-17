var pageTitelElement, navItem, titleTitle, subtitleTitle, addItemButton;

$(document).ready(function () {
  $.LoadingOverlay('show');
  pageTitelElement = document.getElementById("list_page_title");
  titleTitle = document.getElementById("table_title");
  subtitleTitle = document.getElementById("table_subtitle");
  addItemButton = document.getElementById("add_new_item_button");
  setupPage(window, document);
});

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
  $.LoadingOverlay('hide');
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
  setTableHeaders(document, getTableHeaders("orders"));
  setTableBody(document, getTableData("orders"));
}

function setupProductPage(document) {
  pageTitelElement.innerText = "Product List";
  titleTitle.innerText = "Products";
  subtitleTitle.innerText = "List of All the products";
  addItemButton.innerText = "Add new Product";
  addItemButton.href = "./add?type=product";
  navItem = document.getElementById("products_nav_item");
  navItem.classList.add("active");
  setTableHeaders(document, getTableHeaders("products"));
}

function setupUsersPage(document) {
  pageTitelElement.innerText = "Users List";
  titleTitle.innerText = "Users";
  subtitleTitle.innerText = "List of All the users";
  addItemButton.style.visibility="hidden";
  navItem = document.getElementById("users_nav_item");
  navItem.classList.add("active");
  setTableHeaders(document, getTableHeaders("users"));
}

function setupShopsPage(document) {
  pageTitelElement.innerText = "Shop Keepers List";
  titleTitle.innerText = "Shop Keepers";
  subtitleTitle.innerText = "List of All the shop keepers";
  addItemButton.innerText = "Add new Shop";
  addItemButton.href = "./add?type=shop";
  navItem = document.getElementById("shops_nav_item");
  navItem.classList.add("active");
  setTableHeaders(document, getTableHeaders("shops"));
}

function setupDeliveryBoysPage(document) {
  pageTitelElement.innerText = "Delivery Boy's List";
  titleTitle.innerText = "Delivery Boy's";
  subtitleTitle.innerText = "List of All the delivery boy's";
  addItemButton.innerText = "Add new Delivery Boy";
  addItemButton.href = "./add?type=driver";
  navItem = document.getElementById("drivers_nav_item");
  navItem.classList.add("active");
  setTableHeaders(document, getTableHeaders("drivers"));
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

function setTableBody(document, bodyData) {
  var tableHeaders = document.getElementById("table_body");
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
    tableHeaders.appendChild(row);
  });
}

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
        image_link: "IMAGE",
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
      },
    ];
  } else if (type === "drivers") {
    return [
      {
        id: "Delivery Boy ID",
        name: "Name",
        mobile_number: "Mobile Number",
        bike_number: "Bike Number",
        address:"Address"
      },
    ];
  }
}

function getTableData(c) {
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
  
