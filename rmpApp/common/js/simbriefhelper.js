

var sbURL = "https://www.simbrief.com/api/xml.fetcher.php?username="+serviceconfig.simbrief+"&json=1"
var curData = null; 
const lineseperator='--------------------------------------------------------------------'
const lineseperatorBR = lineseperator+"\n";
const divBegin = '<div style="line-height:14px;font-size:19px"><pre>';
const divBeginWX = '<div style="font-size:21px"><pre>';
const divEnd = '</div>'

function loadSimBriefData(){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
            curData = JSON.parse(xmlHttp.responseText);
            simbriefDataLoaded();
        }
        
    }
    xmlHttp.open("GET", sbURL, true); 
    xmlHttp.send(null);
}

function hasSBData(){
    if(curData){
        return true;
    }else{
        return false;
    }
}

function getSBRoute(){
    if(curData){       
        var dataSplitted = curData.text.plan_html.split(lineseperator);
        var info = divBegin+ dataSplitted[5].split("...............")[1] + lineseperatorBR+ dataSplitted[6]+lineseperatorBR+dataSplitted[8]+divEnd;

        return info;
    } else {
        return "No Data"
    }
}

function getSBInfo(){
    var data = curData.text.plan_html.replace("font-size:13px", "font-size:19px");
    var splittedData = data.split(lineseperator);
    return splittedData[0]+lineseperatorBR+splittedData[1]+"</div>";

}

function getSBWX(){

    var data = curData.text.plan_html.split(lineseperator);
    var wxIndex = findSBSection("[ Airport WX List ]", data);
    var wxData = data[wxIndex+1].replace("AIRMETs:\n  No Wx data available\n","");
    wxData = wxData.replace("SIGMETs:\n  No Wx data available\n","");
    wxData = wxData.replace("Tropical Cyclone SIGMETs:\n  No Wx data available\n","");
    wxData = wxData.replace("Volcanic Ash SIGMETs:\n  No Wx data available\n","");
    wxData.replace("\n\n\n\n","")
    var info = divBeginWX + "[ Airport WX List ]"+lineseperatorBR;
    info+= wxData + lineseperatorBR + divEnd;

    return info;
}

function getSBFuel(){
    var data = curData.text.plan_html.split(lineseperator);
    var info = divBegin + lineseperatorBR + data[3]+lineseperatorBR+divEnd;
    return info;
}

function getSBFull(){
    return curData.text.plan_html.replace("font-size:13px", "font-size:19px");
}

function findSBSection(sectionName, splitted){
    for(i = 0; i < splitted.length; i++){
        if (splitted[i].includes("[ Airport WX List ]")){
            return i;
        }
    }
    return -1;
}