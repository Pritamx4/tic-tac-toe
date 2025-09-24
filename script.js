let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let gameContainer = document.querySelector(".container");
let heading = document.querySelector("h1");

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
  gameContainer.style.display = "none"; // Hide game board
  heading.style.display = "none"; // Hide heading
  createParticleEffect(); // Add celebration particles
};

const showDraw = () => {
  msg.innerText = "It's a Draw! Game Over";
  msgContainer.classList.remove("hide");
  resetBtn.style.display = "none"; // Hide reset button when it's a draw
  gameContainer.style.display = "none"; // Hide game board
  heading.style.display = "none"; // Hide heading
  createParticleEffect(); // Add celebration particles for draw too
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
  gameContainer.style.display = "flex"; // Show game board again
  heading.style.display = "block"; // Show heading again
  clearParticles(); // Remove any remaining particles
};

// Function to create particle effect
const createParticleEffect = () => {
  const particleContainer = document.createElement('div');
  particleContainer.classList.add('particles');
  document.body.appendChild(particleContainer);

  // Create multiple waves of confetti for party bumper effect
  const waves = 5;
  const particlesPerWave = 40;
  
  for (let wave = 0; wave < waves; wave++) {
    setTimeout(() => {
      for (let i = 0; i < particlesPerWave; i++) {
        setTimeout(() => {
          createParticle(particleContainer);
        }, i * 15); // Stagger particle creation within wave
      }
    }, wave * 200); // Stagger waves every 200ms
  }

  // Clean up after animation
  setTimeout(() => {
    clearParticles();
  }, 6000);
};

// Function to create individual particle
const createParticle = (container) => {
  const particle = document.createElement('div');
  particle.classList.add('particle');
  
  // Random horizontal starting position
  particle.style.left = Math.random() * 100 + '%';
  
  // Random delay for more natural paper drop effect
  particle.style.animationDelay = Math.random() * 0.5 + 's';
  
  // Random duration variation for realistic paper flutter
  particle.style.animationDuration = (3.5 + Math.random() * 1.5) + 's';
  
  container.appendChild(particle);
};

// Function to clear all particles
const clearParticles = () => {
  const particles = document.querySelectorAll('.particles');
  particles.forEach(container => {
    if (container && container.parentNode) {
      container.parentNode.removeChild(container);
    }
  });
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
