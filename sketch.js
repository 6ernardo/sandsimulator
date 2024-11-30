/*
  TODO
  - Add rock, water?
  - Improve clear
*/

let grid = [];
let hue = 200;

let width = 800;
let height = 600;
let sand_size = 10; // width and height must be divisible by sand_size

let w_pixels = width / sand_size;

let clear = false;

function setup() {

  createCanvas(width, height);

  grid = new Array(width/sand_size*height/sand_size).fill(0);

  colorMode(HSB, 360, 255, 255);
}



function draw() {
  background(0);

  update();

  if(mouseIsPressed && !clear) createSand();
  if(mouseIsPressed && clear) clearSand();

  strokeWeight(0);

  if( mouseX > 0 || mouseX < width || mouseY > 0 || mouseY < height){
    fill(hue, 255, 255);
    square(mouseX, mouseY, sand_size);
  }

  for(let i=0; i<grid.length; i++){
    if(grid[i] > 0){
      fill(grid[i], 125, 175);
      square(i%w_pixels*sand_size, Math.floor(i/w_pixels)*sand_size, sand_size);
    }
  }
}

function keyPressed(){
  if (key === 'c') {
    clear = !clear;
  }

  if (key === 'e'){
    eraseSand();
  }
}

function createSand(){
  if( mouseX <= 0 || mouseX >= width || mouseY <= 0 || mouseY >= height) return;
  grid[Math.floor(mouseY/sand_size) * w_pixels + Math.floor(mouseX/sand_size)] = hue;

  hue = hue >= 360 ? 1 : hue+1;
}

function clearSand(){
  if( mouseX <= 0 || mouseX >= width || mouseY <= 0 || mouseY >= height) return;
  grid[Math.floor(mouseY/sand_size) * w_pixels + Math.floor(mouseX/sand_size)] = 0;
}

function eraseSand(){
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

