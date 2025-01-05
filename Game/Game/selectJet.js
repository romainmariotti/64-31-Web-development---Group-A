import { player, startEngineSoundFA18, stopEngineSoundFA18 } from "./jet.js"; // F18 configuration
import { xwing, startEngineSoundXwing, stopEngineSoundXwing } from "./xwing.js"; // X-Wing configuration
import { startGame } from "./game.js"; // To start the game
import { Zero, startEngineSoundZero, stopEngineSoundZero } from "./Zero.js"; //Zero configuration

// Default to F18
export let activeJet = null; // Global variable to track the currently selected jet

export function selectJet(jetType) {
  if (jetType === "F18") {
    activeJet = player;
    console.log("F18 selected");
    stopEngineSoundZero(); // Stop Zero's engine sound if it was playing
    startEngineSoundFA18();
    stopEngineSoundXwing();
  } else if (jetType === "X-Wing") {
    activeJet = xwing;
    console.log("X-Wing selected");
    stopEngineSoundZero(); // Stop Zero's engine sound if it was playing
    stopEngineSoundFA18();
    startEngineSoundXwing();
  } else if (jetType === "Zero") {
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


  // Function to validate the player name and validate the jet selection
  function validateAndProceed(jetType) {
    const playerName = input.value.trim();
    if (playerName && uploadedImage) {
      localStorage.setItem("playerName", playerName); // Store the player name
      localStorage.setItem("playerImage", uploadedImage);// Store image given by user
      selectJet(jetType); // Select the jet
      selectionScreen.remove(); // Remove the selection screen
      startGame(); // Start the game
    }
    else {
      alert("Name and image cannot be empty.");
    }
  }

  // F18 Button
  const f18Button = document.createElement("button");
  f18Button.innerText = "FA18 Superhornet ";
  f18Button.style.margin = "10px";
  f18Button.onclick = function () {
    validateAndProceed("F18");
  };
  selectionScreen.appendChild(f18Button);

  // X-Wing Button
  const xwingButton = document.createElement("button");
  xwingButton.innerText = "X-Wing";
  xwingButton.style.margin = "10px";
  xwingButton.onclick = function () {
    validateAndProceed("X-Wing");
  };
  selectionScreen.appendChild(xwingButton);

  //Zero Button
  const zeroButton = document.createElement("button");
  zeroButton.innerText = "A6M Zero";
  zeroButton.style.margin = "10px";
  zeroButton.onclick = function () {
    validateAndProceed("Zero");
  };
  selectionScreen.appendChild(zeroButton);


  // Input field for player name
  const form = document.createElement("div");
  const label = document.createElement("label");
  label.htmlFor = "player-name";
  label.innerText = "Enter Your Name:";
  form.appendChild(label);
  const input = document.createElement("input");
  input.id = "player-name";
  input.name = "playerName";
  input.type = "text";
  input.required = true; // Adds HTML validation
  form.appendChild(input);
  selectionScreen.appendChild(form);



  // Drag-and-drop area for image upload
  const dropZone = document.createElement("div");
  dropZone.style.width = "300px";
  dropZone.style.height = "200px";
  dropZone.style.border = "2px dashed gray";
  dropZone.style.marginTop = "20px";
  dropZone.style.display = "flex";
  dropZone.style.alignItems = "center";
  dropZone.style.justifyContent = "center";
  dropZone.innerText = "Drag and drop your image here or click to upload.";
  dropZone.style.cursor = "pointer";
  dropZone.onclick = () => fileInput.click();


  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*";
  fileInput.style.display = "none";


  let uploadedImage = null;
  fileInput.onchange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        uploadedImage = e.target.result;
        dropZone.style.backgroundImage = `url(${uploadedImage})`;
        dropZone.style.backgroundSize = "cover";
        dropZone.innerText = "";
      };
      reader.readAsDataURL(file);
    }
  };

  dropZone.ondragover = (e) => {
    e.preventDefault();
    dropZone.style.borderColor = "green";
  };

  dropZone.ondragleave = () => {
    dropZone.style.borderColor = "gray";
  };

  dropZone.ondrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        uploadedImage = e.target.result;
        dropZone.style.backgroundImage = `url(${uploadedImage})`;
        dropZone.style.backgroundSize = "cover";
        dropZone.innerText = "";
      };
      reader.readAsDataURL(file);
    }
  };

  selectionScreen.appendChild(dropZone);





  document.body.appendChild(selectionScreen);
}
