var
    d = document.querySelector("#out"),
    ws = new WebSocket("ws://127.0.0.1:9999/");

ws.onmessage = function (e) {
    console.log(e.data);
    var q = JSON.parse(e.data);
    d.setAttribute(
        "style",
        "position: absolute; top:"+q.y+"px; left:"+q.x+"px;"
    );
};

document.addEventListener("mousemove",
    function(e) {
        ws.send(
            JSON.stringify(
                {
                    x: e.clientX,
                    y: e.clientY
                }
            )
        );
    }
);
