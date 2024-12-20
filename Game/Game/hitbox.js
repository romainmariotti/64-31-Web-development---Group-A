import { canvas, ctx } from "./constant.js";
import { player } from "./jet.js";
import { meteors_array } from "./meteors.js";
import { bullets } from "./jet.js"; // Import bullets array from jet.js
import { xwing, xwingBullets } from "./xwing.js";
import { activeJet } from "./selectJet.js";
import { gameState } from "./game.js";
import { addPoints } from "./score.js";
import { Zero, zeroBullets, zeroSecondaryBullets } from "./Zero.js";


// Player lives configuration
let lives = 3; // Number of lives
const heartImage = new Image();
heartImage.src = "../Game/Images/heart.png"; // Path to heart image

heartImage.onload = () => {
  console.log("Heart image successfully loaded!");
};

export function drawLives() {
  if (!heartImage.complete) {
    console.error("Heart image not loaded yet.");
    return;
  }

  const heartSize = 40; // Adjusted heart size for better visibility
  const spacing = 10; // Spacing between hearts
  const marginRight = 20; // Margin from the right edge
  const marginTop = 20; // Margin from the top edge

  // Start drawing hearts from the right side
  const startX = canvas.width - marginRight - lives * (heartSize + spacing);
  const startY = marginTop; // Position near the top of the canvas

  for (let i = 0; i < lives; i++) {
    const x = startX + i * (heartSize + spacing);
    ctx.drawImage(heartImage, x, startY, heartSize, heartSize);
  }
}

// Function to check for collision between two rectangles
function isCollision(rect1, rect2) {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
}

//Hitbox of the jets (collisions with meteors) (both characters)
export function checkCollisions() {
  meteors_array.forEach((meteor, index) => {
    const meteorHitbox = {
      x: meteor.x,
      y: meteor.y,
      width: 100,
      height: 100,
    };

    function getHitbox() {
      //X-Wing hitbox
      if (activeJet.image.src.includes("X-Wing")) {
        const xPadding = xwing.width * 0.12; // Adjust hitbox width
        const yPadding = xwing.height * 0.06; // Adjust hitbox height
        const xOffset = xwing.width * 0.05; // Plane image not centered, so offset to "push" it to the left
        const yOffset = xwing.height * 0.05; // Plane image not centered, so offset to "push" it upwards

        return {
          x: xwing.x + xOffset,
          y: xwing.y + yOffset,
          width: xwing.width - xPadding,
          height: xwing.height - yPadding
        };
      }

      //FA-18 hitbox
      else if (activeJet.image.src.includes("FA18transp")) {
        // Adjust player hitbox size and position
        const paddingX = player.width * 0.8; // Adjust hitbox width
        const paddingY = player.height * 0.55; // Adjust hitbox height
        const offsetX = player.width * 0.01; // Plane image not centered, so offset to "push" it to the left
        const offsetY = player.height * 0.07; // Plane image not centered, so offset to "push" it upwards

        return {
          x: player.x + paddingX / 2 + offsetX,
          y: player.y + paddingY / 2 - offsetY,
          width: player.width - paddingX,
          height: player.height - paddingY
        };
      }

      //Zero hitbox
     else if (activeJet.image.src.includes("A6MZero")) {
        const xPadding = Zero.width * 0.3; // Adjust hitbox width
        const yPadding = Zero.height * 0.2; // Adjust hitbox height
        const xOffset = Zero.width * 0.1; // Plane image not centered, so offset to "push" it to the left
        const yOffset = Zero.height * 0.05; // Plane image not centered, so offset to "push" it upwards

        return {
          x: Zero.x + xOffset,
          y: Zero.y + yOffset,
          width: Zero.width - xPadding,
          height: Zero.height - yPadding
        };
      }

    }

    const jetHitbox = getHitbox();

    // jet hitbox debugging
    // ctx.strokeStyle = "red"; // Set outline color
    // ctx.lineWidth = 2;       // Set outline thickness
    // ctx.strokeRect(jetHitbox.x, jetHitbox.y, jetHitbox.width, jetHitbox.height);


    if (isCollision(jetHitbox, meteorHitbox)) {
      console.log("Collision detected with Jet!");
      meteors_array.splice(index, 1);
      reduceLives();
    }
  });
}

//Hitbox for bullets hitting meteors (both characters)
export function checkProjectileCollisions() {
  // Check collisions for X-Wing bullets
  xwingBullets.forEach((bullet, bulletIndex) => {
    meteors_array.forEach((meteor, meteorIndex) => {
      const bulletHitbox = {
        x: bullet.x,
        y: bullet.y,
        width: bullet.width,
        height: bullet.height,
      };

      const meteorHitbox = {
        x: meteor.x,
        y: meteor.y,
        width: 100, // Assuming meteor image size
        height: 100, // Adjust if necessary
      };

      // Check for collision between the bullet and the meteor
      if (isCollision(bulletHitbox, meteorHitbox)) {
        console.log("X-Wing projectile hit detected!");
        addPoints(100); // Add points for the collision
        xwingBullets.splice(bulletIndex, 1); // Remove the bullet
        meteors_array.splice(meteorIndex, 1); // Remove the meteor
      }
    });
  });

  // Check collisions for Player's bullets
  bullets.forEach((bullet, bulletIndex) => {
    meteors_array.forEach((meteor, meteorIndex) => {
      const bulletHitbox = {
        x: bullet.x,
        y: bullet.y,
        width: bullet.width,
        height: bullet.height,
      };

      const meteorHitbox = {
        x: meteor.x,
        y: meteor.y,
        width: 100, // Assuming meteor image size
        height: 100, // Adjust if necessary
      };

      // Check for collision between the bullet and the meteor
      if (isCollision(bulletHitbox, meteorHitbox)) {
        console.log("Player projectile hit detected!");
        addPoints(100); // Add points for the collision
        bullets.splice(bulletIndex, 1); // Remove the bullet
        meteors_array.splice(meteorIndex, 1); // Remove the meteor
      }
    });
  });


// Check collisions for Zero bullets
  zeroBullets.forEach((bullet, bulletIndex) => {
    meteors_array.forEach((meteor, meteorIndex) => {
      const bulletHitbox = {
        x: bullet.x,
        y: bullet.y,
        width: bullet.width,
        height: bullet.height,
      };

      const meteorHitbox = {
        x: meteor.x,
        y: meteor.y,
        width: 100, // Assuming meteor image size
        height: 100, // Adjust if necessary
      };


      // Check for collision between the bullet and the meteor
      if (isCollision(bulletHitbox, meteorHitbox)) {
        console.log("Zero projectile hit detected!");
        addPoints(100); // Add points for the collision
        zeroBullets.splice(bulletIndex, 1); // Remove the bullet
        meteors_array.splice(meteorIndex, 1); // Remove the meteor
      }
    });
  });


// Check collisions for Zero secondary bullets
  zeroSecondaryBullets.forEach((bullet, bulletIndex) => {
    meteors_array.forEach((meteor, meteorIndex) => {
      const bulletHitbox = {
        x: bullet.x,
        y: bullet.y,
        width: bullet.width,
        height: bullet.height,
      };

      const meteorHitbox = {
        x: meteor.x,
        y: meteor.y,
        width: 100, // Assuming meteor image size
        height: 100, // Adjust if necessary
      };


      // Check for collision between the bullet and the meteor
      if (isCollision(bulletHitbox, meteorHitbox)) {
        console.log("Zero projectile hit detected!");
        addPoints(100); // Add points for the collision
        zeroSecondaryBullets.splice(bulletIndex, 1); // Remove the bullet
        meteors_array.splice(meteorIndex, 1); // Remove the meteor
      }
    });
  });
}
// Function to reduce lives when a collision occurs
export function reduceLives() {
  if (lives > 0) {
    lives -= 1; // Decrease lives
    console.log(`Collision detected! Lives remaining: ${lives}`);
    if (lives === 0) {
      gameOver(); // Handle game over logic when lives reach 0
    }
  }
}

// Function to handle game over
function gameOver() {
  console.log("Game Over!");
  // Stop the game animation
  gameState.paused = true;
  cancelAnimationFrame(gameState.animationFrameID);

  // Display Game Over screen
  const gameOverScreen = document.createElement("div");
  gameOverScreen.id = "game-over-screen";
  gameOverScreen.style.position = "fixed";
  gameOverScreen.style.top = "0";
  gameOverScreen.style.left = "0";
  gameOverScreen.style.width = "100%";
  gameOverScreen.style.height = "100%";
  gameOverScreen.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
  gameOverScreen.style.display = "flex";
  gameOverScreen.style.flexDirection = "column";
  gameOverScreen.style.alignItems = "center";
  gameOverScreen.style.justifyContent = "center";
  gameOverScreen.style.color = "white";
  gameOverScreen.style.zIndex = "1000";

  const message = document.createElement("h1");
  message.innerText = "Game Over";
  gameOverScreen.appendChild(message);

  const restartButton = document.createElement("button");
  restartButton.innerText = "Restart Game";
  restartButton.style.padding = "10px 20px";
  restartButton.style.marginTop = "20px";
  restartButton.style.fontSize = "1.2em";
  restartButton.style.cursor = "pointer";

  restartButton.onclick = function () {
    window.location.reload(); // Reload the page to restart the game
  };

  gameOverScreen.appendChild(restartButton);
  document.body.appendChild(gameOverScreen);
}
