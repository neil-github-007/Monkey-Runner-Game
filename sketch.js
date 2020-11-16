const START = 1;
const PLAY = 2;
const END = 0; 
var gameState = START;

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var ground;
var score;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400);
  
  ground = createSprite(0,350,800,10);
  ground.shapeColor = "white";
  
  monkey = createSprite(40,325,20,20);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale = 0.10;
  
  obstacleGroup = new Group();
  foodGroup = new Group();
}


function draw() {
  if (gameState === START) {
    background('cyan');
    
    noFill();
    stroke("black");
    strokeWeight(3);
    rect(75,245,250,20);
    
    noStroke();
    fill('blue');
    textFont("berlin sans fb");
    textSize(25);
    text("MONKEY GO HAPPY!",75,200);
    
    textSize(20);
    text("Press S to start the game.",100,225);
    
    textSize(15);
    text("-Don't touch the rocks or you'll lose!",80,260);

    
    if  (keyDown("s")) {
      gameState = PLAY;
      monkey.y = 325;
      
      frameCount = 0;
      score = 10;
    }
  }
  else if (gameState === PLAY) {
    
    background("black");
    
    monkey.setCollider('circle',0,0,300);
    
    spawnObstacle();
    spawnFood();
    
    score = Math.round(frameCount/Math.round(frameRate()));
    
    fill("aqua");
    textSize(15);
    text("Survival Time: " + score, 20,20);
    
    if (keyDown("space") && monkey.collide(ground)) {
      monkey.velocityY = -14;
    }
    
    monkey.velocityY += 0.5;
    monkey.collide(ground);
    
    monkey.debug = false;
    
    if (foodGroup.isTouching(monkey)) {      
      foodGroup.destroyEach();
    }
    
    if (obstacleGroup.isTouching(monkey)) {
      gameState = END;
    }
    
    drawSprites();
  }
  
  if (gameState === END) {
    background('red');
    
    fill('yellow');
    textFont("algerian");
    textSize(30);
    text("You Lose!!!",125,200);
    
    textSize(15);
    text("Press R to restart the game", 100,250);
    
    text("Total Tive Survived: " + score, 150,110);
    
    if (keyDown("r")) {
      gameState = START;
    }
  }
}

function spawnObstacle() {
  if (frameCount %  250 === 0) {
    obstacle = createSprite(400,325,20,20);
    obstacle.addImage("obstacle",obstacleImage);
    obstacle.scale = 0.135;
    obstacle.velocityX = -(4 + frameCount/500);
    obstacle.lifetime = 125;
    
    obstacle.setCollider('circle',0,0,250);
    obstacle.debug = false;
    
    obstacleGroup.add(obstacle);
  }
}

function spawnFood() {
  if (frameCount % 80 === 0) {
    banana = createSprite(400,random(100,350),20,20);
    banana.addImage("banana",bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -(4 + frameCount/100);
    
    banana.setCollider('circle',0,0,300);
    banana.debug = false;
    
    banana.lifetime = 110;
    
    foodGroup.add(banana);
  }
}





