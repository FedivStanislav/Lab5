let timer;
let countdownInterval;
let timeLimit;
let remainingTime;
let gameArea = document.getElementById('gameArea');
let square;
let isPlaying = false;
let score = 0;


let timeDisplay = document.createElement('div');
timeDisplay.id = 'timeDisplay';
timeDisplay.style.fontSize = '24px';
timeDisplay.style.marginTop = '10px';

let scoreDisplay = document.createElement('div');
scoreDisplay.id = 'scoreDisplay';
scoreDisplay.style.fontSize = '24px';
scoreDisplay.style.marginTop = '10px';


document.body.insertBefore(timeDisplay, gameArea);
document.body.insertBefore(scoreDisplay, gameArea);

document.getElementById('startButton').addEventListener('click', startGame);

function startGame() {
    if (square) {
        square.remove();
    }
    clearTimeout(timer);
    clearInterval(countdownInterval);
    score = 0;
    updateScore(0);

    const selectedColor = document.getElementById('colorSelect').value;
    timeLimit = parseInt(document.getElementById('difficultySelect').value);
    remainingTime = timeLimit / 1000; 

    square = document.createElement('div');
    square.classList.add('square');
    square.style.backgroundColor = selectedColor;
    gameArea.appendChild(square);

    moveSquare();
    isPlaying = true;

    square.addEventListener('click', handleSquareClick);

    startTimer();
    startCountdown();
}

function moveSquare() {
    const areaWidth = gameArea.clientWidth;
    const areaHeight = gameArea.clientHeight;

    const maxX = areaWidth - 50;
    const maxY = areaHeight - 50;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    square.style.left = `${randomX}px`;
    square.style.top = `${randomY}px`;
}

function handleSquareClick() {
    clearTimeout(timer);
    clearInterval(countdownInterval);

    score += 5; 
    updateScore(score);

    moveSquare();
    startTimer();
    startCountdown();
}

function startTimer() {
    timer = setTimeout(() => {
        endGame();
    }, timeLimit);
}

function startCountdown() {
    updateTimeDisplay(remainingTime);
    countdownInterval = setInterval(() => {
        remainingTime -= 1;
        if (remainingTime >= 0) {
            updateTimeDisplay(remainingTime);
        }
        if (remainingTime <= 0) {
            clearInterval(countdownInterval);
        }
    }, 1000);
}

function updateTimeDisplay(time) {
    timeDisplay.textContent = `⏳ Час: ${time} с`;
}

function updateScore(score) {
    scoreDisplay.textContent = `⭐ Очки: ${score}`;
}

function endGame() {
    isPlaying = false;
    clearTimeout(timer);
    clearInterval(countdownInterval);
    if (square) {
        square.remove();
    }
    alert(`Гру закінчено!\nВаш результат: ⭐ ${score} очок`);
}
