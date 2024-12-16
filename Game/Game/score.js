import { canvas, ctx } from "./constant.js";

export let score = 0; // Variable to track the score
export let level = 1; // Variable to track the current level

// Function to draw the score and level on the canvas
export function drawScore() {
  ctx.font = "24px Arial";
  ctx.fillStyle = "white";
  ctx.fillText(`Score: ${score}`, 20, 80); // Display the score at the top left corner
  ctx.fillText(`Level: ${level}`, 20, 110); // Display the level below the score
}

// Function to add points when a meteor is destroyed
export function addPoints(points) {
  score += points;
  checkLevel();
  console.log(`Score updated! Current score: ${score}`);
}

// Function to check and update the level based on the score
function checkLevel() {
  let newLevel;
  if (score >= 5000) {
    newLevel = 3;
  } else if (score >= 2500) {
    newLevel = 2;
  } else {
    newLevel = 1;
  }

  if (newLevel !== level) {
    level = newLevel;
    console.log(`Level updated! Current level: ${level}`);
  }
}

// Function to get the current speed based on the level
export function getMeteorSpeed() {
  switch (level) {
    case 3:
      return 5; // Speed for level 3
    case 2:
      return 3; // Speed for level 2
    default:
      return 2; // Speed for level 1
  }
}
