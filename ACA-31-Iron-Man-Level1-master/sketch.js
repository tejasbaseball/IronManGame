var bg, backgroundImg;
var iron, ironImg;
var stoneGroup, stoneImg;
var diamondGroup, diamondImg;
var score=0;
var spikeGroup, spikeImg;
function preload() {
  backgroundImg = loadImage("images/bg.jpg");
  ironImg=loadImage("images/iron.png");
  stoneImg=loadImage("images/stone.png");
  diamondImg=loadImage("images/diamond.png");
  spikeImg=loadImage("images/spikes.png");
}

function setup() {
  createCanvas(1000, 600);
  bg = createSprite(580,300);
  bg.addImage(backgroundImg);
  bg.scale=2;
  iron=createSprite(150,450,20,40);
  iron.addImage(ironImg);
  iron.scale=0.2;
  ground=createSprite(500,600,1000,10);
  ground.visible=false;
  stoneGroup=new Group();
  iron.setCollider("rectangle",100,0,200,400);
  diamondGroup=new Group();
  spikeGroup=new Group();
}

function draw() {
    if(keyDown("up"))
    {
      iron.velocityY=-10;
    }
    if(keyDown("left"))
    {
      iron.x-=5;
    }
    if(keyDown("right"))
    {
      iron.x+=5;
    }
    if(bg.y<=0)
    {
      bg.y=bg.height/2;
    }
    if(iron.x<20||iron.x>950)
    {
      iron.x=150;
    }
    if(iron.y<50||iron.y>600)
    {
      iron.y=450;
    }
    iron.velocityY+=0.5;
    bg.velocityY=-5;
    iron.collide(ground);
    generateStones();
    for(var i=0;i<stoneGroup.length;i++)
    {
        var temp=stoneGroup.get(i);
        if(temp.isTouching(iron))
        {
            iron.collide(temp);
        }
    }
    generateSpikes();
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
    generateDiamonds();
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
    drawSprites();
    textSize(20);
    fill("red");
    text("Diamonds Collected: "+score,750,50);
   
}
function generateStones()
{
  if(frameCount%70===0)
    {
        var stone=createSprite(500,-500,60,15);
        stone.x=random(50,950);
        stone.addImage(stoneImg);
        stone.scale=0.3;
        stone.velocityY=3;
        stone.lifetime=750;
        stoneGroup.add(stone);

    }
}
function generateDiamonds()
{
  if(frameCount%50===0)
    {
        var diamond=createSprite(500,-500,60,15);
        diamond.x=random(50,950);
        diamond.addImage(diamondImg);
        diamond.scale=0.2;
        diamond.velocityY=2;
        diamond.lifetime=1000;
        diamondGroup.add(diamond);

    }
}
function generateSpikes()
{
    if(frameCount%90===0)
    {
        var obs=createSprite(500,-500,10,40);
        obs.x=random(50,950);
        obs.velocityY=3;
        obs.scale=0.3;
        obs.addImage(spikeImg);
        obs.lifetime=750;
        spikeGroup.add(obs);
    }
}
