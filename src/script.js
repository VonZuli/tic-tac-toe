"use strict";

function createElements(el, content, className) {
  const element = document.createElement(el);
  element.textContent = content;
  element.className = className;
  return element;
}

const Gameboard = (() => {
  let buildGameboard = ["", "", "", "", "", "", "", "", ""];

  const render = (p1, p2) => {
    let boardHTML = "";
    let playArea = document.querySelector("#playArea");

    let scoreContainer = createElements("div", "", "score-container");
    let p1h2 = createElements("h2", `${p1}: `, "p1Score");
    let p1Span = createElements("span", 0, "p1ScoreNumber");

    let p2h2 = createElements("h2", `${p2}: `, "p2Score");
    let p2Span = createElements("span", 0, "p2ScoreNumber");

    let gameboard = createElements("div", "", "gameboard");
    gameboard.id = "gameboard";

    buildGameboard.forEach((square, index) => {
      boardHTML += `<div class="square" id="square-${index}">${square}</div>`;
      
    });

    let modal = document.querySelector(".modal");
    modal.style.display = "none";

    scoreContainer.appendChild(p1h2);
    p1h2.appendChild(p1Span);
    scoreContainer.appendChild(p2h2);
    p2h2.appendChild(p2Span);
    playArea.appendChild(scoreContainer);
    playArea.appendChild(gameboard);
    
    document.querySelector("#gameboard").innerHTML = boardHTML;
    const squares = document.querySelectorAll(".square");
    console.log(squares)
    squares.forEach((square) => {
      square.addEventListener("click", Game.handleClick);
    });
  };

  const update = (index, value) => {
    buildGameboard[index] = value;
    renderBoard();
  };

  //create accessor method

  const renderBoard = () =>{
    let boardHTML = "";
    buildGameboard.forEach((square, index) => {
      console.log(square, index);
      boardHTML += `<div class="square" id="square-${index}">${square}</div>`;
      
    });
    document.querySelector("#gameboard").innerHTML = boardHTML;
    const squares = document.querySelectorAll(".square");
    squares.forEach((square) => {
      square.addEventListener("click", Game.handleClick);
    });
  }

  return {
    render,
    renderBoard,
    update,
  };
})();

const createPlayer = (name, marker) => {
  return {
    name,
    marker,
  };
};

const Game = (() => {
  let players = [];
  let currentPlayerIndex;
  let gameOver;

  const start = (p1, p2) => {
    players = [
      createPlayer(document.querySelector("#p1Name").value, "❌"),
      createPlayer(document.querySelector("#p2Name").value, "⭕"),
    ];
    currentPlayerIndex = 0;
    gameOver = false;
    Gameboard.render(p1, p2);
    const squares = document.querySelectorAll(".square");
    squares.forEach((square) => {
      square.addEventListener("click", Game.handleClick);
    });
  };
  const handleClick = (e) => {
    let index = parseInt(e.target.id.split("-")[1]);
    console.log(index);
    Gameboard.update(index, players[currentPlayerIndex].marker);
    currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
  };
  return { start, handleClick };
})();

let startGame = document.querySelector(".startGame");
startGame.addEventListener("click", start);

function start(e) {
  e.preventDefault();
  startGame.setAttribute("disabled", true);
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
    let p1 = p1NameInput.value;
    let p2 = p2NameInput.value;
    e.preventDefault();
    Game.start(p1, p2);
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

// function gameOver() {
//   let scoreContainer = document.querySelector(".score-container");
//   let p1Name = document.querySelector(".p1Score").textContent;
//   let p1Score = document.querySelector(".p1Score");
//   let p2Name = document.querySelector(".p2Score").textContent;
//   let p2Score = document.querySelector(".p2Score");

//   //win
//   p1Score.innerHTML = `${p1Name.split(":")[0]} wins!`;
//   p2Score.innerHTML = `${p2Name.split(":")[0]} wins!`;

//   //lose
//   p1Score.style.textDecoration = "line-through red";
//   p2Score.style.textDecoration = "line-through red";
// }
// buildBoard(e) {
//   e.preventDefault();
//   let body = document.querySelector("body");
//   let playArea = createElements("div", "", "playArea");
//   let score = createElements("div", "", "score");
//   let h2 = createElements("h2", "", "");
//   let gameboard = createElements("div", "", "gameboard");
//   let position = createElements("div", "", "position");
//   score.appendChild(h2);
//   score.appendChild(h2);
//   gameboard.appendChild(position);
//   playArea.appendChild(gameboard);
//   playArea.appendChild(score);
//   playArea.appendChild(score);
//   body.appendChild(playArea);
// }
