const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

// Lets create a function to initialise the game
function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    // UI par bhi empty krwana padega boxes me se
    boxes.forEach((box, index)=>{
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        // one more thing is missing, initialise box with css properties again
        box.classList = `box box${index+1}`;

    })
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

function swapTurn(){
    if(currentPlayer=="X"){
        currentPlayer = "0";
    }
    else{
        currentPlayer = "X";
    }
    // UI Update
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver(){
    let answer = "";

    winningPositions.forEach((position)=>{
        // All 3 boxes should be non-empty and exactly same in value
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
            && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])){
                // Check if winner is X
                if(gameGrid[position[0]] == "X"){
                    answer = "X";
                }
                else{
                    answer = "0";
                }

                // Now we know X/0 is a winner
                boxes.forEach((box)=>{
                    box.style.pointerEvents = "none";  //Disable Pointer Events
                })
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
        
        }
    });

    // IT means we have a winner
    if(answer !== "" ){
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    // Lets check whether there is tie
    let fillCount = 0;
    gameGrid.forEach((box)=>{
        if(box !== "")
            fillCount++;
    });

    // Board is Filled, game is  TIE
    if(fillCount === 9){
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active");
    }
}


function handleClick(index){
    if (gameGrid[index] === ""){
        boxes[index].innerHTML = currentPlayer;   //This line shows in UI
        gameGrid[index] = currentPlayer;     //This line changes in our logical gameGrid array
        boxes[index].style.pointerEvents = "none";  //agar already woh box me X ya 0 bana rhega toh ye line ke madat se wwoh box pe wapas cursor pointer nhi banega
        // Swap kro turn ko
        swapTurn();
        // Koi jeet toh nhi gaya?
        checkGameOver();
    }
}


boxes.forEach((box, index) => {
    box.addEventListener("click", ()=>{
        handleClick(index);
    })
});

newGameBtn.addEventListener("click", initGame);