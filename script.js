const welcomeScreen = document.querySelector("#welcomeScreen");
const countdownScreen = document.querySelector("#countdownScreen");
const timerDisplay = document.querySelector("#timerDisplay");
const breakTimeInput = document.querySelector("#breakTime");
const endScreen = document.querySelector("#endScreen");

let timer; // Global variable to store the timer reference
let remainingTime = 0; // Track the remaining time for the break
let timerPaused = false; // Track whether the timer is currently paused
let isMouseInsideWindow = true; // Track whether the mouse is currently inside the window
let timerStarted = false; // Track whether the timer has been started

// Add a single event listener to detect user activity on the whole document
  document.addEventListener("mousemove", resetTimer);
  document.addEventListener("keydown", resetTimer);
  document.addEventListener("mousedown", resetTimer);
  document.addEventListener("touchstart", resetTimer);

function startBreak() {
  timerStarted = true;

  console.log("1", isMouseInsideWindow);

  const breakTime = parseInt(breakTimeInput.value) * 60; // Convert minutes to seconds
  remainingTime = breakTime;
  displayTime(remainingTime);

  welcomeScreen.style.display = "none";
  countdownScreen.style.display = "block";

  // Clear the previous timer, if any
  if (timer) {
    clearInterval(timer);
  }

  console.log("2", isMouseInsideWindow);

  // Start a new timer
  timer = setInterval(function () {
    console.log("3", isMouseInsideWindow);
    if (!timerPaused && isMouseInsideWindow) {
      remainingTime--;
      displayTime(remainingTime);
    }

    if (remainingTime <= 0) {
      clearInterval(timer);
      displayEndScreen();
    }
  }, 1000);
}

function displayTime(timeInSeconds) {
  const minutes = Math.floor(timeInSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (timeInSeconds % 60).toString().padStart(2, "0");
  timerDisplay.textContent = `${minutes} minutes ${seconds} seconds`;
}

function displayWelcomeScreen() {
  timerStarted = false;
  countdownScreen.style.display = "none";
  endScreen.style.display = "none";
  welcomeScreen.style.display = "block";
}

function displayEndScreen() {
  timerStarted = false;
  countdownScreen.style.display = "none";
  welcomeScreen.style.display = "none";
  endScreen.style.display = "block";
}

// Function to reset the timer when user activity is detected
function resetTimer() {
  if (!timerStarted) {
    return;
  }
  clearInterval(timer);
  startBreak();
}

// Event listener to track page visibility changes
document.addEventListener("visibilitychange", function () {
  if (document.hidden) {
    // If the page is hidden, pause the timer
    timerPaused = true;
  } else {
    // If the page is visible, resume the timer
    timerPaused = false;
  }
});

// Event listener to handle when the mouse moves inside the window
window.addEventListener("mousemove", function () {
  isMouseInsideWindow = true;
});

// Event listener to handle when the mouse moves outside the window
window.addEventListener("mouseout", function () {
  isMouseInsideWindow = false;
});
