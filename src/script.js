var score = 0;
var timer = 60;
var level = '';
var letters = [];
function showLevels() {
    document.querySelector('.start-page').style.display = 'none';
    document.querySelector('.level-selection').style.display = 'block';
}
function selectLevel(selectedLevel) {
    level = selectedLevel;
    document.querySelector('.level-selection').style.display = 'none';
    document.querySelector('.game-page').style.display = 'block';
    document.getElementById('level').innerText = level;
    startTimer();
    createLetters();
}
function startTimer() {
    var timerElement = document.getElementById('timer');
    var countdown = setInterval(function () {
        timer--;
        timerElement.innerText = timer.toString();
        if (timer <= 0) {
            clearInterval(countdown);
            endGame();
        }
    }, 1000);
}
function createLetters() {
    var letterInterval;
    function generateAndAnimateLetter() {
        var letter = generateRandomLetter();
        var letterElement = document.createElement('span');
        letterElement.className = 'letter';
        letterElement.innerText = letter;
        var xPos = Math.random() * window.innerWidth;
        var yPos = window.innerHeight;
        letterElement.style.left = "".concat(xPos, "px");
        letterElement.style.top = "".concat(yPos, "px");
        document.getElementById('letters').appendChild(letterElement);
        letters.push({
            element: letterElement,
            letter: letter,
            xPos: xPos,
            yPos: yPos,
        });
        animateLetter(letterElement, yPos);
    }
    letterInterval = setInterval(generateAndAnimateLetter, getLetterInterval());
    document.addEventListener('keydown', function (e) {
        var keyPressed = e.key.toUpperCase();
        var popped = letters.findIndex(function (letterObj, index) {
            if (letterObj.letter === keyPressed && letterObj.yPos > -30) {
                alert(letterObj.yPos);
                letters.splice(index, 1);
                document.getElementById('score').innerText = (++score).toString();
                letterObj.element.remove();
                return true;
            }
        });
        if (popped === -1) {
            document.getElementById('score').innerText = (--score).toString();
        }
    });
    setTimeout(function () {
        clearInterval(letterInterval);
    }, timer * 1000);
}
function animateLetter(letterElement, yPos) {
    var animationInterval = setInterval(function () {
        yPos -= 2;
        letterElement.style.top = "".concat(yPos, "px");
        if (yPos < -30) {
            clearInterval(animationInterval);
            letterElement.remove();
        }
    }, 20);
}
function generateRandomLetter() {
    var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return alphabet.charAt(Math.floor(Math.random() * alphabet.length));
}
function getLetterInterval() {
    if (level === 'beginner') {
        return 2000;
    }
    else if (level === 'medium') {
        return 1000;
    }
    else if (level === 'hard') {
        return 5000;
    }
}
function endGame() {
    alert("Game over! Your final score is ".concat(score));
    location.reload();
}
