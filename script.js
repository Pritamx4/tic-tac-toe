let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; //playerX, playerO

// all win patterns in the 2d arrey
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      //playerO
      box.innerText = "O";
      turnO = false;
    } else {
      //playerX
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    checkWinner();
  });
});

const showWinner = (Winner) => {
  msg.innerText = `Congratulations, Winner is ${Winner}`;
  msgContainer.classList.remove("hide");
  resetBtn.style.display = "none"; // Hide reset button when someone wins
};

const showDraw = () => {
  msg.innerText = "It's a Draw! Game Over";
  msgContainer.classList.remove("hide");
  resetBtn.style.display = "none"; // Hide reset button when it's a draw
};




const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        console.log("Winner", pos1Val);
        disableBoxes();
        showWinner(pos1Val);
        return;
      }
    }
  }
  
  // Check for draw - all boxes filled and no winner
  let isDraw = true;
  for (let box of boxes) {
    if (box.innerText === "") {
      isDraw = false;
      break;
    }
  }
  
  if (isDraw) {
    disableBoxes();
    showDraw();
  }
};

const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
  resetBtn.style.display = "block"; // Show reset button again when starting new game
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
