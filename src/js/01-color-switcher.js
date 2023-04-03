function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
const body = document.querySelector('body');
let intervalId;

function startInterval() {
  intervalId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startButton.disabled = true;
}

function stopInterval() {
  clearInterval(intervalId);
  startButton.disabled = false;
}

startButton.addEventListener('click', startInterval);
stopButton.addEventListener('click', stopInterval);
