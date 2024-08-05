let foodY = 20;
let foodX = 20;
let board = document.querySelector(".board")
let snakeX = 24;
let snakeY = 2;
let velocityX = 0;
let velocityY = 0;
let snakeBody = [];
let gameover = false
let getsetInterval;
let score = 0;
let scoreElement = document.querySelector(".score")
let high_score = document.querySelector(".High-score")
const controls = document.querySelectorAll(".controls i");


// Getting high score from the local storage
let highScore = localStorage.getItem("high-score") || 0;
high_score.innerText = `High Score: ${highScore}`;

// code for random food generate
const foodgenerate = ()=>{
    foodX = Math.floor(Math.random()*25)+1;
    foodY = Math.floor(Math.random()*25)+1;
}

const restart = ()=>{
    alert(`GAME OVER !(Beta tumse Na Ho Payga) Click OK to Restart the game`)
    clearInterval(getsetInterval)
    location.reload();
}

// providing our snake functionality
const movementSnake = (e)=>{
    
    if(e.key === "ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }
    else if(e.key === "ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    }
    else if(e.key === "ArrowLeft" && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    }
    else if(e.key === "ArrowRight" && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }
    // console.log(e)
    gameplay()
    
}


controls.forEach(button => button.addEventListener("click", () => movementSnake({ key: button.dataset.key })));

//main function 
const gameplay = ()=>{
    if(gameover){restart()}
    if(snakeX === foodX && snakeY === foodY){
        foodgenerate()
        snakeBody.push([foodX ,foodY])
        score++;
        high = score
        scoreElement.innerText = ` Score-${score}`
        high_score.innerText = ` High-score-${highScore}`
        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore);

    }
    let main = `<div class ="food" style="grid-area:${foodY}/${foodX}"></div>`
    if(snakeX <= 0 || snakeX > 25 || snakeY <= 0 || snakeY > 25){
        // console.log("gameover")
        gameover = true
    }
    
    for (let i = snakeBody.length -1; i > 0; i--) {
      snakeBody[i] = snakeBody[i-1];
    }
    snakeX += velocityX;
    snakeY += velocityY;

    snakeBody[0] = [snakeX , snakeY]

    for (let i = 0; i < snakeBody.length; i++) {
        main += `<div class ="snake" style="grid-area:${snakeBody[i][1]} /${snakeBody[i][0]}"></div>`     
        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameover = true;
        }   
    }
   

    board.innerHTML = main 
    
}


foodgenerate()
// gameplay()
getsetInterval = setInterval(gameplay , 100)


document.addEventListener("keydown", movementSnake);
// using set inteval for loop
