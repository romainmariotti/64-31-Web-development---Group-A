import { gameState, drawBackground } from "./game.js";
import { drawPlayer, jetActions, updateBullets } from "./jet.js";
import { canvas, ctx } from "./constant.js";
import {
  drawLives,
  checkCollisions,
  checkProjectileCollisions,
} from "./hitbox.js";
import { drawScore, getMeteorSpeed } from "./score.js";

export let meteors_array = []; //Array to manage multiple meteors at the same time
const meteorImage = new Image();
meteorImage.src = "../Game/Images/meteor.png";

// !!! Add condition to stop when dead !!!
//Recursively called with set interval. Adds meteors to the array with random x coordinates.
export let CallMeteor = function () {
  if (gameState.paused === false) {
    let x = Math.random() * (canvas.width - 100);
    x = Math.round(x);
    let y = -30;
    meteors_array.push({ x: x, y: y });
  }
  setTimeout(CallMeteor, 750); //Change this value to change interval of meteors spawn
};

//Draws meteors, manages the gravity (by updating y coordinates) and deletes the meteors from array when they reach the bottom of the screen.
export let animateMeteors = function () {
  if (gameState.paused) return;

  drawLives(); // Draw hearts
  drawScore(); // Draw score and level

  // Update meteors
  const meteorSpeed = getMeteorSpeed();
  meteors_array.forEach((meteor, index) => {
    meteor.y += meteorSpeed;
    ctx.drawImage(meteorImage, meteor.x, meteor.y, 100, 100);

    if (meteor.y > canvas.height) {
      meteors_array.splice(index, 1);
    }
  });

  // Check collisions and update bullets
  if (gameState.game_started) {
    checkProjectileCollisions();
    checkCollisions(meteors_array);
  }
};

