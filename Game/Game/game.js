//Create the canvas
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);



let alive = true;



//Background images
function drawBackground(){
    const img = new Image();
    img.src = "../Game/Images/sky.png";
    img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
}

//Start the game
function startGame(){
    document.getElementById("start-screen").style.display = "none";
    drawBackground();
    CallMeteor();
}





// !!! Add condition to stop when dead !!!
//Recursively displays the meteors at random position, and sets an interval between each meteor spawn.
let CallMeteor = function(){

    let x = Math.random() * (canvas.width - 100);
    let y = Math.random() * (canvas.height - 100);
    x = Math.round(x);
    y = Math.round(y);

    RenderMeteor(x, y);

    setTimeout(CallMeteor, 1000)

};



//Draw the meteor at given coordinates
let RenderMeteor = function (x, y) {
    let meteorImage = new Image();
    let imageLoaded = false;

    // Load the image and set the flag once loaded
    meteorImage.onload = function() {
        imageLoaded = true;
        console.log('Meteor loaded successfully');
    };

    // Change the source to the SVG file
    meteorImage.src = "../Game/Images/meteor.svg"; // Make sure this path is correct

    let render = function () {
        if (imageLoaded) {
            const width = 100; // Set desired width
            const height = 100;

            ctx.drawImage(meteorImage, x, y, width, height); // Draw only if the image is loaded
        }
        requestAnimationFrame(render); // Call render on the next frame
    };

    render();
};



