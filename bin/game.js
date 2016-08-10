// Code'mon 0.9.3
// Created by Brandon T. Wood on May 1st, 2016

//	GLOBAL VARIABLES
//var stage;
//var renderer;
var level_list = {length:20};
level_list[0]=new Level("","","cow farmer tractor if loop input");
level_list[1]=new Level("","cow cow","cow farmer loop if");
level_list[2]=new Level("","","");
level_list[3]=new Level("","","");
level_list[4]=new Level("","","");
level_list[5]=new Level("","","");
level_list[6]="";
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


function Level(win_condition, input_queue, block_list){
	this.win_condition = win_condition;
	this.input_queue = input_queue;
	this.block_list = block_list;
	// queue not implemented yet.
	//this.input_queue; 
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
        stage = new PIXI.Stage(0x66FF99);
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

        //var options = new PIXI.Graphics();
        holder = new button("Options", 0xff9900, 125, 230, 90, 30);
        holder.graphic.buttonMode = true;
        holder.graphic.interactive = true;
        holder.graphic.click = function(mouseData){
                console.log("Options");
		menu_change("options");
        }
        buttons.push(holder);

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
	for(var i=1; i<(level_list.length/4); i++){

	        holder = new button("level_"+i, 0xff9900, (120*i), 60, 90, 30);
        	holder.graphic.buttonMode = true;
        	holder.graphic.interactive = true;
        	holder.graphic.click = function(mouseData){

                	console.log("Loading " + this.text + "...");
// PLACE HOLDER HARD CODED LEVEL VALUE.
                	menu_change("level_1");
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

	//Here is the sidebar that will hold the blocks.
	var side = new PIXI.Graphics();
	side.beginFill(0xFFFF00);
	side.drawRect(0, 0, 80, 300);
	stage.addChild(side);

	// simple back button will take one to previous menu.
        var holder = new button("Back", 0xff9900, 20, 260, 90, 30);
        holder.graphic.buttonMode = true;
        holder.graphic.interactive = true;
        holder.graphic.click = function(mouseData){
                console.log("Level select");
                menu_change("level select");
        }

        // pushing to buttons will place on a global array for cleaning up between states.  
        buttons.push(holder);

	// This bar is the interpreter, as it moves from top to bottom it's collisions will trigger events on the game.
        bar = new PIXI.Graphics();
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

	// place queue in here.
	var input_queue = current_level.input_queue;
	input_queue = input_queue.split(" ");
	populate_queue(input_queue);
        input.container.position.x = 550;
        input.container.position.y = 220;

	output = new graphical_queue();
	output.container.position.x = 480;
        output.container.position.y = 10;  
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
	console.log("Buttons cleared!");

	// next we remove any blocks on board.
        while(true){
                if(blocks.length > 0){
                        stage.removeChild(blocks.pop().graphic);
                }else{
                        break;
                }
        }
        console.log("Blocks cleared!");

	// then clean up misc
	if(menu == "main" || menu == "level select"){
		stage.removeChild(title);
	}else if(menu.includes("level_")){
		stage.removeChild(bar);
		stage.removeChild(side);
	}

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
	this.container.beginFill(0x9b59b6); // Purple 
	this.container.drawRect(0, 0, 430, 70); // drawRect(x, y, width, height)
	this.container.endFill();
	stage.addChild(this.container);

	this.push = function(sprite){
		this.queue.push(sprite);
		sprite.position.x = 80 * (this.queue.length-1);
		this.container.addChild(sprite);
		//this.container.sprite.position.x *= (this.queue.length-1);
		console.log("added a sprite!");
	}

        this.pop = function(){

		this.container.removeChild(this.queue[0]);
		//Must loop through and move all characters to the left to fill in space. coelece.. coalese.. 
		var holder;
		for(var i=0; i<this.queue.length; i++){
			this.queue[i].position.x -= 80;
		}
		console.log("removed a sprite!");
		return this.queue.pop();
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
                var tex = PIXI.Texture.fromImage("res/cow.png");
		holder = new PIXI.Sprite(tex);
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

		}else{
			// Increment y position of bar.
			//console.log("Running");
			bar.position.y += 1;
			for(var i=0; i<blocks.length; i++){
				//console.log("Checking..");
				if( hitTest(blocks[i].block, bar) ){
					console.log(" "+blocks[i].name);
					if(blocks[i].name == "input"){
						output.push(input.pop());
					}
				}
			}
		}
	}
	renderer.render(stage);
	requestAnimFrame(update);
}
