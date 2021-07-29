const increaseBTN = document.getElementById('increase');
const decreaseBTN = document.getElementById('decrease');
const sizeEL = document.getElementById('size');
const colorEL = document.getElementById('color');
const clearBTN = document.getElementById('clear');
const canvasEL = document.getElementById('canvas');
const ctx = canvasEL.getContext('2d');

let size = 20;
let mouseIsPressed = false;
let color = 'black';
let x = undefined;
let y = undefined;

canvasEL.addEventListener('mousedown', (e) => {
    mouseIsPressed = true;

    x = e.offsetX;
    y = e.offsetY;
});

canvasEL.addEventListener('mouseup', (e) => {
    mouseIsPressed = false;

    x = undefined;
    y = undefined;
});

canvasEL.addEventListener('mousemove', (e) => {
    if (!mouseIsPressed) return;
    const x2 = e.offsetX;
    const y2 = e.offsetY;

    drawCircle(x2, y2);
    drawLine(x, y, x2, y2);
    x = x2;
    y = y2;
});

function drawCircle(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2); 
    ctx.strokeStyle = color;
    ctx.lineWidth = size * 2;
    ctx.stroke();
}

increaseBTN.addEventListener('click', () => {
    size += 5;
    if (size > 50) size = 50;
    updateSizeEL();
});

decreaseBTN.addEventListener('click', () => {
    size -= 5;
    if (size < 5) size = 5;
    updateSizeEL();
});

colorEL.addEventListener('change', (e) => {
    color = e.target.value;
});

clearBTN.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvasEL.width, canvasEL.height);
});

function updateSizeEL() {
    sizeEL.innerText = size;
}