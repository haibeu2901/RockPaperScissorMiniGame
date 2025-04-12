// Game elements
const options = document.querySelectorAll('.option');
const results = document.getElementById('results');
const resetBtn = document.getElementById('reset-btn');
const playerScoreElement = document.getElementById('player-score');
const botScoreElement = document.getElementById('bot-score');

// Game state
let playerScore = 0;
let botScore = 0;

// Add event listeners to options
options.forEach(option => {
    option.addEventListener('click', () => {
        const playerChoice = option.id;
        const botChoice = getbotChoice();
        const winner = determineWinner(playerChoice, botChoice);
        updateUI(playerChoice, botChoice, winner);
        updateScore(winner);
    });
});

// Reset button event listener
resetBtn.addEventListener('click', resetGame);

// Get random bot choice
function getbotChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

// Determine the winner
function determineWinner(playerChoice, botChoice) {
    if (playerChoice === botChoice) {
        return 'tie';
    }
    
    if (
        (playerChoice === 'rock' && botChoice === 'scissors') ||
        (playerChoice === 'paper' && botChoice === 'rock') ||
        (playerChoice === 'scissors' && botChoice === 'paper')
    ) {
        return 'player';
    }
    
    return 'bot';
}

// Update the UI with choices and winner
function updateUI(playerChoice, botChoice, winner) {
    const emojiMap = {
        'rock': '👊',
        'paper': '✋',
        'scissors': '✌️'
    };
    
    let resultHTML = `
        <div class="choices">
            <div class="player-choice">
                <h3>You chose:</h3>
                <p>${emojiMap[playerChoice]}</p>
                <p>${playerChoice}</p>
            </div>
            <div class="bot-choice">
                <h3>bot chose:</h3>
                <p>${emojiMap[botChoice]}</p>
                <p>${botChoice}</p>
            </div>
        </div>
        <div class="winner">`;
    
    if (winner === 'tie') {
        resultHTML += "It's a tie!";
    } else if (winner === 'player') {
        resultHTML += "You win!";
    } else {
        resultHTML += "Bot wins!";
    }
    
    resultHTML += `</div>`;
    results.innerHTML = resultHTML;
}

// Update the score
function updateScore(winner) {
    if (winner === 'player') {
        playerScore++;
        playerScoreElement.textContent = playerScore;
    } else if (winner === 'bot') {
        botScore++;
        botScoreElement.textContent = botScore;
    }
}

// Reset the game
function resetGame() {
    playerScore = 0;
    botScore = 0;
    playerScoreElement.textContent = '0';
    botScoreElement.textContent = '0';
    results.innerHTML = '<p>Start your move to start the game!</p>';
}