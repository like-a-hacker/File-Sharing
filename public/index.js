(function(){
    let recid;
    const socket = io();

    function generateID(){
        return `${Math.trunc(Math.random()*999)}-${Math.trunc(Math.random()*999)}`;
    }

    document.querySelector("#submit").addEventListener("click",function(){
        let joinid = generateID();
        document.querySelector(".room").innerHTML = `<span>${joinid}</span>`;
        socket.emit("sender-join", {
            uid:joinid
        });
    });
    socket.on("init", function(uid){
        recid = uid;
        document.querySelector(".room active").classList.remove("active");
        document.querySelector(".up").classList.add("active");
    })
})