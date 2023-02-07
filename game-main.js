// Global Variables
const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');

// Game object

const game = {

    bodyEl: document.querySelector('body'),
    width: 600,
    height: 600,

    canvasSetup() {
        canvas.width = 600;
        canvas.height = 600;
        this.bodyEl.append(canvas);
        setInterval(updateGameArea, 20);
    },

    startGame() {
        this.canvasSetup();
        blob = new Blob(50, 50, 'red', 100, 100);
        glob = new Food('red', 250, 100);
    },


    clear() {
        context.clearRect(0, 0, this.width, this.height);
    }
}


//Functions


function clear() {
    context.clearRect(0, 0, game.width, game.height);
}

function updateGameArea() {
    game.clear();
    glob.update();
    blob.newPos();
    blob.update();
}

function moveUp() {
    blob.speedY = -4; 
}

function moveDown() {
    blob.speedY = 4; 
}

function moveLeft() {
    blob.speedX = -4; 
}

function moveRight() {
    blob.speedX = 4; 
}

function stopMove() {
    blob.speedX = 0;
    blob.speedY =0;
}

function makeFood() {
    let randomX = Math.floor(Math.random() * (game.width + 10) + 10);
    let randomY = Math.floor(Math.random() * (game.height + 10) + 10);

    let food = new Food('blue', randomX, randomY);
    food.update();
}


// Constuctor functions to make game pieces

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
}

function Food(color, x, y) {
    this.width = 10;
    this.height = 10;
    this.x = x;
    this.y = y;   

    this.update = function() {
        context.fillStyle = color;
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}


//Event Listners

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



//Start game function

game.startGame();
