const cvs = document.getElementById("snakecanvas");
const context = cvs.getContext("2d");

const box = 20;
const w = 1000;
const h = 500;

// sounds
let dead = new Audio();
let eat = new Audio();

dead.src = '/sounds/dead.mp3';
eat.src = '/sounds/eat.mp3';

let snake = [];

// intialize snake

snake[0] = {
  x: 20 * box,
  y: 20 * box
};

// intialize food

let food = {
  x: Math.floor(Math.random() * (w / box)) * box,
  y: Math.floor(Math.random() * (h / box)) * box
}

let score = 0;

//snake controlling part

let direction;

document.addEventListener("keydown", findDirection);

function findDirection(event) {
  
  let key = event.keyCode;
  if(key == 37 || key == 38 || key == 39 || key == 40) 
  	document.getElementById('instruction').innerHTML = 'press p to pause';

  if (key == 37 && direction != "RIGHT") {
    direction = "LEFT";
    delay();
  } else if (key == 38 && direction != "DOWN") {
    direction = "UP";
    delay();
  } else if (key == 39 && direction != "LEFT") {
    direction = "RIGHT";
    delay();
  } else if (key == 40 && direction != "UP") {
    direction = "DOWN";
    delay();
  } else if (key == 80) {
    togglePause();
    delay();
  }
}

// collison of snake with snake body

function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x == array[i].x && head.y == array[i].y) {
      return true;
    }
  }
  return false;
}

function drawFood(x, y) {

  context.fillStyle = "red";
  context.fillRect(x, y, box, box);
  context.strokeStyle = 'black';
  context.strokeRect(x, y, box, box);

}

function draw() {

  context.fillStyle = 'lightgrey';
  context.fillRect(0, 0, w, h);
  context.strokeStyle = 'black';
  context.strokeRect(0, 0, w, h);

  for (let i = 0; i < snake.length; i++) {
    context.fillStyle = (i == 0) ? "green" : "yellow";
    context.fillRect(snake[i].x, snake[i].y, box, box);

    context.strokeStyle = "black";
    context.strokeRect(snake[i].x, snake[i].y, box, box);
  }

  drawFood(food.x, food.y);

  //old direction positions
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  //moving in direction

  if (direction == "LEFT") snakeX -= box;
  if (direction == "UP") snakeY -= box;
  if (direction == "RIGHT") snakeX += box;
  if (direction == "DOWN") snakeY += box;

  // if the snake eats the food
  if (snakeX == food.x && snakeY == food.y) {
    score++;
    eat.play();
    food = {
      x: Math.floor(Math.random() * (w / box)) * box,
      y: Math.floor(Math.random() * (h / box)) * box
    }
    for (let i = 0; i < snake.length; i++) {
      if (food.x === snake[i].x && food.y === snake[i].y) {
        food = {
          x: Math.floor(Math.random() * (w / box)) * box,
          y: Math.floor(Math.random() * (h / box)) * box
        }
        i = 0;
      }
    }

  } else {

    snake.pop(); //removing tail of snake
  }

  //adding new head for snake
  delay();
  let newHead = {
    x: snakeX,
    y: snakeY
  }

  // checking game over condition

  if (snakeX < 0 || snakeX == w || snakeY < 0 || snakeY == h || collision(newHead, snake)) {
 	dead.play();
    clearInterval(game);
    alert(` Oops: Game Over \n Your Score: ${score}`);
    name = prompt('Enter Your Name ');
    if (name == '') name = 'anonymous'
    window.location = `${window.location.protocol}gameover/${name}/${score}`;

  }

  snake.unshift(newHead);
  displayScore();
}

// call draw function every 100 ms

let game = setInterval(draw, 100);

let paused = false;

//function to pause the game

function togglePause() {
  if (!paused) {
    paused = true;
    clearInterval(game);

  } else {
    paused = false;
    game = setInterval(draw, 100);
  }

}

let name;

function displayScore() {
  document.getElementById('score').innerHTML = score;
}

function delay(){
	for(let i = 0;i<200;i++)
	for(let j = 0;j<1000;j++);	
}