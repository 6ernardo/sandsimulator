let grid = [];

let width = 800;
let height = 600;
let sand_size = 5; // width and height must be divisible by sand_size
let w_pixels = width / sand_size; // amount of particles (pixels) in width

let erase_flag = false; // toggled if erase tool is on
let sand_flag = true; // toggled if sand tool is on, otherwise wood tool (or erase)

let hue = 200; // hue starting point. Gives diff colors to sand
let change_hue = false; // toggles change of hue as particles spawn

function setup() {

	createCanvas(width, height);

	grid = new Array(width / sand_size * height / sand_size).fill(0);

	colorMode(HSB, 360, 255, 255);
}

function draw() {
	background(0);

	update();

	if (mouseIsPressed && !erase_flag && sand_flag) createSand();
	if (mouseIsPressed && !erase_flag && !sand_flag) createWood();
	if (mouseIsPressed && erase_flag) eraseTool();

	strokeWeight(0);

	for (let i = 0; i < grid.length; i++) {
		if (grid[i] > 0) {
			fill(grid[i], 125, 175);
			square(i % w_pixels * sand_size, Math.floor(i / w_pixels) * sand_size, sand_size);
		}
		else if (grid[i] < 0) {
			fill(26, 255, Math.abs(grid[i]));
			square(i % w_pixels * sand_size, Math.floor(i / w_pixels) * sand_size, sand_size);
		}
	}

	if (mouseX > 0 || mouseX < width || mouseY > 0 || mouseY < height) {
		if (sand_flag) fill(hue, 255, 255);
		else if (erase_flag) fill(255, 0, 255);
		else fill(26, 255, 100);

		square(mouseX, mouseY, sand_size);
	}
}

function createSand() {
	if (mouseX <= 0 || mouseX >= width || mouseY <= 0 || mouseY >= height || //checks boundaries
		grid[Math.floor(mouseY / sand_size) * w_pixels + Math.floor(mouseX / sand_size)] != 0) return; //checks if sand already exists there

	grid[Math.floor(mouseY / sand_size) * w_pixels + Math.floor(mouseX / sand_size)] = hue; // center pixel, always draws

	let random = Array.from({ length: 4 }, () => Math.random());

	if (random[0] > 0.6) grid[Math.floor(mouseY / sand_size) * w_pixels + Math.floor(mouseX / sand_size) + 1] = hue; //right
	if (random[1] > 0.6) grid[Math.floor(mouseY / sand_size) * w_pixels + Math.floor(mouseX / sand_size) - 1] = hue; //left
	if (random[2] > 0.6) grid[Math.floor(mouseY / sand_size) * w_pixels + Math.floor(mouseX / sand_size) - w_pixels] = hue; // above
	if (random[3] > 0.6) grid[Math.floor(mouseY / sand_size) * w_pixels + Math.floor(mouseX / sand_size) + w_pixels] = hue; // bellow

	// this way change of hue should be slower
	hue = (hue >= 360 && change_hue) ? 1 : hue + 1;
	change_hue = !change_hue;
}

function createWood() {
	if (mouseX <= 0 || mouseX >= width || mouseY <= 0 || mouseY >= height || //checks boundaries
		grid[Math.floor(mouseY / sand_size) * w_pixels + Math.floor(mouseX / sand_size)] != 0) return; //checks if sand already exists there

	let random = 50 + Math.random() * 35;

	grid[Math.floor(mouseY / sand_size) * w_pixels + Math.floor(mouseX / sand_size)] = -random; // center pixel, always draws

	grid[Math.floor(mouseY / sand_size) * w_pixels + Math.floor(mouseX / sand_size) + 1] = -random; //right
	grid[Math.floor(mouseY / sand_size) * w_pixels + Math.floor(mouseX / sand_size) - 1] = -random; //left
	grid[Math.floor(mouseY / sand_size) * w_pixels + Math.floor(mouseX / sand_size) - w_pixels] = -random; // above
	grid[Math.floor(mouseY / sand_size) * w_pixels + Math.floor(mouseX / sand_size) + w_pixels] = -random; // bellow
}

function eraseTool() {
	if (mouseX <= 0 || mouseX >= width || mouseY <= 0 || mouseY >= height) return;

	//todo - increase area
	grid[Math.floor(mouseY / sand_size) * w_pixels + Math.floor(mouseX / sand_size)] = 0;
	grid[Math.floor(mouseY / sand_size) * w_pixels + Math.floor(mouseX / sand_size) + 1] = 0; //right
	grid[Math.floor(mouseY / sand_size) * w_pixels + Math.floor(mouseX / sand_size) - 1] = 0; //left
	grid[Math.floor(mouseY / sand_size) * w_pixels + Math.floor(mouseX / sand_size) - w_pixels] = 0; // above
	grid[Math.floor(mouseY / sand_size) * w_pixels + Math.floor(mouseX / sand_size) + w_pixels] = 0; // bellow
}

function clearAll() {
	grid.fill(0);
}

function update() {
	for (let i = grid.length - 1; i >= 0; i--) {
		gravity(i);
	}
}

function gravity(i) {
	//so that void and wood are not affected
	if (grid[i] <= 0) return;

	let bellow = i + w_pixels;
	let bellow_left = bellow - 1;
	let bellow_right = bellow + 1;

	if (grid[bellow] == 0) {
		grid[bellow] = grid[i];
		grid[i] = 0;
	} else if (grid[bellow_left] == 0 && Math.floor((bellow) / w_pixels) == Math.floor((bellow_left) / w_pixels)) {
		grid[bellow_left] = grid[i];
		grid[i] = 0;
	} else if (grid[bellow_right] == 0 && Math.floor((bellow) / w_pixels) == Math.floor((bellow_right) / w_pixels)) {
		grid[bellow_right] = grid[i];
		grid[i] = 0;
	}
}

