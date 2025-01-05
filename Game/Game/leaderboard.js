// leaderboard.js

// Function to store the player's score in local storage
export function storeScore(score) {
    const playerName = localStorage.getItem("playerName");

    // If the player's name is stored, proceed to store the score
    if (playerName) {
        let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

        // Store the player's score and name
        const playerData = { name: playerName, score: score };
        leaderboard.push(playerData);

        // Sort leaderboard by score in descending order
        leaderboard.sort((a, b) => b.score - a.score);

        // Store the updated leaderboard back to local storage
        localStorage.setItem("leaderboard", JSON.stringify(leaderboard));

        console.log("Score stored:", playerData);
    } else {
        console.error("No player name found in local storage.");
    }
}

// Function to display the leaderboard
export function displayLeaderboard() {
    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

    // Create the leaderboard container
    const leaderboardContainer = document.createElement("div");
    leaderboardContainer.id = "leaderboard-container";
    leaderboardContainer.style.position = "fixed";
    leaderboardContainer.style.top = "0";
    leaderboardContainer.style.left = "0";
    leaderboardContainer.style.width = "100vw";
    leaderboardContainer.style.height = "100vh";
    leaderboardContainer.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    leaderboardContainer.style.display = "flex";
    leaderboardContainer.style.flexDirection = "column";
    leaderboardContainer.style.alignItems = "center";
    leaderboardContainer.style.justifyContent = "center";
    leaderboardContainer.style.color = "white";
    leaderboardContainer.style.zIndex = "1000";

    const title = document.createElement("h1");
    title.innerText = "Leaderboard";
    leaderboardContainer.appendChild(title);

    // Display each player's name and score
    leaderboard.forEach((entry, index) => {
        const leaderboardItem = document.createElement("p");
        leaderboardItem.innerText = `${index + 1}. ${entry.name} - ${entry.score}`;
        leaderboardContainer.appendChild(leaderboardItem);
    });

    // Add a button to return to the main menu or restart
    const backButton = document.createElement("button");
    backButton.innerText = "Back to Menu";
    backButton.style.marginTop = "20px";
    backButton.style.padding = "10px 20px";
    backButton.style.fontSize = "1.2em";
    backButton.style.cursor = "pointer";

    backButton.onclick = function () {
        window.location.reload(); // Reload the page to restart the game
    };

    leaderboardContainer.appendChild(backButton);

    // Append the leaderboard container to the document body
    document.body.appendChild(leaderboardContainer);
}
