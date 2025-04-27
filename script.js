let timer;
let timeLimit;
let gameArea = document.getElementById('gameArea');
let square;
let isPlaying = false;

document.getElementById('startButton').addEventListener('click', startGame);

function startGame() {
    if (square) {
        square.remove();
    }
    clearTimeout(timer);

    const selectedColor = document.getElementById('colorSelect').value;
    timeLimit = parseInt(document.getElementById('difficultySelect').value);

    square = document.createElement('div');
    square.classList.add('square');
    square.style.backgroundColor = selectedColor;
    gameArea.appendChild(square);

    moveSquare();
    isPlaying = true;

    square.addEventListener('click', handleSquareClick);

    startTimer();
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
    moveSquare();
    startTimer();
}

function startTimer() {
    timer = setTimeout(() => {
        endGame();
    }, timeLimit);
}

function endGame() {
    isPlaying = false;
    clearTimeout(timer);
    if (square) {
        square.remove();
    }
    alert("Ви програли!");
}
