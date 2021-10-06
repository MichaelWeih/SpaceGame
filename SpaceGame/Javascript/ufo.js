let ufos = [];

let ufo = {
    x: 600,
    y: 120,
    width: 160,
    height: 80,
    src: 'Images/ufo.png',
    hit: false,
    speed: 5,
    isInverted: false;
}

let invertedUfo = {
    hit: false,
    x: 0,
    y: 120,
    width: 120,
    height: 60,
    src: 'Images/ufo.png',
    img: new Image(),
    speed: 5
};
let invertedUfos = [];

function createUfos(_xValue){
    let ufo = {
        x: _xValue,
        y: Math.floor(Math.random() * 305),
        width: 120,
        height: 60,
        src: 'Images/ufo.png',
        img: new Image(),
        speed: 4
    };
    ufo.img.src = ufo.src;
    ufos.push(ufo);
}

function createInvertedUfos(){
    let invertedUfo = {
        x: -100,
        y: Math.floor(Math.random() * 305),
        width: 120,
        height: 60,
        src: 'Images/ufo.png',
        img: new Image(),
        speed: 4
    };
    invertedUfo.img.src = invertedUfo.src;
    invertedUfos.push(invertedUfo);
}

function checkForUfoCollision(){
    ufos.forEach(function(ufo){
        if(!ufo.hit 
        && rocket.x + rocket.width > ufo.x 
        && rocket.y + rocket.height > ufo.y
        && rocket.x < ufo.x 
        && rocket.y < ufo.y)
        {
            rocket.img.src = 'Images/explosion.png';
            rocket.hit = true;
            console.log('Collision!');
            ufos = ufos.filter(u => u != ufo);
        }
        
        bullets.forEach(function(bullet){
            if(!ufo.hit 
            && bullet.x + bullet.width > ufo.x
            && bullet.y + bullet.height > ufo.y
            && bullet.x < ufo.x
            && bullet.y < ufo.y + ufo.height)
            {
                resetAmmo();
                ufo.hit = true;
                ufo.img.src = 'Images/explosion.png';
                console.log('DEFEATED!');
                
                score += 1;
                updateSpeedIndicator += 1;
                document.getElementById('scoreText').innerHTML = score;

                setTimeout(() => {
                    ufos = ufos.filter(u => u != ufo); 
                }, 2000);
            }
            else if(function(ufo){ 
            !ufo.hit 
            && ufo.x + ufo.width > rocket.x
            && ufo.y + ufo.height > rocket.y
            && ufo.x < rocket.x 
            && ufo.y < rocket.y + rocket.height
            {
                resetAmmo();
                ufo.hit = true;
                ufo.img.src = 'Images/explosion.png';
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

        invertedBullets.forEach(function(invertedBullet){
            if(!ufo.hit 
                && invertedBullet.x < ufo.x + ufo.width
                && invertedBullet.y + invertedBullet.height > ufo.y
                && ufo.x < invertedBullet.x
                && invertedBullet.y < ufo.y + ufo.height)
            {
                    resetAmmo();
                    ufo.hit = true;
                    ufo.img.src = 'Images/explosion.png';
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

function checkForInvertedUfoCollison(){
    invertedUfos.forEach(function(invertedUfo){
        if(!invertedUfo.hit
            && invertedUfo.x + invertedUfo.width > rocket.x
            && invertedUfo.y + invertedUfo.height > rocket.y
            && invertedUfo.x < rocket.x 
            && invertedUfo.y < rocket.y + rocket.height
            ){
                rocket.img.src = 'Images/explosion.png';
                rocket.hit = true;
                console.log('Collision!');
                ufos = ufos.filter(u => u != ufo);
            }

        invertedBullets.forEach(function(invertedBullet){
            if(!invertedUfo.hit 
               && invertedBullet.x < invertedUfo.x + invertedUfo.width
               && invertedBullet.y + invertedBullet.height > invertedUfo.y
               && invertedUfo.x < invertedBullet.x
               && invertedBullet.y < invertedUfo.y + invertedUfo.height)
            {
                resetAmmo();
                invertedUfo.hit = true;
                invertedUfo.img.src = 'Images/explosion.png';
                console.log('DEFEATED!');
                
                score += 1;
                updateSpeedIndicator += 1;
                document.getElementById('scoreText').innerHTML = score;

                setTimeout(() => {
                    invertedUfos = invertedUfos.filter(u => u != invertedUfo); 
                }, 2000);
            }
        });

        bullets.forEach(function(bullet){
            if(!invertedUfo.hit 
                && bullet.x + bullet.width > invertedUfo.x
                && bullet.y + bullet.height > invertedUfo.y
                && bullet.x < invertedUfo.x
                && bullet.y < invertedUfo.y + invertedUfo.height)
            {
                resetAmmo();
                invertedUfo.hit = true;
                invertedUfo.img.src = 'Images/explosion.png';
                console.log('DEFEATED!');
                
                score += 1;
                updateSpeedIndicator += 1;
                document.getElementById('scoreText').innerHTML = score;

                setTimeout(() => {
                    invertedUfos = invertedUfos.filter(u => u != invertedUfo); 
                }, 2000);
            }
        });
    });
}