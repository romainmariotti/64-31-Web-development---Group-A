//Create the canvas
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);


const background_image = new Image();
background_image.src = "../Game/Images/sky.png";

game_started = false;


//Draws the background image
function drawBackground(){
    ctx.drawImage(background_image, 0, 0, canvas.width, canvas.height);
}

//Starts the game (our main)
let startGame= function(){
    document.getElementById("start-screen").style.display = "none";
    game_started = true;
    drawBackground();
    CallMeteor();
    animateMeteors();
    pauseButton();
}


//-----------------------------------------------------------------------------------------------------------------------------------------------------------------
//Meteors
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------

let meteors_array = [];//Array to manage multiple meteors at the same time
const meteorImage = new Image();
meteorImage.src = "../Game/Images/meteor.png";


// !!! Add condition to stop when dead !!!
//Recursively called with set interval. Adds meteors to the array with random x coordinates.
let CallMeteor = function(){
    if(paused === false){
        let x = Math.random() * (canvas.width - 100);
        x = Math.round(x);
        let y = -30;
        meteors_array.push({x: x, y: y});
    }
    setTimeout(CallMeteor, 750)//Change this value to change interval of meteors spawn
};


//Draws meteors, manages the gravity (by updating y coordinates) and deletes the meteors from array when they reach the bottom of the screen.
let animateMeteors = function (){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    drawBackground();

    //Calls the jet and its actions
    if (game_started) {
        drawPlayer();
        jetActions();
        updateBullets();
    }

    meteors_array.forEach((meteor, index) => {
        meteor.y = meteor.y + 5;//Change this value to change the speed of meteors
        ctx.drawImage(meteorImage, meteor.x, meteor.y, 100, 100);

        if(meteor.y > canvas.height){
            meteors_array.splice(index, 1);
        }
    });

    if(paused === false){
        animationFrameID = requestAnimationFrame(animateMeteors)
    }
};



//-----------------------------------------------------------------------------------------------------------------------------------------------------------------
// Player (Jet)
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------

// Configuration de l'avion
let player = {
    x: canvas.width / 2 - 250, // Position initiale centrée horizontalement
    y: canvas.height - 400,   // Ajuste pour positionner l'avion plus bas
    width: 600,               // Largeur (9x plus grand)
    height: 500,              // Hauteur (9x plus grand)
    image: new Image(),
};

// Chargement de l'image de l'avion
player.image.src = "../Game/Images/Jet/FA18transp.png";
player.image.onload = function () {
    console.log("Image de l'avion chargée !");
};

// Fonction pour dessiner l'avion
function drawPlayer() {
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

let bullets = [];

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

function updateBullets() {
    bullets.forEach((bullet, index) => {
        bullet.y -= 15; // Déplacement du projectile

        // Traînée lumineuse
        ctx.fillStyle = "rgba(255, 165, 0, 0.5)";
        ctx.fillRect(bullet.x, bullet.y + 10, bullet.width, bullet.height * 1.5);

        // Corps principal
        const gradient = ctx.createLinearGradient(bullet.x, bullet.y, bullet.x, bullet.y + bullet.height);
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
function jetActions() {
    if (keys["ArrowLeft"] && player.x > -player.width / 2) {
        player.x -= 20; // Jet goes left
    }
    if (keys["ArrowRight"] && player.x + player.width/2 < canvas.width) {
        player.x += 20; // Jet goes right
    }
   if (keys["ArrowUp"] && player.y > 0) {
        player.y -= 20; // Jet goes up
      }
    if (keys["ArrowDown"] && player.y + player.height <=canvas.height) {
        player.y += 20; // Jet goes down
     }
    if (keys[" "]) { // Space key to shoot
        fireBullet();
    }
}



//-----------------------------------------------------------------------------------------------------------------------------------------------------------------
//In game pause menu
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------
let paused = false;
let animationFrameID;


let pauseButton = function(){
    const button = document.createElement("button");
    button.innerText = "☰"
    button.style.position = "absolute";
    button.style.top = "10px";
    button.style.left = "10px";

    button.onclick = function(){
        paused = true;
        cancelAnimationFrame(animationFrameID); // Stop the animation loop
        showPauseMenu();
    };
    document.body.appendChild(button);
};


function showPauseMenu() {
    const overlay = document.createElement("div");
    overlay.id = "pause-menu";
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
    overlay.style.color = "white";
    overlay.style.fontSize = "24px";
    overlay.style.zIndex = "1000";

    const text = document.createElement("p");
    text.innerText = "Game Paused";
    overlay.appendChild(text);

    //Button to reach the options from the main menu
    const optionButton = document.createElement("button");
    optionButton.innerText = "Options";
    optionButton.onclick = function(){
        overlay.remove();
        showOptionMenu();
    };
    overlay.appendChild(optionButton);

    //Button to display the rules
    const rulesMenu = document.createElement("button");
    rulesMenu.innerText = "Rules";
    rulesMenu.onclick = function(){
        overlay.remove();
        showRulesMenu();
    }
    overlay.appendChild(rulesMenu);


    //Button to go back to the main menu while in game
    const goBackMenuButton = document.createElement("button");
    goBackMenuButton.innerText = "Main menu";
    overlay.appendChild(goBackMenuButton);
    //Add onclick


    //Button to quit the pause menu, and resume the game
    const quitPauseMenuButton = document.createElement("button");
    quitPauseMenuButton.innerText = "X"
    quitPauseMenuButton.style.position = "absolute";
    quitPauseMenuButton.style.top = "10px";
    quitPauseMenuButton.style.left = "10px";
    quitPauseMenuButton.onclick = function(){
        paused = false;
        hidePauseMenu();
        animateMeteors();
    };

    overlay.appendChild(quitPauseMenuButton);
    document.body.appendChild(overlay);
}

function hidePauseMenu() {
    const overlay = document.getElementById("pause-menu");
    if (overlay) {
        overlay.remove();
    }
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------
//Options menu
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------

function showOptionMenu(){
    const optionMenu = document.createElement("div");
    optionMenu.id = "option-menu";
    optionMenu.style.position = "fixed";
    optionMenu.style.top = "0";
    optionMenu.style.left = "0";
    optionMenu.style.width = "100%";
    optionMenu.style.height = "100%";
    optionMenu.style.display = "flex";
    optionMenu.style.alignItems = "center";
    optionMenu.style.justifyContent = "center";
    optionMenu.style.backgroundColor = "rgba(0, 0, 0, 0.5)";

    const text = document.createElement("p");
    text.innerText = "Options";
    text.style.color = "white";
    optionMenu.appendChild(text);

    const quitOptionMenuButton = document.createElement("button");
    quitOptionMenuButton.innerText = "X"
    quitOptionMenuButton.style.position = "absolute";
    quitOptionMenuButton.style.top = "10px";
    quitOptionMenuButton.style.left = "10px";
    quitOptionMenuButton.onclick = function(){
        const menu = document.getElementById("option-menu");
        if(menu){
            if(paused === true){
                showPauseMenu();
            }
            menu.remove();
        }
    };
    optionMenu.appendChild(quitOptionMenuButton);
    document.body.appendChild(optionMenu);
}


//-----------------------------------------------------------------------------------------------------------------------------------------------------------------
//Rules menu
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------
function showRulesMenu(){
    const rulesScreen = document.createElement("div");
    rulesScreen.id = "rules-screen";
    rulesScreen.style.position = "absolute";
    rulesScreen.style.top = "0";
    rulesScreen.style.left = "0";
    rulesScreen.style.width = "100vw";
    rulesScreen.style.height = "100vh";
    rulesScreen.style.display = "flex";
    rulesScreen.style.flexDirection = "column";
    rulesScreen.style.alignItems = "center";
    rulesScreen.style.justifyContent = "center";
    rulesScreen.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    rulesScreen.style.color = "white";

    // Add rules text
    const rulesText = document.createElement("p");
    rulesText.innerText = "Game Rules:\n1. Avoid obstacles.\n2. Shoot enemies.\n3. Collect power-ups.";
    rulesText.style.textAlign = "center";
    rulesScreen.appendChild(rulesText);

    // Add Back button
    const backButton = document.createElement("button");
    backButton.innerText = "Back";
    backButton.style.marginTop = "20px";
    backButton.style.padding = "10px 20px";
    backButton.style.fontSize = "1.2em";
    backButton.style.cursor = "pointer";
    backButton.onclick = function () {
        const menu = document.getElementById("rules-screen");
        if(menu){
            if(paused === true){
                showPauseMenu();
            }
            menu.remove();
        }
    }
    rulesScreen.appendChild(backButton);
    document.body.appendChild(rulesScreen);
}