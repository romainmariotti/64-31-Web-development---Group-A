import { CallMeteor, animateMeteors } from "./meteors.js";
import { pauseButton } from "./menus.js";
import { canvas, ctx } from "./constant.js";




//Put these variables into object in order to change their value in other files
export let gameState = {
    animationFrameID: null,
    paused: false,
    soundCheck: false,
    game_started: false,
};

// Array of image paths
const layerPaths = [
    "../Game/Images/Backgrounds/PNGs/Condesed/Layer01.png",
    "../Game/Images/Backgrounds/PNGs/Condesed/Layer02.png",
    "../Game/Images/Backgrounds/PNGs/Condesed/Layer03.png",
];

// Array to hold loaded images
const layers = [];
let imagesLoaded = 0;

// Variables to track the position of each layer
const layerPositions = [0, 0, 0];
const layerSpeeds = [0.5, 1, 1.5]; // Different speeds for parallax effect

// Load images dynamically
layerPaths.forEach((path, index) => {
    const img = new Image();
    img.src = path;
    img.onload = () => {
        layers[index] = img;
        imagesLoaded++;
        if (imagesLoaded === layerPaths.length) {
            startAnimation();
        }
    };
});

export function drawBackground() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    layers.forEach((layer, index) => {
        ctx.drawImage(layer, 0, layerPositions[index], canvas.width, canvas.height);
        ctx.drawImage(
            layer,
            0,
            layerPositions[index] - canvas.height,
            canvas.width,
            canvas.height
        );
    });
}

function updateBackground() {
    layers.forEach((layer, index) => {
        layerPositions[index] += layerSpeeds[index];
        if (layerPositions[index] >= canvas.height) {
            layerPositions[index] = 0;
        }
    });
}

function startAnimation() {
    function animate() {
        updateBackground();
        drawBackground();
        requestAnimationFrame(animate);
    }
    animate();
}

//Starts the game (our main)
export let startGame = function () {
    document.getElementById("start-screen").style.display = "none";
    gameState.game_started = true;
    gameState.soundCheck = true;
    startAnimation();
    CallMeteor();
    animateMeteors();
    pauseButton();
};