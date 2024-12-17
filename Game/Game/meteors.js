import { gameState, drawBackground } from "./game.js";
import { drawPlayer, jetActions, updateBullets, player } from "./jet.js";
import { canvas, ctx } from "./constant.js";
import {
  drawLives,
  checkCollisions,
  checkProjectileCollisions,
} from "./hitbox.js";
import { drawScore, getMeteorSpeed } from "./score.js";
import { activeJet } from "./selectJet.js";
import { xwing, xwingActions, drawXwing, updateXwingBullets  } from "./xwing.js";

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
  if (gameState.paused) {
    // Stop the animation if the game is paused
    console.log("Game is paused or over. Stopping animation.");
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground();
  drawLives(); //Draw three hearts on the upper right.
  drawScore(); // Draw the score on the canvas

  //Calls the jet and its actions
  if (gameState.game_started) {

    if(activeJet === player){
      drawPlayer();
      jetActions();
      updateBullets();
    }
    else if(activeJet === xwing){
      drawXwing();
      xwingActions();
      updateXwingBullets();
    }


    checkProjectileCollisions(); // Check for projectile-meteor collisions
    checkCollisions(meteors_array);
  }

  const meteorSpeed = getMeteorSpeed(); // Get the current speed based on the level
  console.log(`Current meteor speed: ${meteorSpeed}`); // Log the current speed for debugging

  meteors_array.forEach((meteor, index) => {
    meteor.y += meteorSpeed; // Use the speed based on the current level
    ctx.drawImage(meteorImage, meteor.x, meteor.y, 100, 100);

    if (meteor.y > canvas.height) {
      meteors_array.splice(index, 1);
    }
  });

  if (gameState.paused === false) {
    gameState.animationFrameID = requestAnimationFrame(animateMeteors);
  }
};
