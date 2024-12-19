import { canvas, ctx } from "./constant.js";
import { activeJet } from "./selectJet.js";
import { gameState } from "./game.js";

// Zero Configuration
export let Zero = {
    x: canvas.width / 2 - 100, // Center the Zero horizontally
    y: canvas.height - 270, // Position the Zero lower on the screen
    width: 200,
    height: 200,
    image: new Image(), // Default X-Wing image
};

Zero.image.src = "../Game/Images/A6M/A6MZero.png";
Zero.image.onload = () => console.log("Zero image loaded!");

// Function to draw the Zero
export function drawZero() {
    if (Zero.image.complete) {
        ctx.drawImage(Zero.image, Zero.x, Zero.y, Zero.width, Zero.height);
    }
}

// Zero Bullets Configuration
export let zeroBullets = [];

// Define the dimensions and behavior of Zero projectiles
const zeroBulletConfig = {
    width: 4,
    height: 20,
    speed: 15, // Speed of the Zero bullets
    color: "rgba(255,165, 0, 1)", // Bright red for the bullet body
    trailColor: "rgba(255, 0, 0, 0.7)", // Dark red for the bullet trail
};


let isShootingZero = false;
let zeroShootingInterval = null;

export function fireZeroBullet() {
    const offsetX = 35; // Adjusts bullet position horizontally
    const offsetY = 50; // Adjusts bullet position vertically (downwards)

    // Bullet starting positions closer to the wingtip
    const noseY = Zero.y + offsetY;

    // Right cannon (slightly adjusted to right wingtip)
    const noseX_right = Zero.x + Zero.width * 0.70;

    // Left cannon (slightly adjusted to left wingtip)
    const noseX_left = Zero.x + Zero.width * 0.26;

    zeroBullets.push(
        { x: noseX_right, y: noseY, width: zeroBulletConfig.width, height: zeroBulletConfig.height },
        { x: noseX_left, y: noseY, width: zeroBulletConfig.width, height: zeroBulletConfig.height }
    );
}

// Update and Render Bullets
export function updateZeroBullets() {
    zeroBullets.forEach((bullet, index) => {
        console.log("Bullet properties:", bullet); // Debug bullets
        bullet.y -= zeroBulletConfig.speed;

        // Draw bullet trail
        ctx.fillStyle = zeroBulletConfig.trailColor;
        ctx.fillRect(bullet.x, bullet.y + 10, bullet.width, bullet.height * 1.5);

        // Draw main bullet
        ctx.fillStyle = zeroBulletConfig.color;
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);

        if (bullet.y + bullet.height < 0) {
            zeroBullets.splice(index, 1);
        }
    });
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------
//User keys input
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------

// Zero Actions (Keyboard and Mouse)
let zeroKeys = {};

const zeroShootingSound = new Audio("../Game/Sound/20Milimeters.mp3");
zeroShootingSound.loop = true;
zeroShootingSound.onerror = () => console.error("Failed to load 20Milimeters.mp3");

export function startZeroShootingSound() {
    if (zeroShootingSound.paused || zeroShootingSound.ended) {
        zeroShootingSound.currentTime = 0; // Reset to the beginning
        zeroShootingSound.play().catch((error) =>
            console.error("Error playing shooting sound:", error)
        );
    }
}

// Function to stop the shooting sound
export function stopZeroShootingSound() {
    if (!zeroShootingSound.paused) {
        zeroShootingSound.pause();
        zeroShootingSound.currentTime = 0; // Reset the sound
    }
}
window.addEventListener("keydown", (e) => {
    zeroKeys[e.key] = true;
    if(e.key === " "){
        if(e.key === " " && gameState.game_started === true && gameState.paused === false && activeJet === Zero) {
            startZeroShootingSound();
        }
    }
});
window.addEventListener("keyup", (e) => {
    zeroKeys[e.key] = false;
    if(e.key === " "){
        if(e.key === " " && gameState.game_started === true && gameState.paused === false && activeJet === Zero) {
            stopZeroShootingSound();
        }
    }
});

// Handle Mouse Down (Start Shooting)
document.addEventListener("mousedown", (event) => {
    console.log("Mouse down event detected");

    if (event.button === 0 && activeJet.image.src.includes("A6MZero")) {
        console.log("Firing enabled for A6MZero");
        isShootingZero = true;


        if (!zeroShootingInterval) {
            zeroShootingInterval = setInterval(() => {
                if (isShootingZero) {
                    fireZeroBullet();
                }
            }, 100);
        }
        startZeroShootingSound();
    }
});

document.addEventListener("mouseup", (event) => {
    console.log("Mouse up event detected");

    if (event.button === 0 && activeJet.image.src.includes("A6MZero")) {
        console.log("Firing disabled for A6MZero");
        isShootingZero = false;


        if (zeroShootingInterval) {
            clearInterval(zeroShootingInterval);
            zeroShootingInterval = null;
        }
        stopZeroShootingSound();
    }
});

let canShoot = true;

zeroShootingSound.onplay = () => console.log("Zero shooting sound is playing");
zeroShootingSound.onpause = () => console.log("Zero shooting sound is paused");

// X-Wing Movement
export function zeroActions() {
    if ((zeroKeys["ArrowLeft"] || zeroKeys["a"]) && Zero.x > 0) {
        Zero.x -= 20;
    }
    if ((zeroKeys["ArrowRight"] || zeroKeys["d"]) && Zero.x + Zero.width < canvas.width) {
        Zero.x += 20;
    }
    if ((zeroKeys["ArrowUp"] || zeroKeys["w"]) && Zero.y > 0) {
        Zero.y -= 20;
    }
    if ((zeroKeys["ArrowDown"] || zeroKeys["s"]) && Zero.y + Zero.height < canvas.height) {
        Zero.y += 20;
    }

    if (zeroKeys[" "] && canShoot === true) {
        fireZeroBullet();
        canShoot = false;


        setTimeout(() => {
            canShoot = true;
        }, 100);
    }
}