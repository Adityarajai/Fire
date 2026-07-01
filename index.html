<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>3D Mobile Strike - Full Game</title>
    <style>
        body { margin: 0; overflow: hidden; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; touch-action: none; background: #000; }
        
        /* HUD Style */
        #hud { position: absolute; top: 20px; left: 20px; color: white; pointer-events: none; z-index: 10; }
        #hp-bar-container { width: 180px; height: 15px; background: rgba(0,0,0,0.5); border: 2px solid #fff; border-radius: 10px; overflow: hidden; margin-top: 5px; }
        #hp-fill { width: 100%; height: 100%; background: #ff3b3b; transition: width 0.3s; }
        
        #crosshair { 
            position: absolute; top: 50%; left: 50%; width: 18px; height: 18px;
            border: 2px solid rgba(0,255,0,0.7); border-radius: 50%;
            transform: translate(-50%, -50%); pointer-events: none;
        }

        /* Mobile Controls */
        #joystick-area { position: absolute; bottom: 50px; left: 50px; width: 110px; height: 110px; background: rgba(255,255,255,0.15); border-radius: 50%; touch-action: none; }
        #joystick-knob { position: absolute; top: 30px; left: 30px; width: 50px; height: 50px; background: #fff; border-radius: 50%; opacity: 0.7; pointer-events: none; }
        
        #fire-btn { 
            position: absolute; bottom: 60px; right: 50px; width: 85px; height: 85px;
            background: rgba(255, 40, 40, 0.7); border: 4px solid #fff; border-radius: 50%;
            display: flex; align-items: center; justify-content: center; color: white; 
            font-weight: bold; font-size: 18px; user-select: none; -webkit-tap-highlight-color: transparent;
        }

        /* Overlays */
        .overlay { 
            position: fixed; inset: 0; background: rgba(0,0,0,0.85); 
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            color: white; z-index: 100; text-align: center;
        }
        button { padding: 15px 45px; font-size: 22px; cursor: pointer; background: #28a745; color: white; border: none; border-radius: 8px; font-weight: bold; }
        canvas { display: block; }
    </style>
</head>
<body>

    <div id="start-screen" class="overlay">
        <h1>3D BATTLE STRIKE</h1>
        <p style="margin-bottom: 20px;">Mission: Eliminate 10 Bots</p>
        <button onclick="startGame()">START MISSION</button>
    </div>

    <div id="hud">
        <div style="font-size: 20px; font-weight: bold;">KILLS: <span id="kill-count">0</span> / 10</div>
        <div style="margin-top: 10px; font-size: 14px;">SOLDIER HEALTH</div>
        <div id="hp-bar-container"><div id="hp-fill"></div></div>
    </div>
    <div id="crosshair"></div>

    <div id="joystick-area"><div id="joystick-knob"></div></div>
    <div id="fire-btn">FIRE</div>

    <script type="importmap">
        { "imports": { "three": "https://unpkg.com/three@0.160.0/build/three.module.js" } }
    </script>

    <script type="module">
        import * as THREE from 'three';

        // --- CORE VARIABLES ---
        let gameActive = false;
        let kills = 0;
        let playerHp = 100;
        let enemies = [];
        let lookDeltaX = 0, lookDeltaY = 0;
        let moveX = 0, moveZ = 0;

        // --- THREE.JS SETUP ---
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x87ceeb);
        scene.fog = new THREE.Fog(0x87ceeb, 15, 55);

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        document.body.appendChild(renderer.domElement);

        const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1.3);
        scene.add(light);

        // Environment (Ground & Buildings)
        const floor = new THREE.Mesh(
            new THREE.PlaneGeometry(200, 200),
            new THREE.MeshStandardMaterial({ color: 0x555555 })
        );
        floor.rotation.x = -Math.PI / 2;
        scene.add(floor);

        // Generate Buildings
        const buildingGeo = new THREE.BoxGeometry(1, 1, 1);
        const buildingMat = new THREE.MeshStandardMaterial({ color: 0x777777 });
        for(let i=0; i<25; i++) {
            const h = 4 + Math.random() * 12;
            const b = new THREE.Mesh(buildingGeo, buildingMat);
            b.scale.set(5, h, 5);
            b.position.set((Math.random()-0.5)*90, h/2, (Math.random()-0.5)*90);
            scene.add(b);
        }

        // Player Group
        const player = new THREE.Object3D();
        player.position.y = 1.6;
        scene.add(player);
        player.add(camera);

        // --- AUDIO ENGINE ---
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        function playSound(freq, type, duration, vol = 0.1) {
            if (audioCtx.state === 'suspended') audioCtx.resume();
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
            gain.gain.setValueAtTime(vol, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start();
            osc.stop(audioCtx.currentTime + duration);
        }

        // --- ENEMY CLASS ---
        class Enemy {
            constructor() {
                const group = new THREE.Group();
                const body = new THREE.Mesh(
                    new THREE.CapsuleGeometry(0.5, 1, 4, 8), 
                    new THREE.MeshStandardMaterial({ color: 0xff2222 })
                );
                body.position.y = 1;
                group.add(body);
                this.mesh = group;
                this.spawn();
                scene.add(this.mesh);
                this.lastShotTime = 0;
            }
            spawn() {
                this.mesh.position.set((Math.random()-0.5)*70, 0, (Math.random()-0.5)*70);
            }
            update() {
                const dist = this.mesh.position.distanceTo(player.position);
                this.mesh.lookAt(player.position.x, 0, player.position.z);
                
                if (dist > 6) {
                    this.mesh.translateZ(0.05); // Speed
                } else {
                    // AI Combat Logic
                    if (Date.now() - this.lastShotTime > 1800) {
                        playerHp -= 10;
                        playSound(120, 'sawtooth', 0.15, 0.05);
                        updateUI();
                        this.lastShotTime = Date.now();
                    }
                }
            }
        }

        // --- GAME LOGIC ---
        window.startGame = function() {
            document.getElementById('start-screen').style.display = 'none';
            resetGameLogic();
            gameActive = true;
        };

        function resetGameLogic() {
            playerHp = 100;
            kills = 0;
            player.position.set(0, 1.6, 0);
            enemies.forEach(e => scene.remove(e.mesh));
            enemies = [];
            for(let i=0; i<10; i++) enemies.push(new Enemy());
            updateUI();
        }

        function updateUI() {
            document.getElementById('kill-count').innerText = kills;
            document.getElementById('hp-fill').style.width = playerHp + "%";
            
            if(playerHp <= 0) {
                gameActive = false;
                setTimeout(() => { alert("MISSION FAILED! You were eliminated."); location.reload(); }, 100);
            }
            if(kills >= 10) {
                gameActive = false;
                setTimeout(() => { alert("VICTORY! Mission Accomplished. BOOYAH!"); location.reload(); }, 100);
            }
        }

        // --- CONTROLS ---
        const knob = document.getElementById('joystick-knob');
        document.getElementById('joystick-area').addEventListener('touchmove', (e) => {
            const touch = e.touches[0];
            const rect = e.currentTarget.getBoundingClientRect();
            const cx = rect.left + rect.width/2;
            const cy = rect.top + rect.height/2;
            let dx = touch.clientX - cx;
            let dy = touch.clientY - cy;
            const dist = Math.min(Math.sqrt(dx*dx + dy*dy), 40);
            const angle = Math.atan2(dy, dx);
            moveX = (Math.cos(angle) * dist) / 40;
            moveZ = (Math.sin(angle) * dist) / 40;
            knob.style.transform = `translate(${moveX*40}px, ${moveZ*40}px)`;
        });

        document.getElementById('joystick-area').addEventListener('touchend', () => {
            moveX = 0; moveZ = 0;
            knob.style.transform = `translate(0,0)`;
        });

        let lastX = 0, lastY = 0;
        window.addEventListener('touchstart', (e) => {
            if(e.touches[0].clientX > window.innerWidth/2) {
                lastX = e.touches[0].clientX; lastY = e.touches[0].clientY;
            }
        });

        window.addEventListener('touchmove', (e) => {
            const t = e.touches[0];
            if(t.clientX > window.innerWidth/2) {
                lookDeltaX = (t.clientX - lastX) * 0.006;
                lookDeltaY = (t.clientY - lastY) * 0.006;
                lastX = t.clientX; lastY = t.clientY;
            }
        });

        const raycaster = new THREE.Raycaster();
        document.getElementById('fire-btn').addEventListener('touchstart', (e) => {
            e.preventDefault();
            if(!gameActive) return;
            
            playSound(350, 'square', 0.08, 0.1);
            raycaster.setFromCamera(new THREE.Vector2(0,0), camera);
            const intersects = raycaster.intersectObjects(enemies.map(e => e.mesh), true);
            
            if(intersects.length > 0) {
                let hitObj = intersects[0].object;
                while(hitObj.parent && !enemies.find(e => e.mesh === hitObj)) { hitObj = hitObj.parent; }
                const idx = enemies.findIndex(e => e.mesh === hitObj);
                if(idx > -1) {
                    scene.remove(enemies[idx].mesh);
                    enemies.splice(idx, 1);
                    kills++;
                    updateUI();
                }
            }
        });

        // --- ANIMATION LOOP ---
        function animate() {
            requestAnimationFrame(animate);
            if(!gameActive) return;

            // Player Movement
            player.translateX(moveX * 0.18);
            player.translateZ(moveZ * 0.18);
            
            // Camera Rotation
            player.rotation.y -= lookDeltaX;
            camera.rotation.x -= lookDeltaY;
            camera.rotation.x = Math.max(-1.2, Math.min(1.2, camera.rotation.x));
            lookDeltaX *= 0.85; lookDeltaY *= 0.85;

            // Enemies Update
            enemies.forEach(e => e.update());

            renderer.render(scene, camera);
        }
        animate();

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    </script>
</body>
</html>
