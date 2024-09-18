const checkBtn = document.querySelector(".check-btn");
const runBtn = document.querySelector(".run-btn");
const guessInput = document.querySelector(".guess-input");
const randomContainer = document.querySelector(".randomNumber-container");
const randomHeader = document.querySelector(".random-header");
const remainingContent = document.querySelector(".remained-content");
const timerContainer = document.querySelector(".timer-container");
const timer = document.querySelector(".timer");

let scoreContent = document.querySelector(".score");
let hightScoreContent = document.querySelector(".high-score");

const bonusBtns = document.querySelectorAll(".bonus-content i");
let hightScore = 0;
let score = 0;
let remainingRight = 3;

let countdownTime = 1 * 60;
let countdown;
let randomNumber;
let currentTime;

let clearBonusTime;

const infoBtn = document.querySelector("#info-btn");
const gameInfoContainer = document.querySelector(".game-info-container");

document.addEventListener("DOMContentLoaded", function () {
  checkBtn.disabled = true;
  guessInput.disabled = true;
  scoreContent.textContent = score;
  hightScoreContent.textContent = hightScore;
});

document.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    checkBtn.click();
  }
});
runBtn.addEventListener("click", function () {
  for (const element of remainingContent.children) {
    element.className = "fa-solid fa-heart";
  }
  timer.textContent = "1:00";

  setIntervalTime(countdownTime);
  randomNumber = Math.floor(Math.random() * 10) + 1;
  guessInput.value = "";

  runBtn.textContent = "Run";
  randomHeader.textContent = "Calculating...";
  randomContainer.textContent = "?";

  randomContainer.classList.add("bg-effect");

  runBtn.disabled = true;
  score = 0;
  scoreContent.textContent = score;

  for (const bonusBtn of bonusBtns) {
    bonusBtn.classList.add("bonus-active");
  }

  function intervalEffectFunc() {
    randomContainer.classList.remove("bg-effect");
    randomHeader.textContent = "Guess The Number !";
    checkBtn.disabled = false;
    guessInput.disabled = false;

    clearInterval(intervalEffect);
  }

  let intervalEffect = setInterval(intervalEffectFunc, 1000);
});

checkBtn.addEventListener("click", function () {
  if (guessInput.value == "") {
    alert("Please enter a number");
    return;
  }

  if (guessInput.value == randomNumber) {
    randomNumber = Math.floor(Math.random() * 10) + 1;

    randomHeader.innerHTML = ` 
   <i class="fa-solid fa-face-smile"></i>
    <p>Thats Correct !, Calculator Again... </p>
    `;

    checkBtn.disabled = true;
    guessInput.disabled = true;

    randomContainer.classList.add("bg-effect");
    scoreFunction();

    function intervalEffectFunc() {
      randomContainer.classList.remove("bg-effect");
      randomHeader.textContent = "Guess The Number !";

      checkBtn.disabled = false;
      guessInput.disabled = false;

      clearInterval(intervalEffects);
    }

    let intervalEffects = setInterval(intervalEffectFunc, 1000);
  } else {
    remainingRight--;
    remaining();

    if (remainingRight == 0) {
      randomHeader.innerHTML = `
        <i class="fa-solid fa-face-sad-tear"></i>
        <p>Game Over ! , Random number is .. </p>
        `;

      checkBtn.disabled = true;
      guessInput.disabled = true;

      runBtn.disabled = false;
      runBtn.textContent = "Restart";

      remainingRight = 3;

      randomContainer.textContent = randomNumber;
      clearInterval(countdown);
      clearTimeout(clearBonusTime);
      hightScoreFunction();
      timerContainer.classList.remove("time-effect");

      for (const bonusBtn of bonusBtns) {
        bonusBtn.classList.remove("bonus-active");
      }
    } else {
      randomHeader.innerHTML = ` <i class="fa-solid fa-face-sad-cry"></i>
        <p>false </p>
        `;
      checkBtn.disabled = true;
      guessInput.disabled = true;

      function intervalHeader() {
        randomHeader.textContent = "Guess the Number !";
        checkBtn.disabled = false;
        guessInput.disabled = false;
        clearInterval(intervalEffect);
      }

      let intervalEffect = setInterval(intervalHeader, 1000);
    }
  }

  guessInput.value = "";
});

function remaining() {
  for (const element of remainingContent.children) {
    let id = element.getAttribute("data-id");

    if (remainingRight == id) {
      element.className = "fa-regular fa-heart";
    }
  }
}

function setIntervalTime(countdownTime) {
  countdown = setInterval(() => {
    const minutes = Math.floor(countdownTime / 60);
    const seconds = countdownTime % 60;

    timer.innerHTML = `${minutes}:${seconds < 10 ? "0" + seconds : seconds}
            `;

    countdownTime--;
    currentTime = countdownTime;

    if (countdownTime < 0) {
      clearInterval(countdown);
      countdownTime = 0;
      randomHeader.textContent = "Time is Up ! , Random number is ..";
      randomContainer.textContent = randomNumber;
      checkBtn.disabled = true;
      guessInput.disabled = true;
      runBtn.disabled = false;
      runBtn.textContent = "Restart";

      hightScoreFunction();
      score = 0;
    }
  }, 1000);

  return countdown;
}

document.addEventListener("keydown", function (e) {
  if (e.key == "Control") {
    document.querySelector(".random-hack").textContent = randomNumber;
    document.querySelector(".random-hack").style.opacity = ".1";
  }
});

document.addEventListener("keyup", function (e) {
  if (e.key == "Control") {
    document.querySelector(".random-hack").textContent = "";
    document.querySelector(".random-hack").style.opacity = "0";
  }
});

function scoreFunction() {
  score += 10;
  document.querySelector(".score").textContent = score;
}

function hightScoreFunction() {
  let s = score;
  if (s > hightScore) {
    hightScore = s;
    document.querySelector(".high-score").textContent = hightScore;
  }
}

guessInput.addEventListener("input", function () {
  if (guessInput.value > 10 || guessInput.value == "00") {
    let newValue = guessInput.value.slice(0, 1);
    guessInput.value = newValue;
  }

  guessInput.value = guessInput.value.replace(/[^0-9.-]/g, "");
});

bonusFunction();

function bonusFunction() {
  for (const bonusBtn of bonusBtns) {
    bonusBtn.addEventListener("click", function () {
      const dataValue = bonusBtn.getAttribute("data-value");
      if (dataValue == "info-bonus") {
        if (randomNumber > 5) {
          alert("Number is greater than 5 !");
        }
        if (randomNumber == 5) {
          let previousNumber = randomNumber - 2;
          let nextNumber = randomNumber + 2;
          alert(`Number between ${previousNumber} and ${nextNumber}`);
        }
        if (randomNumber < 5) {
          alert("Number is less than 5 !");
        }
        // console.log(randomNumber);
      } else {
        clearBonusTime = setTimeout(() => {
          setIntervalTime(currentTime);
          timerContainer.classList.remove("time-effect");
        }, 10000);

        timerContainer.classList.add("time-effect");
        clearInterval(countdown);
      }

      // console.log(bonusBtn.getAttribute("data-value"));
      bonusBtn.classList.remove("bonus-active");
    });
  }
}

infoBtn.addEventListener("click", function () {
  infoBtn.classList.remove("infoBtn-Effect");
  gameInfoContainer.classList.toggle("display");
});

// About Console

document.addEventListener(
  "contextmenu",
  function (e) {
    e.preventDefault();
  },
  false
);

document.addEventListener(
  "keydown",
  function (e) {
    if (e.key === "F12") {
      e.preventDefault();
    }

    if (
      (e.ctrlKey && e.shiftKey && e.key === "I") ||
      (e.ctrlKey && e.shiftKey && e.key === "J")
    ) {
      e.preventDefault();
    }

    if (
      (e.ctrlKey && e.shiftKey && e.key === "C") ||
      (e.ctrlKey && e.key === "u")
    ) {
      e.preventDefault();
    }
  },
  false
);
