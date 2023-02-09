// Global Variables
let blob, score;
const obstacle = [];

// Dom Access

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const startButton = document.getElementById('start-button');
const startScreen = document.getElementById('start-screen');
const endScreen = document.getElementById('end-screen');
const displayScore = document.getElementById('score');
const endButton = document.getElementById('end-button');

// Game object

const game = {

    bodyEl: document.querySelector('body'),
    width: 500,
    height: 500,

    canvasSetup() {
        canvas.width = this.width;
        canvas.height = this.height;
        this.frameNo = 0;
        score = new Score('24px Overpass', this.width - 130, 50);
        this.interval = setInterval(updateGameArea, 20);
    },

    startGame() {
        this.canvasSetup();
        blob = new Blob(50, 50, '#47126B', 100, 100);
    },

    clear() {
        context.clearRect(0, 0, this.width, this.height);
    },

    stop() {
        clearInterval(this.interval);
    }
}

//main running game function

function updateGameArea() {
    checkIfCrash()
    blob.boundaryCollide();
    game.clear();
    placeObstacle();
    score.text = `Score: ${obstacle.length}`;
    score.update();
    blob.newPos();
    blob.update();
}

/* 
Functions
*/

//clear game after each interval

function clear() {
    context.clearRect(0, 0, game.width, game.height);
}

//moving functions

function moveUp() {
    blob.speedY = -4; 
    blob. speedX = 0;
}

function moveDown() {
    blob.speedY = 4; 
    blob. speedX = 0;
}

function moveLeft() {
    blob.speedX = -4; 
    blob.speedY = 0; 
}

function moveRight() {
    blob.speedX = 4; 
    blob.speedY = 0; 
}

// Generate random X and Y coordinates

function randomX() {
    return Math.floor(Math.random() * (game.width + 10));
}

function randomY() {
    return Math.floor(Math.random() * (game.height + 10));
}

//obstacle generator function

function everyInterval(n) {
    if ((game.frameNo /n) % 1 == 0) {
        return true;
    }
    return false;
}

function placeObstacle() {
     game.frameNo += 1;
    if (game.frameNo == 1 || everyInterval(50)) {
        obstacle.push(new Obstacle('#FF4742', randomX(), randomY()));
    }
    for (let i = 0; i < obstacle.length; i++) {
       obstacle[i].x += upOrDown();
       obstacle[i].y += upOrDown();
       
        obstacle[i].update();
    }
}

// Functions to check for crash conditions

function checkIfCrash() {
    for (let i = 0; i < obstacle.length; i++) {
        if (blob.crashWith(obstacle[i])) {
            game.stop();
            endScreen.style.display = 'flex';
            canvas.style.display = 'none';
            displayScore.textContent = `Your ${score.text}`;
            return;
        }
    }
}

// Generate a random direction for obstacle movement

function upOrDown() {
    let x = Math.round(Math.random())
    console.log(x);
    if (x === 1) {
        return 3;
    } else {
        return -3;
    }
}

// Constuctor functions for making game pieces

function Blob(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;   

    this.update = function() {
        context.fillStyle = color;
        context.fillRect(this.x, this.y, this.width, this.height);
    }

    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
    }

    this.crashWith = function(obj) {
        const blobLeft = this.x;
        const blobRight = this.x + (this.width);
        const blobTop = this.y;
        const blobBottom = this.y + (this.height);
        const objLeft = obj.x;
        const objRight = obj.x + (obj.width);
        const objTop = obj.y;
        const objBottom = obj.y + (obj.height);
        let crash = true;
        if (blobBottom < objTop || blobTop > objBottom || blobRight < objLeft || blobLeft > objRight) {
          crash = false;
        }
        return crash;
    }
    
    this.boundaryCollide = function() {
        if(this.x == 0 || this.x + this.width > canvas.width || this.y == 0 || this.y + this.height > canvas.height) {
            game.stop();
        }
    }
}

function Obstacle(color, x, y) {
    this.width = 10;
    this.height = 10;
    this.x = x;
    this.y = y;
    speedX = 0;
    speedY = 0;   

    this.update = function() {
        context.fillStyle = color;
        context.fillRect(this.x, this.y, this.width, this.height);
    }

    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
    }
}

function Score(font, x, y) {
    this.x = x;
    this.y = y;
    this.font = font;
    context.font = this.font;
    context.fillText(this.text, this.x, this.y);

    this.update = function() {
        context.fillStyle = 'black';
        context.font = this.font;
        context.fillText(this.text, this.x, this.y);
    }
}

//Event Listners


//Arrow & WASD movement controls
window.addEventListener('keydown', (e) => {
    e.preventDefault();

     switch(e.code) {
       case "KeyS":
       case "ArrowDown":
         // Handle "back"
         moveDown();  
         break;
       case "KeyW":
       case "ArrowUp":
         // Handle "forward"
         moveUp();
         break;
       case "KeyA":
       case "ArrowLeft":
         moveLeft();
         break;
       case "KeyD":
       case "ArrowRight":
         // Handle "turn right"
         moveRight();
         break;
     }   
})

// Start Button event listenr and game start

startButton.addEventListener('click', () => {
    game.startGame();
    startScreen.style.display = 'none';
    canvas.style.display = 'block';
})

endButton.addEventListener('click', () => {
    document.location.reload();
})



//Start game function

// game.startGame();
