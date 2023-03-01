let i = 0;
let e = document.getElementById("e" + i);
let eCount = 0;
let delay = 1000;
let iterate;

document.addEventListener("DOMContentLoaded", ready());

function ready() {
    // console.log("ready");
    do {
        eCount++;
    } while (document.getElementById("e" + eCount));
    loop();
}

function loop() {
    i++;
    if (i < eCount) {
        delay = getRandomTime(1500, 5000);
        console.log("iterate : " + delay);
        e = document.getElementById("e" + i);
        show(e);
    } else {
        return;
    }

    setTimeout(loop, delay);
};

function show(el) {
    el.classList.add("complete");
}

function getRandomTime(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
