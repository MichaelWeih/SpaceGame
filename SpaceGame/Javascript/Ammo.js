let ammo = {
    currentMag: 100,
    standardMag: 100
};

function resetAmmo(){
    ammo.currentMag = ammo.standardMag;
    document.getElementById('ammo').innerHTML = `${ammo.currentMag}`;
}