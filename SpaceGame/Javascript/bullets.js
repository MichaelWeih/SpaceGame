let bullets = [];
let invertedBullets = [];

function createBullets(_xValue){

    if  (KEY_E && !rocket.hit)  
    {
        let bullet = {
            x: rocket.x + 80,
            y: rocket.y + 22,
            width: 40,
            height: 10,
            src: 'Images/bullet.png',
            img: new Image(),
            isInverted: false
        };

        bullet.img.src = bullet.src;
        bullets.push(bullet);
    }

    if (KEY_Q && !rocket.hit)
    {
        let bullet = {
            x: rocket.x - 80,
            y: rocket.y + 22,
            width: 40,
            height: 10,
            src: 'Images/bullet.png',
            img: new Image(),
            isInverted: true
        };

        bullet.img.src = bullet.src;
        bullets.push(bullet);
    }
}