let ufos = [];

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