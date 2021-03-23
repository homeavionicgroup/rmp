
curSBMode = "plan"

function switchToSimBrief(){
    curRadioMode = "SIMBRIEF";
    setMenuCallback(simBriefMenuCallback)
    setLineSelectCallback(simBriefLSCallback)
    displaySimBrief();
    /*if(!hasSBData()){
        document.getElementById("activesbl1").innerText = "LOADING";
        loadSimBriefData();
    }*/
    setKeyCallback(simBriefKeyCallback);
}

function displaySimBrief(){
    document.getElementById("main").classList.add("hidden");
    document.getElementById("simbrief").classList.remove("hidden");

    document.getElementById("header1").innerText = "PLAN";
    document.getElementById("header2").innerText = "RTE";
    document.getElementById("header3").innerText = "WX";
    document.getElementById("header4").innerText = "FUEL";
    document.getElementById("header5").innerText = "FULL";
    document.getElementById("header6").innerText = "TEST";
    document.getElementById("header7").innerText = "BACK";
}

function simBriefLSCallback(btn){
    switch(btn){
        case "l1":
            document.getElementById("activesbl1").innerText = "LOADING";
            loadSimBriefData();
            break;
    }
}

function simBriefMenuCallback(btn){
    var sbDataElem = document.getElementById("sbdata"); 
    sbDataElem.scroll(0,0);
    switch(btn){
        case "m1":
            curSBMode = "plan";
            showSBData();
            break;
        case "m2":
            curSBMode = "rte";
            showSBData();
            break;
        case "m3":
            curSBMode = "wx";
            showSBData();
            break;
        case "m4":
            curSBMode = "fuel";
            showSBData();
            break;
        case "m5":
            curSBMode = "full";
            showSBData();
            break;
        case "m7":
            switchToVHF();
            break;
    }
}

function simBriefKeyCallback(btn){
    var sbDataElem = document.getElementById("sbdata"); 
    switch(btn){
        case "ArrowUp":
            sbDataElem.scrollBy(0,-30);            
            break;
        case "ArrowDown":
            sbDataElem.scrollBy(0,30);
            break;
    }
}

function simbriefDataLoaded(){
    document.getElementById("activesbl1").innerText = "RELOAD";
    showSBData();
}

function showSBData(){
    var sbDataElem = document.getElementById("sbdata");
    switch(curSBMode){        
        case "plan":
            sbDataElem.innerHTML = getSBInfo();
            break;
        case "rte":   
            sbDataElem.innerHTML = getSBRoute();         
            break;
        case "wx":
            sbDataElem.innerHTML = getSBWX();
            break;
        case "fuel":
            sbDataElem.innerHTML = getSBFuel();
            break;
        case "full":
            sbDataElem.innerHTML = getSBFull();
            break;
    }
}