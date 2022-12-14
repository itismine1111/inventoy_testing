$(document).ready(function () {
  console.log("ready!");
  var URL_GET_ALL_LOCATIONS = "/api/get-all-locations/";
  var URL_GET_ALL_GROUPS = "/api/get-all-groups/";
  var URL_GET_ALL_CATEGORIES = "/api/get-all-categories/";
  var URL_GET_ALL_SUPPLIERS = "/api/get-all-suppliers/";
  var URL_POST_CREATE_INVENTORY = "/api/create-inventory/"
  var BASE_URL = "127.0.0.1:8000";
  var URL_LOGIN = BASE_URL + "/login/";

  var token = window.localStorage.getItem("token");
  if (!token) {
    // redirect to login page
    window.location.href = "//" + URL_LOGIN;
  }
  var token_string = "token " + token;

  // Fill the Location Options
  $.ajax({
    type: "GET",
    url: URL_GET_ALL_LOCATIONS,
    beforeSend: function (xhr) {
      xhr.setRequestHeader("Authorization", token_string);
    },
    success: function (json_data) {
      // alert(json_data);
      if (json_data["success"] === true) {
        populateTheRadioButtons(
          (data = json_data),
          (div_id = "#location-radio-btns"),
          (field_name = "Location")
        );
      }
    },
    error: function (json_data) {
      // alert("ERROR");
      console.log("ERROR URL GET ALL LOCATIONS");
    },
  });

  // Fill the Group Options
  $.ajax({
    type: "GET",
    url: URL_GET_ALL_GROUPS,
    beforeSend: function (xhr) {
      xhr.setRequestHeader("Authorization", token_string);
    },
    success: function (json_data) {
      // alert(json_data);
      if (json_data["success"] === true) {
        populateTheRadioButtons(
          (data = json_data),
          (div_id = "#group-radio-btns"),
          (field_name = "Group")
        );
      }
    },
    error: function (json_data) {
      // alert("ERROR");
      console.log("ERROR URL GET ALL Groups");
    },
  });

  // Fill the Catgories Options
  $.ajax({
    type: "GET",
    url: URL_GET_ALL_CATEGORIES,
    beforeSend: function (xhr) {
      xhr.setRequestHeader("Authorization", token_string);
    },
    success: function (json_data) {
      // alert(json_data);
      if (json_data["success"] === true) {
        populateTheRadioButtons(
          (data = json_data),
          (div_id = "#category-radio-btns"),
          (field_name = "Category")
        );
      }
    },
    error: function (json_data) {
      // alert("ERROR");
      console.log("ERROR URL GET ALL Categories");
    },
  });

  function populateTheRadioButtons(data, div_id, field_name) {
    console.log(data);
    console.log(div_id);
    console.log(field_name);
    parent_div = document.querySelector(div_id);
    var radio_btn_id;
    for (let i = 0; i < data["data"]["count"]; i++) {
      radio_btn_id = field_name + String(data["data"]["list"][i]["id"]);
      $("<input>")
        .attr({
          type: "radio",
          id: radio_btn_id,
          name: field_name,
          value: data["data"]["list"][i]["id"],
          class: "check",
        })
        .appendTo(parent_div);

      $("<label>")
        .attr({
          htmlFor: radio_btn_id,
        })
        .html(data["data"]["list"][i]["name"])
        .appendTo(parent_div);
    }
  }

  // FILL THE SUPPLIERS OPTIONS LIST
  $.ajax({
    type: "GET",
    url: URL_GET_ALL_SUPPLIERS,
    beforeSend: function (xhr) {
      xhr.setRequestHeader("Authorization", token_string);
    },
    success: function (json_data) {
      // alert(json_data);
      if (json_data["success"] === true) {
        $("#Supplier").html("");
        $("#Supplier").append($("<option>").val(0).text("Select Suppliers.."));
        for (let i = 0; i < json_data["data"]["count"]; i++) {
          $("#Supplier").append(
            $("<option>")
              .val(json_data["data"]["list"][i]["id"])
              .text(json_data["data"]["list"][i]["name"])
          );
        }
      }
    },
    error: function (json_data) {
      // alert("ERROR");
      console.log("ERROR GET SUPPLIER DATA");
    },
  });

  // Change the name of categories-options, when a new option is selected
  // Call the get products api on the selected option and fill the products
  $("#Supplier").change(function () {
    var value = $(this).val();
    // alert("Supplier olptions changed");
  });

  // var formdata = {
  //     units: parseFloat(units),
  //     product_id: product_id,
  //     unit_measure: unit_measure,
  //     lot_number: lot_number,
  //     date: date,
  //     user: user,
  //   };

  var submit_btn = document.querySelector("#new-entry-submit-btn");
  submit_btn.addEventListener("click", () => {
    var form = document.querySelector("#new-product-form");
    const formData = new FormData(form);

    for (var [key, value] of formData.entries()) {
      console.log(key, value);
    }

    $.ajax({
      type: "POST",
      url: URL_POST_CREATE_INVENTORY,
      data: $("#new-product-form").serialize( ),
      beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", token_string);
      },
      success: function (json_data) {
        if (json_data["success"] === true) {
          alert("SUCCESS");
        }
      },
      error: function (json_data) {
        console.log("ERROR POST CREATE INVENTORY");
      },
    });

    // console.log(formData.entries());
  });


  image_input = document.querySelector("#Image");
  image_input.addEventListener("change", (event) => {
    var product_preview_img = document.querySelector("#product-preview-img");
    product_preview_img.src = URL.createObjectURL(event.target.files[0]);
  });
});
