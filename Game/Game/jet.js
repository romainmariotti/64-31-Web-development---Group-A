import { canvas, ctx } from "./constant.js";
import { activeJet } from "./selectJet.js";
import { gameState } from "./game.js";



// Jet (player) configuration

// Configuration de l'avion
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
player.image.onload = function () {
  console.log("Aircraft image loaded !");
};

// Fonction pour dessiner l'avion
export function drawPlayer() {
  // Adjust the source rectangle to cut the tip of the jet
  const sourceX = 100; // Adjust this value to cut more or less of the tip
  const sourceY = 0;
  const sourceWidth = player.image.width - sourceX;
  const sourceHeight = player.image.height;

  ctx.drawImage(
      player.image,
      sourceX,
      sourceY,
      sourceWidth,
      sourceHeight, // Source rectangle
      player.x,
      player.y,
      player.width,
      player.height // Destination rectangle
  );
}
// ...existing code...

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------
// Bullets
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------
const bulletImage = new Image();
bulletImage.src = "../Game/Images/Jet/ProjectileMitrailleuseTransp.png"; // Chemin vers ton image
bulletImage.onload = function () {
  console.log("Projectile image loaded !");
};

export let bullets = [];

let canShoot = true;

function fireBullet() {
  if (canShoot) {
    const noseX = player.x + player.width / 2 + 20; // Aligne avec le nez de l'avion
    const noseY = player.y + 100; // Aligne avec le point rouge
    bullets.push({
      x: noseX - 1, // Décale légèrement pour le centrer
      y: noseY,
      width: 5, // Largeur plus fine
      height: 30, // Hauteur plus longue
    });
    console.log("Bullet fired from:", { x: noseX, y: noseY });
    canShoot = false;
    setTimeout(() => {
      canShoot = true; // Réautorise à tirer après 200ms
    }, 100);
  }
}

export function updateBullets() {
  bullets.forEach((bullet, index) => {
    bullet.y -= 15; // Déplacement du projectile

    // Traînée lumineuse
    ctx.fillStyle = "rgba(255, 165, 0, 0.5)";
    ctx.fillRect(bullet.x, bullet.y + 10, bullet.width, bullet.height * 1.5);

    // Corps principal
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

    if (bullet.y + bullet.height < 0) {
      bullets.splice(index, 1);
    }
  });
}

const shootingSound = new Audio("../Game/Sound/Blaster.mp3");
function startShootingSound() {
  if (shootingSound.paused || shootingSound.ended) {
    shootingSound.currentTime = 0; // Reset to the beginning
    shootingSound.play().catch((error) =>
        console.error("Error playing shooting sound:", error)
    );
  }
}

// Function to stop the shooting sound
function stopShootingSound() {
  if (!shootingSound.paused) {
    shootingSound.pause();
    shootingSound.currentTime = 0; // Reset the sound
  }
}

let keys = {}; // New variable to track keyboard click state
let mouseClick = false; // New variable to track mouse click state

// Event listener to detect pressed keys
window.addEventListener("keydown", (e) => {
  keys[e.key] = true; // Enregistre la touche comme étant pressée
});

// Event listener to detect released keys
window.addEventListener("keyup", (e) => {
  keys[e.key] = false; // Enregistre la touche comme relâchée
  if(e.key === " "){
    if(gameState.game_started===true && gameState.paused === false){
      stopShootingSound();
    }
  }
});

// Add an event listener for mouse management
window.addEventListener("mousedown", (event) => {
  if (event.button === 0) {
    // Left mouse button
    mouseClick = true;

    if(gameState.game_started===true && gameState.paused === false ){
      startShootingSound();
    }

  }
});

window.addEventListener("mouseup", (event) => {
  if (event.button === 0) {
    // Left mouse button
    mouseClick = false;

    if(gameState.game_started===true && gameState.paused === false ){
      stopShootingSound();
    }
  }
});

// Jet actions
export function jetActions() {
  // Left movement (ArrowLeft or A)
  if ((keys["ArrowLeft"] || keys["a"]) && player.x > -player.width / 2) {
    player.x -= 20; // Jet goes left
  }

  // Right movement (ArrowRight or D)
  if ((keys["ArrowRight"] || keys["d"]) && player.x + player.width / 2 < canvas.width) {
    player.x += 20; // Jet goes right
  }

  // Up movement (ArrowUp or W)
  if ((keys["ArrowUp"] || keys["w"]) && player.y > -player.height / 5) {
    player.y -= 20; // Jet goes up
  }

  // Down movement (ArrowDown or S)
  if ((keys["ArrowDown"] || keys["s"]) && player.y + player.height / 1.5 < canvas.height) {
    player.y += 20; // Jet goes down
  }

  // Fire bullets (Space bar)
  if (keys[" "] || mouseClick) {
    fireBullet();
    if(gameState.game_started === true && gameState.paused === false){
      startShootingSound();
    }
  }
}