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
      console.log(data);
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
      console.log(data);
    },
    error: function (err) {
      console.log(err);
    }
  });
});

$(document).on('click', '#customerLogin', function () {
  var myusername = {};
  logincustomerId = '1234';
  if(productsSelected == false){
    $.ajax({
    type: "Post",
    url: "customerAuthPage",
    data: myusername,
    success: function (data) {
      $("#pageContent").html(data);
      document.getElementById('onPageContent').innerHTML = "You are in pizza selection page. Current page listed all the pizzas available to choose";
      console.log(data);
    },
    error: function (err) {
      console.log(err);
    }
  })
}
else {
  $.ajax({
    type: "Post",
    url: "customerAuthPageProceedOrder",
    data: myusername,
    success: function (data) {
      $("#pageContent").html(data);
      //document.getElementById('onPageContent').innerHTML = "You are in pizza selection page. Current page listed all the pizzas available to choose";
      console.log(data);
    },
    error: function (err) {
      console.log(err);
    }
  })
}
  
});
$(document).on('click', '#savePizzaSelection', function () {
  var myusername = {};
  $.ajax({
    type: "Post",
    url: "savePizzaSelection",
    data: myusername,
    success: function (data) {
      $("#pageContent").html(data);
      console.log(data);
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
      console.log(data);
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
      console.log(data);
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
      console.log(data);
    },
    error: function (err) {
      console.log(err);
    }
  });
});

$(document).on('click', '#saveBilling', function () {
  var myusername = {};
  $.ajax({
    type: "Post",
    url: "saveBilling",
    data: myusername,
    success: function (data) {
      $("#pageContent").html(data);
      console.log(data);
    },
    error: function (err) {
      console.log(err);
    }
  });
});
$(document).on('click', '#saveRegistration', function () {
  var myusername = {};
  $.ajax({
    type: "Post",
    url: "saveRegistration",
    data: myusername,
    success: function (data) {
      $("#pageContent").html(data);
      console.log(data);
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
      console.log(data);
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
      console.log(data);
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
          console.log(data);
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
          console.log(data);
        },
        error: function (err) {
          console.log(err);
        }
      })
  }
});
