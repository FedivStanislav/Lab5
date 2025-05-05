let timer;
let countdown;
let timeLimit;
let remainingTime;
let gameArea = document.getElementById('gameArea');
let stats = document.getElementById('stats');
let timeDisplay = document.getElementById('timeDisplay');
let scoreDisplay = document.getElementById('scoreDisplay');
let square;
let isPlaying = false;
let score = 0;

document.getElementById('startButton').addEventListener('click', startGame);

function startGame() {
    if (square) {
        square.remove();
    }
    clearTimeout(timer);
    clearInterval(countdown);
    score = 0;
    updateScore(0);

    const selectedColor = document.getElementById('colorSelect').value;
    const difficultyValue = document.getElementById('difficultySelect').value;

    let squareSize;

    if (difficultyValue === "easy") {
        timeLimit = 5000;
        squareSize = 70;
    } else if (difficultyValue === "medium") {
        timeLimit = 3000;
        squareSize = 50;
    } else if (difficultyValue === "hard") {
        timeLimit = 2000;
        squareSize = 30;
    }

    stats.style.display = 'flex'; 
    createSquare(selectedColor, squareSize);

    moveSquare();
    isPlaying = true;

    square.addEventListener('click', handleSquareClick);

    resetTimer();
}

function createSquare(color, size) {
    square = document.createElement('div');
    square.classList.add('square');
    square.style.backgroundColor = color;
    square.style.width = `${size}px`;
    square.style.height = `${size}px`;
    gameArea.appendChild(square);
}

function moveSquare() {
    const areaWidth = gameArea.clientWidth;
    const areaHeight = gameArea.clientHeight;

    const squareWidth = square.offsetWidth;
    const squareHeight = square.offsetHeight;

    const maxX = areaWidth - squareWidth;
    const maxY = areaHeight - squareHeight;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    square.style.left = `${randomX}px`;
    square.style.top = `${randomY}px`;
}

function handleSquareClick() {
    clearTimeout(timer);
    clearInterval(countdown);
    score += 5;
    updateScore(score);

    moveSquare();
    resetTimer(); 
}

function resetTimer() {
    remainingTime = timeLimit / 1000; 
    updateTimeDisplay(remainingTime);

    timer = setTimeout(() => {
        endGame();
    }, timeLimit);

    countdown = setInterval(() => {
        remainingTime -= 1;
        if (remainingTime >= 0) {
            updateTimeDisplay(remainingTime);
        }
        if (remainingTime <= 0 || !isPlaying) {
            clearInterval(countdown);
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
    clearInterval(countdown);
    if (square) {
        square.remove();
    }
    alert(`Гру закінчено!\nВаш результат: ⭐ ${score} очок`);
    stats.style.display = 'none'; 
}
