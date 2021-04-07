curGNDMode = "BetterPushback"

bpPlanner = false;
bpStarted = false;
bpConnected = false;

function switchToGround(){
    curRadioMode = "GND";
    setMenuCallback(groundMenuCallback)
    setLineSelectCallback(groundLSCallback)
    displayGround();
    highlightMenuItem(1);
    /*if(!hasSBData()){
        document.getElementById("activeGNDsbl1").innerText = "LOADING";
        loadSimBriefData();
    }*/
    //setKeyCallback(simBriefKeyCallback);
    setStandardKeyCallback();
}


function displayGround(){
    document.getElementById("main").classList.add("hidden");
    document.getElementById("simbrief").classList.add("hidden");
    document.getElementById("ground").classList.remove("hidden");

    document.getElementById("header1").innerText = "BPB";
    document.getElementById("header2").innerText = "INOP";
    document.getElementById("header3").innerText = "INOP";
    document.getElementById("header4").innerText = "INOP";
    document.getElementById("header5").innerText = "INOP";
    document.getElementById("header6").innerText = "INOP";
    document.getElementById("header7").innerText = "BACK";

    if(bpPlanner){
        document.getElementById("activeGNDl1").innerText = "Stop Planner";
    } else {
        document.getElementById("activeGNDl1").innerText = "Start Planner";
    }
    if(bpConnected){
        document.getElementById("activeGNDl2").innerText = "Disconnect"
        document.getElementById("activeGNDm1").innerText = "CONN";
    } else {
        document.getElementById("activeGNDl2").innerText = "Connect";
        document.getElementById("activeGNDm1").innerText = "DISCO";
    }
    
    document.getElementById("activeGNDr2").innerText = "ReConn"
    if(bpStarted){
        document.getElementById("activeGNDm2").innerText = "STARTED";
    } else {
        document.getElementById("activeGNDm2").innerText = "STOPPED";
    }
    document.getElementById("activeGNDr3").innerText = "Stop";
    document.getElementById("activeGNDl3").innerText = "Start";
        
    
    
}

function groundLSCallback(btn){
    switch(btn){
        case "l1":
            if(bpPlanner){     
                bpPlanner = true;           
                sendWSMessageGND("betterpushback","stopPlanner");
                
            } else {
                bpPlanner = false;
                sendWSMessageGND("betterpushback","startPlanner");
            }            
            break;
        case "l2":
            if(bpConnected){
                sendWSMessageGND("betterpushback","disconnect");
            } else {
                sendWSMessageGND("betterpushback","connect");
            }
            break;
        case "l3":
            sendWSMessageGND("betterpushback","start");            
            break;
        case "r2":
            sendWSMessageGND("betterpushback","reconnect");
            break;
        case "r3":
            sendWSMessageGND("betterpushback","stop");
            break;
    }
    displayGround();
}

function groundMenuCallback(btn){
    var sbDataElem = document.getElementById("sbdata"); 
    sbDataElem.scroll(0,0);
    switch(btn){
        case "m1":
            curGNDMode = "BetterPushback";            
            break;
        case "m7":
            switchToVHF();
            break;
    }
}

let socketGND = createWebSocket("/ws/ground", HandleResponseGround, onOpenRadio, null);

function HandleResponseGround(obj){
    if(obj.betterpushback){
        bpConnected = obj.betterpushback.bpConnected>0;
        bpStarted = obj.betterpushback.bpStarted>0;

    }
    if(curRadioMode == "GND"){
        displayGround();
    }
    
}

function sendWSMessageGND(key,val){
    console.log("[GND] sending "+key + " "+val);
    try{
        socketGND.send("{'"+key+"':'"+val+"'}");
    } catch (e){
        console.log(e);
        setMessageLine(e.message);
    }
    
}