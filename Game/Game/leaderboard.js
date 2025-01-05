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

export function displayLeaderboard() {
    // Retrieve leaderboard from local storage
    const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

    // Sort leaderboard by score in descending order
    leaderboard.sort((a, b) => b.score - a.score);

    // Create leaderboard container
    const leaderboardContainer = document.createElement("div");
    leaderboardContainer.id = "leaderboard-container";
    leaderboardContainer.style.position = "fixed";
    leaderboardContainer.style.top = "0";
    leaderboardContainer.style.left = "0";
    leaderboardContainer.style.width = "100%";
    leaderboardContainer.style.height = "100%";
    leaderboardContainer.style.backgroundColor = "rgba(0, 0, 0, 0.6)";//Make the background a bit more dark
    leaderboardContainer.style.color = "white";
    leaderboardContainer.style.zIndex = "1000";
    leaderboardContainer.style.display = "flex";
    leaderboardContainer.style.flexDirection = "column";
    leaderboardContainer.style.alignItems = "center";
    leaderboardContainer.style.justifyContent = "center";

    // Game over message
    const gameOverMessage = document.createElement("h1");
    gameOverMessage.innerText = "Game Over";
    leaderboardContainer.appendChild(gameOverMessage);

    // Add leaderboard title
    const title = document.createElement("h1");
    title.innerText = "Leaderboard";
    leaderboardContainer.appendChild(title);

    // Create and append leaderboard list
    const leaderboardList = document.createElement("ul");
    leaderboardList.style.listStyle = "none";
    leaderboardList.style.padding = "0";
    leaderboardList.style.marginTop = "20px";

    // Display each player's name and score
    leaderboard.forEach((entry, index) => {
        const listItem = document.createElement("li");
        listItem.innerText = `${index + 1}. ${entry.name}: ${entry.score}`;
        leaderboardList.appendChild(listItem);
    });

    leaderboardContainer.appendChild(leaderboardList);


    // Optionally, add a restart button
    const restartButton = document.createElement("button");
    restartButton.innerText = "Restart Game";
    restartButton.style.padding = "10px 20px";
    restartButton.style.marginTop = "20px";
    restartButton.style.fontSize = "1.2em";
    restartButton.style.cursor = "pointer";

    restartButton.onclick = function () {
        window.location.reload(); // Reload the page to restart the game
    };

    leaderboardContainer.appendChild(restartButton);

    // Append the leaderboard to the body
    document.body.appendChild(leaderboardContainer);
}

