import { player } from "./jet.js"; // F18 configuration
import { xwing } from "./xwing.js"; // X-Wing configuration
import { startGame } from "./game.js"; // To start the game

// Default to F18
export let activeJet = null; // Global variable to track the currently selected jet

export function selectJet(jetType) {
    if (jetType === "F18") {
        activeJet = player; // Utilise l'objet original
        console.log("F18 selected");
    } else if (jetType === "X-Wing") {
        activeJet = xwing; // Utilise l'objet original
        console.log("X-Wing selected");
    }
    console.log("Active jet:", activeJet);
}


// Function to show the jet selection menu
export function showJetSelectionMenu() {

    // Hide the start screen buttons
    const startScreen = document.getElementById("start-screen");
    if (startScreen) {
        startScreen.style.display = "none"; // Hide the start screen buttons
    }

    const selectionScreen = document.createElement("div");
    selectionScreen.id = "jet-selection-screen";
    selectionScreen.style.position = "fixed";
    selectionScreen.style.top = "0";
    selectionScreen.style.left = "0";
    selectionScreen.style.width = "100vw";
    selectionScreen.style.height = "100vh";
    selectionScreen.style.display = "flex";
    selectionScreen.style.flexDirection = "column";
    selectionScreen.style.alignItems = "center";
    selectionScreen.style.justifyContent = "center";
    selectionScreen.style.backgroundSize = "cover";
    selectionScreen.style.zIndex = "1000";

    const title = document.createElement("h1");
    title.innerText = "Select Your Jet";
    title.style.color = "orangered";
    selectionScreen.appendChild(title);

    // F18 Button
    const f18Button = document.createElement("button");
    f18Button.innerText = "F18";
    f18Button.style.margin = "10px";
    f18Button.onclick = function () {
        selectJet("F18");
        selectionScreen.remove();
        startGame();
    };
    selectionScreen.appendChild(f18Button);

    // X-Wing Button
    const xwingButton = document.createElement("button");
    xwingButton.innerText = "X-Wing";
    xwingButton.style.margin = "10px";
    xwingButton.onclick = function () {
        selectJet("X-Wing");
        selectionScreen.remove();
        startGame();
    };
    selectionScreen.appendChild(xwingButton);

    document.body.appendChild(selectionScreen);
}
