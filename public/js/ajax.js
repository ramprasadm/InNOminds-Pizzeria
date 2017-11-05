//regsuccess

$(document).on('click', '#register', function(){
var username = document.getElementById("username").value;
var pwd = document.getElementById("pwd").value;
var myusername = {
username :  username,
pwd : pwd,
regOrLogin : "Register"
}
$.ajax({
  type: "Post",
  url: "authPage",
  data : myusername,
  success: function(data){
     $("body").html(data);
	 console.log(data);
  },
  error : function(err){
  console.log(err);
  }
});
});

//login
$(document).on('click', '#Login', function(){
var username = document.getElementById("username").value;
var pwd = document.getElementById("pwd").value;
console.log(username, pwd);
var myusername = {
username :  username,
pwd : pwd,
regOrLogin : "Login"
}
$.ajax({
  type: "Post",
  url: "authPage",
  data : myusername,
  success: function(data){
     $("body").html(data);
	 console.log(data);
  },
  error : function(err){
  console.log(err);
  }
});
});
