// Code'mon 0.0.3
// Created by Brandon T. Wood on May 1st, 2016
var stage;
var renderer;
var blocks=[];
var menu;
var running = false;

//Calls all the initial methods needed to setup and play the game.
function init(){

	// Setup Pixi.js stage
	console.log("Attempting Setup");
	stage = new PIXI.Stage(0x66FF99);
	var canvas = document.getElementById("game");
	var renderer = PIXI.autoDetectRenderer(400, 300,{view: canvas});
	document.body.appendChild(renderer.view);

	// Time to setup!
	//Here is the menu that will hold the blocks.
	menu = new PIXI.Graphics();
	menu.beginFill(0xFFFF00);
	menu.drawRect(0, 0, 80, 300);
	stage.addChild(menu);

	// This bar is the interpreter, as it moves from top to bottom it's collisions will trigger events on the game.
        var bar = new PIXI.Graphics();
        bar.beginFill(0xFF0000);
        bar.drawRect(80, 0, 320, 15);

	// Circle button that launches the interpreter.
	var run_button = new PIXI.Graphics();
        run_button.beginFill(0xFFF000);
	run_button.drawCircle(240, 7, 15);
        run_button.buttonMode = true;
        run_button.interactive = true;
        run_button.click = run_button.tap = function(data){
		run_interpreter();	
	}
	bar.addChild(run_button);
        stage.addChild(bar);

	//var block_button = new new_block();
	blocks.push(new block());
	stage.addChild(blocks[blocks.length-1].block);

	console.log("Setup successful!\nGame Start!");
	update();
	// Main game loop!
	function update(){
		// Loop that moves the interpreter.
		if(running){
			if(bar.position.y > 290){
				// We have hit bottom, reset and turn off running.
				running = false;
				bar.position.y = 0;
			}else{
				// Increment y position of bar.
				//console.log("Running");
				bar.position.y += 2;
				for(var i=0; i<blocks.length; i++){
					//console.log("Checking..");
					if(hitTest(blocks[i].block, bar)){
						//console.log("HIT");
						console.log("La");
//----------------------------------------------Placeholder La Text heere
					}
				}
			}
		}
		renderer.render(stage);
		requestAnimFrame(update);
	}
}


//Basically will just drag a red bar graphic down from top to bottom and when it collides with a block it will 
function run_interpreter(){
	running = true;
}


// Clears all blocks from board, but not the buttons.
function clear_board(){
	blocks.reverse();
	var length = blocks.length-1;
	for(var i=length; i>0; i--){
		stage.removeChild(blocks[i].block);
		blocks.pop();
	}
}


function hitTest(a, b){
	if(Math.abs(a.position.y - b.position.y) < 1){
	//if(a.position.x <= (b.position.x + b.width)){
		//if(a.position.y <= (b.position.y + b.height)){
			return true;
		//}
	}
	return false;
}


// This creates the basic block that the game will use to create all other blocks later on by changing their graphics and adding special affects.
function block(){
        this.block = new PIXI.Graphics();
        this.block.beginFill(0xFFFFFF);
        this.block.drawRect(10, 10, 60, 20);
        this.block.buttonMode = true;
        this.block.interactive = true;
	// Basicaly is button is true to spawn a new button when the old block is moved.
	var isButton = true;
	this.block.mousedown = this.block.touchstart = function(data){
		// store a refference to the data
		// The reason for this is because of multitouch
		// we want to track the movement of this particular touch
		if(isButton){
			// This is how new blocks are spawned, new block becomes the button and old block gets dragged on to play screen.
			isButton = false;
			//console.log("Printing new button underneath! " + blocks + " length:"+blocks.length);
			blocks.push(new block());
			stage.addChild(blocks[blocks.length-1].block);
		}
		this.data = data;
		this.alpha = 0.9;
		this.dragging = true;
	};	
	// set the events for when the mouse is released or a touch is released
	this.block.mouseup = this.block.mouseupoutside = this.block.touchend = this.block.touchendoutside = function(data){
		this.alpha = 1
		this.dragging = false;
		// set the interaction data to null
		this.data = null;
		// Gotta check if dragged back to menu.
		//if(){
		if(this.position.x < (80 + menu.position.x)){
			if(this.position.y < (menu.position.y + 300)){
				stage.removeChild(this);
			}
		}
	};
	// set the callbacks for when the mouse or a touch moves
	this.block.mousemove = this.block.touchmove = function(data){
		if(this.dragging){
			// need to get parent coords..
			var newPosition = this.data.getLocalPosition(this.parent);
			this.position.x = newPosition.x;
			this.position.y = newPosition.y;
		}
	};
}


