let AmmoRefill = {
    isCollected: false,
    x: 0,
    y: 0,
    width: 80,
    height: 50,
    src: 'Images/ammoRefill.png',
    img: new Image()
};
let AmmoRefills = [];

function createAmmoRefill(){
    let AmmoRefill = {
        isCollected: false,
        x: 700,
        y: Math.floor(Math.random() * 305),
        width: 40,
        height: 60,
        src: 'Images/ammoRefill.png',
        img: new Image()
    }
    console.log("AmmoRefill created!")
    AmmoRefill.img.src = AmmoRefill.src;
    AmmoRefills.push(AmmoRefill);
}

function checkForAmmoRefillCollision(){
    AmmoRefills.forEach(function(AmmoRefill){
        if(!AmmoRefill.isCollected
            && rocket.x + rocket.width > AmmoRefill.x 
            && rocket.y + rocket.height > AmmoRefill.y
            && rocket.x < AmmoRefill.x 
            && rocket.y < AmmoRefill.y){
                console.log("AmmoRefill SUCCESS!")
                AmmoRefills = AmmoRefills.filter(a => a != AmmoRefill); 
                resetAmmo();
        };
    });
}