const canva = document.getElementById("pong-canva");
const ctx = canva.getContext("2d");
const bt_new_partie = document.getElementById("bt-new-partie");
const score = document.getElementById("score");
const bt_move_left = document.getElementById("bt-move-left");
const bt_move_right = document.getElementById("bt-move-right");

let rafId;
let start = Date.now();
let xPaddle = canva.width / 2 - 35;
let yPaddle = canva.height - 12;
let xBall = canva.width / 2;
let yBall = canva.height - 20;
let speedPaddle = 10;

bt_new_partie.addEventListener("click", () => {
    start = Date.now();
    score.textContent = "Score : 0 s";
});

function updateScore() {
    calScore = (Date.now() - start) / 1000;
    score.textContent = "Score : " + Math.floor(calScore) + " s";
}

function drawPaddle() {
    ctx.fillStyle = "cyan";
    ctx.beginPath();
    ctx.strokeStyle = "darkblue";
    ctx.lineWidth = 1;
    ctx.rect(xPaddle, yPaddle, 70, 7);
    ctx.stroke();
    ctx.fill();
}

function drawBall() {
    ctx.fillStyle = "cyan";

    ctx.beginPath();
    ctx.strokeStyle = "darkblue";
    ctx.lineWidth = 1;
    ctx.arc(xBall, yBall, 6, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fill();
}

function loop() {
    ctx.clearRect(0, 0, canva.width, canva.height);
    updateScore();
    drawPaddle();
    drawBall();
    rafId = requestAnimationFrame(loop);
}

loop();

document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowLeft":
            movePaddleLeft();
            break;
        case "ArrowRight":
            movePaddleRight();
            break;
        default:
            break;
    }
    drawPaddle();
});

function movePaddleLeft() {
    if (xPaddle > 0) xPaddle -= speedPaddle;
}

function movePaddleRight() {
    if (xPaddle + 70 < canva.width) xPaddle += speedPaddle;
}

bt_move_left.addEventListener("click", movePaddleLeft());
bt_move_right.addEventListener("click", movePaddleRight());
