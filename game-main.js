// Global Variables
const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
let blob, score;
const food = [];


// Game object

const game = {

    bodyEl: document.querySelector('body'),
    width: 600,
    height: 600,

    canvasSetup() {
        canvas.width = 600;
        canvas.height = 600;
        canvas.style.background = '#AC46A1';
        this.bodyEl.append(canvas);
        this.frameNo = 0;
        score = new Score('30px Overpass', 450, 50);
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


//Functions


function clear() {
    context.clearRect(0, 0, game.width, game.height);
}

function everyInterval(n) {
    if ((game.frameNo /n) % 1 == 0) {
        return true;
    }
    return false;
}

function updateGameArea() {
    let x, y;
    for (let i = 0; i < food.length; i++) {
        if (blob.crashWith(food[i])) {
            game.stop();
            return;
        }
    }
    game.clear();
    game.frameNo += 1;
    if (game.frameNo == 1 || everyInterval(60)) {
        food.push(new Food('#FF6D00', randomX(), randomY()));
    }
    for (let i = 0; i < food.length; i++) {
        food[i].update();
    }
    score.text = `Score: ${food.length}`;
    score.update();
    blob.newPos();
    blob.update();
}

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

function stopMove() {
    blob.speedX = 0;
    blob.speedY =0;
}

function growBlob() {
    blob.height =  blob.height + 5;
    blob.width = blob.width + 5;
}

function randomX() {
    return Math.floor(Math.random() * (game.width + 10) + 10);
}

function randomY() {
    return Math.floor(Math.random() * (game.height + 10) + 10);
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
        } else if (obj.left > 0 || objRight > canvas.witdth - this.width || objTop < 0 || objBottom > canvas.width - this.height) {
            crash = true;
        }
        return crash;
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
