// Code'mon 0.0.3
// Created by Brandon T. Wood on May 1st, 2016
/*var stage;
var renderer;
var blocks=[];
var menu;
var game;
var monster_object;*/
var running = false;
var id_counter = 1;

//Calls all the initial methods needed to setup and play the game.
/*function init(){

	// Setup Pixi.js stage
	console.log("Attempting Setup");
	stage = new PIXI.Stage(0x66FF99);
	var canvas = document.getElementById("game");
	var renderer = PIXI.autoDetectRenderer(800, 300,{view: canvas});
	document.body.appendChild(renderer.view);

	// Time to setup!
	//Here is where the game will be placed.
	game = new PIXI.Graphics();
        game.beginFill(0x33ccff);
        game.drawRect(400, 0, 500, 300);
        stage.addChild(game);	

        var challenge = new PIXI.Text('Make Oba sing La three times',{font : '28px Arial', fill : 0xff1010, align : 'center'});
        challenge.position.x = 410;
        challenge.position.y = 20; 
        game.addChild(challenge);

	//The monster object in the game.
	monster_object = new monster();
	monster_object.place();

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
	//function update(){
		// Loop that moves the interpreter.
		if(running){
			if(bar.position.y > 290){
				// We have hit bottom, reset and turn off running.
				running = false;
				bar.position.y = 0;
			}else{
				// Increment y position of bar.
				//console.log("Running");
				bar.position.y += 1;
				for(var i=0; i<blocks.length; i++){
					//console.log("Checking..");
					if(hitTest(blocks[i].block, bar)){
						monster_object.action();
					}
				}
			}
		}
		renderer.render(stage);
		requestAnimFrame(update);
	}
}*/

//Generic monster object.
/*function monster(){

	var sprite_open = new PIXI.Sprite.fromImage('res/codemonster_2.png');
        //sprite_open.scale.x = 0.2;
        //sprite_open.scale.y = 0.2;
	var sprite_closed = new PIXI.Sprite.fromImage('res/codemonster_1.png');


	var sprite = sprite_closed;

	this.place = function(){
	        //var sprite = sprite_closed;
        	sprite.position.x = 500;
        	sprite.position.y = 75;
        	sprite.scale.x = 0.2;
        	sprite.scale.y = 0.2;
        	game.addChild(sprite);
	};

        this.action = function() {
                console.log("La");
		game.removeChild(sprite);
		sprite = sprite_open;
		this.place();
		setTimeout(function(){ game.removeChild(sprite); sprite = sprite_closed; monster_object.place(); }, 380);
		//console.log("END");
        };
}*/


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
    /*if(a.position.x < (b.position.x + b.width) && a.position.x > b.position.x){
      if(a.position.y < (b.position.y + b.height) && a.position.y > b.position.y){
        return true;
      }
    }*/
	/*if(Math.abs(a.position.y - b.position.y) < 1){
		if(a.position.x > 80){
		//	return true;
		//if( (a.position.x >= b.position.x) && (a.position.x <= (b.position.x + b.width))){
		//if(a.position.x <= (b.position.x + b.width)){
		//if(a.position.y <= (b.position.y + b.height)){
			return true;
		}
	}*/

	if(a.position.x > b.position.x){
		if((a.position.y == b.position.y)){
			if(a.position.x > 80){
				console.log(" how it looks"+ a.position.x + "==" + b.position.x);
				return true;
			}
		}
	}

	/*console.log("a positions	" + a.position.x + ", "+ a.position.y);
        //console.log(" "+a.position.x + " " + a.width + " "+ b.position.x +" "+ b.width);
	if(a.position.x <= (b.position.x + b.height) ){

                console.log("made it 1 "+a.position.x + " "+ b.position.x +" "+ b.width);
		if(((a.position.x + a.position.height) >= b.position.x)){

			console.log("made it 2 "+a.position.x + " " + a.width + " "+ b.position.x +" "+ b.width);
			if((a.position.y < (b.position.y + b.width))){
 
				console.log("made it 3 "+a.position.x + " " + a.width + " "+ b.position.x +" "+ b.width);
				if(((a.position.y + a.position.width) >= b.position.y) ){
					return true;
				}
			}
		}
	}*/
	return false;
}


// This creates the basic block that the game will use to create all other blocks later on by changing their graphics and adding special affects.
function block(name){

	// Need ot give them id for removal purposes, may make array in hash map later.
	var id = id_counter;
	//this.block.id = id_counter;
	//id_counter++;
	this.name = name;
	var name = name;
	id_counter++;
        this.text = new PIXI.Text(this.name,{font : '30px Arial', fill : 0xff1010, align : 'center'});
	this.block;
	//this.block.id = id_counter;
	//id_counter++;
        // This bar is the interpreter, as it moves from top to bottom it's collisions will trigger events on the game.

	if(name == "if"){
                // Generate pixi sprite.
                this.block = new PIXI.Sprite.fromImage('res/if_statement.png');     
                this.block.scale.x = this.block.scale.y = 0.4;
                this.block.buttonMode = true;
                this.block.interactive = true;

                this.text.text = name+"            equals";
                this.text.position.x = 100;
                this.text.position.y = 25; 

	}else if(name == "loop"){

		// This holds the amount of times a loop should repeat.
		var value = this.value = 1;

		this.ids_of_children = [];

                // Generate pixi sprite.
                this.block = new PIXI.Sprite.fromImage('res/loop.png');     
                this.block.scale.x = this.block.scale.y = 0.4;
                this.block.buttonMode = true;
                this.block.interactive = true;

                this.text.position.x = 100;
                this.text.position.y = 30; 

                var parentX = this.parentX = -10;
                var parentY = this.parentY = 0;
                var childX = this.childX = 72;
                var childY = this.childY = 8;

		var plus = new PIXI.Text("X",{font : '40px Arial', fill : 0xff0000, align : 'justified'});
        	//var okay_button = new PIXI.Graphics();
        	//okay_button.beginFill(0xff3300);
        	//okay_button.drawCircle(440, 40, 10);
        	plus.buttonMode = true;
        	plus.interactive = true;
                plus.rotation = 18;
        	plus.position.x = 218;
        	plus.position.y = 44;

        	plus.click = plus.tap = function(data){
			console.log(value);
			value++;
			minus.setText(value + "    -");
		}
		this.block.addChild(plus);


                var minus = new PIXI.Text(value+"    -",{font : '45px Arial', fill : 0xff0000, align : 'justified'});
                minus.buttonMode = true;
                minus.interactive = true;
                minus.position.x = 280;
                minus.position.y = 24;

                minus.click = minus.tap = function(data){
                        console.log(value);
			value--;
			minus.setText(value+"    -");
                }
                this.block.addChild(minus);


	}else{
		// It's a generic variable then.
		this.block = new PIXI.Sprite.fromImage('res/act_variable.png');	
		this.block.scale.x = this.block.scale.y = 0.4;
	        this.block.buttonMode = true;
	        this.block.interactive = true;

		// Whatever the name of the block is.
		this.text.position.x = 80;
		this.text.position.y = 15; 

	        var parentX = this.parentX = 5;
	        var parentY = this.parentY = 0;
	        var childX = this.childX = 0;
	        var childY = this.childY = 21;
	}

        this.block.id = id_counter;
        id_counter++;
        this.block.addChild(this.text);
	//blocks[blocks.length] = this.block;

	var isButton = true;
	this.block.isButton = true;	
	// Basicaly is button is true to spawn a new button when the old block is moved.
	this.block.mousedown = this.block.touchstart = function(data){
		// store a refference to the data
		// The reason for this is because of multitouch
		// we want to track the movement of this particular touch
		if(isButton){
			// This is how new blocks are spawned, new block becomes the button and old block gets dragged on to play screen.
			isButton = false;
			this.isButton = false;
			//console.log("Printing new button underneath! " + blocks + " length:"+blocks.length);
			blocks.push(new block(name));
			blocks[blocks.length-1].block.position.x = this.position.x;
                        blocks[blocks.length-1].block.position.y = this.position.y;

			stage.addChild(blocks[blocks.length-1].block);
		}else{

			//now need to cleanup any connection to parrent when picked up.
			for(i in blocks){
				//console.log("  "+blocks[i]);
				//If we have a loop block we need to check all to see if this blocks ID is in his child ids list.
				if(blocks[i].name == "loop"){
					for(j in blocks[i].ids_of_children){
						//console.log("  " + blocks[i].ids_of_children[j] );
						if(this.id == blocks[i].ids_of_children[j]){
							console.log("Removing child " + blocks[j].block.id);
							//blocks[i].ids_of_children.slice(j,1);
							// Hardcoded, will fix later too..
							blocks[i].ids_of_children = [];
							//console.log("  " + blocks[i].ids_of_children);
						}
					}
				}
			}
		}

		this.parent.removeChild(this);
		stage.addChild(this);
		this.data = data;
		this.alpha = 0.9;
		this.dragging = true;
	};


	// set the events for when the mouse is released or a touch is released
	this.block.mouseup = this.block.mouseupoutside = this.block.touchend = this.block.touchendoutside = function(data){

		this.alpha = 1;
		this.dragging = false;	// set the interaction data to null
		this.data = null;
		// Gotta check if dragged back to menu. If so delete block.
		/*if(this.position.x < (80 + menu.position.x) || this.position.x > (85+300)){*/
		if( (this.position.x < 40) || (this.position.x > 370)){
			//stage.removeChild(this);
			//Now must find block in the array and remove it, a tricky thing in javascript.
			for(var i=0; i<blocks.length; i++){
				//console.log("Found this!" + blocks[i].id + " = " +id);
				if((blocks[i].id == id) && (blocks[i].block.isButton == false)){
					//console.log("Found");
					blocks.splice(i, 1);
					stage.removeChild(this);
				}
			}
		}

		//Snap to other buttons drop. iterate through blocks.
		for(var i=0; i<blocks.length; i++){
			//if this blocks parrent node is within 10px of childnode of any block.
			//console.log("placed")
                        //console.log(" : " + (parentX + this.position.x) + ", " + (blocks[i].childX + blocks[i].block.position.x));
			if(id != blocks[i].id){
				
	                        if(Math.abs((parentX + this.position.x) - (blocks[i].childX + blocks[i].block.position.x) ) < 20){ 
					//console.log("CLOSE : " (this.parentX + this.position.x) + ", " + (blocks[i].childX + blocks[i].block.position.x));
					//console.log("CLOSE");
					if(Math.abs((parentY + this.position.y) - (blocks[i].block.position.y + blocks[i].childY)) < 30){
						//console.log("SNAPPED to: " + blocks[i].name + "   ids: " + id + ", " + blocks[i].id);
						//this.position.y = (blocks[i].block.position.y + blocks[i].childY);
       	                                	//this.position.x = (blocks[i].block.position.x + blocks[i].childX);
						//blocks[i].block.addChild(this);
						//stage.removeChild(this);
						//this.scale.x = this.scale.y = 1;
						//Loop is a special case because being one of it's children changes how you are read in.
						if(blocks[i].name == "loop"){
							console.log("added child!" + this.id);
							blocks[i].ids_of_children.push(this.id);
						}

						this.position.x = blocks[i].block.position.x + (blocks[i].childX);
						this.position.y = blocks[i].block.position.y + (blocks[i].childY);
						console.log("snapped pos: " + this.position.x +", "+ this.position.y);
						//blocks[i].block.addChild(this);
						//Alter placement on release.
					}
				}
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
			//hit.position.x = newPosition.x;
			//hit.position.y = newPosition.y;
			//console.log("NEW POSITION " + this.position.x + ", "+this.position.y);
		}
	};
}

