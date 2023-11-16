let score = 0;
let timer: number = 60;
let level: string = '';
let letters: { element: HTMLSpanElement; letter: string; xPos: number; yPos: number }[] = [];

function showLevels(): void {
  (document.querySelector('.start-page') as HTMLElement).style.display = 'none';
  (document.querySelector('.level-selection') as HTMLElement).style.display = 'block';
}

function selectLevel(selectedLevel: string): void {
  level = selectedLevel;
  (document.querySelector('.level-selection') as HTMLElement).style.display = 'none';
  (document.querySelector('.game-page') as HTMLElement).style.display = 'block';
  document.getElementById('level')!.innerText = level;
  startTimer();
  createLetters();
}

function startTimer(): void {
  const timerElement = document.getElementById('timer')!;
  const countdown = setInterval(() => {
    timer--;
    timerElement.innerText = timer.toString();
    if (timer <= 0) {
      clearInterval(countdown);
      endGame();
    }
  }, 1000);
}

function createLetters(): void {
  let letterInterval: number;

  function generateAndAnimateLetter(): void {
    const letter = generateRandomLetter();
    const letterElement = document.createElement('span');
    letterElement.className = 'letter';
    letterElement.innerText = letter;

    let xPos = Math.random() * window.innerWidth;
    let yPos = window.innerHeight;

    letterElement.style.left = `${xPos}px`;
    letterElement.style.top = `${yPos}px`;

    document.getElementById('letters')!.appendChild(letterElement);

    letters.push({
      element: letterElement,
      letter: letter,
      xPos: xPos,
      yPos: yPos,
    });

    animateLetter(letterElement, yPos);
  }

  letterInterval = setInterval(generateAndAnimateLetter, getLetterInterval());

  document.addEventListener('keydown', (e) => {
    const keyPressed = e.key.toUpperCase();
    const popped = letters.findIndex((letterObj, index): any => {
      if (letterObj.letter === keyPressed && letterObj.yPos > -30) {
        alert(letterObj.yPos);
        letters.splice(index, 1);
        document.getElementById('score')!.innerText = (++score).toString();
        letterObj.element.remove();
        return true;
      }
    });

    if (popped === -1) {
      document.getElementById('score')!.innerText = (--score).toString();
    }
  });

  setTimeout(() => {
    clearInterval(letterInterval);
  }, timer * 1000);
}

function animateLetter(letterElement: HTMLElement, yPos: number): void {
  let animationInterval = setInterval(() => {
    yPos -= 2;
    letterElement.style.top = `${yPos}px`;

    if (yPos < -30) {
      clearInterval(animationInterval);
      letterElement.remove();
    }
  }, 20);
}

function generateRandomLetter(): string {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return alphabet.charAt(Math.floor(Math.random() * alphabet.length));
}

function getLetterInterval(): number | undefined {
  if (level === 'beginner') {
    return 2000;
  } else if (level === 'medium') {
    return 1000;
  } else if (level === 'hard') {
    return 5000;
  }
}

function endGame(): void {
  alert(`Game over! Your final score is ${score}`);
  location.reload();
}