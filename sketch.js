//Create variables here
var  dog, happyDog, database, foodS, foodStock;
var image1,image2;
var feedPet,addFood;
var fedTime,lastFed;
var foodObj;
function preload()
{
  //load images here
  image1=loadImage("images/dogImg.png");
  image2=loadImage("images/dogImg1.png");
  
}

function setup() {
  createCanvas(1200, 1200);
  dog=createSprite(800,200,150,150);
  dog.addImage(image1);
  dog.scale=0.15;
  
  database=firebase.database();
  foodStock=database.ref("food");
  foodStock.on("value",readStock);

  foodObj=new Food();

  feed=createButton("feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedFood);

  add=createButton("add food");
  add.position(800,95);
  add.mousePressed(addFood);

  
}


function draw() {  
  background(46, 139, 87);
  foodObj.display();
  
 fedTime=database.ref("feedTime");
 fedTime.on("value",function(data){
   lastFed=data.val();
 })

  
  drawSprites();
  //add styles here


 
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 350,30);
   }else if(lastFed==0){
     text("Last Feed : 12 AM",350,30);
   }else{
     text("Last Feed : "+ lastFed + " AM", 350,30);
   }
 
  

}
function addFood(){
  
  foodS++;
  database.ref('/').update({
    food:foodS
  })
 
}

function feedFood(){
  dog.addImage(image2);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    food:foodObj.getFoodStock(),
    feedTime:hour()})
}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}
