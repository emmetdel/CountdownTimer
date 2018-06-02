const timerInput = document.getElementById("timer-input");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const clearBtn = document.getElementById("clearBtn");
const timerBall = document.getElementById("dot-container");
const errorMessage = document.getElementById("error-message");
const mainTimer = document.getElementById("main-timer");

let timerDisplay;
let divisions;
let intervalFunction;
let index = 90;
let currentIndexPosition;

document.addEventListener(
  "DOMContentLoaded",
  () => {
    timerInput.focus();
  },
  false
);

startBtn.addEventListener("click", e => {
  if (timerInput.value < 1) {
    return errorMessageDisplay();
  }
  //Button Styles
  stopBtn.style.display = "block";
  clearBtn.style.display = "block";
  startBtn.style.display = "none";

  if (index > 90) {
    startInterval();
    return;
  }

  //Gets input value and divides by 360
  timerDisplay = timerInput.value;
  divisions = 360 / timerInput.value;

  startInterval();
});

stopBtn.addEventListener("click", e => {
  stopBtn.style.display = "none";
  startBtn.style.display = "block";
  clearInterval(intervalFunction);
});

clearBtn.addEventListener("click", e => {
  stopBtn.style.display = "none";
  startBtn.style.display = "block";
  clearBtn.style.display = "none";
  reset();
});

function errorMessageDisplay() {
  errorMessage.textContent = "Please Input a number.";
  timerInput.focus();
  setTimeout(() => {
    errorMessage.textContent = "";
  }, 2000);
  return;
}

function timerFinish() {
  mainTimer.classList.add("timer-finish");
  setTimeout(() => {
    mainTimer.classList.remove("timer-finish");
  }, 2000);
  return;
}

function setBallPosition() {
  currentIndexPosition = index + divisions;
  if (currentIndexPosition > 450) {
    reset();
  }
  timerInput.value = timerDisplay--;
  document.title = `${timerInput.value} - Countdowner`;
  timerBall.style.transform = `rotate(${index}deg)`;
  index += divisions;
}

function convertTimeToSeconds(hms) {
  var a = hms.split(":"); // split it at the colons
  var seconds = +a[0] * 60 + +a[1];
  return seconds;
}

function startInterval() {
  intervalFunction = setInterval(setBallPosition, 1000);
}

function reset() {
  clearInterval(intervalFunction);
  timerInput.value = "";
  timerBall.style.transform = "rotate(90deg)";
  index = 90;
  divisions = 0;
  currentIndexPosition = 0;
  stopBtn.style.display = "none";
  startBtn.style.display = "block";
  clearBtn.style.display = "none";
  document.title = "Countdowner";
  timerInput.focus();
  timerFinish();
}

function isNumberKey(e) {
  if (timerInput.value.length == 3) {
    e.preventDefault();
    return;
  }
}
