import { canvas, ctx } from "./constant.js";
import { activeJet } from "./selectJet.js";


const shootingSound = new Audio("../Game/Sound/Blaster.mp3");
function startShootingSound() {
  if (shootingSound.paused || shootingSound.ended) {
    shootingSound.currentTime = 0; // Reset to the beginning
    shootingSound.play().catch((error) =>
        console.error("Error playing shooting sound:", error)
    );
  }
}
// Jet (player) configuration

export let player = {

  x: canvas.width / 2 - 187.5, // Position initiale centrée horizontalement
  y: canvas.height - 300, // Ajuste pour positionner l'avion plus bas
  width: 450, // Largeur (25% plus petit)
  height: 375, // Hauteur (25% plus petit)
  image: new Image(),
};

// Chargement de l'image de l'avion
// ...existing code...

player.image.src = "../Game/Images/Jet/FA18transp.png";



// Function to draw the player jet
export function drawPlayer() {

  if (activeJet.image.complete) {
    ctx.drawImage(activeJet.image, activeJet.x, activeJet.y, activeJet.width, activeJet.height);
  } else {
    console.error("Jet image is not loaded yet.");
  }

}
// ...existing code...

// -----------------------------------------------------------------------------
// Bullets Configuration
// -----------------------------------------------------------------------------
export let bullets = []; // Array to store active bullets
let isShooting = false; // Tracks if the player is holding down the mouse button
let shootingInterval = null; // Interval for continuous shooting

// Function to stop the shooting sound
function stopShootingSound() {
  if (!shootingSound.paused) {
    shootingSound.pause();
    shootingSound.currentTime = 0; // Reset the sound
  }
}

// Fire a bullet
function fireBullet() {
  const noseX = activeJet.x + activeJet.width / 2 + 20; // Position of the bullet
  const noseY = activeJet.y + 100;

  bullets.push({ x: noseX - 1, y: noseY, width: 5, height: 30 });
  console.log("Bullet fired from:", { x: noseX, y: noseY });

  startShootingSound(); // Play shooting sound

}

// Update and render bullets
export function updateBullets() {
  bullets.forEach((bullet, index) => {
    bullet.y -= 15; // Move bullet upward

    // Draw bullet trail
    ctx.fillStyle = "rgba(255, 165, 0, 0.5)";
    ctx.fillRect(bullet.x, bullet.y + 10, bullet.width, bullet.height * 1.5);

    // Draw main bullet body or custom bullet image
    const gradient = ctx.createLinearGradient(
      bullet.x,
      bullet.y,
      bullet.x,
      bullet.y + bullet.height
    );
    gradient.addColorStop(0, "yellow");
    gradient.addColorStop(0.5, "orange");
    gradient.addColorStop(1, "red");
    ctx.fillStyle = gradient;
    ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);

    // Remove bullets that are off-screen
    if (bullet.y + bullet.height < 0) {
      bullets.splice(index, 1);
    }
  });
}
// -----------------------------------------------------------------------------
// Mouse and Keyboard Input
// -----------------------------------------------------------------------------
let keys = {}; // Object to track pressed keys
let mouseClick = false; // Track mouse click state

// Event listener to detect pressed keys
// Handle key press
window.addEventListener("keydown", (e) => {
  keys[e.key] = true;
});

// Handle key release
window.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});



// Handle mouse down (start shooting)
document.addEventListener("mousedown", (event) => {
  if (event.button === 0) { // Left mouse button
    isShooting = true;

    // Play the shooting sound
    startShootingSound();

    // Start firing bullets continuously
    if (!shootingInterval) {
      shootingInterval = setInterval(() => {
        if (isShooting) {
          fireBullet();
        }
      }, 100); // Adjust the interval (milliseconds) for the shooting rate
    }
  }
});

// Handle mouse up (stop shooting)
document.addEventListener("mouseup", (event) => {
  if (event.button === 0) { // Left mouse button
    isShooting = false;

    // Stop the shooting sound
    stopShootingSound();

    // Stop continuous shooting
    if (shootingInterval) {
      clearInterval(shootingInterval);
      shootingInterval = null;
    }
  }
});

// -----------------------------------------------------------------------------
// Jet Actions
// -----------------------------------------------------------------------------

export function jetActions() {
  // Move left (ArrowLeft or 'A')
  if ((keys["ArrowLeft"] || keys["a"]) && player.x > -player.width / 2) {
    activeJet.x -= 20;
  }

  // Right movement (ArrowRight or D)
  if (
    (keys["ArrowRight"] || keys["d"]) &&
    player.x + player.width / 2 < canvas.width
  ) {
    player.x += 20; // Jet goes right

  }

  // Move up (ArrowUp or 'W')
  if ((keys["ArrowUp"] || keys["w"]) && player.y > 0) {
    activeJet.y -= 20;
  }


  // Down movement (ArrowDown or S)
  if (
    (keys["ArrowDown"] || keys["s"]) &&
    player.y + player.height <= canvas.height
  ) {
    player.y += 20; // Jet goes down

  }

  // Fire bullets (Space or left mouse click)
  if (keys[" "] || mouseClick) {
    fireBullet();
  }
}
