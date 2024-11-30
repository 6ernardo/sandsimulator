/*
  TODO
  - Add color to the sand
  - Add cursor
  - Add rock, water?
  - Erase and clear?
  - Parametrize sand size or grid size
*/

let grid = [];
let hue = 200;

function setup() {
  createCanvas(400, 400); 

  //creates 40x40 array of 0s
  grid = new Array(40*40).fill(0);

  colorMode(HSB, 360, 255, 255);
}

function draw() {
  background(0);

  update();

  strokeWeight(0);

  if( mouseX > 0 || mouseX < 400 || mouseY > 0 || mouseY < 400){
    fill(hue, 255, 255);
    square(mouseX, mouseY, 10);
  }

  for(let i=0; i<grid.length; i++){
    if(grid[i] > 0){
      fill(grid[i], 150, 200);
      square(i%40*10, Math.floor(i/40)*10, 10);
    }
  }
}

function mouseDragged(){
  if( mouseX <= 0 || mouseX >= 400 || mouseY <= 0 || mouseY >= 400) return;
  grid[Math.floor(mouseY/10) * 40 + Math.floor(mouseX/10)] = hue;

  hue = hue >= 360 ? 1 : hue+1;
}

function mousePressed(){
  if( mouseX <= 0 || mouseX >= 400 || mouseY <= 0 || mouseY >= 400) return;
  grid[Math.floor(mouseY/10) * 40 + Math.floor(mouseX/10)] = hue;

  hue = hue >= 360 ? 1 : hue+1;

  console.log(grid);
}

function update(){
  for(let i=grid.length-1; i>=0; i--){
    gravity(i);
  }
}


function gravity(i){
  if(grid[i] == 0) return;

  // todo - guarantee that i+39 and i+41 are actually adjacent and not on different sides of the canvas

  if(grid[i+40] == 0){
    grid[i+40] = grid[i];
    grid[i] = 0;
  } else if(grid[i+39] == 0 && Math.floor((i+40)/40) == Math.floor((i+39)/40) ){
    grid[i+39] = grid[i];
    grid[i] = 0;
  } else if(grid[i+41] == 0 && Math.floor((i+40)/40) == Math.floor((i+41)/40)){
    grid[i+41] = grid[i];
    grid[i] = 0;
  }
}

