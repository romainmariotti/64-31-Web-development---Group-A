//Create the canvas
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

//Background images
function drawBackground(){
    const img = new Image();
    img.src = "./images/sky.png";
    img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
}

//Start the game
function startGame(){
    document.getElementById("start-screen").style.display = "none";
    drawBackground();
}


