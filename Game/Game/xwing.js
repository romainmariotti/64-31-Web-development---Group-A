import { canvas, ctx } from "./constant.js";
import { activeJet } from "./selectJet.js";
import { gameState } from "./game.js";

// X-Wing Configuration
export let xwing = {
    x: canvas.width / 2 - 100, // Center the X-Wing horizontally
    y: canvas.height - 270, // Position the X-Wing lower on the screen
    width: 200,
    height: 250,
    image: new Image(), // Default X-Wing image
};

xwing.image.src = "../Game/Images/xwing/X-Wing_Top.png";
xwing.image.onload = () => console.log("X-Wing image loaded!");

// Function to draw the X-Wing
export function drawXwing() {
    if (xwing.image.complete) {
        ctx.drawImage(xwing.image, xwing.x, xwing.y, xwing.width, xwing.height);
    }
}

// X-Wing Bullets Configuration
export let xwingBullets = [];

// Define the dimensions and behavior of X-Wing projectiles
const xwingBulletConfig = {
    width: 4,
    height: 20,
    speed: 15, // Speed of the X-Wing bullets
    color: "rgba(255, 0, 0, 1)", // Bright red for the bullet body
    trailColor: "rgba(139, 0, 0, 0.5)", // Dark red for the bullet trail
};


let isShootingXwing = false;
let xwingShootingInterval = null;

export function fireXwingBullet() {
    const offsetX = 35; // Adjusts bullet position horizontally
    const offsetY = 50; // Adjusts bullet position vertically (downwards)

    // Bullet starting positions closer to the wingtip
    const noseY = xwing.y + offsetY;

    // Right cannon (slightly adjusted to right wingtip)
    const noseX_right = xwing.x + xwing.width * 0.85;

    // Left cannon (slightly adjusted to left wingtip)
    const noseX_left = xwing.x + xwing.width * 0.1;

    xwingBullets.push(
        { x: noseX_right, y: noseY, width: xwingBulletConfig.width, height: xwingBulletConfig.height },
        { x: noseX_left, y: noseY, width: xwingBulletConfig.width, height: xwingBulletConfig.height }
    );
}

// Update and Render Bullets
export function updateXwingBullets() {
    xwingBullets.forEach((bullet, index) => {
        console.log("Bullet properties:", bullet); // Debug bullets
        bullet.y -= xwingBulletConfig.speed;

        // Draw bullet trail
        ctx.fillStyle = xwingBulletConfig.trailColor;
        ctx.fillRect(bullet.x, bullet.y + 10, bullet.width, bullet.height * 1.5);

        // Draw main bullet
        ctx.fillStyle = xwingBulletConfig.color;
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);

        if (bullet.y + bullet.height < 0) {
            xwingBullets.splice(index, 1);
        }
    });
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------
//Bullets sound
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------

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

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------
//User keys input
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------


// X-Wing Actions (Keyboard and Mouse)
let xwingKeys = {};
window.addEventListener("keydown", (e) => {
    xwingKeys[e.key] = true;
    if(e.key === " "){
        if(gameState.game_started === true && gameState.paused === false) {
            startShootingSound();
        }
    }
});
window.addEventListener("keyup", (e) => {
    xwingKeys[e.key] = false;
    if(e.key === " "){
        if(gameState.game_started === true && gameState.paused === false) {
            stopShootingSound();
        }
    }
});

// Handle Mouse Down (Start Shooting)
document.addEventListener("mousedown", (event) => {
    console.log("Mouse down event detected");

    if (event.button === 0 && activeJet.image.src.includes("X-Wing")) {
        console.log("Firing enabled for X-Wing");
        isShootingXwing = true;


        if (!xwingShootingInterval) {
            xwingShootingInterval = setInterval(() => {
                if (isShootingXwing) {
                    fireXwingBullet();
                }
            }, 100);
        }
    }
});

document.addEventListener("mouseup", (event) => {
    console.log("Mouse up event detected");

    if (event.button === 0 && activeJet.image.src.includes("X-Wing")) {
        console.log("Firing disabled for X-Wing");
        isShootingXwing = false;


        if (xwingShootingInterval) {
            clearInterval(xwingShootingInterval);
            xwingShootingInterval = null;
        }
    }
});

let canShoot = true;


// X-Wing Movement
export function xwingActions() {
    if ((xwingKeys["ArrowLeft"] || xwingKeys["a"]) && xwing.x > 0) {
        xwing.x -= 20;
    }
    if ((xwingKeys["ArrowRight"] || xwingKeys["d"]) && xwing.x + xwing.width < canvas.width) {
        xwing.x += 20;
    }
    if ((xwingKeys["ArrowUp"] || xwingKeys["w"]) && xwing.y > 0) {
        xwing.y -= 20;
    }
    if ((xwingKeys["ArrowDown"] || xwingKeys["s"]) && xwing.y + xwing.height < canvas.height) {
        xwing.y += 20;
    }

    if (xwingKeys[" "] && canShoot === true) {
        fireXwingBullet();
        //startShootingSound();
        canShoot = false;


        setTimeout(() => {
            canShoot = true;
        }, 100);
    }
}