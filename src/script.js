"use strict";
// let game = {
//   gameboard: ["❌", "⭕"],

//   players: {
//     p1: {
//       name: p1Name,
//     },
//     p2: {
//       name: p2Name,
//     },
//   },

//   logic: {
//     //game flow logic
//   },
// };
function createElements(el, content, className) {
  const element = document.createElement(el);
  element.textContent = content;
  element.className = className;
  return element;
}

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

  let labelp2 = createElements("label", "⭕:", "p2Label");
  let p2NameInput = createElements("input", "", "p2NameInput");
  p2NameInput.id = "p2Name";

  const submit = createElements("button", "Submit", "modalSubmitBtn");

  labelp1.setAttribute("for", "p1Name");
  p1NameInput.setAttribute("placeholder", "Player 1 Enter Name");

  p1NameInput.setAttribute("type", "text");

  labelp2.setAttribute("for", "p2Name");
  p2NameInput.setAttribute("placeholder", "Player 2 Enter Name");

  p2NameInput.setAttribute("type", "text");

  submit.setAttribute("type", "button");

  form.appendChild(labelp1);
  form.appendChild(labelp2);
  form.appendChild(p1NameInput);
  form.appendChild(p2NameInput);
  form.appendChild(submit);

  modalContainer.appendChild(form);
  modal.appendChild(modalContainer);
  modal.style.display = "block";

  body.appendChild(modal);

  submit.addEventListener("click", function buildBoard(e) {
    e.preventDefault();
    let p1Name = p1NameInput.value;
    let p2Name = p2NameInput.value;

    let playArea = document.querySelector(".playArea");

    let p1Score = createElements("div", "", "score");
    let p1h2 = createElements("h2", `${p1Name}: `, "p1Score");
    let p1Span = createElements("span", 0, "p1ScoreNumber");

    let p2Score = createElements("div", "", "score");
    let p2h2 = createElements("h2", `${p2Name}: `, "p2Score");
    let p2Span = createElements("span", 0, "p2ScoreNumber");
    
    let gameboard = createElements("div", "", "gameboard");

    let i = 0;
    do {
      let position = createElements("div", "", "position");
      switch (i) {
        case 0:
          position.classList.add("nw");
          break;
        case 1:
          position.classList.add("n");
          break;
        case 2:
          position.classList.add("ne");
          break;
        case 3:
          position.classList.add("w");
          break;
        case 4:
          position.classList.add("mid");
          break;
        case 5:
          position.classList.add("e");
          break;
        case 6:
          position.classList.add("sw");
          break;
        case 7:
          position.classList.add("s");
          break;
        case 8:
          position.classList.add("se");
          break;

        default:
          break;
      }
      gameboard.appendChild(position);
      i++;
    } while (i < 9);

    let modal = document.querySelector(".modal");
    modal.style.display = "none";

    p1Score.appendChild(p1h2);
    p1h2.appendChild(p1Span);
    p2Score.appendChild(p2h2);
    playArea.appendChild(p1Score);
    p2h2.appendChild(p2Span);
    playArea.appendChild(p2Score);
    playArea.appendChild(gameboard);
  });
}

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
