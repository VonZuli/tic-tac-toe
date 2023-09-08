"use strict";

let game = {
  gameboard: ["❌", "⭕"],

  players: {
    p1: {
      name: getPlayer1,
      age: getPlayer1,
    },
    p2: {
      //player info
    },
  },

  logic: {
    //game flow logic
  },
};

function createElements(el, content, className) {
  const element = document.createElement(el);
  element.textContent = content;
  element.className = className;
  return element;
}

function getPlayer1(p1Name, p1Age) {
  p1Name = game.players.p1.name;
  p1Age = game.players.p1.age;
}
// function getPlayer2(p2Name, p2Age) {
//   game.players.p2.name = p2Name;
//   game.players.p2.age = p2Age;
// }

let startGame = document.querySelector(".startGame");
startGame.addEventListener("click", start);

function start() {
  startGame.setAttribute("disabled", true);
  let body = document.querySelector("body");
  let modal = createElements("div", "", "modal");
  let modalContainer = createElements("div", "", "modal-container");
  let form = createElements("form", "", "modal-form");

  let labelp1 = createElements("label", "❌:", "p1Label");
  let p1NameInput = createElements("input", "", "p1NameInput");
  p1NameInput.id = "p1Name";
  let p1AgeInput = createElements("input", "", "p1AgeInput");
  p1AgeInput.id = "p1Age";

  let labelp2 = createElements("label", "⭕:", "p2Label");
  let p2NameInput = createElements("input", "", "p2NameInput");
  p2NameInput.id = "p2Name";
  let p2AgeInput = createElements("input", "", "p2AgeInput");
  p1AgeInput.id = "p2Age";

  let submit = createElements("button", "Submit", "modalSubmitBtn");

  labelp1.setAttribute("for", "p1Name");
  p1NameInput.setAttribute("placeholder", "Player 1 Enter Name");
  p1AgeInput.setAttribute("placeholder", "Player 1 Enter Age");
  p1NameInput.setAttribute("type", "text");
  p1AgeInput.setAttribute("type", "number");

  labelp1.setAttribute("for", "p2Name");
  p2NameInput.setAttribute("placeholder", "Player 2 Enter Name");
  p2AgeInput.setAttribute("placeholder", "Player 2 Enter Age");
  p2NameInput.setAttribute("type", "text");
  p2AgeInput.setAttribute("type", "number");

  form.appendChild(labelp1);
  form.appendChild(labelp2);
  form.appendChild(p1NameInput);
  form.appendChild(p2NameInput);
  form.appendChild(p1AgeInput);
  form.appendChild(p2AgeInput);
  form.appendChild(submit);

  modalContainer.appendChild(form);
  modal.appendChild(modalContainer);
  modal.style.display = "block";
  body.appendChild(modal);

  let p1Name = p1NameInput.value;
  let p1Age = p1AgeInput.value;
  let p2Name = p2NameInput.value;
  let p2Age = p2AgeInput.value;

  getPlayer1(p1Name, p1Age);
  // getPlayer2(p2Name, p2Age);
}
