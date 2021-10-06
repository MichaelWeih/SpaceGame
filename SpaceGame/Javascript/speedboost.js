let SpeedBoost = {
    isCollected: false,
    x: 0,
    y: 0,
    width: 80,
    height: 50,
    src: 'Images/SpeedBoost.png',
    img: new Image(),
    speed: 5    
};
let SpeedBoosts = [];

function createSpeedBoost(){
    let SpeedBoost = {
        x: 700,
        y: Math.floor(Math.random() * 305),
        width: 50,
        height: 70,
        src: 'Images/SpeedBoost.png',
        img: new Image(),
        speed: 5,
        isCollected: false
    }
    console.log("Speedboost created!");
    SpeedBoost.img.src = SpeedBoost.src;
    SpeedBoosts.push(SpeedBoost);
}

function checkForSpeedBoostCollision(){
    SpeedBoosts.forEach(function(SpeedBoost){
        if(!SpeedBoost.isCollected 
            && rocket.x + rocket.width > SpeedBoost.x 
            && rocket.y + rocket.height > SpeedBoost.y
            && rocket.x < SpeedBoost.x 
            && rocket.y < SpeedBoost.y){
                console.log("SpeedBoost SUCCESS!");
                SpeedBoosts = SpeedBoosts.filter(s => s != SpeedBoost); 
                rocket.speed = 10;

                //Set Speed back after 10 Seconds
                setTimeout(function(){
                    rocket.speed = 5
                }, 10000);
            }
    });
}