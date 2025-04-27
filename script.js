let timer;
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
    score = 0;
    updateScore(0);

    const selectedColor = document.getElementById('colorSelect').value;
    const difficultyValue = document.getElementById('difficultySelect').value;

    if (difficultyValue === "easy") {
        timeLimit = 5000;
    } else if (difficultyValue === "medium") {
        timeLimit = 3000;
    } else if (difficultyValue === "hard") {
        timeLimit = 2000;
    }

    stats.style.display = 'flex'; 
    createSquare(selectedColor);

    moveSquare();
    isPlaying = true;

    square.addEventListener('click', handleSquareClick);

    resetTimer();
}

function createSquare(color) {
    square = document.createElement('div');
    square.classList.add('square');
    square.style.backgroundColor = color;
    gameArea.appendChild(square);
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

    let countdown = setInterval(() => {
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
    if (square) {
        square.remove();
    }
    alert(`Гру закінчено!\nВаш результат: ⭐ ${score} очок`);

    stats.style.display = 'none'; 
}
