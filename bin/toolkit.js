//This is a simple set of functions to help debug javascript programs, made by Brandon T. Wood 2016.


// When given an object will print out all of it's variables on one line, comma separated. Useful for seeing if objects behave as they should.
function inspect(obj){
    var keys = [];
    for(var key in obj){
        keys.push(key);
    }
    //return keys;
    console.log(""+keys.toString());
}

// When given a string, will print that string if DEBUG variable is true, useful for printing lots of things during development but sillencing them on release without commenting out lots of code.
var DEBUG = true;
function debug(str){
    if(DEBUG){
        console.log(">>"+str);
    }
}
