var curSQWK = 2000;
var curTCASMode = 0;
var curATCMode = 0;


function switchToSQWK(){
    curRadioMode = "SQWK";
    displaySQWK();
    setLineSelectCallback(sqwkLSAction);
    setStandardMenus();
    setStandardKeyCallback();
}

function displaySQWK(){
    document.getElementById("main").classList.remove("hidden");
    document.getElementById("simbrief").classList.add("hidden");
    document.getElementById("speaker1").classList.add("hidden");
    document.getElementById("activer1").classList.remove("activer1Stby");
    document.getElementById("activer1Stby").classList.add("hidden");
    
    document.getElementById("activem2").innerText = curSQWK;
    document.getElementById("activem2").classList.add("sqwkCode");
    setTCASMode(curTCASMode);
    setATCMode(curATCMode);
    document.getElementById("activer1").innerText = "SET";
    document.getElementById("activer1").classList = ["activer1"];
    document.getElementById("activer2").innerText = "";
    document.getElementById("activer3").innerText = "";
    document.getElementById("activem1").innerText = "";
    document.getElementById("activel2").innerText = "";
    document.getElementById("activem3").innerText = "";
    clearCanvas();
    //drawSeperatorLines();
}

function sqwkLSAction(btn){
    switch(btn){
        case "r1":
            newSqwk = getMessageLine();
            if(isSQWKCode(newSqwk)){
                curSQWK = getMessageLine();           
                setMessageLine(""); 
                sendWSMessage("ATCCode", curSQWK);    
            } else {
                setMessageLine("Invalid Code");
            }
            break;
        case "l1":
            curTCASMode = (curTCASMode+1) %3;
            sendWSMessage("TCASTrafficMode", curTCASMode);
            break;
        case "l3":
            curATCMode = (curATCMode+1) %3;
            sendWSMessage("ATCMode", curATCMode);
            break;
    }
    displaySQWK();

}

function setTCASMode(value){
    var al2 = document.getElementById("activel1");
    var line2 = "";
    
    if(value==0){
        line2 = "STBY"
    } else if(value==1){
        line2 = "TA";
    } else if(value==2){
        line2 = "TA/RA";
    }

    al2.innerText = line2;
}

function setATCMode(value){
    var al3 = document.getElementById("activel3");
    
    if(value==0){
        line3 = "STBY"
    } else if(value==1){
        line3 = "AUTO";
    } else if(value==2){
        line3 = "ON";
    }

    al3.innerText = line3;    
}

function isSQWKCode(val){
    return isnum(val) & val.length==4;
}

function handleRespone4SQWK(obj){
    if(obj.Radio){
        radio = obj.Radio;
        curATCCode = radio.ATCCode;
        curTCASMode = radio.TCASTrafficMode;
        curATCMode = radio.ATCMode;
        if(curRadioMode =="SQWK"){
            displaySQWK();
        }
    }
}