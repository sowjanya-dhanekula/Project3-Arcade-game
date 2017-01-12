frontend-nanodegree-arcade-game
===============================

<!--Students should use this [rubric](https://review.udacity.com/#!/projects/2696458597/rubric) for self-checking their submission. Make sure the functions you write are **object-oriented** - either class functions (like Player and Enemy) or class prototype functions such as Enemy.prototype.checkCollisions, and that the keyword 'this' is used appropriately within your class and class prototype functions to refer to the object the function is called upon. Also be sure that the **readme.md** file is updated with your instructions on both how to 1. Run and 2. Play your arcade game.

For detailed instructions on how to get started, check out this [guide](https://docs.google.com/document/d/1v01aScPjSWCCWQLIpFqvg3-vXLH2e8_SZQKC8jNO0Dc/pub?embedded=true).!-->


										Making Sprite-based Frogger Game with Canvas
										--------------------------------------------


The canvas element was introduced with HTML5 and provides an API for rendering on the web. The API is simple, but if you've never done graphics work before it might take some getting used to.

Using canvas is simple: just create a <canvas> tag, create rendering context from it in javascript, and update context.

In this article, we're going to create a 2d game with canvas; a real game with sprites, animations, collision detection etc.

I wrapped this up into a frontend-nanodegree-arcade-game-master project that you can use to quickly get started. I recommend checking out the source and running it locally by opening index.html. 

Creating the Canvas
-------------------

Let's start by digging into the code. Most of the game code is in app.js in the js directory.

The very first thing we do is create the canvas tag in engine.js, set the width and height, and add it to the body tag. We do this dynamically to keep everything in javascript, but you could add a canvas tag in the HTML file and use something like getElementById to get it too.

 Create the canvas
	var canvas = doc.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    canvas.width = 505;
    canvas.height = 606;
    doc.body.appendChild(canvas);

The canvas element has a getContext method which is what you use to get the rendering context. From here on, we will be using the ctx variable to render everything.

Creating Enemies and Player objects and the updating, rendering, handling inputs and capturing collions between "player and Enemies", "player and Gems", "player and Stars", "player and Hearts"  are done in app.js.

Instructions how to play Frogger Game
-------------------------------------

1. Player can move left, right, up, down with in the canvas boundaries.
2. Player should reach water by escaping from enemy collisions.
3. Player earn more points by collecting stars, Gems and lives by collecting hearts.
4. If player's score reaches 100 then level1 gets completed, if score greater than 200 the player wins the game.
5. If the lives are zero the game was lost and we can try again.
6. Player secures 5 points for each star and 10 points for each Gem.
7. Play button on the main page allows the player to start a new game.
8. Instructions button on the main page display the rules to paly the game.
9. Exit button on the main page allows the player to quit the game in the middle.



