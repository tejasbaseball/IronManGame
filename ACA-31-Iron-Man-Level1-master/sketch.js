
var bg, backgroundImg;
var iron, ironImg;
function preload() {
  backgroundImg = loadImage("images/bg.jpg");
  ironImg=loadImage("images/iron.png");
}

function setup() {
  createCanvas(1000, 600);
  bg = createSprite(580,300);
  bg.addImage(backgroundImg);
  bg.scale=2;
  iron=createSprite(150,450,20,40);
  iron.addImage(ironImg);
  iron.scale=0.4;
  ground=createSprite(500,600,1000,10);
  ground.visible=false;
}

function draw() {
  
 
    if(keyDown("up"))
    {
      iron.velocityY=-10;
    }
    if(keyDown("left"))
    {
      iron.velocityX=-5;
    }
    if(keyDown("right"))
    {
      iron.velocityX=5;
    }
    if(bg.y<=0)
    {
      bg.y=500;
    }
    iron.velocityY+=0.5;
    bg.velocityY=-5;
    iron.collide(ground);
    drawSprites();
   
}

