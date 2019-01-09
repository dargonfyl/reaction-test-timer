/*
Mian Wang
Reaction Test Timer
A silly project made in a day, with a nap inbetween.
Technically this is the first side project I have ever made alone.
*/

const CONTAINER = document.querySelector("#container");
const BOX = document.querySelector("#box");
const HIGHSCORE = document.querySelector("h2");
const SUB = document.querySelector("#sub");

var running = false;
var interval;
var clickTime;
var time;
var best;

function start() {
  if (!running) { // Only runs if currently NOT running
    BOX.innerHTML = "Wait for it...";
    time = 0;
    clickTime = Math.floor(Math.random() * 1000 + Math.random() * 100) + 90; // Hopefully, a minimum of 1 second, give or take a little
    running = true;
    interval = setInterval(run, 10); // Runs every 10 ms
    CONTAINER.addEventListener("click", react, false); // Adds the actual reaction mechanism
  }
}

function run() {
  if (running) {
    time += 1;
    if (time == clickTime) {
      CONTAINER.style.backgroundColor = "green"
      BOX.innerHTML = "Now!"
    }
  }
}

function react() {
  if (time > clickTime) { // If you take 0 ms, you're cheating
    BOX.innerHTML = "Nice!";

    if (best === undefined) { // For the first run, where there is no best
      best = time - clickTime;
      HIGHSCORE.innerHTML = "Your best: " + best / 100 + " seconds";
    }
    if (best > time - clickTime) {
      best = time - clickTime;
      HIGHSCORE.innerHTML = "Your best: " + best / 100 + " seconds";
    }

    SUB.innerHTML = "That took " + (time - clickTime) / 100 + " seconds!";

  } else {
    BOX.innerHTML = "Too early!";
    CONTAINER.style.backgroundColor = "red";
  }

  CONTAINER.removeEventListener("click", react); // So that you can't press this after you mess up/get a time in
}

function reset(e) {
  if (e.keyCode == 32) { // Checks for spacebar to be pressed
    clearInterval(interval);
    time = 0;
    running = false;
    BOX.innerHTML = "Start!"
    SUB.innerHTML = "";
    CONTAINER.style.backgroundColor = "red";
    CONTAINER.removeEventListener("click", react);
  }
}

CONTAINER.addEventListener("click", start, false);
document.addEventListener("keydown", reset, false);
