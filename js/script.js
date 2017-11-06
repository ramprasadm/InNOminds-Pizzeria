function onFocus(divId){
    document.getElementById(divId).classList.add('productFocus');
}

function onBlur(divId){
    document.getElementById(divId).classList.remove('productFocus');
}