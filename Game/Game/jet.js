import { canvas, ctx } from "./constant.js";
import { gameState } from "./game.js";

// Configuration de l'avion
export let player = {
  x: canvas.width / 2 - 250, // Position initiale centrée horizontalement
  y: canvas.height - 400, // Ajuste pour positionner l'avion plus bas
  width: 600, // Largeur (9x plus grand)
  height: 500, // Hauteur (9x plus grand)
  image: new Image(),
};

// Chargement de l'image de l'avion
player.image.src = "../Game/Images/Jet/FA18transp.png";
player.image.onload = function () {
  console.log("Jet image loaded!");
};

// Fonction pour dessiner l'avion
export function drawPlayer() {
  ctx.drawImage(player.image, player.x, player.y, player.width, player.height);

  // Positions des missiles (attachées aux ailes)
  const missileLeftX = player.x + player.width / 4 - 10; // Position horizontale pour le missile gauche
  const missileLeftX2 = player.x + player.width / 4 - 10; // Position horizontale pour le missile gauche
  const missileRightX = player.x + (3 * player.width) / 4 - 10; // Position horizontale pour le missile droit
  const missileRightX2 = player.x + (3 * player.width) / 4 - 10; // Position horizontale pour le missile droit
  const missileY = player.y + player.height - 200; // Position verticale pour les deux missiles

  // Dessin des missiles
  ctx.drawImage(missileImage, missileLeftX, missileY, 50, 150); // Missile gauche
  ctx.drawImage(missileImage, missileRightX, missileY, 50, 150); // Missile droit
  ctx.drawImage(missileImage, missileLeftX2, missileY, 50, 150); // Missile gauche
  ctx.drawImage(missileImage, missileRightX2, missileY, 50, 150); // Missile droit

  // Ajout du point rouge pour debug (nez de l'avion)
  //  const noseX = player.x + player.width / 2 + 28;
  //  const noseY = player.y + 180;
  //  ctx.fillStyle = "red";
  // ctx.beginPath();
  //ctx.arc(noseX, noseY, 5, 0, Math.PI * 2);
  // ctx.fill();
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------
// Bullets
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------
const bulletImage = new Image();
bulletImage.src = "../Game/Images/Jet/ProjectileMitrailleuseTransp.png"; // Chemin vers ton image
bulletImage.onload = function () {
  console.log("Image du projectile chargée !");
};

export let bullets = []; // Export the list of bullets for collision checks

let canShoot = true;

function fireBullet() {
  if (canShoot) {
    const noseX = player.x + player.width / 2 + 12; // Aligne avec le nez de l'avion
    const noseY = player.y + 100; // Aligne avec le point rouge
    bullets.push({
      x: noseX - 5, // Décale légèrement pour le centrer
      y: noseY,
      width: 10, // Largeur plus fine
      height: 30, // Hauteur plus longue
    });
    console.log("Bullet fired from:", { x: noseX, y: noseY });
    canShoot = false;
    setTimeout(() => {
      canShoot = true; // Réautorise à tirer après 200ms
    }, 200);
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

// Chargement de l'image des missiles
const missileImage = new Image();
missileImage.src = "../Game/Images/Jet/MissileTransp.png"; // Chemin vers votre image
missileImage.onload = function () {
  console.log("Image des missiles chargée !");
};

// Fonction pour dessiner les missiles sous les ailes
// function drawMissiles() {
//     const leftMissileX = player.x + player.width / 1000; // Position sous l'aile gauche
//     const leftMissileY = player.y + player.height / 1500; // Ajustement vertical pour l'aile
//     const leftMissileX2 = player.x + player.width / 100; // Position sous l'aile gauche
//     const leftMissileY2 = player.y + player.height / 25; // Ajustement vertical pour l'aile

//     const rightMissileX = player.x + (3 * player.width) / 15; // Position sous l'aile droite
//     const rightMissileY = player.y + player.height / 7; // Ajustement vertical pour l'aile
//     const rightMissileX2 = player.x + (3 * player.width) / 17; // Position sous l'aile droite
//     const rightMissileY2 = player.y + player.height / 8; // Ajustement vertical pour l'aile

//     // Définir la zone de découpe pour masquer la partie inférieure
//     ctx.save();
//     ctx.beginPath();
//     ctx.rect(leftMissileX2, leftMissileY2 + 60, 600, 200); // Ajustez les valeurs pour afficher uniquement la partie souhaitée
//     ctx.clip();
//     ctx.drawImage(missileImage, leftMissileX2, leftMissileY2, 600, 550);
//     ctx.restore();

//     // Traiter le missile droit supplémentaire (y2)
//     ctx.save();
//     ctx.beginPath();
//     ctx.rect(rightMissileX2, rightMissileY2 + 60, 600, 200); // Ajustez les valeurs pour afficher uniquement la partie souhaitée
//     ctx.clip();
//     ctx.drawImage(missileImage, rightMissileX2, rightMissileY2, 600, 550);
//     ctx.restore();

//     // Dessiner les autres missiles sans rognage
//     ctx.save();
//     ctx.beginPath();
//     ctx.rect(player.x, player.y + 60, player.width, player.height / 2.5); // Zone visible pour les autres missiles
//     ctx.clip();

//     ctx.drawImage(missileImage, leftMissileX, leftMissileY, 600, 550);
//     ctx.drawImage(missileImage, rightMissileX, rightMissileY, 600, 550);

//     ctx.restore();
// }

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------
// Managing user input for the jet (keyboard)
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------

let keys = {}; // Objet pour suivre les touches pressées

// Event listener to detect pressed keys
window.addEventListener("keydown", (e) => {
  keys[e.key] = true; // Enregistre la touche comme étant pressée
});

// Event listener to detect released keys
window.addEventListener("keyup", (e) => {
  keys[e.key] = false; // Enregistre la touche comme relâchée
});

// Jet actions
export function jetActions() {
  if (keys["ArrowLeft"] && player.x > -player.width / 2) {
    player.x -= 20; // Jet goes left
  }
  if (keys["ArrowRight"] && player.x + player.width / 2 < canvas.width) {
    player.x += 20; // Jet goes right
  }
  if (keys["ArrowUp"] && player.y > 0) {
    player.y -= 20; // Jet goes up
  }
  if (keys["ArrowDown"] && player.y + player.height <= canvas.height) {
    player.y += 20; // Jet goes down
  }
  if (keys[" "]) {
    // Space key to shoot
    fireBullet();
  }
}

// Lebenspunkte des Jets
export let playerLives = 3; // Use let to allow modification

// Getter für die Lebenspunkte
export function getPlayerLives() {
  return playerLives;
}

// Setter für die Lebenspunkte (zum Reduzieren)
export function reducePlayerLives() {
  playerLives -= 1;
  console.log(`Lives remaining: ${playerLives}`);
  return playerLives; // Return updated lives
}

// Funktion zur Überprüfung der Kollision zwischen zwei Rechtecken
function checkCollision(rect1, rect2) {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
}

// Neue Funktion zur Verwaltung der Lebenspunkte bei Kollision
export function checkPlayerCollision(meteors) {
  const playerHitbox = {
    x: player.x,
    y: player.y,
    width: player.width,
    height: player.height,
  };

  meteors.forEach((meteor, index) => {
    const meteorHitbox = {
      x: meteor.x,
      y: meteor.y,
      width: 100, // Breite des Meteoriten (entspricht der `drawImage`-Breite)
      height: 100, // Höhe des Meteoriten
    };

    if (checkCollision(playerHitbox, meteorHitbox)) {
      // Leben abziehen
      playerLives -= 1;
      console.log(`Lebenspunkte übrig: ${playerLives}`);

      // Meteor entfernen
      meteors.splice(index, 1);

      // Überprüfen, ob das Spiel beendet werden soll
      if (playerLives <= 0) {
        console.log("Game Over!");
        gameState.game_started = false; // Spiel stoppen
      }
    }
  });
}
