// Code'mon 0.9.3
// Created by Brandon T. Wood on May 1st, 2016

//	GLOBAL VARIABLES
//var stage;
//var renderer;
var level_list = {length:20};
// win condition, input queue, buttons avaliable, description.
level_list[0]=new Level("","","loop take skip if","\n\nHave fun playing with avaliable blocks.");
level_list[1]=new Level("cow","cow","take", "\nWelcome to Codemon, you can \ndrag blocks from the left menu to \nthe right play area and click the \nyellow button the run your program. \nThe 'take' block will move the \nhighlighted objects to your inventory. \n\nCollect the cow to complete this \nlevel.");
level_list[2]=new Level("cow cow cow","cow cow cow cow","take", "\nMultiple blocks can be placed \ndown, blocks are read as the red \nbar moves down across the screen. \nSimular to a book the game \nwill read blocks top to bottom. \n\nCollect three cows to complete this \nlevel.");
level_list[3]=new Level("cow cow cow","cow farmer cow cow","take skip", "\nNow we introduce the 'skip' \nblock which will skip over the \ncurrently selected object so you \ncan take only the objects you want.\n\nAgain collect three cows, but avoid \ncollecting the farmer.");
level_list[4]=new Level("tractor farmer cow","farmer tractor farmer farmer cow","take skip", "\nCollect a tractor, a farmer and \na cow to complete this level.");
level_list[5]=new Level("tractor tractor tractor", "tractor tracto tractor","take loop", "\nIn this level we introduce the \n'Loop' block. You can attach a \nblock to the loop block and run \nthe program to see that it will take \nnormally. But if you increase the \nnumber on the loop by clicking the \nplus arrow next to the number and \nrun the program it will repeat the \naction of the attached block equal to \nthe value inside the loop. \n\nTry collecting three tractors using a \nloop and a take block together.");
level_list[6]="";
//
level_list[7]="";
level_list[8]="";
level_list[9]="";
level_list[10]="";
level_list[11]="";
level_list[12]="";
level_list[13]="";
level_list[14]="";
level_list[15]="";
level_list[16]="";
level_list[17]="";
level_list[18]="";
level_list[19]="";
level_list[20]="";

// Arrays that exist to iterate for cleanup between levels.
var blocks=[];
var buttons=[];
var graphics=[];
// Holds the name of current menu, used to know what menu you are currently, we start on main menu.
var menu = "main";
var title, bar;
var current_level;
//var game;
//var monster_object;
var input, output;
//var running = false;
//var id_counter = 1;
var stage, canvas, renderer;


function Level(win_condition, input_queue, block_list, description){
	this.win_condition = win_condition.split(" ");
	this.input_queue = input_queue;
	this.block_list = block_list;
	this.description = description;
	// queue not implemented yet.	//this.input_queue; 
}


function button(text, color, x, y, width, height){
        this.graphic = new PIXI.Graphics();
        this.graphic.beginFill(color);
        this.graphic.drawRect(x, y, width, height);
        stage.addChild(this.graphic);   
        this.text = new PIXI.Text(''+text,{font : '14px Arial', fill : 0xff1010, align : 'center'});
	this.text.position.x = x + 8;
	this.text.position.y = y + 10;
	this.graphic.addChild(this.text);
	//console.log("Button created!");
}


//Calls all the initial methods needed to setup and play the game. Also sets up PIXI graphic library.
function run(){

        console.log("Attempting Setup");
        //stage = new PIXI.Stage(0x66FF99)
	stage = new PIXI.Stage(0xFFF);
        canvas = document.getElementById("game");
        renderer = PIXI.autoDetectRenderer(800, 300,{view: canvas});
        document.body.appendChild(renderer.view);

	main_menu();
	console.log("Game Start!");
	update();
}


function main_menu(){

        var holder = new button("Level Select", 0xff9900, 125, 110, 90, 30);
        holder.graphic.buttonMode = true;
        holder.graphic.interactive = true;
        holder.graphic.click = function(mouseData){
                console.log("Level Select");
                menu_change("level select");
        }
	// pushing to buttons will place on a global array for cleaning up between states.  
        buttons.push(holder);

	holder = new button("Free Play", 0xff9900, 125, 170, 90, 30);
	holder.graphic.buttonMode = true;
        holder.graphic.interactive = true;
	holder.graphic.click = function(mouseData){
                console.log("Free Play");
		menu_change("free play");
        }
	buttons.push(holder);

        /*var options = new PIXI.Graphics();
        holder = new button("Options", 0xff9900, 125, 230, 90, 30);
        holder.graphic.buttonMode = true;
        holder.graphic.interactive = true;
        holder.graphic.click = function(mouseData){
                console.log("Options");
		menu_change("options");
        }
        buttons.push(holder);*/

        title = new PIXI.Text('Codemon',{font : '50px Arial', fill : 0xff1010, align : 'center'});
        title.position.x = 70;
        title.position.y = 20; 
        stage.addChild(title);
	//update();
}


function level_select(){

	title = new PIXI.Text('Please select your level!',{font : '30px Arial', fill : 0xff1010, align : 'center'});
        title.position.x = 70;
        title.position.y = 10; 
        stage.addChild(title);
	console.log("level select loaded!");

        var holder = new button("Back", 0xff9900, 20, 260, 90, 30);
        holder.graphic.buttonMode = true;
        holder.graphic.interactive = true;
        holder.graphic.click = function(mouseData){
                console.log("Main Menu");
                menu_change("main");
        }
        // pushing to buttons will place on a global array for cleaning up between states.  
        buttons.push(holder);

	//loop prints out all possible levels to attempt.
	//var holder;
	for(var i=1; i<6; i++){//(level_list.length/4); i++){

	        holder = new button("level_"+i, 0xff9900, (120*i), 60, 90, 30);
        	holder.graphic.buttonMode = true;
        	holder.graphic.interactive = true;
		holder.graphic.id = i;
        	holder.graphic.click = function(mouseData){

                	console.log("Loading Level" + this.id + "...");
                	menu_change("level_"+this.id);
        	}
	        buttons.push(holder);
		//menu_change("level_"+i):
		//console.log(i);
	}
}


// simple functions
function free_play(){
	load_level(0);
}


function options(){
	console.log("No options avaliable yet.");
}


// function needed to print out the blocks and setup the challenge for each level.
function load_level(level_num){

		// This sets up the background for the code blocks.
        tex = PIXI.Texture.fromImage("res/code_bg.png");
        var code_bg = new PIXI.Sprite(tex);
        code_bg.scale.x = 0.65;
        code_bg.scale.y = 0.65;
        code_bg.position.x = 80;
        code_bg.position.y = -20;
        stage.addChild(code_bg);   
        graphics.push(code_bg);

		var popup;
		//Here is the sidebar that will hold the blocks.
		var side = new PIXI.Graphics();
		side.beginFill(0xFFFF00);
		side.drawRect(0, 0, 80, 300);
		stage.addChild(side);
		graphics.push(side);

		// simple back button will take one to previous menu.
        var back_button = new button("Back", 0xff9900, 50, 260, 60, 30);
        back_button.graphic.buttonMode = true;
        back_button.graphic.interactive = true;
        back_button.graphic.click = function(mouseData){
                console.log("Level select");
                menu_change("level select");
        }
        // pushing to buttons will place on a global array for cleaning up between states.  
        buttons.push(back_button);

	// help button with popup quest menu.
        var help_button = new button("Help", 0xff9900, 130, 260, 60, 30);
        help_button.graphic.buttonMode = true;
        help_button.graphic.interactive = true;
        help_button.graphic.click = function(mouseData){
                console.log("Help menu opening...");
                if(popup.visible == true){
                        popup.visible = false;
                }else{ 
                        popup.visible = true;
                }

        }
        // pushing to buttons will place on a global array for cleaning up between states.  
        buttons.push(help_button);

        // reset board
        var reset = new button("Reset", 0xff9900, 210, 260, 60, 30);
		reset.graphic.value = level_num;
        reset.graphic.buttonMode = true;
        reset.graphic.interactive = true;
        reset.graphic.click = function(mouseData){
                console.log("Reseting...");
                menu_change("level_"+this.value);
                //menu_change("level_"+this.value);
        }
        // pushing to buttons will place on a global array for cleaning up between states.  
        buttons.push(reset);

        // reset board                       
        var clear = new button("Clear", 0xff9900, 290, 260, 60, 30);
        clear.graphic.buttonMode = true;
        clear.graphic.interactive = true;
        clear.graphic.click = function(mouseData){
                console.log("Clearing blocks..");
		clear_board();
        }
        // pushing to buttons will place on a global array for cleaning up between states.  
        buttons.push(clear);
		// This bar is the interpreter, as it moves from top to bottom it's collisions will trigger events on the game.
        bar = new PIXI.Graphics();
        bar.beginFill(0xFF0000);
        bar.drawRect(82, 0, 320, 15);
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
		graphics.push(bar);

		// Setting up blocks that need to be in this level.
		current_level = level_list[level_num];

		var block_list = current_level.block_list;
		var block_list = block_list.split(' ');
		for(var i=0; i<block_list.length; i++){
			//will print blocks via their object right here.
			console.log("	loading " + block_list[i] + " block.");
			// need to initiate the blocks.
			holder = new block(block_list[i]);
			holder.block.position.x = 5;
	                holder.block.position.y = 10+(40*i);
			stage.addChild(holder.block);
			//blocks.push(new block());
			blocks.push(holder);
			//stage.addChild(holder.graphic);
		}
        //var block_button = new new_block();
        //blocks.push(new block());
        //stage.addChild(blocks[blocks.length-1].block);


        var tex = PIXI.Texture.fromImage("res/background_codemon.png");
        var game_bg = new PIXI.Sprite(tex);
        game_bg.scale.x = 0.5;
        game_bg.scale.y = 0.5;
        game_bg.position.x = 460;
        game_bg.position.y = -58;
        stage.addChild(game_bg);   
        graphics.push(game_bg);

		// Beam that extends from bottom of spaceship
        tex = PIXI.Texture.fromImage("res/tractor_beam.png");
        var beam = new PIXI.Sprite(tex);
        beam.scale.x = 0.5;
        beam.scale.y = 0.5;
        beam.position.x = 612;
        beam.position.y = 110;
        stage.addChild(beam);   
        graphics.push(beam);

		//alien spaceship.
		tex = PIXI.Texture.fromImage("res/ship.png");
        ship = new PIXI.Sprite(tex);
        ship.scale.x = 0.25;
	    ship.scale.y = 0.25;
		ship.position.x = 600;
		ship.position.y = 60;
		stage.addChild(ship);	
		graphics.push(ship);

		// place queue in here.
		var input_queue = current_level.input_queue;
		input_queue = input_queue.split(" ");
		populate_queue(input_queue);
        input.container.position.x = 630;
        input.container.position.y = 220;
		input.target.visible = true;
		//buttons.push(input);
		//populate_queue(input_queue);
		output = new graphical_queue();
		output.container.position.x = 480;
	    output.container.position.y = 10;
	    output.container.alpha = 0.6;
		//buttons.push(output);  

        //..Popup quest box, togglable.
        popup = new PIXI.Graphics();
        popup.beginFill(0x33cc33);
        popup.drawRect(250, 30, 200, 200);
        stage.addChild(popup);
        //graphics.push(popup);
        var text = new PIXI.Text(current_level.description,{font : '12px Arial', fill : 0xff1010, align : 'justified'});
        text.position.x = 255;
        text.position.y = 35; 
        popup.addChild(text);
        var okay_button = new PIXI.Text("X",{font : '15px Arial', fill : 0xff0000, align : 'justified'});
        //var okay_button = new PIXI.Graphics();
        //okay_button.beginFill(0xff3300);
        //okay_button.drawCircle(440, 40, 10);
        okay_button.buttonMode = true;
        okay_button.interactive = true;
		okay_button.position.x = 435;
		okay_button.position.y = 38;
        okay_button.click = okay_button.tap = function(data){
             //run_interpreter();
			if(this.parent.visible == true){
				this.parent.visible = false;
			}else{
				this.parent.visible = true;
			}
        }
        popup.addChild(okay_button);
		graphics.push(popup);
}

//Param is the name of the menu being changed in. Can either be main, level+num, level select, options or free play.
function menu_change(new_menu){

	//First we clear old board. A) remove buttons, B) remove blocks, C) remove misc level thingys.
	while(true){
		if(buttons.length > 0){
			// This also removes the text child of graphic.
			stage.removeChild(buttons.pop().graphic);
		}else{
			break;
		}
	}
	debug(""+buttons.toString());
	console.log("Buttons cleared!");

	// next we remove any blocks on board.
        while(true){
                if(blocks.length > 0){
                        stage.removeChild(blocks.pop().block);
                }else{
                        break;
                }
        }
	debug(""+blocks.toString());
        console.log("Blocks cleared!");

	//cearing graphics
        while(true){
                if(graphics.length > 0){
                        stage.removeChild(graphics.pop());
                }else{
                        break;
                }
        }
	debug(""+graphics.toString());
        console.log("Graphics cleared!");

	// then clean up misc will code this away later.
	if(menu == "main" || menu == "level select"){

		stage.removeChild(title);
	}//else if(menu.includes("level_")){

	//	stage.removeChild(bar);
	//}

	//Second we place boiler plate based on new menu, if it's a game level we need monsters, if main menu need title, etc. 
	if(new_menu.includes("level_")){
		// nothing right now.
		var holder = new_menu.split("_");
		load_level(parseInt(holder[1]));
	}else{
		//We know it's an options menu of some sort. different for each one.
		if(new_menu == "main"){
			main_menu();			
		}else if(new_menu == "level select"){
			level_select();
		}else if(new_menu == "free play"){
			free_play();
		}else if(new_menu == "options"){
			options();
		}
	}

	//Lastly we set the current level to the new level and unpause.
	menu = new_menu;
}

/*
function that stores the creatures you can abduct and the ones you have already abducted.
internally it is a map with integers paired to either null sprites or 
*/
function graphical_queue(){

	this.queue = [];
	this.container= new PIXI.Graphics();
	//this.container.beginFill(0x9b59b6); // Purple 
	this.container.drawRect(0, 0, 430, 70); // drawRect(x, y, width, height)
	//this.container.endFill();
	stage.addChild(this.container);
    this.target = new PIXI.Graphics();
    this.target.beginFill(0xffff66);
    this.target.drawCircle(35, 30, 40);
	this.target.visible = false;
	this.container.addChild(this.target);

	graphics.push(this.container);

	this.push = function(sprite){
		if(sprite != null){
			this.queue.push(sprite);
			sprite.position.x = 80 * (this.queue.length-1);
			this.container.addChild(sprite);
			//this.container.sprite.position.x *= (this.queue.length-1);
			//console.log("added a sprite!");
			debug("Added Sprite!");
		}else{
			debug("..sprite was null.");
			//console.log("...sprite was null.");
		}
	}

        this.pop = function(){

		if(this.queue.length > 0){
			this.container.removeChild(this.queue[0]);
			//Must loop through and move all characters to the left to fill in space. coelece.. coalese.. 
			var holder;
			if(this.queue.length > 0){
				for(var i=0; i<this.queue.length; i++){
					this.queue[i].position.x -= 80;
				}
			}
			console.log("removed a sprite!");
			//return this.queue.pop();
			return this.queue.shift();
		}else{
			console.log("..queue empty.");
		}
        }
}

function populate_queue(input_queue){

	input = new graphical_queue;
	//input.container.position.x = 150;
        //input.container.position.y = 200;
	var i, holder;
	for(i in input_queue){
		//console.log("pushing " + i);
		//var tex = PIXI.Texture.fromImage("res/" + i + ".png");
		var tex;
		if(input_queue[i] == "cow"){

                	tex = PIXI.Texture.fromImage("res/cow_color.png");
	                holder = new PIXI.Sprite(tex);
			holder.name = "cow";
		}else if(input_queue[i] == "farmer"){

			tex = PIXI.Texture.fromImage("res/farmer_color.png");
                        holder = new PIXI.Sprite(tex);
                        holder.name = "farmer";
		}else{

			tex = PIXI.Texture.fromImage("res/tractor_color.png");
                        holder = new PIXI.Sprite(tex);
                        holder.name = "tractor";
		}
		//holder = new PIXI.Sprite(tex);
		holder.scale.x = 0.15;
                holder.scale.y = 0.15;
		input.push(holder);
	}
	
}

function update(){

	// Loop that moves the interpreter.
	if(running){
		if(bar.position.y > 290){
			// We have hit bottom, reset and turn off running.
			running = false;
			bar.position.y = 0;
			//check for win conditions.
			var i, did_win = true;
			if((output.queue.length>0) && (current_level.win_condition.length == output.queue.length)){
				for(i in current_level.win_condition){
					if(current_level.win_condition[i] != output.queue[i].name){
						console.log(""+output.queue[i].name +" "+ current_level.win_condition[i]);
						did_win = false;
					}
				}
				if(did_win){
					//print text
					console.log("YOU DID IT!");
					var textOptions = {
    					//font: &amp;amp;amp;quot;bold 64px Roboto&amp;amp;amp;quot;, // Set style, size and font
    					fill: '#3498db', // Set fill color to blue
    					align: 'center', // Center align the text, since it's multiline
    					stroke: '#34495e', // Set stroke color to a dark blue-gray color
    					strokeThickness: 2, // Set stroke thickness to 20
    					lineJoin: 'round' // Set the lineJoin to round instead of 'miter'
					}
				    var win_banner = new PIXI.Text('You did it!', textOptions);//{font : '25px Arial', fill : 0xff1010, align : 'justified'});
        			win_banner.position.x = 580;
        			win_banner.position.y = 150; 
        			stage.addChild(win_banner);
					graphics.push(win_banner);
				}else{
					console.log("YOU LOSE");
				}
			}
		}else{
			// Increment y position of bar.
			//console.log("Running");
			bar.position.y += 1;
			for(var i=0; i<blocks.length; i++){
				//console.log("Checking..");
				if( hitTest(blocks[i].block, bar) ){
					console.log(" "+blocks[i].name);
					if(blocks[i].name == "take"){
						output.push(input.pop());
					}else if(blocks[i].name == "skip"){
                                                var temp = input.pop();
                                        }else if(blocks[i].name == "loop"){
						
						if(blocks[i].ids_of_children != null){

							//console.log("We got a loop here.");
							var iterate = blocks[i].value;
							//Need to find the child block.
							var child = null;
							for(j in blocks){

								//console.log("  "+blocks[j].block.id + " == " + blocks[i].ids_of_children);
								if(blocks[j].block.id == blocks[i].ids_of_children[0]){ // hardcoded, will allow for more blocks later.
									child = blocks[j];
								}
							}
							if(child != null){
								//Next need to complete child block for the number of iterations given.
								for(var k=0; k <= iterate; k++){

									if(child.name == "take"){
										console.log("  take:"+k);
										output.push(input.pop());
									}else if(child.name == "skip"){
										var temp = input.pop();
									}else{
										console.log("	What is this block?");
									}
								}
								//Finally we move the red bar past the loop so that it does not try to run the loop or it's child again.
								bar.position.y = (child.block.position.y + child.block.height);
							}else{
								console.log("child was null, no child exists.");
							}
						}

					}
				}
			}
		}
	}
	renderer.render(stage);
	requestAnimFrame(update);
}
