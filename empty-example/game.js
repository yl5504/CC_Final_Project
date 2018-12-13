function Game(sc){
	this.score = sc;

	this.reset = function(){
		this.gameplaying = false;
		this.score.reset()
		difficulty = 0;
		healthvalue = 50;
		viruses = []
		currentvirusnumber = 0;
	}

	this.start = function(){
		this.gameplaying = true;
	}

	this.isplaying = function(){
		return this.gameplaying;
	}

	this.startpage = function(){
		background(0)
		textFont("Georgia");
		fill(255);
		noStroke()
		textAlign(CENTER);
		textSize(70);
		text("Kill The Viruses !", width/2, height/2);
		textSize(36)
		text("Last score: "+ score.score, width/2,height/2+50)
	}

	this.stopifhbiszero = function(){
		if(healthbar < 0) this.gameplaying = false;

	}
}