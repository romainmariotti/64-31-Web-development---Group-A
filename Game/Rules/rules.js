console.log("rules.js loaded");

// Create the canvas
if (!document.querySelector("canvas")) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    const background_image = new Image();
    background_image.src = "../Game/Images/sky.png";
}

// Draws the background image
function drawBackground() {
    ctx.drawImage(background_image, 0, 0, canvas.width, canvas.height);
}

function startRules() {
    const startScreen = document.getElementById("start-screen");
    startScreen.style.display = "none";

    // Hintergrundbild ausblenden
    const backgroundImage = startScreen.querySelector(".background_image");
    if (backgroundImage) {
        backgroundImage.style.display = "none";
    }

    drawBackground();

    // Create the rules screen
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
        document.body.removeChild(rulesScreen);
    
        // Wiederherstellung des Styles für #start-screen
        const startScreen = document.getElementById("start-screen");
        startScreen.style.display = "flex";
        startScreen.style.flexDirection = "column";
        startScreen.style.alignItems = "center";
        startScreen.style.justifyContent = "center";
    };
    
    rulesScreen.appendChild(backButton);

    document.body.appendChild(rulesScreen);
}

// Add Event Listener for the "Rules" button
document.addEventListener("DOMContentLoaded", function () {
    const rulesButton = document.getElementById("rules-button");
    if (rulesButton) {
        rulesButton.addEventListener("click", startRules);
    } else {
        console.error("Rules button not found!");
    }
});
