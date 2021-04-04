curRadioMode = "";

function runPostLoad(){
    var h1 = document.getElementById("header1");
    h1.onclick = function(){menu("m1")};
    var h2 = document.getElementById("header2");
    h2.onclick = function(){menu("m2")};
    var h3 = document.getElementById("header3");
    h3.onclick = function(){menu("m3")};
    var h4 = document.getElementById("header4");
    h4.onclick = function(){menu("m4")};
    var h5 = document.getElementById("header5");
    h5.onclick = function(){menu("m5")};
    var h6 = document.getElementById("header6");
    h6.onclick = function(){menu("m6")};
    var h7 = document.getElementById("header7");
    h7.onclick = function(){menu("m7")};

    var l1 = document.getElementById("activel1");
    l1.onclick = function(){lineSelect("l1")};
    var l2 = document.getElementById("activel2");
    l2.onclick = function(){lineSelect("l2")};
    var l3 = document.getElementById("activel3");
    l3.onclick = function(){lineSelect("l3")};
    var r1 = document.getElementById("activer1");
    r1.onclick = function(){lineSelect("r1")};
    var r2 = document.getElementById("activer2");
    r2.onclick = function(){lineSelect("r2")};
    var r3 = document.getElementById("activer3");
    r3.onclick = function(){lineSelect("r3")};

    var l1 = document.getElementById("activesbl1");
    l1.onclick = function(){lineSelect("l1")};

    
    setMenuCallback(standardMenuCallback);
    switchToVHF();
}

function setStandardMenus(){
    document.getElementById("header1").innerText = "VHF";
    document.getElementById("header2").innerText = "SQWK";
    document.getElementById("header3").innerText = "FLPL";
    document.getElementById("header4").innerText = "GND";
    document.getElementById("header5").innerText = "INOP";
    document.getElementById("header6").innerText = "INOP";
    document.getElementById("header7").innerText = "MENU";
    menuCallback = standardMenuCallback;
}

function standardMenuCallback(btn){
    switch(btn){
        case "m1":
            switchToVHF();
            break;
        case "m2":
            switchToSQWK();
            break;
        case "m3":
            switchToSimBrief();
            break;
        case "m7":
            window.location.href = "../index_radio.html";
            break;
    }
}

function appendMessageLine(message){
    var msgline = document.getElementById("msgline");
    msgline.innerText = msgline.innerText + message
}

function setMessageLine(message){
    var msgline = document.getElementById("msgline");
    if(message.length>35){
        message = message.substring(0,35);
    }
    msgline.innerText = message;
}

function getMessageLine(){
    var msgline = document.getElementById("msgline");
    return msgline.innerText;
}

function menu(btn){
    menuCallback(btn);
}

function lineSelect(btn){
    lineSelectCallback(btn);
}

function key(btn){    
    keyCallback(btn);
}

var menuCallback = empty
var lineSelectCallback = empty
var keyCallback = standardKeyCallback


function empty(btn){
    console.log(btn);
    alert(btn);
}

function setMenuCallback(f){
    menuCallback = f
}

function setLineSelectCallback(f){
    lineSelectCallback = f
}

function setKeyCallback(f){
    keyCallback = f
}

function setStandardKeyCallback(f){
    keyCallback = standardKeyCallback;
}

var lskkeys = {a:"l1",s:"l2",d:"l3",g:"r1",h:"r2",j:"r3",};
var menuKeys = {q:"m1",w:"m2",e:"m3",r:"m4",t:"m5",z:"m6",u:"m7"};
var msgLineKeys = ['0','1','2','3','4','5','6','7','8','9','.','c','f','k','ArrowUp','ArrowDown'];



function processKeys(btn){
    if( Object.keys(lskkeys).includes(btn)){
        lineSelectCallback(lskkeys[btn]);
    } else if(Object.keys(menuKeys).includes(btn)){
        menuCallback(menuKeys[btn]);
    } else if(msgLineKeys.includes(btn)){
        keyCallback(btn);
    }
}

function standardKeyCallback(btn){
    switch(btn){
        case 'c':
            var m = getMessageLine();
            if(m.length!=0){
                setMessageLine(getMessageLine().slice(0,-1));
            }
            break;
        case 'f':
            setMessageLine("");
            break;
        case 'k':
            setMessageLine("RESET");
            break;
        case 'ArrowUp':
        case 'ArrowDown':
            break;
        default:
            appendMessageLine(btn);
    }  
}


function HandleResponse(obj){
    try{
        handleRespone4VHF(obj);
    } catch (e){
        console.error(e);
    }
    try{
        handleRespone4SQWK(obj);
    } catch (e){
        console.error(e);
    }
    
}

function sendWSMessage(key,val){
    console.log("sending "+key + " "+val);
    try{
        socket.send("{"+key+":"+val+"}");
    } catch (e){
        console.log(e);
        setMessageLine(e.message);
    }
    
}

let socket = createWebSocket("/ws/pedestal", HandleResponse,onOpenRadio, null);

function onOpenRadio(socketP){
    console.log("Connection Opened");
}

function isnum(val){
    return /^\d+$/.test(val);
}

function clearCanvas(){
    var c = document.getElementById("vhfBG");
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);
}

function drawSeperatorLines(){
    var c = document.getElementById("vhfBG");
    var ctx = c.getContext("2d");

    ctx.beginPath();
    ctx.moveTo(0, 140);
    ctx.lineTo(800, 140);
    ctx.strokeStyle = "#f5f5f5";
    ctx.stroke();
    ctx.moveTo(0,280);
    ctx.lineTo(800,280);
    ctx.strokeStyle = "#f5f5f5";
    ctx.stroke()
    ctx.moveTo(0,420)
    ctx.lineTo(800,420);
    ctx.strokeStyle = "#f5f5f5";
    ctx.stroke();
}

