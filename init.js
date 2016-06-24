// Code'mon 0.0.3
// Created by Brandon T. Wood on May 1st, 2016
var stage;
var renderer;
var blocks=[];
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
	var menu = new PIXI.Graphics();
	menu.beginFill(0xFFFF00);
	menu.drawRect(0, 0, 80, 300);
	stage.addChild(menu);

	// This bar is the interpreter, as it moves from top to bottom it's collisions will trigger events on the game.
        var bar = new PIXI.Graphics();
        bar.beginFill(0xFF0000);
        bar.drawRect(80, 0, 320, 15);
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
					if(hitTest(bar, blocks[i].block) ){
						console.log("HIT");
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


// Checks for collisions between graphics.
function hitTest(a, b) {

  /* If it has a child we need to change some values for hitboxes.
  if(a.children.length != 0){

    if(a.position.x + a.getChildAt(0).position.x < (b.position.x + b.width) && a.position.x + a.getChildAt(0).position.x > b.position.x){
      if(a.position.y + a.getChildAt(0).position.y < (b.position.y + b.height) && a.position.y > b.position.y + a.getChildAt(0).position.y){
        return true;
      }
    }
    //return false;
  }else if(b.children.length != 0){

    if(a.position.x < b.getChildAt(0).position.x + (b.position.x + b.width) && a.position.x > b.position.x + b.getChildAt(0).position.x){
      if(a.position.y < (b.position.y + b.height) + b.getChildAt(0).position.y && a.position.y > b.position.y + b.getChildAt(0).position.y){
        return true;
      }
    }
    //return false;
*/
  // Else treat it normally.
  //}else{
    if(a.position.x < (b.position.x + b.width) && a.position.x > b.position.x){
	console.log("Made it 1");
      if(a.position.y < (b.position.y + b.height) && a.position.y > b.position.y){
        return true;
      }
    }
    return false;
  //}
  //return false;
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
			console.log("Printing new button underneath! " + blocks + " length:"+blocks.length);
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


