let timer;
let countdownInterval;
let timeLimit;
let remainingTime;
let gameArea = document.getElementById('gameArea');
let square;
let isPlaying = false;
let score = 0;

document.getElementById('startButton').addEventListener('click', startGame);

// Створюємо блок для статистики
let stats = document.createElement('div');
stats.id = 'stats';
stats.innerHTML = "⏳ Час: 0 | ⭐ Очки: 0";
document.body.insertBefore(stats, gameArea);

function startGame() {
    if (square) {
        square.remove();
    }
    clearTimeout(timer);
    clearInterval(countdownInterval);
    score = 0;
    updateStats();

    const selectedColor = document.getElementById('colorSelect').value;
    timeLimit = parseInt(document.getElementById('difficultySelect').value);
    remainingTime = timeLimit / 1000; // Переводимо в секунди для таймера

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
    updateStats();

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
    remainingTime = timeLimit / 1000;
    updateStats();
    countdownInterval = setInterval(() => {
        remainingTime -= 1;
        updateStats();
        if (remainingTime <= 0) {
            clearInterval(countdownInterval);
        }
    }, 1000);
}

function updateStats() {
    stats.innerHTML = `⏳ Час: ${remainingTime} с | ⭐ Очки: ${score}`;
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
