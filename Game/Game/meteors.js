import { gameState, drawBackground } from "./game.js";
import { drawPlayer, jetActions, updateBullets } from "./jet.js";
import { canvas, ctx } from "./constant.js";
import { reducePlayerLives, getPlayerLives } from "./jet.js";
import { bullets } from "./jet.js"; // Import bullets from jet.js
import { player } from "./jet.js"; // Import the player object

let meteors_array = []; //Array to manage multiple meteors at the same time
const meteorImage = new Image();
meteorImage.src = "../Game/Images/meteor.png";

// Function to check collision between two rectangles
function checkCollision(rect1, rect2) {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
}

// !!! Add condition to stop when dead !!!
//Recursively called with set interval. Adds meteors to the array with random x coordinates.
// Updated function to animate meteors
export let animateMeteors = function () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground();

  // Draw the jet and handle its actions
  if (gameState.game_started) {
    drawPlayer();
    jetActions();
    updateBullets();

    // Check collisions between meteors and the player
    meteors_array.forEach((meteor, meteorIndex) => {
      let meteorHitbox = {
        // Change `const` to `let`
        x: meteor.x,
        y: meteor.y,
        width: 100, // Meteor width
        height: 100, // Meteor height
      };

      const playerHitbox = {
        x: player.x,
        y: player.y,
        width: player.width,
        height: player.height,
      };

      // Check if the meteor collides with the player
      if (checkCollision(meteorHitbox, playerHitbox)) {
        meteors_array.splice(meteorIndex, 1); // Remove the meteor
        const remainingLives = reducePlayerLives(); // Use the function to reduce lives

        // End the game if the player has no lives left
        if (remainingLives <= 0) {
          console.log("Game Over!");
          gameState.game_started = false; // Stop the game
          cancelAnimationFrame(gameState.animationFrameID); // Stop the animation
        }
      }

      // Check collisions between bullets and meteors
      bullets.forEach((bullet, bulletIndex) => {
        const bulletHitbox = {
          x: bullet.x,
          y: bullet.y,
          width: bullet.width,
          height: bullet.height,
        };

        if (checkCollision(meteorHitbox, bulletHitbox)) {
          // Remove both the meteor and the bullet
          meteors_array.splice(meteorIndex, 1);
          bullets.splice(bulletIndex, 1);

          console.log("Meteor destroyed!");
        }
      });
    });

    // Animate meteors and remove them if they go off-screen
    meteors_array.forEach((meteor, index) => {
      meteor.y = meteor.y + 3; // Meteor speed
      ctx.drawImage(meteorImage, meteor.x, meteor.y, 100, 100);

      if (meteor.y > canvas.height) {
        meteors_array.splice(index, 1);
      }
    });
  }

  if (gameState.paused === false) {
    gameState.animationFrameID = requestAnimationFrame(animateMeteors);
  }
};

// Function to spawn meteors at random x-coordinates
export let CallMeteor = function () {
  if (gameState.paused === false) {
    // Generate random x-coordinate for the meteor
    let x = Math.random() * (canvas.width - 100);
    x = Math.round(x); // Ensure it's an integer value
    let y = -30; // Start slightly above the screen
    meteors_array.push({ x: x, y: y }); // Add the meteor to the array
  }
  // Recursively call the function after a delay (750ms)
  setTimeout(CallMeteor, 750); // Adjust this value for spawn frequency
};
