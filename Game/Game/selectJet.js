import { player, startEngineSoundFA18, stopEngineSoundFA18 } from "./jet.js"; // F18 configuration
import { xwing , startEngineSoundXwing, stopEngineSoundXwing} from "./xwing.js"; // X-Wing configuration
import { startGame } from "./game.js"; // To start the game
import {Zero, startEngineSoundZero, stopEngineSoundZero } from "./Zero.js"; //Zero configuration

// Default to F18
export let activeJet = null; // Global variable to track the currently selected jet

export function selectJet(jetType) {
    if (jetType === "F18") {
        activeJet = player;
        console.log("F18 selected");
        stopEngineSoundZero();// Stop Zero's engine sound if it was playing
        startEngineSoundFA18();
        stopEngineSoundXwing();

    } else if (jetType === "X-Wing") {
        activeJet = xwing;
        console.log("X-Wing selected");
        stopEngineSoundZero(); // Stop Zero's engine sound if it was playing
        stopEngineSoundFA18();
        startEngineSoundXwing();


    } else if (jetType==="Zero") {
        activeJet = Zero;
        console.log("Zero selected");
        startEngineSoundZero(); // Start Zero's engine sound
        stopEngineSoundFA18();
        stopEngineSoundXwing();

    }

    console.log("Active jet:", activeJet);
}


// Function to show the jet selection menu
export function showJetSelectionMenu() {

    // Ask the user for their name and store it in localStorage
    let playerName = prompt("Enter your name:");
    if (playerName && playerName.trim() !== "") {
        localStorage.setItem("playerName", playerName.trim());
    }
    else {
        alert("Name cannot be empty. Please enter a valid name.");
        return; // Exit the function if the name is empty
    }


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
    f18Button.innerText = "FA18 Superhornet ";
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

    //Zero Button
    const zeroButton = document.createElement("button");
    zeroButton.innerText="A6M Zero";
    zeroButton.style.margin = "10px";
    zeroButton.onclick = function () {
        selectJet("Zero");
        selectionScreen.remove();
        startGame();
    };
    selectionScreen.appendChild(zeroButton);

    

    document.body.appendChild(selectionScreen);
}
