function onFocus(divId){
    document.getElementById(divId).classList.add('productFocus');
}

function onBlur(divId){
    document.getElementById(divId).classList.remove('productFocus');
}
function setFormElementValue(id, value) {
    var element = document.getElementById(id);
    if (value == null || value == undefined || element == null || element == undefined)
        return;
    if (element.tagName == "INPUT" && element.type == "text") {
        element.value = value;
    } else if (element.tagName == "INPUT" && element.type == "password") {
        element.value = value;
    }
    else if (element.tagName == "INPUT" && element.type == "radio") {
        setCheckedValue(element.name, value);
    }
    else if (element.tagName == "INPUT" && element.type == "number") {
        element.value = value;
    }
    else if (element.tagName == "SELECT") {
        setSelectedValue(element, value);
    }
}

function setSelectedValue(selectObj, valueToSet) {
    for (var i = 0; i < selectObj.options.length; i++) {
        if (selectObj.options[i].value == valueToSet.toLowerCase()) {
            selectObj.options[i].selected = true;
            return;
        }
    }
}

function setCheckedValue(groupName, value) {
    var radios = document.getElementsByName(groupName);
    for (i = 0; i < radios.length; i++) {
        if (radios[i].value == value) {
            return radios[i].checked = true;
        }
    }
    return null;
}

function loadBillingInformation(data) {
    addressId = data.id;
    addressRev = data.rev;
    setFormElementValue("address1", data.address1);
    setFormElementValue("address2", data.address2);
    setFormElementValue("city", data.city);
    setFormElementValue("state", data.state);
    setFormElementValue("zip", data.zip);
    setFormElementValue("country", data.country);
}

var selectedPizzas = [];
var selectedToppings = [];
var productsSelected = false;
var logincustomerId = null;
var addressId = null;
var addressRev = null;
var orderId = null;

function addRemovePizza(pizzaDetails){
    var checked = document.getElementById(pizzaDetails.checkboxid).checked;
    console.log("checkbox checked: "+checked);
    if(checked){
        selectedPizzas.push(pizzaDetails);
        document.getElementById(pizzaDetails.quantityid).removeAttribute("disabled");
        document.getElementById(pizzaDetails.quantityid).value = "1";
       // document.getElementById(pizzaDetails.quantityid).option[0].disabled = "disabled";
    }
    else{
        var deleteIndex = -1;
        for(i=0; i<selectedPizzas.length; i++){
            if(selectedPizzas[i].checkboxid == pizzaDetails.checkboxid){
                deleteIndex = i;
                document.getElementById(pizzaDetails.quantityid).disabled = "disabled";
                document.getElementById(pizzaDetails.quantityid).value = "";
            }
        }
        if(deleteIndex != -1){
            selectedPizzas.splice(deleteIndex, 1);
        }
    }
    console.log("selected Pizzas : "+selectedPizzas);
}

function updateQuantity(pizzaQuantity){
        for(i=0; i<selectedPizzas.length; i++){
            if(selectedPizzas[i].checkboxid == pizzaQuantity.checkboxid){
                selectedPizzas[i].quantity = document.getElementById(pizzaQuantity.quantityid).value;
            }
        }
}

function loadSelectedPizzas(){
    for(i=0; i<selectedPizzas.length; i++){
            document.getElementById(selectedPizzas[i].quantityid).removeAttribute("disabled");
            document.getElementById(selectedPizzas[i].quantityid).value = selectedPizzas[i].quantity;
            document.getElementById(selectedPizzas[i].checkboxid).checked = "checked";
        }
}

function addRemoveTopping(toppingDetails){
    var checked = document.getElementById(toppingDetails.checkboxid).checked;
    console.log("checkbox checked: "+checked);
    if(checked){
        selectedToppings.push(toppingDetails);
    }
    else{
        var deleteIndex = -1;
        for(i=0; i<selectedPizzas.length; i++){
            if(selectedToppings[i].checkboxid == toppingDetails.checkboxid){
                deleteIndex = i;
            }
        }
        if(deleteIndex != -1){
            selectedToppings.splice(deleteIndex, 1);
        }
    }
    console.log("selected Toppings : "+selectedToppings);
}
function loadSelectedToppings(){
    for(i=0; i<selectedToppings.length; i++){
            document.getElementById(selectedToppings[i].checkboxid).checked = "checked";
        }
}

function loadPendingOrders(){
    var tr = "";
    var total = 0;
    for(i=0; i<selectedPizzas.length; i++){
         tr += "<tr><td>"+selectedPizzas[i].name+"</td>";
         tr += "<td>"+selectedPizzas[i].quantity+"</td>";
         tr += "<td style='align:right;'>"+selectedPizzas[i].price+"</td>";
         tr += "<td style='align:right;'>"+(selectedPizzas[i].quantity*selectedPizzas[i].price)+"</td></tr>";
         total += (selectedPizzas[i].quantity*selectedPizzas[i].price);
    }
    for(i=0; i<selectedToppings.length; i++){
         tr += "<tr><td>"+selectedToppings[i].name+"</td>";
         tr += "<td></td>";
         tr += "<td style='align:right;'>"+selectedToppings[i].price+"</td>";
         tr += "<td style='align:right;'>"+selectedToppings[i].price+"</td></tr>";
         total += selectedToppings[i].price;
    }
    tr += "<tr><td>Total</td><td></td><td></td><td style='align:right;'>"+total+"</td></tr>"
    document.getElementById("pendingorders").innerHTML = tr;
}

function loadOrdersTable(orders) {
    var selectedPizzas = [];
    var selectedToppings = [];
    var tr = "";
    var total = 0;
    if (orders != null && orders.length == 0)
    {
        document.getElementById("ordersTable").innerHTML = "<span style='font-size:30px;font-weight:bold;'>You don't have any orders</span>";
        return;
    }

    for (order in orders) {
        selectedPizzas = orders[order].selectedPizzas == undefined ? [] : orders[order].selectedPizzas;
        selectedToppings = orders[order].selectedToppings == undefined ? [] : orders[order].selectedToppings ;
        tr+="OrderId  :<span style='font-weight:bold'>"+ (orders[order]._id == undefined ? '        ':orders[order]._id) +"</span><span style='margin-right:30px;'></span>";
        tr+="Order Delivery Date  :<span style='font-weight:bold'>"+ (orders[order].deliveryDate == undefined ? '':orders[order].deliveryDate) +"</span><span style='margin-right:30px;'></span>";
        tr+="OrderStatus  :<span style='font-weight:bold'>"+ (orders[order].orderStatus == undefined ? '        ':orders[order].orderStatus) +"</span><span style='margin-right:30px;'></span>";
        tr+="<table>";
        tr+='<tr><th scope="col">Item</th><th scope="col">Quantity</th><th scope="col">unit Price</th><th scope="col">Total Price</th></tr>';
        tr+="<tbody>"
        for (i = 0; i < selectedPizzas.length; i++) {
            tr += "<tr><td>" + selectedPizzas[i].name + "</td>";
            tr += "<td>" + selectedPizzas[i].quantity + "</td>";
            tr += "<td style='align:right;'>" + selectedPizzas[i].price + "</td>";
            tr += "<td style='align:right;'>" + (selectedPizzas[i].quantity * selectedPizzas[i].price) + "</td></tr>";
            total += parseInt(selectedPizzas[i].quantity * selectedPizzas[i].price);
        }
        for (i = 0; i < selectedToppings.length; i++) {
            tr += "<tr><td>" + selectedToppings[i].name + "</td>";
            tr += "<td></td>";
            tr += "<td style='align:right;'>" + selectedToppings[i].price + "</td>";
            tr += "<td style='align:right;'>" + selectedToppings[i].price + "</td></tr>";
            total += parseInt(selectedToppings[i].price);
        }
        tr += "<tr><td>Total</td><td></td><td></td><td style='align:right;'>" + total + "</td></tr></tbody>"
        tr+="</table><br>";
    }
    
    document.getElementById("ordersTable").innerHTML = tr;
}


function goToProducts(){
    $.ajax({
    type: "Post",
    url: "goToProducts",
    data: {},
    success: function (data) {
      $("#pageContent").html(data);
      document.getElementById('onPageContent').innerHTML = "You are in pizza selection page. Current page listed all the pizzas available to choose";
      document.getElementById('onPageContent').focus();
    },
    error: function (err) {
      console.log(err);
    }
  })
}

function goToBilling(){
    $.ajax({
    type: "Post",
    url: "goToBilling",
    data: {},
    success: function (data) {
      $("#pageContent").html(data);
      document.getElementById('onPageContent').innerHTML = "You are in billing address page. Provide your billing address to deliver";
      document.getElementById('onPageContent').focus();
    },
    error: function (err) {
      console.log(err);
    }
  })
}

function goToOrders(){
    $.ajax({
    type: "Post",
    url: "goToOrders",
    data: {customerId:logincustomerId},
    success: function (data) {
      $("#pageContent").html(data);
      document.getElementById('onPageContent').innerHTML = "You are in My Orders page.";
      document.getElementById('onPageContent').focus();
    },
    error: function (err) {
      console.log(err);
    }
  })
}

function updateOrderStatus(status){
    $.ajax({
    type: "Post",
    url: "updateOrder",
    data: {orderId:orderId, status:status},
    success: function (data) {
      //$("#pageContent").html(data);
      orderId = null;
    },
    error: function (err) {
      console.log(err);
    }
  })
}

function goToContactus(){
    $.ajax({
    type: "Post",
    url: "goToContactus",
    data: {},
    success: function (data) {
      $("#pageContent").html(data);
       document.getElementById('onPageContent').innerHTML = "You can request a call or chat with representative";
       document.getElementById('onPageContent').focus();
    },
    error: function (err) {
      console.log(err);
    }
  })
}

function goToLogin(){
    $.ajax({
        type: "Post",
        url: "goToLogin",
        data: {},
        success: function (data) {
          $("#pageContent").html(data);
          document.getElementById('onPageContent').innerHTML = "You are in login form. Provide your credentials to Sign in your account";
          document.getElementById('onPageContent').focus();
        },
        error: function (err) {
          console.log(err);
        }
    })
}

function logOut(){
selectedPizzas = [];
selectedToppings = [];
productsSelected = false;
logincustomerId = null;
addressId = null;
addressRev = null;
orderId = null;
 document.getElementById("menu-item-59").style.display = "none";
 document.getElementById("menu-item-417").style.display = "none";
}