
let HOST = serviceconfig.server;

function createWebSocket(url, onMessageCallback, onOpenCallback, onCloseCallback){
    
    var socket = new WebSocket(HOST+url);

    socket.onopen = function(e) {
       console.log("Web Socket Connected");
       socket.send("init");
       if(onOpenCallback){
            onOpenCallback(socket);
       }
    };

    socket.onmessage = function(event) {
        console.log("Message Received");
        console.log(event.data);
        var obj = JSON.parse(event.data);
        onMessageCallback(obj);
    };

    socket.onclose = function(event) {
        if (event.wasClean) {
            console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
        } else {
            // e.g. server process killed or network down
            // event.code is usually 1006 in this case
            console.log('[close] Connection died');
        }
        setTimeout(function() {
            createWebSocket(url, onMessageCallback);
          }, 5000);
    };

    socket.onerror = function(error) {
        console.log(`[error] ${error.message}`);
        socket.close();
        if(onCloseCallback){
            onCloseCallback()
        }
        
    };

    return socket;
}