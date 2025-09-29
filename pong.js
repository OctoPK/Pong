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
let speedPaddle = 4;
let moveX;
let moveY;
let speed = 1.4;
let gameRunning = 0;
let leftBtnPressed = false;
let rightBtnPressed = false;
let leftPressed = false;
let rightPressed = false;

bt_new_partie.addEventListener("click", () => {
    cancelAnimationFrame(rafId);
    resetGame();
    start = Date.now();
    score.textContent = "Score : 0 s";
    moveX = Math.random();
    speed = 1.4;
    gameRunning = 1;
    if (moveX > 0.5) {
        xBall += moveX * speed;
    } else {
        moveX *= -1;
        xBall += moveX * speed;
    }
    moveY = -1 * speed;
    loop();
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
    if (!gameRunning) return;
    ctx.clearRect(0, 0, canva.width, canva.height);
    moveBall();
    updateScore();
    updatePaddle();
    drawPaddle();
    drawBall();
    rafId = requestAnimationFrame(loop);
}

function moveBall() {
    if (xBall + 6 >= canva.width) {
        moveX = Math.random() * -1;
        if (speed <= 1.4 * 5) speed *= 1.05;
    }
    if (xBall - 6 <= 0) {
        moveX = Math.random();
        if (speed <= 1.4 * 5) speed *= 1.05;
    }
    if (yBall - 6 <= 0) {
        moveY = 1;
        if (speed <= 1.4 * 5) speed *= 1.05;
    }
    if (yBall + 6 >= canva.height) {
        gameRunning = 0;
        gameOver();
        return;
    }
    if (yBall + 6 >= yPaddle && xBall >= xPaddle && xBall <= xPaddle + 70 && moveY > 0) {
        moveY = -1;
        if (moveX > 0) moveX = Math.random();
        else moveX = Math.random() * -1;
        if (speed <= 1.4 * 5) speed *= 1.05;
    }
    xBall += moveX * speed;
    yBall += moveY * speed;
}

function movePaddleLeft() {
    if (xPaddle > 0) xPaddle -= speedPaddle;
}

function movePaddleRight() {
    if (xPaddle + 70 < canva.width) xPaddle += speedPaddle;
}

drawBall();
drawPaddle();

function resetGame() {
    xBall = canva.width / 2;
    yBall = canva.height - 20;
    xPaddle = canva.width / 2 - 35;
    yPaddle = canva.height - 12;
}

function gameOver() {
    cancelAnimationFrame(rafId);
    resetGame();
    ctx.clearRect(0, 0, canva.width, canva.height);
    drawBall();
    drawPaddle();
    ctx.fillStyle = "red";
    ctx.font = "40px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("GAME OVER", canva.width / 2, canva.height / 2);
}

function updatePaddle() {
    if (leftBtnPressed || leftPressed) movePaddleLeft();
    if (rightBtnPressed || rightPressed) movePaddleRight();
}

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") leftPressed = true;
    if (e.key === "ArrowRight") rightPressed = true;
});

document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowLeft") leftPressed = false;
    if (e.key === "ArrowRight") rightPressed = false;
});

bt_move_left.addEventListener("mousedown", () => (leftBtnPressed = true));
bt_move_left.addEventListener("mouseup", () => (leftBtnPressed = false));
bt_move_left.addEventListener("mouseleave", () => (leftBtnPressed = false));
bt_move_left.addEventListener("touchstart", (e) => {
    e.preventDefault();
    leftBtnPressed = true;
});
bt_move_left.addEventListener("touchend", (e) => {
    e.preventDefault();
    leftBtnPressed = false;
});
bt_move_left.addEventListener("touchcancel", (e) => {
    e.preventDefault();
    leftBtnPressed = false;
});

bt_move_right.addEventListener("mousedown", () => (rightBtnPressed = true));
bt_move_right.addEventListener("mouseup", () => (rightBtnPressed = false));
bt_move_right.addEventListener("mouseleave", () => (rightBtnPressed = false));
bt_move_right.addEventListener("touchstart", (e) => {
    e.preventDefault();
    rightBtnPressed = true;
});
bt_move_right.addEventListener("touchend", (e) => {
    e.preventDefault();
    rightBtnPressed = false;
});
bt_move_right.addEventListener("touchcancel", (e) => {
    e.preventDefault();
    rightBtnPressed = false;
});
