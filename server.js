const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 3000 });

let players = {};
let bullets = [];
let loot = [];

let zone = {
    x: 0,
    z: 0,
    radius: 150,
    shrink: 0.03
};

/* DAMAGE SYSTEM */
function distance(a,b){
    return Math.sqrt(
        (a.x-b.x)**2 + (a.z-b.z)**2
    );
}

wss.on("connection",(ws)=>{

    let id = Math.random().toString(36).substr(2,9);

    players[id] = {
        x:(Math.random()-0.5)*100,
        y:0,
        z:(Math.random()-0.5)*100,
        hp:100,
        alive:true
    };

    ws.send(JSON.stringify({
        type:"init",
        id,
        players,
        zone,
        loot
    }));

    ws.on("message",(msg)=>{

        let data = JSON.parse(msg);

        /* MOVE */
        if(data.type==="move"){
            players[id] = {
                ...players[id],
                ...data.state
            };
        }

        /* SHOOT */
        if(data.type==="shoot"){
            bullets.push({
                owner:id,
                x:data.bullet.x,
                z:data.bullet.z,
                dir:data.bullet.dir
            });
        }

        /* LOOT */
        if(data.type==="loot"){
            loot = loot.filter(l=>l.id!==data.id);
        }
    });

    ws.on("close",()=>{
        delete players[id];
    });

    /* GAME LOOP */
    setInterval(()=>{

        /* ZONE SHRINK */
        zone.radius -= zone.shrink;
        if(zone.radius < 25) zone.radius = 25;

        /* BULLET DAMAGE */
        bullets.forEach(b=>{
            Object.keys(players).forEach(pid=>{
                if(pid===b.owner) return;

                let p = players[pid];

                let dx = p.x - b.x;
                let dz = p.z - b.z;

                if(Math.sqrt(dx*dx+dz*dz) < 2){
                    p.hp -= 20;
                    if(p.hp <= 0){
                        p.alive = false;
                    }
                }
            });
        });

        /* BROADCAST */
        wss.clients.forEach(c=>{
            if(c.readyState===1){
                c.send(JSON.stringify({
                    type:"state",
                    players,
                    bullets,
                    zone
                }));
            }
        });

    },50);

});

console.log("🔥 Fire SERVER RUNNING");
