//regsuccess

$(document).on('click', '#register', function () {
  var username = document.getElementById("username").value;
  var pwd = document.getElementById("pwd").value;
  var myusername = {
    username: username,
    pwd: pwd,
    regOrLogin: "Register"
  }
  $.ajax({
    type: "Post",
    url: "authPage",
    data: myusername,
    success: function (data) {
      $("body").html(data);
      //console.log(data);
    },
    error: function (err) {
      console.log(err);
    }
  });
});

//login
$(document).on('click', '#Login', function () {
  var username = document.getElementById("username").value;
  var pwd = document.getElementById("pwd").value;
  console.log(username, pwd);
  var myusername = {
    username: username,
    pwd: pwd,
    regOrLogin: "Login"
  }
  $.ajax({
    type: "Post",
    url: "authPage",
    data: myusername,
    success: function (data) {
      $("body").html(data);
      //console.log(data);
    },
    error: function (err) {
      console.log(err);
    }
  });
});

$(document).on('click', '#customerLogin', function () {
  var username = document.getElementById("userEmail").value;
  var pwd = document.getElementById("passowrd").value;
  console.log(username, pwd);
  var myusername = {
    username: username,
    pwd: pwd   
  }
    $.ajax({
    type: "Post",
    url: "customerAuthPage",
    data: myusername,
    success: function (data) {
      logincustomerId = data.customerId;
      if(productsSelected == false){
        goToProducts();
      }
      else{
        goToBilling();
      }
      
    },
    error: function (err) {
      console.log(err);
    }
  })

  
});
$(document).on('click', '#savePizzaSelection', function () {
  var myusername = {};
  $.ajax({
    type: "Post",
    url: "savePizzaSelection",
    data: myusername,
    success: function (data) {
      $("#pageContent").html(data);
      //console.log(data);
    },
    error: function (err) {
      console.log(err);
    }
  });
});

$(document).on('click', '#registration', function () {
  var myusername = {};
  $.ajax({
    type: "Post",
    url: "goToRegistration",
    data: myusername,
    success: function (data) {
      $("#pageContent").html(data);
      document.getElementById('onPageContent').innerHTML = "You are in registration form";
      //console.log(data);
    },
    error: function (err) {
      console.log(err);
    }
  });
});

$(document).on('click', '#saveToppings', function () {
  var myusername = {};
  $.ajax({
    type: "Post",
    url: "saveToppings",
    data: myusername,
    success: function (data) {
      $("#pageContent").html(data);
      //console.log(data);
    },
    error: function (err) {
      console.log(err);
    }
  });
});
$(document).on('click', '#modifyOrder', function () {
  var myusername = {};
  $.ajax({
    type: "Post",
    url: "modifyOrder",
    data: myusername,
    success: function (data) {
      $("#pageContent").html(data);
      //console.log(data);
    },
    error: function (err) {
      console.log(err);
    }
  });
});

$(document).on('click', '#saveBilling', function () {

  var data = {};
  for(var i = 0; i < selectedPizzas.length; i++) {
    delete selectedPizzas[i]['checkboxid'];
    delete selectedPizzas[i]['quantityid'];
  }
  for(var i = 0; i < selectedToppings.length; i++) {
    delete selectedToppings[i]['checkboxid'];
  }
  
  data.selectedPizzas = selectedPizzas;
  data.selectedToppings = selectedToppings;
  data.address = {};
  data.address.address1 = document.getElementById("address1").value;
  data.address.address2 = document.getElementById("address2").value;
  data.address.city = document.getElementById("city").value;
  data.address.state = document.getElementById("state").value;
  data.address.country = document.getElementById("country").value;
  data.address.zip = document.getElementById("zip").value;

  $.ajax({
    type: "Post",
    url: "saveBilling",
    data: data,
    success: function (data) {
      $("#pageContent").html(data);
      selectedPizzas = [];
      selectedToppings = [];
      //console.log(data);
    },
    error: function (err) {
      console.log(err);
    }
  });
});
$(document).on('click', '#saveRegistration', function () {
   var username = document.getElementById("given-name").value;
  var pwd = document.getElementById("pwd").value;
  var lastname = document.getElementById("family-name").value;
  var dob = document.getElementById("dob").value;
  var sex = document.getElementById("sex").value;
  var email = document.getElementById("email").value;
  var phone = document.getElementById("phone").value;
  
  var myusername = {
    username:username,
	pwd:pwd,
	lastname:lastname,
	dob:dob,
	sex:sex,
	email:email,
	phone:phone   
  }
  $.ajax({
    type: "Post",
    url: "saveRegistration",
    data: myusername,
    success: function (data) {
      $("#pageContent").html(data);
      //console.log(data);
    },
    error: function (err) {
      console.log(err);
    }
  });
});
$(document).on('click', '#saveOrder', function () {
  var myusername = {};
  $.ajax({
    type: "Post",
    url: "saveOrder",
    data: myusername,
    success: function (data) {
      $("#pageContent").html(data);
      //console.log(data);
    },
    error: function (err) {
      console.log(err);
    }
  });
});
$(document).on('click', '#newOrder', function () {
  var myusername = {};
  $.ajax({
    type: "Post",
    url: "newOrder",
    data: myusername,
    success: function (data) {
      $("#pageContent").html(data);
      //console.log(data);
    },
    error: function (err) {
      console.log(err);
    }
  })
});

$(document).on('click', '#goToBilling', function () {
  productsSelected = true;
  if(logincustomerId == null){
    $.ajax({
        type: "Post",
        url: "goToLogin",
        data: {},
        success: function (data) {
          $("#pageContent").html(data);
          //console.log(data);
        },
        error: function (err) {
          console.log(err);
        }
      })
  }
  else{
    $.ajax({
        type: "Post",
        url: "goToBilling",
        data: {},
        success: function (data) {
          $("#pageContent").html(data);
          //console.log(data);
        },
        error: function (err) {
          console.log(err);
        }
      })
  }
});
