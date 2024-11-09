//Create the canvas
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);


const background_image = new Image();
background_image.src = "../Game/Images/sky.png";





//Draws the background image
function drawBackground(){
    ctx.drawImage(background_image, 0, 0, canvas.width, canvas.height);
}

//Starts the game
let startGame= function(){
    document.getElementById("start-screen").style.display = "none";
    drawBackground();
    CallMeteor();
    animateMeteors();
}




//-----------------------------------------------------------------------------------------------------------------------------------------------------------------
//Meteors
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------

let meteors_array = [];//Array to manage multiple meteors at the same time
const meteorImage = new Image();
meteorImage.src = "../Game/Images/meteor.svg";


// !!! Add condition to stop when dead !!!
//Recursively called with set interval. Adds meteors to the array with random x coordinates.
let CallMeteor = function(){
    let x = Math.random() * (canvas.width - 100);
    x = Math.round(x);
    let y = -30;
    meteors_array.push({x: x, y: y});
    setTimeout(CallMeteor, 500)//Change this value to change interval of meteors spawn
};


//Draws meteors, manages the gravity (by updating y coordinates) and deletes the meteors from array when they reach the bottom of the screen.
let animateMeteors = function (){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    drawBackground();

    meteors_array.forEach((meteor, index) => {
        meteor.y = meteor.y + 5;//Change this value to change the speed of meteors
        ctx.drawImage(meteorImage, meteor.x, meteor.y, 100, 100);

        if(meteor.y > canvas.height){
            meteors_array.splice(index, 1);
        }
    });

    requestAnimationFrame(animateMeteors)
};

