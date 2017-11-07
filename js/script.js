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

function loadBillingInformation() {
    // this will be service call to fetch customer data based on customer Id
    var customer = {
        "firstName": "Derek",
        "lastName": "Puckett",
        "phone": "(954) 594-9355",
        "email": "derek.puckett@vulputate.net",
        "address": {
            "street": "P.O. Box 914, 9990 Dapibus St.",
            "city": "Quam",
            "state": "OH",
            "zip": "55154",
            "country": "USA"
        },
        "_id": {
            "$oid": "51f06ded06a7baa417000001"
        }
    };
    // country and address1 and address2 need to be added to Billing information table
    setFormElementValue("address1", customer.address.street);
    setFormElementValue("address2", customer.address.street);
    setFormElementValue("city", customer.address.city);
    setFormElementValue("state", customer.address.state);
    setFormElementValue("zip", customer.address.zip);
    setFormElementValue("country", customer.address.country);
}

function saveBillingInformation() {
    db.insert({
        street: document.getElementById("address1").value,
        state: document.getElementById("state").value,
        country: document.getElementById("country").value,
        zip: document.getElementById("zip").value,
        city: document.getElementById("city").value
    }, function (err, doc) {
        if (err) {
            console.log(err);
            return response.sendStatus(500);

        } else {
          console.log("Billing Information Saved", doc);
        }
        response.render('regSuccess');
   });
}
