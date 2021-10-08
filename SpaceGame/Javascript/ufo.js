let ufos = [];

let ufo = {
    x: 600,
    y: 120,
    width: 160,
    height: 80,
    src: 'Images/ufo.png',
    hit: false,
    speed: 5,
    img: new Image(),
    isInverted: false
}

// let invertedUfo = {
//     hit: false,
//     x: 0,
//     y: 120,
//     width: 120,
//     height: 60,
//     src: 'Images/ufo.png',
//     img: new Image(),
//     speed: 5
// };
// let invertedUfos = [];

function createUfos(_xValue){
    let ufo = {
        x: _xValue,
        y: Math.floor(Math.random() * 305),
        width: 120,
        height: 60,
        src: 'Images/ufo.png',
        img: new Image(),
        speed: 4,
        isInverted: false
    };

    if(_xValue == -100){
        ufo.isInverted = true;
    }
    ufo.img.src = ufo.src;
    ufos.push(ufo);
}

function documentKill(ufo, bullet){
    resetAmmo();
    ufo.hit = true;
    ufo.img.src = 'Images/explosion.png';
    console.log('DEFEATED!');
    
    score += 1;
    updateSpeedIndicator += 1;
    document.getElementById('scoreText').innerHTML = score;

    setTimeout(() => 
    {
        ufos = ufos.filter(u => u != ufo); 
    }, 2000);
}

function checkForUfoCollision(){
    ufos.forEach(function(ufo)
    {
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
        
        bullets.forEach(function(bullet)
        {
            if(
                !ufo.hit 
                && bullet.x + bullet.width > ufo.x
                && bullet.y + bullet.height > ufo.y
                && bullet.x < ufo.x
                && bullet.y < ufo.y + ufo.height
            )
            {
                resetAmmo();
                ufo.hit = true;
                ufo.img.src = 'Images/explosion.png';
                console.log('DEFEATED!');
                
                score += 1;
                updateSpeedIndicator += 1;
                document.getElementById('scoreText').innerHTML = score;

                setTimeout(() => 
                {
                    ufos = ufos.filter(u => u != ufo); 
                }, 2000);
            }

            else if(
                !ufo.hit 
                && bullet.x < ufo.x + ufo.width
                && bullet.y + bullet.height > ufo.y
                && ufo.x < bullet.x
                && bullet.y < ufo.y + ufo.height)
            {
                documentKill(ufo, bullet);
            }
        });
    });  
}