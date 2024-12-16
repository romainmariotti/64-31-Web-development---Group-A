import { CallMeteor, animateMeteors } from './meteors.js';
import { pauseButton } from './menus.js';
import { canvas, ctx } from './constant.js';
import { jetActions, updateBullets } from "./jet.js";
import { activeJet,showJetSelectionMenu } from "./selectJet.js";
import { xwingActions, updateXwingBullets } from "./xwing.js";





function animateGame() {
    if (!gameState.paused) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBackground();

        // Player and bullets
        if (activeJet) {
            if (activeJet.image.src.includes("X-Wing")) {
                xwingActions();
                updateXwingBullets();
            } else {
                jetActions();
                updateBullets();
            }
            ctx.drawImage(activeJet.image, activeJet.x, activeJet.y, activeJet.width, activeJet.height);
        }

        // Draw meteors, score, and hearts
        animateMeteors();
    }
    requestAnimationFrame(animateGame);
}



let isShootingXwing = false;
let xwingShootingInterval = null;

const background_image = new Image();
background_image.src = "../Game/Images/sky.png";

let game_started = true;

//Put these variables into object in order to change their value in other files
export let gameState = {
    animationFrameID: null,
    paused: false,
    game_started,
};


//Draws the background image
export function drawBackground(){
    ctx.drawImage(background_image, 0, 0, canvas.width, canvas.height);
}

export let preGameSelection = function () {
    showJetSelectionMenu();
}

//Starts the game (our main)
export let startGame = function () {
    document.getElementById("start-screen").style.display = "none"; // Cache l'écran de démarrage
    gameState.game_started = true;
    drawBackground();
    CallMeteor();
    animateMeteors();
    pauseButton();
    animateGame();
    console.log("Game started!");
};



