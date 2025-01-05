import { gameState } from "./game.js";
import { animateMeteors } from "./meteors.js";
import { engineSoundZero, zeroShootingSound } from "./Zero.js";
import { engineSoundFA18, shootingSoundFA18 } from "./jet.js";
import { engineSoundXwing, shootingSoundXwing } from "./xwing.js";
import { player } from "./jet.js";
import { xwing } from "./xwing.js";
import { Zero } from "./Zero.js";
import { activeJet } from "./selectJet.js";

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------
//In game pause menu
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------

export let pauseButton = function () {
  const button = document.createElement("button");
  button.innerText = "☰";
  button.style.position = "absolute";
  button.style.top = "10px";
  button.style.left = "10px";

  button.onclick = function () {
    gameState.paused = true;
    cancelAnimationFrame(gameState.animationFrameID); // Stop the animation loop
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
  optionButton.onclick = function () {
    overlay.remove();
    showOptionMenu();
  };
  overlay.appendChild(optionButton);

  //Button to display the rules
  const rulesMenu = document.createElement("button");
  rulesMenu.innerText = "Rules";
  rulesMenu.onclick = function () {
    overlay.remove();
    showRulesMenu();
  };
  overlay.appendChild(rulesMenu);

  //Button to go back to the main menu while in game
  const goBackMenuButton = document.createElement("button");
  goBackMenuButton.innerText = "Main menu";
  overlay.appendChild(goBackMenuButton);
  goBackMenuButton.onclick = function () {
    cancelAnimationFrame(gameState.animationFrameID);

    //Reset the variables
    gameState.paused = false;
    gameState.game_started = false;

    window.location.href = "./start.html";
  };

  //Button to quit the pause menu, and resume the game
  const quitPauseMenuButton = document.createElement("button");
  quitPauseMenuButton.innerText = "X";
  quitPauseMenuButton.style.position = "absolute";
  quitPauseMenuButton.style.top = "10px";
  quitPauseMenuButton.style.left = "10px";
  quitPauseMenuButton.onclick = function () {
    gameState.paused = false;
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

export function showOptionMenu() {
  const optionMenu = document.createElement("div");
  optionMenu.id = "option-menu";
  optionMenu.style.position = "fixed";
  optionMenu.style.top = "0";
  optionMenu.style.left = "0";
  optionMenu.style.width = "100%";
  optionMenu.style.height = "100%";
  optionMenu.style.display = "flex";
  optionMenu.style.flexDirection = "column";
  optionMenu.style.alignItems = "center";
  optionMenu.style.justifyContent = "center";
  optionMenu.style.backgroundColor = "rgba(0, 0, 0, 0.5)";

  const text = document.createElement("p");
  text.innerText = "Options";
  text.style.color = "white";
  optionMenu.appendChild(text);

  let engineVolumeControl;
  let bulletVolumeControl;

  if (activeJet === player) {
    engineVolumeControl = createVolumeControl(
      engineSoundFA18,
      "fa18",
      "engine"
    );
    bulletVolumeControl = createVolumeControl(
      shootingSoundFA18,
      "fa18",
      "bullet"
    );
  } else if (activeJet === xwing) {
    engineVolumeControl = createVolumeControl(
      engineSoundXwing,
      "xwing",
      "engine"
    );
    bulletVolumeControl = createVolumeControl(
      shootingSoundXwing,
      "xwing",
      "bullet"
    );
  } else if (activeJet === Zero) {
    engineVolumeControl = createVolumeControl(
      engineSoundZero,
      "zero",
      "engine"
    );
    bulletVolumeControl = createVolumeControl(
      zeroShootingSound,
      "zero",
      "bullet"
    );
  }

  if (engineVolumeControl) {
    const engineVolumeTitle = document.createElement("p");
    engineVolumeTitle.innerText = "Engine Volume";
    engineVolumeTitle.style.color = "white";
    optionMenu.appendChild(engineVolumeTitle);
    optionMenu.appendChild(engineVolumeControl);
  }
  if (bulletVolumeControl) {
    const bulletVolumeTitle = document.createElement("p");
    bulletVolumeTitle.innerText = "Bullet Volume";
    bulletVolumeTitle.style.color = "white";
    optionMenu.appendChild(bulletVolumeTitle);
    optionMenu.appendChild(bulletVolumeControl);
  }

  const quitOptionMenuButton = document.createElement("button");
  quitOptionMenuButton.innerText = "X";
  quitOptionMenuButton.style.position = "absolute";
  quitOptionMenuButton.style.top = "10px";
  quitOptionMenuButton.style.left = "10px";
  quitOptionMenuButton.onclick = function () {
    const menu = document.getElementById("option-menu");
    if (menu) {
      if (gameState.paused === true) {
        showPauseMenu();
      }
      menu.remove();
    }
  };
  optionMenu.appendChild(quitOptionMenuButton);
  document.body.appendChild(optionMenu);
}

function createVolumeControl(audioElement, jet, type) {
  const volumeControl = document.createElement("input");
  volumeControl.type = "range";
  volumeControl.min = "0";
  volumeControl.max = "100";
  volumeControl.value = audioElement.volume * 100; // Default volume
  volumeControl.style.margin = "20px";
  volumeControl.oninput = function () {
    const volume = volumeControl.value / 100;
    adjustGameVolume(jet, type, volume);
  };
  return volumeControl;
}

function adjustGameVolume(jet, type, volume) {
  switch (jet) {
    case "zero":
      if (type === "engine") {
        engineSoundZero.volume = volume;
      } else if (type === "bullet") {
        zeroShootingSound.volume = volume;
      }
      break;
    case "fa18":
      if (type === "engine") {
        engineSoundFA18.volume = volume;
      } else if (type === "bullet") {
        shootingSoundFA18.volume = volume;
      }
      break;
    case "xwing":
      if (type === "engine") {
        engineSoundXwing.volume = volume;
      } else if (type === "bullet") {
        shootingSoundXwing.volume = volume;
      }
      break;
    default:
      console.error("Unknown jet or type:", jet, type);
  }
  console.log(`Volume for ${jet} ${type} set to: ${volume}`); // Debugging log
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------
//Rules menu
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------

export function showRulesMenu() {
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
  rulesText.innerText =
    "Game Rules:\n1. Avoid obstacles.\n2. Shoot enemies.\n3. Gain points and reach the top of the leaderboard.";
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
    if (menu) {
      if (gameState.paused === true) {
        showPauseMenu();
      }
      menu.remove();
    }
  };
  rulesScreen.appendChild(backButton);
  document.body.appendChild(rulesScreen);
}
