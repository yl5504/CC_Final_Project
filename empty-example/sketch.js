var bullets = []
var viruses = []
var currentvirusnumber = 0;
var difficulty = 0;
var healthvalue = 50;
var game
var healthbar

var noiseX;
var noiseY;
var noiseF;
var f = 0;
var colorState;

var shootingsound;
var hurtsound;

function preload(){
	shootingsound = loadSound('shooting.wav');
	hurtsound = loadSound('hurt.wav')
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	player = new Player();
	score = new Score();
	game = new Game(score)
	game.reset()

	noFill()
	noiseX = random(100);
    noiseY = random(100);
    noiseF = random(100);
    colorState = 0;

    shootingsound.setVolume(0.1);
	hurtsound.setVolume(0.1)
}

function draw() {
	//display background pattern
	background(0);
	bgpattern();

	//game on
	if(game.isplaying()){
		//Display viruses
		if (currentvirusnumber ==0){
			difficulty += 1
			showvirus();
		}
		for (var i = viruses.length - 1; i >=0; i--) {
			viruses[i].move();
			viruses[i].display();
		}

		//Display health bar
		stroke(255)
		strokeWeight(2)
		noFill()
		healthbar = map(healthvalue,0,100,0,150)
		rect(windowWidth - 400,110,300,24)
		fill(255)
		rect(windowWidth - 400,110,healthbar,24)


		//ShootandHit
		for (var i = bullets.length - 1; i >=0; i--) {
			for (var j = viruses.length - 1; j >=0; j--){
				if(viruses[j].intersects(bullets[i])) {
					viruses[j].die();
					bullets[i].die();
					currentvirusnumber --;
					score.addscore()
					healthvalue = healthvalue + 1
				}
			}
		}


		//if player hits virus, health value reduce, player changes color
		player.hitting=false
		for(var i = viruses.length-1; i >= 0; i--) {
			if(viruses[i].intersects(player)){
				healthvalue = healthvalue - 1
				player.hitvirus()
				hurtsound.play()
			}
		}
		

		//RemoveHitVirus
		for (var i = viruses.length - 1; i >=0; i--) {
			if(!viruses[i].alive){
				viruses.splice(i,1)
			}
		}

		//RemoveUsedBullet
		for (var i = bullets.length - 1; i >=0; i--) {
			if(!bullets[i].alive)
				bullets.splice(i,1)
		}

		//Display score
		score.display();

		//Display player
		player.move();
		player.display();

		

		//Display bullets
		for (var i = bullets.length-1; i>=0; i--){
			bullets[i].display();
			bullets[i].move()
		}

		//stop the game if health bar is zero
		game.stopifhbiszero()
	
	}else{
		game.startpage();
		difficulty = 0;
		healthvalue = 50;
		viruses = [];
	}
}

function mouseClicked(){
	if(game.gameplaying){
		player.shoot();
		shootingsound.play();
	}
	else{
		game.reset();
		game.start();
	}
}



function showvirus(){
	for(var i = 0; i<12; i++){
		col = color(random(255), random(255), random(255), 100);
		speed = 0.005 * difficulty;
		diameter = random(80, 100);
		x = random(0,width); y = random(0,height)
		jiggle = random(0.5, 1.5);
		viruses.push(new Virus(x, y, diameter, speed, col, jiggle));	
		currentvirusnumber++
	}
}





