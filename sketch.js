//var PLAY =0;
//var END = 0;
//var SERVE = 1;
var gameState ;


var path,boy,cash,diamonds,jwellery,sword,end;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;

var restart,restartImg;

var start,startImg;

var Bk,Bk_Img;

var coin,OverSound,startSound,sSound;


function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadImage("gameOver.jpg");
  restartImg = loadImage("restart.png");
  startImg = loadImage("start.png");
  Bk_Img = loadImage("startBk.jpg");
  coinSound = loadSound("coin.wav");
  OverSound = loadSound("GameOver_Sound.wav");
  startSound = loadSound("start_Sound.wav")
  sSound = loadSound("s_Sound.wav");
}

function setup(){
  
  createCanvas(400,400);
// Moving background
path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = (4 + 3*treasureCollection/5);


//creating boy running
boy = createSprite(70,330,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
  boy.setCollider("rectangle",0,0,1000,1000,90);
  boy.debug = false;
  
  bk = createSprite(200,200,20,20);
  bk.addImage("startBk.jpg",Bk_Img);
  bk.scale = 0.9;
  
  start = createSprite(200,240,20,20);
  start.addImage("start.png",startImg);
  start.scale = 0.1;
  start.visible = false;
  
  end = createSprite(200,200,100,20);
    end.addImage("gameOver.jpg",endImg);
    end.scale=1;
  
  restart = createSprite(200,330,20,20); 
  restart.addImage("restart.png",restartImg);
  restart.scale = 0.4;
  
  
  
    
  
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

  gameState = 1;
}

function draw() {

  background(0);
  
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  if(gameState === 1){
    //start.visible = true;
    bk.visible = true;
    restart.visible = false;
    end.visible = false;
    if (mousePressedOver(bk)){
      gameState = 2; 
      sSound.play();
    }
    
     
    }
    
  if(gameState === 2 ){
    start.visible=false;
    bk.visible = false;
    restart.visible=false;
    end.visible = false;
    boy.x = World.mouseX;
    
    if(path.y > 400 ){
    path.y = height/2;
  }
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection = treasureCollection + 1;
      coinSound.play();
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
       treasureCollection = treasureCollection + 1;
      coinSound.play();
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
       treasureCollection = treasureCollection + 1;
      coinSound.play();
      
    }else{
      if(swordGroup.isTouching(boy)) {
        swordGroup.destroyEach();
        OverSound.play();
        
        
    
         gameState = 3;
        
    boy.changeAnimation("gameOver.png",endImg);
        swordGroup.setVelocityYEach(0);
        swordGroup.setLifetimeEach(-1);
    }
  }
    
  }
   if(gameState === 3){
    restart.visible=true;
    end.visible = true;
    cashG.destroyEach();
    diamondsG.destroyEach();
    jwelleryG.destroyEach();
    
    path.velocityY=0;
    boy.velocityY = 0;
    
    
    
    boy.visible = false;
  }
  if(mousePressedOver(restart)){
    reset();
    startSound.play();
  }
  //code to reset the background
  

  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,250,30);

}

function createCash() {
  if (World.frameCount % 100 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = (3 + 3*treasureCollection/5);
  cash.setCollider("circle",0,0,150);  
  cash.debug = false;  
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 200 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.15;
  diamonds.velocityY = (3 + 3*treasureCollection/5);
  diamonds.setCollider("circle",0,0,150);
  diamonds.debug = false;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 300 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.setCollider("circle",0,0,100);
  jwellery.debug = false;
  jwellery.scale=0.1;
  jwellery.velocityY = (3 + 3*treasureCollection/5);
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.4;
  sword.velocityY = (5 + 3*treasureCollection/5);
  sword.setCollider("circle",0,0,50);
  sword.debug = false;
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}
function reset(){
  treasureCollection=0;
  end.visible = false;
  boy.visible = true
  path.velocityY = (4 + 3*treasureCollection/5); 
  gameState = 1;
}