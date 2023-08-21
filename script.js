getComputerChoice = function () {
  const options = ["Rock", "Paper", "Scissors"];

  return options[Math.floor(Math.random() * options.length)];
};

//getComputerChoice();

playRound = function (playerChoice, computerChoice) {
  const outcomes = {
    rock: { win: "scissors", lose: "paper" },
    paper: { win: "rock", lose: "scissors" },
    scissors: { win: "paper", lose: "rock" },
  };

  playerChoice = playerChoice.toLowerCase();
  computerChoice = computerChoice.toLowerCase();

  if (playerChoice === computerChoice) {
    console.log("It's a tie!");
  } else if (outcomes[playerChoice].win === computerChoice) {
    console.log(
      `You Win! ${
        playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1)
      } beats ${computerChoice}`
    );
  } else if (outcomes[playerChoice].lose === computerChoice) {
    console.log(
      `You Lose! ${
        computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)
      } beats ${playerChoice}`
    );
  } else {
    console.log("Invalid choice. Please select rock, paper, or scissors.");
  }
};

//playRound("scissors", getComputerChoice());

game = function () {
  const rounds = 0;
  const roundsToWin = 3;

  let playerScore = 0;
  let computerScore = 0;

  while (rounds <= 5) {}
};
