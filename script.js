"use strict";

// Selecting elements
const btns = document.querySelectorAll(".choice-btn");
const btnNew = document.getElementById("newGame");
const playerScoreEl = document.getElementById("playerScore");
const computerScoreEl = document.getElementById("computerScore");
const winningMessageMatchEl = document.getElementById("winning-message-match");
const winningMessageRoundEl = document.getElementById("winning-message-round");
const scoreboardEl = document.querySelector(".scoreboard");
const playerChoiceEL = document.getElementById("player-choice");
const computerChoiceEL = document.getElementById("computer-choice");

// Declaring variables
let playerChoice = null;
let result = null;
let rounds = 0;
let playerScore = 0;
let computerScore = 0;
let gameActive = true;

btnNew.classList.add("hidden");
btnNew.classList.remove("visible");

// Creating functionality
// Initialise function to reset everything
function init() {
  playerChoice = null;
  result = 0;
  rounds = 0;
  playerScore = 0;
  computerScore = 0;
  gameActive = true;

  winningMessageRoundEl.textContent = 0;
  winningMessageMatchEl.textContent = 0;
  computerScoreEl.textContent = 0;
  playerScoreEl.textContent = 0;

  playerChoiceEL.classList.remove("visible");
  playerChoiceEL.classList.add("hidden");
  computerChoiceEL.classList.remove("visible");
  computerChoiceEL.classList.add("hidden");

  winningMessageRoundEl.classList.remove("visible");
  winningMessageRoundEl.classList.add("hidden");
  winningMessageMatchEl.classList.remove("visible");
  winningMessageMatchEl.classList.add("hidden");

  btnNew.classList.add("hidden");
  btnNew.classList.remove("visible");
}

btnNew.addEventListener("click", init);

const getComputerChoice = function () {
  const options = ["Rock", "Paper", "Scissors"];

  return options[Math.floor(Math.random() * options.length)];
};

for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function (event) {
    if (!gameActive) return;
    playerChoice = event.currentTarget.getAttribute("data-choice");
    console.log(playerChoice);
    result = playRound(playerChoice);
    //console.log(result);
    updateScoresAndRounds();
  });
}

function updateScoresAndRounds() {
  if (result === 1) {
    playerScore += 1;
    rounds += 1;
    //console.log(`Player: ${playerScore} vs Computer: ${computerScore}`);
    playerScoreEl.textContent = playerScore;
    winningMessageRoundEl.classList.remove("hidden");
    winningMessageRoundEl.classList.add("visible");
  } else if (result === 2) {
    computerScore += 1;
    rounds += 1;
    //console.log(`Player: ${playerScore} vs Computer: ${computerScore}`);
    computerScoreEl.textContent = computerScore;
    winningMessageRoundEl.classList.remove("hidden");
    winningMessageRoundEl.classList.add("visible");
  } else if (result === 0) {
    //console.log(`Player: ${playerScore} vs Computer: ${computerScore}`);
    winningMessageRoundEl.classList.remove("hidden");
    winningMessageRoundEl.classList.add("visible");
  }

  // End the game if necessary
  if (computerScore === 3 || playerScore === 3 || rounds === 5) {
    endGame();
    btnNew.classList.remove("hidden");
    btnNew.classList.add("visible");
  }
}

function endGame() {
  gameActive = false;
  if (playerScore > computerScore) {
    console.log("Player wins the match!");
    winningMessageMatchEl.textContent = "Player wins the match!";
  } else if (computerScore > playerScore) {
    console.log("Computer wins the match!");
    winningMessageMatchEl.textContent = "Computer wins the match!";
  } else {
    console.log("The game is a tie!");
  }

  winningMessageRoundEl.classList.remove("visible");
  winningMessageRoundEl.classList.add("hidden");
  winningMessageMatchEl.classList.remove("hidden");
  winningMessageMatchEl.classList.add("visible");

  // Optional: reset scores and rounds if you want to play again
  rounds = 0;
  playerScore = 0;
  computerScore = 0;
}

const playRound = function (playerChoice) {
  const outcomes = {
    rock: { win: "scissors", lose: "paper" },
    paper: { win: "rock", lose: "scissors" },
    scissors: { win: "paper", lose: "rock" },
  };

  const computerChoice = getComputerChoice().toLowerCase();
  console.log(computerChoice);

  if (playerChoice === computerChoice) {
    winningMessageRoundEl.textContent = "It's a tie! Play again";
    return 0;
  } else if (outcomes[playerChoice].win === computerChoice) {
    winningMessageRoundEl.textContent = `You Win! ${
      playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1)
    } beats ${computerChoice}`;
    return 1;
  } else if (outcomes[playerChoice].lose === computerChoice) {
    winningMessageRoundEl.textContent = `You Lose! ${
      computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)
    } beats ${playerChoice}`;
    return 2;
  }
};

document.addEventListener("DOMContentLoaded", function () {
  // Function to push data to the data layer
  function pushWinnerToDataLayer(winner) {
    window.dataLayer = window.dataLayer || [];
    dataLayer.push({
      event: "gameResult",
      winner: winner,
    });
  }

  // Select the target node
  var targetNode = document.getElementById("winning-message-match");

  // Options for the observer (which mutations to observe)
  var config = { attributes: false, childList: true, subtree: false };

  // Callback function to execute when mutations are observed
  var callback = function (mutationsList) {
    for (var mutation of mutationsList) {
      if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
        var winnerText = targetNode.textContent.trim();
        if (winnerText === "Computer wins the match!") {
          console.log("Computer pushed to dl");
          pushWinnerToDataLayer("Computer");
        } else if (winnerText === "Player wins the match!") {
          console.log("Player pushed to dl");
          pushWinnerToDataLayer("Player");
        }
      }
    }
  };

  // Create an instance of the observer
  var observer = new MutationObserver(callback);

  // Start observing the target node for configured mutations
  observer.observe(targetNode, config);
});
