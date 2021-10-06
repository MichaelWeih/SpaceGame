let bullets = [];
let invertedBullets = [];

function createBullets(){
    if(isKEY_E){
        if  (KEY_E && !rocket.hit)  {
            let bullet = {
                x: rocket.x + 80,
                y: rocket.y + 22,
                width: 40,
                height: 10,
                src: 'Images/bullet.png',
                img: new Image()
            };
            bullet.img.src = bullet.src;
            bullets.push(bullet);
        }
    }
}

function createInvertedBullets(){
    if(isKEY_Q){
        if  (KEY_Q && !rocket.hit){
            let invertedBullet = {
                x: rocket.x - 80,
                y: rocket.y + 22,
                width: 40,
                height: 10,
                src: 'Images/bullet.png',
                img: new Image()
            };
            invertedBullet.img.src = invertedBullet.src;
            invertedBullets.push(invertedBullet);
        }
    }
}