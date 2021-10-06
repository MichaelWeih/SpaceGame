let rocket = {
    x: 100,
    y: 200,
    width: 60,
    height: 80,
    src: 'Images/rocket.png',
    speed: 4
}

function stopMovingRocket(){
    KEY_UP = false;
    KEY_RIGHT = false;
    KEY_LEFT = false;
    KEY_DOWN = false;
    KEY_Q = false;
    KEY_E = false;
}