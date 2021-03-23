var curFreq1 = "118.000";
var stbFreq1 = "118.000";
var curFreq2 = "118.000";
var stbFreq2 = "118.000";

function vhfLSAction(btn){
    switch(btn){
        case "l1":
            flipFrequencies(1);            
            break;
        case "r1":           
            setFrequencyFromMessageLine(1);
            break;
        case "l2":
            flipFrequencies(2);
            break;
        case "r2":
            setFrequencyFromMessageLine(2);
            break;
    }
    displayFrequencies();
}

function setFrequencyFromMessageLine(target){    
    if(vhfFreqCheck(getMessageLine())){
        var val = getMessageLine();
        val = getFrequencyFormatted(val);
        switch(target){
            case 1:
                stbFreq1 = val;
                sendWSMessage("VHF1Stby", stbFreq1);
                break;
            case 2:
                stbFreq2 = val;
                sendWSMessage("VHF2Stby", stbFreq1);
                break;
        }
        displayFrequencies();
        setMessageLine("");       
    } else {
        setMessageLine("Invalid Frequency");
    }
}

function flipFrequencies(val){
    if(val==1){
        var t = curFreq1;
        curFreq1 = stbFreq1;
        stbFreq1 = t;
        sendWSMessage("VHF1Cur", curFreq1.replace(".",""));
        sendWSMessage("VHF1Stby", stbFreq1.replace(".",""));
    } else {
        var t = curFreq2;
        curFreq2 = stbFreq2;
        stbFreq2 = t;
        sendWSMessage("VHF2Cur", curFreq2.replace(".",""));
        sendWSMessage("VHF2Stby", stbFreq2.replace(".",""));
    }
}

function displayFrequencies(){    
    document.getElementById("main").classList.remove("hidden");
    document.getElementById("simbrief").classList.add("hidden");
    document.getElementById("speaker1").classList.remove("hidden");
    document.getElementById("activer1").classList.add("activerStby");
    document.getElementById("activer1Stby").classList.remove("hidden");
    document.getElementById("activel1").innerText = getFrequencyFormatted(curFreq1);
    document.getElementById("activer1").innerText = getFrequencyFormatted(stbFreq1);
    document.getElementById("activel2").innerText = getFrequencyFormatted(curFreq2);
    document.getElementById("activer2").innerText = getFrequencyFormatted(stbFreq2);
    document.getElementById("activel3").innerText = "DATA";
    document.getElementById("activer3").innerText = "DATA";
    document.getElementById("activem1").innerHTML = "<span class='selectChannel'>VHF1</span>";
    document.getElementById("activem2").innerText = "VHF2";
    document.getElementById("activem2").classList = ["activem2"];
    document.getElementById("activem3").innerText = "VHF3";
    clearCanvas();
    drawSeperatorLines();
    drawVHFLinesAndBoxes();
}

function getFrequencyFormatted(freq){
    freq = freq.toString().substr(0,7);
    if(freq.length<=3){
        freq = freq+".000";
    } else if(freq.length<5){
        freq = freq+"00";
    } else if(freq.length<6){
        freq = freq+"0";
    }
    if(!freq.includes(".")){
        freq = freq.substr(0,3) + "." + freq.substr(3,3);
    }
    return freq;
}

function drawVHFLinesAndBoxes(){
    var c = document.getElementById("vhfBG");
    var ctx = c.getContext("2d");
    
    ctx.beginPath();
    ctx.rect(580, 40, 190, 90);
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'cyan';
    ctx.stroke();
}

function vhfFreqCheck(value){
    var format = isnum(value.substr(0,3)) && value.substr(3,1)=="." && value.length==7 && isnum(value.substr(4,3));
    var validRange = isnum(value.substr(0,3)) && Number.parseInt(value.substr(0,3))<=137 && Number.parseInt(value.substr(0,3))>=117;

    return format&validRange;
}

function switchToVHF(){
    curRadioMode="VHF";
    displayFrequencies();
    
    setLineSelectCallback(vhfLSAction);
    setStandardMenus();
    setStandardKeyCallback();
}

function handleRespone4VHF(obj){
    if(obj.Radio){
        radio = obj.Radio;
        curFreq1 = radio.VHF1Cur;     
        stbFreq1 = radio.VHF1Stby;  
        curFreq2 = radio.VHF2Cur;
        stbFreq2 = radio.VHF2Stby;  
        if(curRadioMode == "VHF"){
            displayFrequencies();
        }
    }
}