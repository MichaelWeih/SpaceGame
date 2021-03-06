//Controls
let KEY_UP = false; //38
let KEY_W = false; //87
let KEY_A = false; //65
let KEY_S = false; //83
let KEY_D = false; //68
let KEY_DOWN = false; // 40
let KEY_RIGHT = false; // 40
let KEY_LEFT = false; // 40
let KEY_Q = false; // 81
let KEY_E = false; // 69

//Background
let canvas;
let ctx;
let backgroundImage = new Image();

//Score
let score = 0;
let scoreBoard = [];

//Gamelogik
let updateSpeedIndicator = 0;
let ufoSpeed = 5;
let minScore = 3;
let minScoreTimer = 20;
    //Intervals
        //Gameplay
        let updateVar;
        let checkForCollisionVar;
        let updateUfoSpawnVar;
        let checkMinScoreVar;
        let setMinScoreTimerVar;

        //Convertibles
        let createUfoVar;
        let createInvertedUfosVar;

        //Guns
        let createBulletsVar;
        let createInvertedBulletsVar;

        //Items
        let createAmmoRefillVar;
        let createSpeedBoostVar;

//Cookies
document.cookie = "username=Michi";

document.onkeydown = function(e){
    console.log(e.keyCode)

    if(e.keyCode == 69){
        KEY_E = true;
    }

    if(e.keyCode == 81){
        KEY_Q = true;
    }

    if(e.keyCode == 65 && !rocket.hit){
        KEY_A = true;
    }

    if(e.keyCode == 87 && !rocket.hit){
        KEY_W = true;
    }

    if(e.keyCode == 68 && !rocket.hit){
        KEY_D = true;
    }

    if(e.keyCode == 83 && !rocket.hit){
        KEY_S = true;
    }
}

document.onkeyup = function(e){
    if(e.keyCode == 69 && !rocket.hit){
        KEY_E = false;
    }

    if(e.keyCode == 81 && !rocket.hit){
        KEY_Q = false;
    }

    if(e.keyCode == 65 && !rocket.hit){
        KEY_A = false;
    }

    if(e.keyCode == 87 && !rocket.hit){
        KEY_W = false;
    }

    if(e.keyCode == 68 && !rocket.hit){
        KEY_D = false;
    }

    if(e.keyCode == 83 && !rocket.hit){
        KEY_S = false;
    }
}

function startGame(){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    document.getElementById('ammo').innerHTML = `${ammo.currentMag}`;
    document.getElementById('minScore').innerHTML = `${minScore}`;
    document.getElementById('scoreText').innerHTML = `${score}`;
    document.onload = loadImages();
    updateVar = setInterval(update, 1000 / 25);

    //Set Intervals
    createUfoVar = setInterval(function(){createUfos(700); } , 5000);
    checkForCollisionVar = setInterval(checkForCollision, 5000 / 25);
    createBulletsVar = setInterval(function(){ createBullets(80);} , 1000 / 10);
    createInvertedBulletsVar = setInterval(function(){ createBullets(-80);} , 1000 / 10);
    updateUfoSpawnVar = setInterval(updateUfoSpawn, 1000 / 25);
    createAmmoRefillVar = setInterval(createAmmoRefill, 15000);
    createSpeedBoostVar = setInterval(createSpeedBoost, 30000);
    checkMinScoreVar = setInterval(function(){ checkMinScore(minScore);}, 20000);
    setMinScoreTimerVar = setInterval(setMinScoreTimer, 1000);

    draw();
}

function checkForCollision(){
    checkForUfoCollision();
    checkForAmmoRefillCollision();
    checkForSpeedBoostCollision();
}

let invertUfoIntervallSet;
function updateUfoSpawn(){
    if(updateSpeedIndicator == 3){
            updateSpeedIndicator = 0;
            ufoSpeed += 3;
            ufos.forEach(function(ufo){
                ufo.speed += ufoSpeed;
            })
        } 

    if(score >= 10){
        if(!invertUfoIntervallSet){
            invertUfoIntervallSet = true;
            createInvertedUfosVar = setInterval(function(){createUfos(-100)} , 5000);
        }
    }
} 

let isKEY_E = false;
let isKEY_Q = false;
function update(){
    if(KEY_E){
        isKEY_E = true;
        isKEY_Q = false;
        if(ammo != 0){
            ammo.currentMag -= 1;
        }
        document.getElementById('ammo').innerHTML = `${ammo.currentMag}`;
    }

    if(KEY_Q){
        isKEY_Q = true;
        isKEY_E = false;
        if(ammo != 0){
            ammo.currentMag -= 1;
        }

        document.getElementById('ammo').innerHTML = `${ammo.currentMag}`;
    };

    if(ammo.currentMag == 0 && !rocket.defeated){
        SetGameOver();              
    }

    if(rocket.defesdawated){
        rocket.x += 0;
        rocket.y += 0;
    }

    if(rocket.hit && !rocket.defeated){
        SetGameOver();
    }

    else if(KEY_W){
        if(rocket.y >= 0){
            rocket.y -= rocket.speed; 
        }
        else{
            KEY_W = false;
        }
    }

    else if(KEY_S){
        if(rocket.y <= 300){
            rocket.y += rocket.speed; 
        }
        else{
            KEY_S = false;
        }
    }

    else if(KEY_D){
        if(rocket.x <= 500){
            rocket.x += rocket.speed; 
        }
        else{
            KEY_D = false;
        }
    }

    else if(KEY_A){
        if(rocket.x >= 0){
            rocket.x -= rocket.speed; 
        }
        else{
            KEY_A = false;
        }
    }

    bullets.forEach(function(bullet){
            if(!ufo.hit){
                if(!bullet.isInverted){
                    bullet.x += 10;
                }
                else{
                    bullet.x -= 10;
                }
            }
    });

    AmmoRefills.forEach(function(AmmoRefill){
        if(!AmmoRefill.isCollected){
            AmmoRefill.x -= 5;
        }
    });

    SpeedBoosts.forEach(function(SpeedBoost){
        if(!SpeedBoost.isCollected){
            SpeedBoost.x -= 5;
        }
    })

    if(!rocket.defeated){
        ufos.forEach(function(ufo){
            if(ufo.isInverted == false){
                ufo.x -= ufo.speed;
            }
            else{
               ufo.x += ufo.speed;
            }
        });
    }
}

function SetGameOver(){
    stopMovingRocket();
    ClearAllIntervals();
    ufos = [];
    invertedUfos = [];
    bullets = [];
    invertedBullets = [];
    ufoSpeed = 4;

    score = 0;
    invertUfoIntervallSet = false;
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
}

function ClearAllIntervals(){
    clearInterval(updateVar);
    clearInterval(createUfoVar);
    clearInterval(checkForCollisionVar);
    clearInterval(createBulletsVar);
    clearInterval(updateUfoSpawnVar);
    clearInterval(createInvertedUfosVar);
    clearInterval(createInvertedBulletsVar);
    clearInterval(createSpeedBoostVar);
    clearInterval(createAmmoRefillVar);
    clearInterval(checkMinScoreVar);
    clearInterval(setMinScoreTimerVar);
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

function checkMinScore(minscore){
    if(score < minscore){
        SetGameOver();
    }
    else{
        minScore += score + 3;
        document.getElementById('minScore').innerHTML = `${minScore}`;
    }
}

function setMinScoreTimer(){
    if(minScoreTimer != 0)
    {
        minScoreTimer--;
        document.getElementById('minScoreTimer').innerHTML = `${minScoreTimer}`;
    }
    else
    {
        minScoreTimer = 20;
    }
}

function loadImages(){
    backgroundImage.src = 'Images/background.png';

    rocket.img = new Image();
    rocket.img.src = rocket.src;

    ufo.img = 'Images/ufo.png';
    ufo.img.src = ufo.src;

    AmmoRefill.img = 'Images/ammoRefill.png';
    AmmoRefill.img.src = AmmoRefill.src;

    SpeedBoost.img = 'Images/SpeedBoost.png';
    SpeedBoost.img.src = SpeedBoost.src;
}

function draw(){
    ctx.drawImage(backgroundImage, 0, 0);
    ctx.drawImage(rocket.img, rocket.x, rocket.y, rocket.width, rocket.height);

    ufos.forEach(function(ufo){
        ctx.drawImage(ufo.img, ufo.x, ufo.y, ufo.width, ufo.height);
    });

    bullets.forEach(function(bullet){
        ctx.drawImage(bullet.img, bullet.x, bullet.y, bullet.width, bullet.height);
    });

    invertedBullets.forEach(function(invertedBullet){
        ctx.drawImage(invertedBullet.img, invertedBullet.x, invertedBullet.y, invertedBullet.width, invertedBullet.height);
    }); 
    
    AmmoRefills.forEach(function(AmmoRefill){
        ctx.drawImage(AmmoRefill.img, AmmoRefill.x, AmmoRefill.y, AmmoRefill.width, AmmoRefill.height);
    });

    SpeedBoosts.forEach(function(SpeedBoost){
        ctx.drawImage(SpeedBoost.img, SpeedBoost.x, SpeedBoost.y, SpeedBoost.width, SpeedBoost.height);
    });

    requestAnimationFrame(draw);
}