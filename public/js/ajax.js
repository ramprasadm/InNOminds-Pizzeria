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

$(document).on('submit', '#loginForm', function () {
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
		if(data.exist){
      logincustomerId = data.customerId;
      document.getElementById("menu-item-59").style.display = "block";
      if(productsSelected == false){
        goToProducts();
      }
      else{
        goToBilling();
      }
		}
		else{
		  document.getElementById('loginFormMessage').style.color = 'red';		  
		  document.getElementById('loginFormMessage').innerHTML = "Invalid Credentials.";
		  document.getElementById('loginFormMessage').style.display="block";
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
      document.getElementById('onPageContent').innerHTML = "You are in toppings selection page. Choose your toppings from available list";
      document.getElementById('onPageContent').focus();
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
      document.getElementById('onPageContent').innerHTML = "You are in review order page. Review your order before proceed to payment.";
      document.getElementById('onPageContent').focus();
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
      document.getElementById('onPageContent').innerHTML = "You are in order modification page. You can modify pizza selection";
      document.getElementById('onPageContent').focus();
    },
    error: function (err) {
      console.log(err);
    }
  });
});

$(document).on('submit', '#billingForm', function () {

  var data = {};
  for(var i = 0; i < selectedPizzas.length; i++) {
    delete selectedPizzas[i]['checkboxid'];
    delete selectedPizzas[i]['quantityid'];
  }
  for(var i = 0; i < selectedToppings.length; i++) {
    delete selectedToppings[i]['checkboxid'];
  }
  data.customerId = logincustomerId;
  data.selectedPizzas = selectedPizzas;
  data.selectedToppings = selectedToppings;
  data.address = {};
  data.address.address1 = document.getElementById("address1").value;
  data.address.address2 = document.getElementById("address2").value;
  data.address.city = document.getElementById("city").value;
  data.address.state = document.getElementById("state").value;
  data.address.country = document.getElementById("country").value;
  data.address.zip = document.getElementById("zip").value;
  data.address.id = addressId;
  data.address.rev =  addressRev;
  data.deliveryDate = document.getElementById("deliveryDate").value;
  $.ajax({
    type: "Post",
    url: "saveBilling",
    data: data,
    success: function (data) {
      $("#pageContent").html(data);
      selectedPizzas = [];
      selectedToppings = [];
      document.getElementById('onPageContent').innerHTML = "You are in payment page. Choose your payment option";
      document.getElementById('onPageContent').focus();
    },
    error: function (err) {
      console.log(err);
    }
  });
});
$(document).on('submit', '#registrationForm', function () {
   var username = document.getElementById("given-name").value;
  var pwd = document.getElementById("pwd").value;
  var lastname = document.getElementById("family-name").value;
  var dob = document.getElementById("dob").value;
  var sex = document.getElementById("sex").value;
  var email = document.getElementById("email").value;
  var phone = document.getElementById("phone").value;
  
  var regform = {
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
    url: "regPreAuth",
    data: regform,
    success: function (data) {
      if(data.exist){
		  document.getElementById('registrationFormMessage').style.color = 'red';		  
		  document.getElementById('registrationFormMessage').innerHTML = "User already Registered with this email address.Plese select another email.";
		  document.getElementById("registrationFormMessage").style.display="block";
	  }
	  else {
		 document.getElementById("registrationFormMessage").style.display="none"; 
		$.ajax({
			type: "Post",
			url: "saveRegistration",
			data: regform,
			success: function (data) {
			  //$("#pageContent").html(data);
			  document.getElementById("registrationFormMessage").style.display="block";			  
			  document.getElementById('registrationFormMessage').style.color = 'blue';		  
			  document.getElementById('registrationFormMessage').innerHTML = "User has successfully Registered.Please login with the credentials.";
			   
			  
			},
			error: function (err) {
			  console.log(err);
			}
		  });
	  }
      
    },
    error: function (err) {
		console.log("new");
      //console.log(err);
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
    goToBilling();
  }
});

$(document).on('click', '#proceedToPay', function () {
  document.getElementById("otpModal").style.display="block";
});
$(document).on('click', '#cancelOrder', function () {
  document.getElementById("popupcontent").innerHTML = "Order cancelled.";
  document.getElementById("onPageContent").innerHTML = "Order cancelled";
  document.getElementById("onPageContent").focus();
});
$(document).on('click', '#cancelotp', function () {
  document.getElementById("modalContent").innerHTML = "Payment Failed.";
  document.getElementById("onPageContent").innerHTML = "Payment Failed.";
  document.getElementById("onPageContent").focus();
});
$(document).on('click', '#submitotp', function () {
  document.getElementById("modalContent").innerHTML = "Payment Successful. Order successfully placed";
  document.getElementById("onPageContent").innerHTML = "Payment Successful. Order successfully placed";
  document.getElementById("onPageContent").focus();
});

$(document).on('click', '#closepopup', function () {
  document.getElementById('myModal').style.display="none";
  goToProducts();
});

