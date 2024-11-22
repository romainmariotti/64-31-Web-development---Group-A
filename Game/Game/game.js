import { CallMeteor, animateMeteors } from './meteors.js';
import { pauseButton } from './menus.js';
import { canvas, ctx } from './constant.js';


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

//Starts the game (our main)
export let startGame= function(){
    document.getElementById("start-screen").style.display = "none";
    game_started = true;
    drawBackground();
    CallMeteor();
    animateMeteors();
    pauseButton();
}




