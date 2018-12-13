function Score(){
	this.score = 0;

	this.display = function(){
		noStroke();
		fill(255);
		textAlign(RIGHT);
		textFont("Georgia");
		textSize(30);
		text("Score  " + this.score, windowWidth - 100, 80);
	}

	this.addscore = function(){
		this.score++;
	}

	this.deductscore = function(){
		this.score--;
	}

	this.reset = function(){
		this.score = 0;
	}
}