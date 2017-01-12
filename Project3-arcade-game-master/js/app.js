/** Whole-script strict mode syntax */
"use strict";

/** Defining block height & width for later use */
var blockHeight = 83;
var blockWidth = 101;
var hasReachedWater = false;
var rightEdge = 505;
var bottomEdge = 404;

var nextLevel = false;           // if we can change level, this is true to enable 'enter' key
var color = 0;


/** Enemies our player must avoid */
var Enemy = function() {
    /** Variables applied to each of our instances go here,
     * we've provided one for you to get started */

    /** start the enemy out at 0, and randomly at one of three columns */
    this.x = 0;
    this.y = (Math.floor(Math.random() * 3) + 1) * blockHeight;
    this.speed = Math.floor(Math.random() * 300) + blockHeight;
    /** The image/sprite for our enemies, this uses
     * a helper we've provided to easily load images */
    this.sprite = 'images/enemy-bug.png';
};


/** Update the enemy's position, required method for game
 * Parameter: dt, a time delta between ticks */

Enemy.prototype.update = function(dt) {
    /** You should multiply any movement by the dt parameter
     * which will ensure the game runs at the same speed for
     * all computers. */
    this.x += this.speed * dt;
    if (this.x > (blockWidth * 5)) {
        this.x = -100;
    }
};

/** Draw the enemy on the screen, required method for game */
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {

// Player position will always be in the middle 
    //this.x = 2 * blockWidth;
    //this.y = 5 * blockHeight;
    this.x = 202;
    this.y = 404;
    /** Use this image to represent Player character */
    this.sprite = 'images/char-pink-girl.png';
    //score of a player
    this.score = 0;
    //number of lives a player has
    this.lives = 3;
    this.gems = 0;
};

//Re position the player once he reaches the water.
Player.prototype.resetPlayer = function() {
    //player.x = 2 * blockWidth;
    //player.y = 5 * blockHeight;
    this.x = 202;
    this.y = 404;    
};


/* When rendering, the player references its x and y coordinates in order to
render to the proper location. */
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

 
/* Now instantiate your objects.
   Place all enemy objects in an array called allEnemies*/
   var allEnemies = [];

for (var i = 0; i <= 3; i++) {
    var pushEnemy = new Enemy();
    allEnemies.push(pushEnemy);
}


/* Place the Player object in a new variable called player */
var player = new Player();


/* Update player movements, track score and collisions */
Player.prototype.update = function() {
    this.drawText();
    this.increaseScore();
    this.enemyCollision();  
       
       if(this.score > 100 && !nextLevel) {
            
        $( "#dialog" ).dialog();
        nextLevel=true;
        this.resetPlayer();
    }
        if(this.score >= 200) {
            $('#game-won').show();
            $('.won').click(function() {
                $('#game-won').hide();
                document.location.reload();
            });
    }     

};

/* Draw the score and the number of 
   lives of a player on the canvas*/
Player.prototype.drawText = function() {
    ctx.clearRect(0, 0, 120, 20);
    ctx.clearRect(250, 0, 100, 20);
    ctx.clearRect(400, 0, 100, 20);
    ctx.font = "20px Verdana";
    ctx.fillStyle = "black";
    ctx.fillText("Score: " + this.score, 8, 20);
    ctx.fillText("Lives: " + this.lives, 240, 20);
    ctx.fillText("Gems: " + this.gems, 415, 20);
};

/* Calculate score of the player */
Player.prototype.increaseScore = function() {
    if(hasReachedWater){        
        this.score++;        
        setTimeout(function() {player.resetPlayer();},200);
        //setTimeout(this.resetPlayer, 200);
        hasReachedWater = false;
    }
};


/* Player and enemy collision detection. */
Player.prototype.enemyCollision = function() {
    var bug = checkCollisions(allEnemies);

    /* If collision detected, player life gets decreased.
       Game over if all lives lost.*/
    if(bug) {
        if(this.lives !== 0) {
            this.lives--;
            this.resetPlayer();
        }
        if(this.lives === 0) {
            this.lives =0;
            $('#game-over').show();
            $('.lost').click(function() {
                $('#game-over').hide();
                document.location.reload();
            });
        }
    }
};

//Method for Collision detection between entities
//Used the axis-aligned collision detection logic
var checkCollisions = function(collision) {
    for(var i = 0; i < collision.length; i++) {
        if(player.x < collision[i].x + 50 &&
            player.x + 50 > collision[i].x &&
            player.y < collision[i].y + 40 &&
            player.y + 40 > collision[i].y) {
                return collision[i];
        }
    }
};



//Update player movements based on keyboard inputs
//Player can move up, down, left and right and
//limit movement within the canvas
Player.prototype.handleInput = function(key){
    switch(key) {
        case 'left':
        if(this.x - blockWidth < 0){
            this.x = 0;
        }
        else {
            this.x -= blockWidth;
        }
        break;
        case 'right':
        if(this.x + blockWidth >= rightEdge){
            this.x = 404;
        }
        else {
            this.x += blockWidth;
        }
        break;
        case 'up':
        if(this.y - blockHeight < 0){
            this.y = 0;
            hasReachedWater = true;
        }
        else {
            this.y -= blockHeight;
        }
        break;
        case 'down':
        if(this.y + blockHeight >= bottomEdge){
            this.y = 404;
        }
        else {
            this.y += blockHeight;
        }
        break;        
    }
};


/******Star - objects that player should collect to win.********/
var Star = function(){ 
    this.sprite = 'images/Star.png';
    this.x = (Math.floor(Math.random() * (5 - 1)) + 1) * 101;
    this.y = (Math.floor(Math.random() * (4 - 1)) + 1) * 83;
};

/******Draw the star sprite on the screen*********/
Star.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*****Update stars when collected by player********/
Star.prototype.update = function(){
    this.starCollision();
    if(allStars.length===0){
        createStars();
    }    
};

/*******Check for Collision between star and player.*********/
Star.prototype.starCollision = function(){
    var target = checkCollisions(allStars);
    var index = allStars.indexOf(target);
    
    if(index > -1){
        allStars.splice(index, 1);
        player.score += 5;
    }     
};


/*******instantiatee Star objects and stored in an array.*********/
var allStars = [];
function createStars(){
    for(var i = 0; i < 4; i++){
    var star = new Star();
    allStars.push(star);
 }
};

createStars();



/******Gem - objects that player should collect to win.********/

var Gem = function(){     
    this.x = (Math.floor(Math.random() * (4 - 1)) + 1) * 101;
    this.y = (Math.floor(Math.random() * (3 - 1)) + 1) * 83;
    this.sprite = colorOfGem[color];    
};

var colorOfGem = ["images/Gem Blue.png","images/Gem Green.png","images/Gem Orange.png"];
    
/******Draw the Gem sprite on the screen*********/
Gem.prototype.render = function(){
           
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);           
   
};


/*****Update gems when collected by player********/
Gem.prototype.update = function(){
    this.gemCollision();
    if(allGems.length===0){
        createGems();
    }
    
};

/*******Instantiate Gem objects and stored in an array.*********/
/* Place the Gem object in a new variable called gem */
function createGems(){
    if(color>2) {
        color = 0;
    }
    var gem = new Gem();
    gem.sprite = colorOfGem[color++];
    allGems.push(gem);
 }

/* Now instantiate your objects.
   Place all Gem objects in an array called allGems*/
var allGems = [];

createGems();


/*******Check for Collision between Gem and player.*********/
Gem.prototype.gemCollision = function(){
    var target = checkCollisions(allGems);
    var index = allGems.indexOf(target);

    if(index > -1){
        allGems.splice(index, 1);

        player.score += 10;        
        player.gems += 1;
    }    
};

/******Heart - objects that player should collect to get lives.********/
var Heart = function(){     
    this.x = (Math.floor(Math.random() * (3 - 1)) + 1) * 101;
    this.y = (Math.floor(Math.random() * (2 - 1)) + 1) * 83;
    this.sprite = 'images/Heart.png';    
};

    
/******Draw the Heart sprite on the screen*********/
Heart.prototype.render = function(){           
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);   
};


/* Place the Heart object in a new variable called heart */
var heart = new Heart();


/*****Update hearts when collected by player********/
Heart.prototype.update = function(){
    this.heartCollision();    
};


/* Now instantiate your objects.
   Place all Heart objects in an array called allGems*/
var allHearts = [];



/*******Check for Collision between Heart and player.*********/
Heart.prototype.heartCollision = function(){
    var target = checkCollisions(allHearts);
    var index = allHearts.indexOf(target);

    if(index > -1){
        allHearts.splice(index, 1);                
        player.lives += 1;
    }  
};


/*******Instantiate Gem objects and stored in an array.*********/

    allHearts.push(heart);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.

document.addEventListener('keyup', function(e){
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
