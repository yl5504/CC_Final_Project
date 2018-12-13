function Virus(x, y, diameter, speed, col, jiggle) {
	this.x = x;
	this.y = y;
	this.pos = createVector(x,y)
	this.diameter = diameter;
	this.speed = speed;
	this.col = col;
	this.alive = true;
	this.jiggle = jiggle;
	this.rot
	this.mouse = createVector()
	this.xStart;
	this.yStart;


	//virus being hit
	this.die = function() {
		this.alive = false;
	}

	//display the virus
	this.display = function() {
		this.xStart = createVector(random(500),random(500))
		this.yStart = createVector(random(500),random(500))
		push()
		translate(this.x, this.y)
		rotate(this.rot)
		//fluffy look
		noStroke();
		for(var rad = this.diameter/2; rad >=0; rad-=5){
			fill(this.col);
			beginShape();
			for(var r = -PI/4*5; r < PI/4; r += PI/32){
				var x0 = rad * cos(r);
				var y0 = rad * sin(r);
				var xNoise = map(noise(x0+this.xStart.x,y0+this.xStart.y),0,1,-30,30)
				var yNoise = map(noise(x0+this.yStart.x,y0+this.yStart.y),0,1,-30,30)
				var x = x0+xNoise;
				var y = y0+yNoise;
				vertex(x,y);
			}
			endShape()
		}

		//eyes blinking
		fill(217,81,90);
		noStroke()
		if(frameCount % 10 > 3){
			ellipse(-this.diameter/4, -this.diameter/5, this.diameter/10,this.diameter/6)
			ellipse(this.diameter/4, -this.diameter/5, this.diameter/10,this.diameter/6)
		}else if (frameCount % 10 > 2){
			ellipse(-this.diameter/4, -this.diameter/5, this.diameter/12,this.diameter/8)
			ellipse(this.diameter/4, -this.diameter/5, this.diameter/12,this.diameter/8)		
		}
		else {
			ellipse(-this.diameter/4, -this.diameter/5, this.diameter/14,this.diameter/10)
			ellipse(this.diameter/4, -this.diameter/5, this.diameter/14,this.diameter/10)			
		}
		pop()
	};

	// move the virus toward mouse, jiggling
	this.move = function() {
    	var disX = mouseX - this.x;
    	var disY = mouseY - this.y;
    	this.x += disX* this.speed;
    	this.y += disY* this.speed;
		this.diameter += random(-this.jiggle, this.jiggle);

		this.pos = createVector(this.x,this.y)
    	this.mouse.x = mouseX;
    	this.mouse.y = mouseY;
    	this.vel = p5.Vector.sub(this.mouse, this.pos)
    	this.rot = this.vel.heading() +PI/2
	};

	// if intersect with other element
	this.intersects = function(other) {
		d = dist(this.x, this.y, other.pos.x, other.pos.y);
		r1 = this.diameter/2;
		r2 = other.diameter/2;
		if (d < r1+r2){
			return true
		} else{
			return false
		}
	}
}

