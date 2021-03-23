function runPostIndexLoad(){
    setLineSelectCallback(radioMenuLSAction);

    var l1 = document.getElementById("activel1");
    l1.onclick = function(){window.location.href = "./common/radiomain.html";};
    var l2 = document.getElementById("activel2");
    l2.onclick = function(){window.location.href = "./common/radiomain.html";};
    // var l3 = document.getElementById("activel3");
    // l3.onclick = function(){lineSelect("l3")};
    // var r1 = document.getElementById("activer1");
    // r1.onclick = function(){lineSelect("r1")};
    // var r2 = document.getElementById("activer2");
    // r2.onclick = function(){lineSelect("r2")};
    // var r3 = document.getElementById("activer3");
    // r3.onclick = function(){lineSelect("r3")};
}

function radioMenuLSAction(btn){
    switch(btn){
        case "l1":
            window.location.href = "./common/radiomain.html";            
            break;
        case "r1":                      
            break;
        case "l2":
            window.location.href = "./common/radiomain.html";;
            break;
        case "r2":            
            break;
    }
}