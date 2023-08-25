"use strict";

// Selecting elements
const btns = document.querySelectorAll(".btn");
const playerScoreEl = document.getElementById("playerScore");
const computerScoreEl = document.getElementById("computerScore");
const winningMessageEl = document.getElementById("winning-message");
const scoreboardEl = document.querySelector(".scoreboard");

let playerChoice = null;
let result = null;
let rounds = 0;
let playerScore = 0;
let computerScore = 0;

const getComputerChoice = function () {
  const options = ["Rock", "Paper", "Scissors"];

  return options[Math.floor(Math.random() * options.length)];
};

for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function (event) {
    playerChoice = event.currentTarget.getAttribute("data-choice");
    //console.log(playerChoice);
    result = playRound(playerChoice);
    //console.log(result);
    updateScoresAndRounds();
  });
}

function updateScoresAndRounds() {
  if (result === 1) {
    playerScore += 1;
    rounds += 1;
    console.log(`Player: ${playerScore} vs Computer: ${computerScore}`);
    playerScoreEl.textContent = playerScore;
  } else if (result === 2) {
    computerScore += 1;
    rounds += 1;
    console.log(`Player: ${playerScore} vs Computer: ${computerScore}`);
    computerScoreEl.textContent = computerScore;
  } else if (result === 0) {
    console.log(`Player: ${playerScore} vs Computer: ${computerScore}`);
  }

  // End the game if necessary
  if (computerScore === 3 || playerScore === 3 || rounds === 5) {
    endGame();
  }
}

function endGame() {
  if (playerScore > computerScore) {
    console.log("Player wins the match!");
    winningMessageEl.textContent = "Player wins the match!";
  } else if (computerScore > playerScore) {
    console.log("Computer wins the match!");
    winningMessageEl.textContent = "Computer wins the match!";
  } else {
    console.log("The game is a tie!");
  }

  scoreboardEl.classList.remove("visible");
  scoreboardEl.classList.add("hidden");
  winningMessageEl.classList.remove("hidden");
  winningMessageEl.classList.add("visible");

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
  //console.log(computerChoice);

  if (playerChoice === computerChoice) {
    console.log("It's a tie! Play again");
    return 0;
  } else if (outcomes[playerChoice].win === computerChoice) {
    console.log(
      `You Win! ${
        playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1)
      } beats ${computerChoice}`
    );
    return 1;
  } else if (outcomes[playerChoice].lose === computerChoice) {
    console.log(
      `You Lose! ${
        computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)
      } beats ${playerChoice}`
    );
    return 2;
  }
};
