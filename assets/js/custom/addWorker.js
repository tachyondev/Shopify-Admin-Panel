let productTabElemet, shopTabElemet, driverTabElemet;
$(document).ready(function () {
  $.LoadingOverlay('show');
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
  $.LoadingOverlay('hide');
}

function addDriver() {
  addIem("Driver", "#add_driver_form");
}

function addShop() {
  addIem("Shop", "#add_shop_form");
}

function addProduct() {
  addIem("Product", "#add_product_form");
}

// FileInput
$(".form-file-simple .inputFileVisible").click(function () {
  $(this).siblings(".inputFileHidden").trigger("click");
});

$(".form-file-simple .inputFileHidden").change(function () {
  var filename = $(this).val().replace(/C:\\fakepath\\/i, "");
  $(this).siblings(".inputFileVisible").val(filename);
});

$(
  ".form-file-multiple .inputFileVisible, .form-file-multiple .input-group-btn"
).click(function () {
  $(this).parent().parent().find(".inputFileHidden").trigger("click");
  $(this).parent().parent().addClass("is-focused");
});

$(".form-file-multiple .inputFileHidden").change(function () {
  var names = "";
  for (var i = 0; i < $(this).get(0).files.length; ++i) {
    if (i < $(this).get(0).files.length - 1) {
      names += $(this).get(0).files.item(i).name + ",";
    } else {
      names += $(this).get(0).files.item(i).name;
    }
  }
  $(this).siblings(".input-group").find(".inputFileVisible").val(names);
});

$(".form-file-multiple .btn").on("focus", function () {
  $(this).parent().siblings().trigger("focus");
});

$(".form-file-multiple .btn").on("focusout", function () {
  $(this).parent().siblings().trigger("focusout");
});

// network calls region

/**
 * Add item network call.
 */
function addIem(type, elemntID){
  let formData = $(elemntID).serialize();
  let data ={
    "type":type,
    "formData": formData
  };

  $(elemntID).LoadingOverlay("show");
  fetch("http://localhost:3000/add", {
    method:"POST",
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body:JSON.stringify(data)
  }).then(response => {
    if (response == null) {
      throw null;
    }
    return response.json();
  }).then(data => {
    $(elemntID).LoadingOverlay("hide");
    if (data.added){
      // reset form 
      $(elemntID)[0].reset();
      // show success message
      swal(`Success`, `${type} Added successfully`, "success");
      // TODO: upload Image for Product.
    }else {
      // show error message
      swal(`Error`, `Something went wrong, Plese try again`, "error");
    }
  }).catch(err => {
    // show error message
    $(elemntID).LoadingOverlay("hide");
     swal(`Error`, `Something went wrong, Plese try again`, "error");
  });
}