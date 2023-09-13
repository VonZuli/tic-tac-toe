"use strict";

function createElements(el, content, className) {
  const element = document.createElement(el);
  element.textContent = content;
  element.className = className;
  return element;
}
// const declareWinner = (() => {
//   let scoreContainer = document.querySelector(".message-container");

//   if (players[currentPlayerIndex] === 0) {
//     p1Score.textContent = `${players[currentPlayerIndex].name} wins!`;
//     p2Score.style.textDecoration = "line-through red";
//   } else if (players[currentPlayerIndex] === 1) {
//     p2Score.textContent = `${players[currentPlayerIndex].name} wins!`;
//     p1Score.style.textDecoration = "line-through red";
//   } else if (checkForTie(Gameboard.getGameboard())) {
//     gameOver = true;
//     scoreContainer.innerHTML = `Draw`;
//   }
// })();

const displayController = (() => {
  const renderMessage = (message) => {
    document.querySelector(".message-container").innerHTML = message;
  };
  return { renderMessage };
})();

const Gameboard = (() => {
  let buildGameboard = ["", "", "", "", "", "", "", "", ""];

  const render = (p1, p2) => {
    let boardHTML = "";
    let playArea = document.querySelector("#playArea");

    let messageContainer = createElements("div", "", "message-container");

    let gameboard = createElements("div", "", "gameboard");
    gameboard.id = "gameboard";

    buildGameboard.forEach((square, index) => {
      boardHTML += `<div class="square" id="square-${index}">${square}</div>`;
    });

    let modal = document.querySelector(".modal");
    modal.style.display = "none";

    messageContainer.style.display = "none"
    playArea.appendChild(messageContainer);
    playArea.appendChild(gameboard);

    document.querySelector("#gameboard").innerHTML = boardHTML;
    const squares = document.querySelectorAll(".square");
    squares.forEach((square) => {
      square.addEventListener("click", Game.handleClick);
    });
  };

  const update = (index, value) => {
    buildGameboard[index] = value;
    renderBoard();
  };

  //create accessor method
  const getGameboard = () => buildGameboard;

  const renderBoard = () => {
    let boardHTML = "";
    document.querySelector('.message-container').style.display = "none"
    buildGameboard.forEach((square, index) => {
      boardHTML += `<div class="square" id="square-${index}">${square}</div>`;
    });
    document.querySelector("#gameboard").innerHTML = boardHTML;
    const squares = document.querySelectorAll(".square");
    squares.forEach((square) => {
      square.addEventListener("click", Game.handleClick);
    });
  };

  return {
    render,
    renderBoard,
    update,
    getGameboard,
  };
})();

const createPlayer = (name, marker, score) => {
  return {
    name,
    marker,
    score,
  };
};

const Game = (() => {
  let players = [];
  let currentPlayerIndex;
  let gameOver;

  const start = () => {
    players = [
      createPlayer(document.querySelector("#p1Name").value, "❌", 0),
      createPlayer(document.querySelector("#p2Name").value, "⭕", 0),
    ];
    currentPlayerIndex = 0;
    gameOver = false;
    Gameboard.render();
    const squares = document.querySelectorAll(".square");
    squares.forEach((square) => {
      square.addEventListener("click", Game.handleClick);
    });
  };

  const handleClick = (e) => {
    let index = parseInt(e.target.id.split("-")[1]);

    if (Gameboard.getGameboard()[index] != "") return;

    Gameboard.update(index, players[currentPlayerIndex].marker);

    if (checkForWin(Gameboard.getGameboard(), players[currentPlayerIndex].marker)) {
      gameOver = true;
      gameOver === true ? players[currentPlayerIndex].score++ : console.log(players);
      document.querySelector('.message-container').style.display = "block"
      displayController.renderMessage(`${players[currentPlayerIndex].name} wins!`);

    } else if (checkForTie(Gameboard.getGameboard())) {
      gameOver = true;
      displayController.renderMessage(`Draw!`);
    }
    currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
  };

  const restart = () => {
    for (let i = 0; i < 9; i++) {
      Gameboard.update(i, "");
    }
    let startGame = document.querySelector("#startBtn");
    startGame.removeAttribute("disabled");
    startGame.style.filter = "grayscale(0%)";
    Gameboard.renderBoard();
    gameOver = false;
    document.querySelector(".message-container").style.display = "none";
    // document.querySelector(".p1ScoreNumber").innerHTML++
    // document.querySelector(".p2ScoreNumber").innerHTML++
  };

  return { start, restart, handleClick };
})();

function checkForTie(board) {
  return board.every((cell) => cell !== "");
}

function checkForWin(board) {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winningCombos.length; i++) {
    const [a, b, c] = winningCombos[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return true;
    }
  }
  return false;
}

let startGame = document.querySelector("#startBtn");
startGame.addEventListener("click", start);

let restartGame = document.querySelector("#resetBtn");
restartGame.addEventListener("click", () => {
  Game.restart();
});

function start(e) {
  e.preventDefault();
  startGame.setAttribute("disabled", true);
  startGame.style.filter = "grayscale(100%)";
  let body = document.querySelector("body");
  let modal = createElements("div", "", "modal");
  let modalContainer = createElements("div", "", "modal-container");
  let form = createElements("form", "", "modal-form");

  let labelp1 = createElements("label", "❌:", "p1Label");
  let p1NameInput = createElements("input", "", "p1NameInput");
  p1NameInput.id = "p1Name";
  labelp1.setAttribute("for", "p1Name");
  p1NameInput.setAttribute("placeholder", "Player 1 enter name");
  p1NameInput.setAttribute("type", "text");

  let labelp2 = createElements("label", "⭕:", "p2Label");
  let p2NameInput = createElements("input", "", "p2NameInput");
  p2NameInput.id = "p2Name";
  labelp2.setAttribute("for", "p2Name");
  p2NameInput.setAttribute("placeholder", "Player 2 enter name");
  p2NameInput.setAttribute("type", "text");

  const buildBoard = createElements("button", "Begin Game", "modalSubmitBtn");
  buildBoard.setAttribute("type", "button");

  buildBoard.addEventListener("click", (e) => {
    // let p1 = p1NameInput.value;
    // let p2 = p2NameInput.value;
    e.preventDefault();
    Game.start();
    modal.style.display = "none";
  });

  form.appendChild(labelp1);
  form.appendChild(p1NameInput);
  form.appendChild(labelp2);
  form.appendChild(p2NameInput);
  form.appendChild(buildBoard);

  modalContainer.appendChild(form);
  modal.appendChild(modalContainer);
  modal.style.display = "block";

  body.appendChild(modal);
}
