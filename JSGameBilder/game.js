let KEY_SPACE = false; //32
let KEY_UP = false; //38
let KEY_DOWN = false; // 40
let KEY_RIGHT = false; // 40
let KEY_LEFT = false; // 40
let KEY_Q = false; // 81
let KEY_E = false; // 69
let canvas;
let ctx;
let backgroundImage = new Image();
let score = 10;
let scoreBoard = [];
let updateVar;
let createUfoVar;
let checkForCollisionVar;
let createBulletsVar;
let updateUfoSpawnVar;
let updateSpeedIndicator = 0;
let ufoSpeed = 5;
document.cookie = "username=Michi";
let invertedUfos = [];

let rocket = {
    x: 100,
    y: 200,
    width: 60,
    height: 80,
    src: 'rocket.png'
}
 
let ufo = {
    x: 600,
    y: 120,
    width: 160,
    height: 80,
    src: 'ufo.png',
    hit: false
}

let invertedUfo = {
    x: 0,
    y: 120,
    width: 120,
    height: 60,
    src: 'ufo.png',
    img: new Image()
};

let ufos = [];

let bullets = [];
let invertedBullets = [];
let ammo = {
    currentMag: 100,
    standardMag: 100
};

document.onkeydown = function(e){
    console.log(e.keyCode)
    if(e.keyCode == 32){ //Leertaste gedrückt
        KEY_SPACE = true;
    }

    if(e.keyCode == 69){
        KEY_E = true;
    }

    if(e.keyCode == 81){
        KEY_Q = true;
    }

    if(e.keyCode == 37 && !rocket.hit){
        KEY_LEFT = true;
    }

    if(e.keyCode == 38 && !rocket.hit){
        KEY_UP = true;
    }

    if(e.keyCode == 39 && !rocket.hit){
        KEY_RIGHT = true;
    }

    if(e.keyCode == 40 && !rocket.hit){
        KEY_DOWN = true;
    }
}

document.onkeyup = function(e){
    if(e.keyCode == 32 && !rocket.hit){
        KEY_SPACE = false;
    }

    if(e.keyCode == 69 && !rocket.hit){
        KEY_E = false;
    }

    if(e.keyCode == 81 && !rocket.hit){
        KEY_Q = false;
    }

    if(e.keyCode == 37 && !rocket.hit){
        KEY_LEFT = false;
    }

    if(e.keyCode == 38 && !rocket.hit){
        KEY_UP = false;
    }

    if(e.keyCode == 39 && !rocket.hit){
        KEY_RIGHT = false;
    }

    if(e.keyCode == 40 && !rocket.hit){
        KEY_DOWN = false;
    }
}

function startGame(){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    document.getElementById('ammo').innerHTML = `${ammo.currentMag}`;
    loadImages();
    updateVar = setInterval(update, 1000 / 25);
    createUfoVar = setInterval(function(){createUfos(700); } , 5000);
    checkForCollisionVar = setInterval(checkForCollision, 5000 / 25);
    createBulletsVar = setInterval(createBullets, 1000 / 10);
    updateUfoSpawnVar = setInterval(updateUfoSpawn, 1000 / 25);
    draw();
}

function checkForCollision(){
    ufos.forEach(function(ufo){
        if(!ufo.hit && rocket.x + rocket.width > ufo.x 
        && rocket.y + rocket.height > ufo.y 
        && rocket.x < ufo.x 
        && rocket.y < ufo.y){
            rocket.img.src = 'explosion.png';
            rocket.hit = true;
            console.log('Collision!');
            ufos = ufos.filter(u => u != ufo);
        }
        
        bullets.forEach(function(bullet){
            if(!ufo.hit && bullet.x + bullet.width > ufo.x
            && bullet.y + bullet.height > ufo.y
            && bullet.x < ufo.x
            && bullet.y < ufo.y + ufo.height)
            {
                resetAmmo();
                ufo.hit = true;
                ufo.img.src = 'explosion.png';
                console.log('DEFEATED!');
                
                score += 1;
                updateSpeedIndicator += 1;
                document.getElementById('scoreText').innerHTML = score;

                setTimeout(() => {
                    ufos = ufos.filter(u => u != ufo); 
                }, 2000);
            }
        });
    });  
}

function createBullets(){
    if  (KEY_E && !rocket.hit || KEY_Q && !rocket.hit)  {
        let bullet = {
            x: rocket.x + 80,
            y: rocket.y + 22,
            width: 40,
            height: 10,
            src: 'bullet.png',
            img: new Image()
        };
        bullet.img.src = bullet.src;
        bullets.push(bullet);

        let invertedBullet = {
            x: rocket.x /*+ 110*/,
            y: rocket.y /*+ 22*/,
            width: 40,
            height: 10,
            src: 'bullet.png',
            img: new Image()
        };
        invertedBullet.img.src = invertedBullet.src;
        invertedBullets.push(invertedBullet);
    }
}

function createInvertedBullets(){
    let invertedBullet = {
        x: rocket.x + 110,
        y: rocket.y + 22,
        width: 40,
        height: 10,
        src: 'bullet.png',
        img: new Image()
    };
    invertedBullet.img.src = invertedBullet.src;
    invertedBullets.push(invertedBullet);
}

function createUfos(_xValue){
    let ufo = {
        x: _xValue,
        y: Math.floor(Math.random() * 305),
        width: 120,
        height: 60,
        src: 'ufo.png',
        img: new Image()
    };
    ufo.img.src = ufo.src;
    ufos.push(ufo);
}

function createInvertedUfos(){
    let invertedUfo = {
        x: 200,
        y: Math.floor(Math.random() * 305),
        width: 120,
        height: 60,
        src: 'ufo.png',
        img: new Image()
    };
    invertedUfo.img.src = invertedUfo.src;
    invertedUfos.push(invertedUfo);
}

function updateUfoSpawn(){
    if(updateSpeedIndicator == 3){
            updateSpeedIndicator = 0;
            ufoSpeed += 1;
        } 

    if(score >= 10){
        setInterval(createInvertedUfos, 5000);
    }
} 

function update(){
    if(KEY_Q || KEY_E){
        if(ammo != 0){
            ammo.currentMag -= 1;
        }
        document.getElementById('ammo').innerHTML = `${ammo.currentMag}`;
    }

    if(ammo.currentMag == 0 && !rocket.defeated){
        SetGameOver();              
    }

    if(rocket.defeated){
        rocket.x += 0;
        rocket.y += 0;
    }

    if(rocket.hit && !rocket.defeated){
        SetGameOver();
    }

    else if(KEY_UP){
        rocket.y -= 4; 
    }

    else if(KEY_DOWN){
        rocket.y += 4; 
    }

    else if(KEY_RIGHT){
        rocket.x += 4; 
    }

    else if(KEY_LEFT){
        rocket.x -= 4; 
    }

    bullets.forEach(function(bullet){
            if(!ufo.hit){
                bullet.x += 10;
            }
        });

    invertedBullets.forEach(function(invertedBullet){
        if(!ufo.hit){
            invertedBullet.x -= 10;
        }
    });

    if(!rocket.defeated){
        ufos.forEach(function(ufo){
            ufo.x -= ufoSpeed;
        });

        if(invertedUfos.length != 0){
            invertedUfos.forEach(function(invertedUfo){
                invertedUfo.x += ufoSpeed;
            });
        }
    }
}

function SetGameOver(){
    stopMovingRocket();
    ClearAllIntervals();
    
    document.getElementById('scoreText').innerHTML = `${score}`;
    rocket.defeated = true;
        document.getElementById('HighScoreTable').innerHTML += 
        `
        <tr style="text-align: center;">
            <td style="text-align: center;">${score}<td>
        </tr>`

    GameOverScreen.innerHTML = `
        <h2>
            <b>
                GAME OVER!
            </b>
        </h2>
            <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" id="startAgain" onclick="restartGame()">
                Restart
            </button>`;
    score = 0;
}

function stopMovingRocket(){
    KEY_SPACE = false;
    KEY_UP = false;
    KEY_RIGHT = false;
    KEY_LEFT = false;
    KEY_DOWN = false;
    KEY_Q = false;
    KEY_E = false;
}

function ClearAllIntervals(){
    clearInterval(updateVar);
    clearInterval(createUfoVar);
    clearInterval(checkForCollisionVar);
    clearInterval(createBulletsVar);
    clearInterval(updateUfoSpawnVar);
}

function restartGame(){
    rocket.x = 100;
    rocket.y = 200;
    ufos = [];
    startGame();
    rocket.hit = false;
    rocket.defeated = false;
    resetAmmo();
    GameOverScreen.innerHTML = ``;
}

function resetAmmo(){
    ammo.currentMag = ammo.standardMag;
    document.getElementById('ammo').innerHTML = `${ammo.currentMag}`;
}

function loadImages(){
    backgroundImage.src = 'background.png';
    rocket.img = new Image();
    rocket.img.src = rocket.src;

    ufo.img = new Image();
    ufo.img.src = ufo.src;
}

function draw(){
    ctx.drawImage(backgroundImage, 0, 0);
    ctx.drawImage(rocket.img, rocket.x, rocket.y, rocket.width, rocket.height);

    ufos.forEach(function(ufo){
        ctx.drawImage(ufo.img, ufo.x, ufo.y, ufo.width, ufo.height);
    });

    invertedUfos.forEach(function(invertedUfo){
        ctx.drawImage(invertedUfo.img, invertedUfo.x, invertedUfo.y, invertedUfo.width, invertedUfo.height);
    });

    bullets.forEach(function(bullet){
        ctx.drawImage(bullet.img, bullet.x, bullet.y, bullet.width, bullet.height);
    })

    invertedBullets.forEach(function(bullet){
        ctx.drawImage(bullet.img, bullet.x, bullet.y, bullet.width, bullet.height);
    })

    requestAnimationFrame(draw);
}