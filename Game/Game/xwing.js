import { canvas, ctx } from "./constant.js";
import { activeJet } from "./selectJet.js";
import { gameState } from "./game.js";

// X-Wing Configuration
export let xwing = {
    x: canvas.width / 2 - 100, // Center the X-Wing horizontally
    y: canvas.height - 270, // Position the X-Wing lower on the screen
    width: 150,
    height: 200,
    image: new Image(), // Default X-Wing image
};

xwing.image.src = "../Game/Images/xwing/X-Wing_Top.png";
xwing.image.onload = () => console.log("X-Wing image loaded!");
// Engine sound for X-Wing
const engineSoundXwing = new Audio("../Game/Sound/xwingEngine.mp3");
engineSoundXwing.loop = true; // Loop the sound
engineSoundXwing.volume = 0.1; // Adjust volume if necessary

// Initialize the shooting sound
const shootingSound = new Audio("../Game/Sound/Blaster.mp3");
shootingSound.loop = true; // Allow looping for continuous shooting
shootingSound.volume = 0.1; // Adjust the volume

shootingSound.onloadeddata = () => {
    console.log("Blaster sound loaded successfully!");
};
shootingSound.onerror = () => {
    console.error("Failed to load Blaster sound!");
};

export function startShootingXwing() {
    if (!xwingShootingInterval) {
        xwingShootingInterval = setInterval(() => {
            fireXwingBullet();
        }, 100); // Interval between shots in milliseconds
    }

    // Play the shooting sound
    shootingSound.currentTime = 0; // Reset sound to the beginning
    shootingSound.play().catch((error) => console.error("Error playing shooting sound:", error));
}
export function stopShootingXwing() {
    if (xwingShootingInterval) {
        clearInterval(xwingShootingInterval);
        xwingShootingInterval = null;
    }

    // Stop the shooting sound
    if (!shootingSound.paused) {
        shootingSound.pause();
        shootingSound.currentTime = 0; // Reset sound to the beginning
    }
}
// Function to start the engine sound
export function startEngineSoundXwing() {
    if (engineSoundXwing.paused || engineSoundXwing.ended) {
        engineSoundXwing.currentTime = 0; // Reset to the beginning
        engineSoundXwing.play().catch((error) => console.error("Error playing engine sound:", error));
    }
}

// Function to stop the engine sound
export function stopEngineSoundXwing() {
    if (!engineSoundXwing.paused) {
        engineSoundXwing.pause();
        engineSoundXwing.currentTime = 0; // Reset the sound
    }
}

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
    height: 50,
    speed: 25, // Speed of the X-Wing bullets
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
//User keys input
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------

// X-Wing Actions (Keyboard and Mouse)
let xwingKeys = {};
window.addEventListener("keydown", (e) => {
    xwingKeys[e.key] = true;
    if (e.key === " " && gameState.game_started === true && gameState.paused === false && activeJet === xwing) {
        startShootingXwing(); // Corrected function call
    }
});
window.addEventListener("keyup", (e) => {
    xwingKeys[e.key] = false;
    if (e.key === " " && gameState.game_started === true && gameState.paused === false && activeJet === xwing) {
        stopShootingXwing(); // Corrected function call
    }
});
// Handle Mouse Down (Start Shooting)
document.addEventListener("mousedown", (event) => {
    if (event.button === 0 && activeJet === xwing) {
        isShootingXwing = true;

        if (!xwingShootingInterval) {
            xwingShootingInterval = setInterval(() => {
                if (isShootingXwing) {
                    fireXwingBullet();
                }
            }, 100);
        }

        startShootingXwing();
    }
})
document.addEventListener("mouseup", (event) => {
    if (event.button === 0 && activeJet === xwing) {
        isShootingXwing = false;

        if (xwingShootingInterval) {
            clearInterval(xwingShootingInterval);
            xwingShootingInterval = null;
        }

        stopShootingXwing();
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
        canShoot = false;


        setTimeout(() => {
            canShoot = true;
        }, 100);
    }
}