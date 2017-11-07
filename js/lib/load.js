// text to speech
var audio = document.getElementById('audio');
var wavsource = document.getElementById('wavsource');

// speech to text
var speech = SpeechToText;
var activeSTT;
var value;
function listen() {
    activeSTT = speech.listen({
        onStart: function (e) {
        },
        onResult: function (e) {
            console.log('transcript received: ', e.text);
            value = e.text;
            var localvalue = value;
            // stopListening();
            if (e.isFinal) {
                setFormValue(localvalue);
                localvalue = null;
                stopListening();
                //startListening();
            }
        },
        onError: function (e) {
            console.log('onError Speech event', e);
        },
        onEnd: function (e) {
            setFormValue(value);
            value = null;
            stopListening();
            //startListening();
        }
    });
}
function setFormValue(locvalue) {
    audio = document.getElementById('audio');
    wavsource = document.getElementById('wavsource');
    
    if (locvalue == null || locvalue == undefined)
        return;
    if (document.activeElement.tagName == "INPUT" && document.activeElement.type == "text") {
        document.activeElement.value = locvalue;
    } else if (document.activeElement.tagName == "INPUT" && document.activeElement.type == "password") {
        document.activeElement.value = locvalue;
    }
    else if (document.activeElement.tagName == "INPUT" && document.activeElement.type == "radio") {
        var values = locvalue.split(" ");
        setCheckedValue(document.activeElement.name, values.length > 2 ? values[1] : 'male');
    }
    else if (document.activeElement.tagName == "INPUT" && document.activeElement.type == "number") {
        document.activeElement.value = locvalue;
    }
    else if (document.activeElement.tagName == "SELECT") {
        setSelectedValue(document.activeElement, locvalue);
    }
    stopListening();
    wavsource.src = '/api/speak?text= You just said ' + document.activeElement.value;
    audio.load();
    audio.play();
}
function startListening() {
    if (activeSTT) {
        // do nothing, speech is active
    } else if (speech.isSupported) {
        listen();
    } else {
        alert('speech not supported by this browser');
    }
}

function stopListening() {
    if (activeSTT) {
        activeSTT.stop();
        activeSTT = null;
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

function addEventListener(el, eventName, handler) {
    if (el.addEventListener) {
        el.addEventListener(eventName, handler);
    } else {
        el.attachEvent('on' + eventName, function () {
            handler.call(el);
        });
    }
}

function addEventListeners(selector, type, handler) {
    var elements = document.querySelectorAll(selector);
    for (var i = 0; i < elements.length; i++) {
        addEventListener(elements[i], type, handler);
    }
}

addEventListeners('input', 'focus', function (e) {
     startListening();
 });

addEventListeners('select', 'focus', function (e) {
     startListening();
});

