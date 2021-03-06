const animation = document.createElement("div");
animation.classList.add("loading");
const dot = document.createElement("div");
dot.classList.add("circle");
animation.appendChild(dot);
animation.appendChild(dot.cloneNode(true));
animation.appendChild(dot.cloneNode(true));

const chatBox = document.querySelector(".chat-box");

const playerChatBubble = document.createElement("div");
playerChatBubble.classList.add("chat-bubble");
playerChatBubble.classList.add("player");

const opponentChatBubble = document.createElement("div");
opponentChatBubble.classList.add("chat-bubble");
opponentChatBubble.classList.add("opponent");
opponentChatBubble.appendChild(animation);

const OPPONENT = "opponent";
const PLAYER = "player";

const SYMBOLS = [
  { name: "paper", displayStr: "🧻 Paper" },
  { name: "scissors", displayStr: "✂️ Scissors" },
  { name: "rock", displayStr: "🪨 Rock" },
];

function addBubble(playerOrOpponent, text) {
  const chatBox = document.querySelector(".chat-box");

  let bubbleElement = null;

  if (playerOrOpponent === "player") {
    bubbleElement = playerChatBubble.cloneNode(true);
  } else if (playerOrOpponent === "opponent") {
    bubbleElement = opponentChatBubble.cloneNode(true);
  } else {
    return;
  }

  let responseTimeout = Math.random() * 1000 + 1000;

  if (playerOrOpponent === "opponent") {
    setTimeout(function () {
      bubbleElement.innerHTML = text;
    }, responseTimeout);
  } else {
    bubbleElement.innerHTML = text;
  }

  chatBox.appendChild(bubbleElement);

  chatBox.scrollTop = chatBox.scrollHeight;
  setTimeout(function () {
    chatBox.scrollTop = chatBox.scrollHeight;
  }, responseTimeout);
}

let game = {
  roundsCount: 0,
  playerScore: 0,
  opponentScore: 0,
  restartGame: function () {
    this.playerScore = 0;
    this.opponentScore = 0;
    this.roundsCount = 0;
    this.showWelcomeMessage();
  },
  showWelcomeMessage: function () {
    addBubble(
      OPPONENT,
      "Welcome to Rock Paper Scissors game, I will be your opponent today." +
        " Choose your weapon! (type 'paper', 'rock', or 'scissors')"
    );
  },
  parseUserInput: function (playerInput) {
    addBubble(PLAYER, playerInput);
    playerInput = playerInput.toLowerCase();
    if (playerInput.includes("score")) {
      this.showScore();
    } else if (
      playerInput.includes("new game") ||
      playerInput.includes("reset") ||
      playerInput.includes("restart")
    ) {
      this.restartGame();
    } else if (
      playerInput.includes("paper") ||
      playerInput.includes("rock") ||
      playerInput.includes("scissors")
    ) {
      this.playRound(playerInput);
    } else if (playerInput.includes("hello") || playerInput.includes("hi")) {
      this.meetAndGreet();
    } else {
      this.unknownCommand();
    }
  },
  meetAndGreet() {
    addBubble(OPPONENT, "Well, hi there 👋. Let the battle begin!");
  },
  showScore: function () {
    addBubble(
      OPPONENT,
      `Current score after <b>${this.roundsCount}</b> rounds - Player ` +
        `<b>${this.playerScore}</b> : <b>${this.opponentScore}</b> Bot`
    );
  },
  playRound(playerChoice) {
    this.roundsCount++;
    let botChoice = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
    addBubble(OPPONENT, botChoice.displayStr);
    if (
      (playerChoice === "paper" && botChoice.name === "rock") ||
      (playerChoice === "rock" && botChoice.name === "scissors") ||
      (playerChoice === "scissors" && botChoice.name === "paper")
    ) {
      // player wins round
      this.playerScore++;
    } else if (
      (playerChoice === "paper" && botChoice.name === "scissors") ||
      (playerChoice === "rock" && botChoice.name === "paper") ||
      (playerChoice === "scissors" && botChoice.name === "rock")
    ) {
      // bot wins round
      this.opponentScore++;
    }
    this.checkForGameEnd();
  },
  checkForGameEnd() {
    if (this.playerScore >= 5 || this.opponentScore >= 5) {
      if (this.playerScore >= 5) {
        addBubble(OPPONENT, "Congratulations! You've won 😊");
      } else if (this.opponentScore >= 5) {
        addBubble(OPPONENT, "Too bad, you've lost 😥");
      }
      this.showScore();
      addBubble(
        OPPONENT,
        "Do you want to play again? (type 'restart' or 'new game')"
      );
    }
  },
  unknownCommand() {
    addBubble(
      OPPONENT,
      "Sorry, I didn't understand that. Try these commands: " +
        "<b>restart</b> - Restart game,<br/> <b>score</b> - " +
        "Show current score</br> <b>rock, scissors, paper</b> - Start new round"
    );
  },
};

const playerInputForm = document.querySelector(".input-form");

playerInputForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const textInput = e.target[0];
  game.parseUserInput(textInput.value);
  textInput.value = "";
});

document.addEventListener("DOMContentLoaded", function (e) {
  // Start game
  game.restartGame();
});
