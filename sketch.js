/*
  TODO
  - Add rock, water?
  - Increase sand spawn area
*/

let grid = [];
let hue = 200;

let width = 800;
let height = 600;
let sand_size = 5; // width and height must be divisible by sand_size

let w_pixels = width / sand_size;

let erase = false;

function setup() {

  createCanvas(width, height);

  grid = new Array(width/sand_size*height/sand_size).fill(0);

  colorMode(HSB, 360, 255, 255);
}

function draw() {
  background(0);

  update();

  if(mouseIsPressed && !erase) createSand();
  if(mouseIsPressed && erase) eraseSand();

  strokeWeight(0);

  for(let i=0; i<grid.length; i++){
    if(grid[i] > 0){
      fill(grid[i], 125, 175);
      square(i%w_pixels*sand_size, Math.floor(i/w_pixels)*sand_size, sand_size);
    }
  }

  if( mouseX > 0 || mouseX < width || mouseY > 0 || mouseY < height){
    fill(hue, erase ? 0 : 255, 255);
    square(mouseX, mouseY, sand_size);
  }
}

function keyPressed(){
  if (key === 'e') {
    erase = !erase;
  }

  if (key === 'c'){
    clearSand();
  }
}

function createSand(){
  if( mouseX <= 0 || mouseX >= width || mouseY <= 0 || mouseY >= height || //checks boundaries
    grid[Math.floor(mouseY/sand_size) * w_pixels + Math.floor(mouseX/sand_size)] != 0) return; //checks if sand already exists there

  grid[Math.floor(mouseY/sand_size) * w_pixels + Math.floor(mouseX/sand_size)] = hue;

  hue = hue >= 360 ? 1 : hue+1;
}

function eraseSand(){
  if( mouseX <= 0 || mouseX >= width || mouseY <= 0 || mouseY >= height) return;
  
  grid[Math.floor(mouseY/sand_size) * w_pixels + Math.floor(mouseX/sand_size)] = 0;
}

function clearSand(){
  grid.fill(0);
}

function update(){
  for(let i=grid.length-1; i>=0; i--){
    gravity(i);
  }
}


function gravity(i){
  if(grid[i] == 0) return;

  let bellow = i + w_pixels;
  let bellow_left = bellow - 1;
  let bellow_right = bellow + 1;

  if(grid[bellow] == 0){
    grid[bellow] = grid[i];
    grid[i] = 0;
  } else if(grid[bellow_left] == 0 && Math.floor((bellow)/w_pixels) == Math.floor((bellow_left)/w_pixels) ){
    grid[bellow_left] = grid[i];
    grid[i] = 0;
  } else if(grid[bellow_right] == 0 && Math.floor((bellow)/w_pixels) == Math.floor((bellow_right)/w_pixels)){
    grid[bellow_right] = grid[i];
    grid[i] = 0;
  }
}

