
// Function to store the player's name, score and image in local storage. It also gets the user location with streetmap API, and stores it in localStorage
export async function storeUserData(score, callback) {
    const playerName = localStorage.getItem("playerName");
    const playerImage = localStorage.getItem("playerImage");

    if (playerName && playerImage) {
        let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;

                    try {
                        // Use OpenStreetMap Nominatim API for reverse geocoding
                        const response = await fetch(
                            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                        );

                        if (!response.ok) {
                            throw new Error("Failed to fetch city name");
                        }

                        const data = await response.json();
                        const city =
                            data.address?.city ||
                            data.address?.town ||
                            data.address?.village ||
                            "Unknown City";

                        // Store the player's data, including city
                        const playerData = {
                            name: playerName,
                            score: score,
                            image: playerImage,
                            location: city,
                        };

                        leaderboard.push(playerData);

                        // Sort the leaderboard by score in descending order
                        leaderboard.sort((a, b) => b.score - a.score);

                        // Save updated leaderboard to localStorage
                        localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
                        console.log("Score stored with city:", playerData);

                        // Call the callback (e.g., to display the updated leaderboard)
                        if (callback) callback();
                    } catch (error) {
                        console.error("Error retrieving city name:", error);

                        // Store player data without city
                        const playerData = {
                            name: playerName,
                            score: score,
                            image: playerImage,
                            location: "Unknown City",
                        };

                        leaderboard.push(playerData);
                        leaderboard.sort((a, b) => b.score - a.score);
                        localStorage.setItem("leaderboard", JSON.stringify(leaderboard));

                        // Call the callback (e.g., to display the updated leaderboard)
                        if (callback) callback();
                    }
                },
                (error) => {
                    console.error("Geolocation error:", error);

                    // Store player data without city
                    const playerData = {
                        name: playerName,
                        score: score,
                        image: playerImage,
                        location: "Unknown City",
                    };

                    leaderboard.push(playerData);
                    leaderboard.sort((a, b) => b.score - a.score);
                    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));

                    // Call the callback (e.g., to display the updated leaderboard)
                    if (callback) callback();
                }
            );
        }
        else {
            console.error("Geolocation is not supported by this browser.");

            // Store player data without city
            const playerData = {
                name: playerName,
                score: score,
                image: playerImage,
                location: "Unknown City",
            };

            leaderboard.push(playerData);
            leaderboard.sort((a, b) => b.score - a.score);
            localStorage.setItem("leaderboard", JSON.stringify(leaderboard));

            // Call the callback (e.g., to display the updated leaderboard)
            if (callback) callback();
        }
    }
    else {
        console.error("No player name or image found in localStorage.");
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


    // Display each player's image, name and score
    leaderboard.forEach((entry, index) => {
        const listItem = document.createElement("li");
        listItem.style.display = "flex";
        listItem.style.alignItems = "center";
        listItem.style.marginBottom = "10px";

        // Player image
        const playerImage = document.createElement("img");
        playerImage.src = entry.image;
        playerImage.alt = `${entry.name}'s Image`;
        playerImage.style.width = "50px";
        playerImage.style.height = "50px";
        playerImage.style.borderRadius = "50%";
        playerImage.style.marginRight = "10px";

        // Player details (name and score)
        const playerDetails = document.createElement("span");
        playerDetails.innerText = `${index + 1}. ${entry.name} (${entry.location}) : ${entry.score}`;
        playerDetails.style.fontSize = "1.2em";

        listItem.appendChild(playerImage);
        listItem.appendChild(playerDetails);
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

