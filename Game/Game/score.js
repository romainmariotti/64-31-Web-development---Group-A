import { canvas, ctx } from "./constant.js";

export let score = 0; // Variable to track the score

// Function to draw the score on the canvas
export function drawScore() {
  ctx.font = "24px Arial";
  ctx.fillStyle = "white";
  ctx.fillText(`Score: ${score}`, 20, 80); // Display the score at the top left corner
}

// Function to add points when a meteor is destroyed
export function addPoints(points) {
  score += points;
  console.log(`Score updated! Current score: ${score}`);
}
