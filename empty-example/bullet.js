function Bullet(x,y,v){
	this.pos = createVector(x,y)
	this.x = this.pos.x;
	this.y = this.pos.y;
	this.v = v
	this.diameter = 10;
	this.alive = true;

	//Used bullet (shoot and hit)
	this.die = function(){
		this.alive = false
	}

	//move the bullet
	this.move = function(){
		this.pos.add(v)
		this.x = this.pos.x;
		this.y = this.pos.y;
	}

	//display
	this.display = function() {
		strokeWeight(4);
		stroke(255,204,100);
		fill(255);
		//bullet will change direction due to mouse
		var mouse = createVector(mouseX, mouseY)
		var theta = this.v.heading()
		push()
		translate(this.pos.x,this.pos.y)
		rotate(theta+PI/2)
		beginShape();
		vertex(- 6, 12);
		vertex(- 6, -2);
		vertex(0, - 8);
		vertex(6, -2);
		vertex(6, 12)
		endShape()
		pop()
		this.x = this.pos.x;
		this.y = this.pos.y;
	};

	//if intersect with other element
	this.intersects = function(other){
		var d = dist(this.x, this.y, other.x, other.y);
		if (d < this.diameter/2 + other.diameter/2){
			return true
		}
		else{
			return false		
		}
	}
}
