var PLAY = 1;
var END = 0;
var gameState = PLAY;

var ground;

var monkey , monkey_running;

var banana ,bananaImage, obstacle, obstacleImage;

var bananaGroup,bananaImage; 
var obstacleGroup,obstacleImage;

var ground;

var score;

function preload(){
  
monkey_running =           loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
bananaImage = loadImage("banana.png");
obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  
createCanvas(1000, 400);

  //var message = "This is a message";
 //console.log(message)
  
   //creating monkey
   monkey=createSprite(80,315,20,20);
   monkey.addAnimation("moving", monkey_running);
 
   monkey.scale=0.1
  
  ground = createSprite(400,390,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
 
 

  obstaclesGroup = createGroup();
  foodGroup = createGroup();
  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = true;

  score = 0;
  
}

function draw() {

  background(180);
 
  console.log(monkey.y);
  
      
  if(gameState === PLAY){
           if(ground.x<0) {
              ground.x=ground.width/2;
            }
  
    
          if(keyDown("space")&& monkey.y >= 350) {
              monkey.velocityY = -12;
          }
          monkey.velocityY = monkey.velocityY + 0.8;
          
          score = score + Math.round(getFrameRate()/60);

           
          console.log(monkey.y);
          

          

          spawnFood();
          spawnObstacles();

          if(obstaclesGroup.isTouching(monkey)){
              gameState = END;
          }
    
    if (foodGroup.isTouching(monkey)){ 
    foodGroup.destroyEach(); 
}
  }
   else if (gameState === END) {
          ground.velocityX = 0;
          monkey.velocityY = 0

        obstaclesGroup.setLifetimeEach(-1);
        foodGroup.setLifetimeEach(-1);

         obstaclesGroup.setVelocityXEach(0);
         foodGroup.setVelocityXEach(0);    
   }
  
  
  monkey.collide(ground);

  drawSprites();
   text("Score: "+ score, 500,50);
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,370,10,40);
   obstacle.velocityX = -(6 + score/100);

   var rand = Math.round(random(1,6)); 
   obstacle.addImage(obstacleImage);
   
   obstacle.scale = 0.1;
   obstacle.lifetime = 300;

   obstaclesGroup.add(obstacle);
 }
}

function spawnFood() {
  if (frameCount % 60 === 0) {
    var food = createSprite(600,300,40,10);
    food.y = Math.round(random(80,390));
    food.addImage(bananaImage);
    food.scale = 0.09;
    food.velocityX = -3;
  
    food.lifetime = 200;

    foodGroup.add(food);
  }
}
