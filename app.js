//to access elements
let boxes = document.querySelectorAll(".box");//returns a node list
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let startBtn = document.querySelector("#start-btn");
let start = document.querySelector(".start-game");
//first we have to track which player's turn it is
let turnO = true; //playerO's turn
let count = 0; //to track draw game
//storing the winning patterns
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];
//to display start screen
start.classList.remove("hide1"); 
let playerO = prompt("Enter 1st Player Name : ");
let playerX = prompt("Enter 2nd Player Name : ");
//for disabling every box after the winner is declared
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}
//for draw condition
const gameDraw = () => {
    msg.innerText = "Game Draw";
    msgContainer.classList.remove("hide");
    start.classList.remove("hide1");
    disableBoxes();
}
//adding event listener to each box
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
        //disabling the box so that it cannot be over-written
        box.disabled = true;
        //increment count
        count++;
        //whenever a button is pressed, we've to check for a winner 
        //or draw game
        let isWinner = checkWinner();
        if (count === 9 && !isWinner) {
            gameDraw();
        }
    }); 
});

//to start a new game
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}
//for adding functionality to reset button
const resetGame = () => {
    //so that when game restarts, it is playerO's turn
    turnO = true;
    enableBoxes();
    //to hide the msg again
    msgContainer.classList.add("hide");
    start.classList.add("hide1");
    count = 0;
}
//a function to show winner
const showWinner = (winner) => {
    msg.innerText = `Congratulations!! ${winner}\n You are the Winner 🥇`;
    //to make the msg conatainer visible again
    msgContainer.classList.remove("hide");
    //calling disableBoxes function to take any further input
    disableBoxes();
}
//for tracking who is winning
const checkWinner = () => {
    for (let pattern of winPatterns) {
        //every "pattern" is an array itself
        //storing values at each position
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        
        //checking if the box is empty or not
        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            //checking for winning condition
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                if (pos1Val === "O") {
                    showWinner(playerO);
                } else {
                    showWinner(playerX);
                }
            }
        }
    }
};
//
resetBtn.addEventListener("click", resetGame);
//same function can be used 
newGameBtn.addEventListener("click", resetGame);
startBtn.addEventListener("click", resetGame);