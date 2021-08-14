//variables for each sprite and their respective images
var bg, backgroundImg;
var iron, ironImg;
var stoneGroup, stoneImg;
var diamondGroup, diamondImg;
var score=0;
var spikeGroup, spikeImg;
var game_state="PLAY";
var restart, restartImg;
function preload() {//loads all the sprite images
  backgroundImg = loadImage("images/bg.jpg");
  ironImg=loadImage("images/iron.png");
  stoneImg=loadImage("images/stone.png");
  diamondImg=loadImage("images/diamond.png");
  spikeImg=loadImage("images/spikes.png");
  restartImg=loadImage("images/restart.png");
}

function setup() {
  createCanvas(1000, 600);
  bg = createSprite(580,300);//creates background sprite
  bg.addImage(backgroundImg);
  bg.scale=2;
  iron=createSprite(150,450,20,40);//creates ironman sprite
  iron.addImage(ironImg);
  iron.scale=0.2;
  ground=createSprite(500,600,1000,10);//creates invisible ground sprite
  ground.visible=false;
  stoneGroup=new Group();
  iron.setCollider("rectangle",100,0,200,400);
  diamondGroup=new Group();
  spikeGroup=new Group();
  restart=createSprite(500,300);
  restart.addImage(restartImg);
  restart.scale=0.3;
  restart.visible=false;
}

function draw() {
  if(game_state==="PLAY")
  {
      if(keyDown("up"))//makes ironman fly up
      {
        iron.velocityY=-10;
      }
      if(keyDown("left"))//makes ironman move left
      {
        iron.x-=5;
      }
      if(keyDown("right"))//makes ironman move right
      {
        iron.x+=5;
      }
      if(bg.y<=0)
      {
        bg.y=bg.height/2;
      }
      if(iron.x<20||iron.x>950)//used to maintain ironman in the canvas
      {
        iron.x=150;
      }
      if(iron.y<50)//used to maintain ironman in the canvas
      {
        iron.y=50;
      }
      iron.velocityY+=0.5;
      bg.velocityY=-5;
      generateStones();//generates a stone sprite that gets added to the stoneGroup
      for(var i=0;i<stoneGroup.length;i++)
      {
          var temp=stoneGroup.get(i);
          if(temp.isTouching(iron))
          {
              iron.collide(temp);
          }
      }
      generateSpikes();//generates a spike sprite that gets added to the spikeGroup
      for(var i=0;i<(spikeGroup).length;i++)
      {
          var temp=(spikeGroup).get(i);
          if(temp.isTouching(iron))
          {
              score-=5;
              temp.destroy();
              temp=null;
          }
      }
      generateDiamonds();//generates a diamond sprite that gets added to the diamondGroup
      for(var i=0;i<diamondGroup.length;i++)
      {
          var temp=diamondGroup.get(i);
          if(temp.isTouching(iron))
          {
              score++;
              temp.destroy();
              temp=null;
          }
      }
      if(score<=-10||iron.y>610)
      {
        game_state="END";
      }
    }
    else 
    {
      bg.velocityY = 0;
      iron.velocityY=0;
      iron.velocityX=0;
      spikeGroup.setVelocityYEach(0);
      spikeGroup.setLifetimeEach(0);
      diamondGroup.setVelocityYEach(0);
      diamondGroup.setLifetimeEach(0);
      stoneGroup.setVelocityYEach(0);
      stoneGroup.setLifetimeEach(0);
      restart.visible=true;
      if(mousePressedOver(restart))
      {
          restartGame();
      }
    }
    drawSprites();
    textSize(20);
    fill("red");
    text("Diamonds Collected: "+score,750,50);//displays score
   
}
function generateStones()
{
  if(frameCount%70===0)//generate stones every 70 frames
    {
        var stone=createSprite(500,-500,60,15);
        stone.x=random(50,950);//sets a random x position for the stone
        stone.addImage(stoneImg);
        stone.scale=0.3;
        stone.velocityY=3;
        stone.lifetime=750;
        stoneGroup.add(stone);

    }
}
function generateDiamonds()
{
  if(frameCount%50===0)//generates diamonds every 50 frames
    {
        var diamond=createSprite(500,-500,60,15);
        diamond.x=random(50,950);//sets a random x position for the diamond
        diamond.addImage(diamondImg);
        diamond.scale=0.2;
        diamond.velocityY=2;
        diamond.lifetime=1000;
        diamondGroup.add(diamond);

    }
}
function generateSpikes()
{
    if(frameCount%90===0)//generates spikes every 90 frames
    {
        var obs=createSprite(500,-500,10,40);
        obs.x=random(50,950);//sets a random x position for the spike
        obs.velocityY=3;
        obs.scale=0.3;
        obs.addImage(spikeImg);
        obs.lifetime=750;
        spikeGroup.add(obs);
    }
}
function restartGame()
{
  score=0;
  game_state="PLAY";
  spikeGroup.destroyEach();
  diamondGroup.destroyEach();
  stoneGroup.destroyEach();
  iron.y=50;
  restart.visible=false;
}
