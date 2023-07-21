const welcomeScreen = document.getElementById("welcomeScreen");
const countdownScreen = document.getElementById("countdownScreen");
const timerDisplay = document.getElementById("timerDisplay");
const breakTimeInput = document.getElementById("breakTime");

let timer; // Global variable to store the timer reference
let remainingTime = 0; // Track the remaining time for the break
let timerPaused = false; // Track whether the timer is currently paused
let isMouseInsideWindow = true; // Track whether the mouse is currently inside the window

function startBreak() {
  // Add a single event listener to detect user activity on the whole document
  document.addEventListener("mousemove", resetTimer);
  document.addEventListener("keydown", resetTimer);
  document.addEventListener("mousedown", resetTimer);
  document.addEventListener("touchstart", resetTimer);

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
      alert("Time to take a break!");
    }
  }, 1000);
}

function displayTime(timeInSeconds) {
  const minutes = Math.floor(timeInSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (timeInSeconds % 60).toString().padStart(2, "0");
  timerDisplay.textContent = `${minutes}:${seconds}`;
}

// Function to reset the timer when user activity is detected
function resetTimer() {
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
