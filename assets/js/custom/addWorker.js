let productTabElemet, shopTabElemet, driverTabElemet;
$(document).ready(function () {
  setupPage(window, document);
});

function setupPage(window, document) {
  var locationValue = window.location.toString();
  var array = locationValue.split("=");
  var type = array[1];
  let productTabElemet = document.getElementById("addProduct");
  let shopTabElemet = document.getElementById("addShop");
  let driverTabElemet = document.getElementById("addDriver");
  let productTabLinkElemet = document.getElementById("addProductLink");
  let shopTabLinkElemet = document.getElementById("addShopLink");
  let driverTabLinkElemet = document.getElementById("addDriverLink");


  if (type === "product") {
    // Actual Tab
    productTabElemet.classList.add("active");
    shopTabElemet.classList.remove("active");
    driverTabElemet.classList.remove("active");
    // Tab Link
    productTabLinkElemet.classList.add("active");
    shopTabLinkElemet.classList.remove("active");
    driverTabLinkElemet.classList.remove("active");
  } else if (type === "shop") {
      // Actual Tab
    productTabElemet.classList.remove("active");
    shopTabElemet.classList.add("active");
    driverTabElemet.classList.remove("active");
    // Tab Link
    productTabLinkElemet.classList.remove("active");
    shopTabLinkElemet.classList.add("active");
    driverTabLinkElemet.classList.remove("active");
  } else if (type === "driver") {
    // Actual Tab
    productTabElemet.classList.remove("active");
    shopTabElemet.classList.remove("active");
    driverTabElemet.classList.add("active");
    // Tab Link
    productTabLinkElemet.classList.remove("active");
    shopTabLinkElemet.classList.remove("active");
    driverTabLinkElemet.classList.add("active");
  }
}

function addDriver() {
    var data = $('#add_driver_form').serialize();
    console.log(data);
}

function addShop() {
    var data = $('#add_shop_form').serialize();
    console.log(data);
}
