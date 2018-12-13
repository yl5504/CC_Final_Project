function Player() {
	this.x = mouseX;
	this.y = mouseY;
	this.diameter = 80;
	this.rot = 0;
	this.hitting = false;
	this.vel = createVector(0,0)
	this.pos = createVector(this.x,this.y);
	this.mouse = createVector()

	//move and rotate the player
    this.move = function() {
    	//slowly move the player towards mouse
    	var disX = mouseX - this.pos.x;
    	var disY = mouseY - this.pos.y;
    	this.pos.x += disX*0.1
    	this.pos.y += disY*0.1

    	this.mouse.x = mouseX;
    	this.mouse.y = mouseY;
    	this.vel = p5.Vector.sub(this.pos, this.mouse)

    	//if mouse is pressed stop the rotation
    	if(mouseIsPressed){
    		this.rot = this.rot;
    	} else{
    		this.rot = this.vel.heading()
    	}
	};


	this.display = function() {	
		//rotate the player while moving
		push()
		translate(this.pos.x,this.pos.y)
		rotate(this.rot)
		
		//display the look of the white blood cell
		var beta = 0
		var freq = 0.000005
		rotate(radians(beta))
		for (var i=0; i<200; i ++) {
		    var circle= 200 + 80*sin(millis()*freq*i);
		    this.col=map(circle,200,280,255,100);
		    var r=map(circle,150,250,4,3);
		    fill(this.col,240,240);
		    //if hit virus, turn red and blink
			if (this.hitting){
				if (frameCount % 10 < 5){
					fill(this.col,0,60)
				}
			}		
		    noStroke();
		    ellipse(0.15*circle*cos(i), 0.15*circle*sin(i),r,r);    
		    beta=beta+0.00005;
		}
		pop()
	};

	//shoot bullets
	this.shoot = function(){
		var mouse = createVector(mouseX,mouseY)
		var dis = p5.Vector.sub(mouse, this.pos)
		dis.setMag(20)		
		bullets.push(new Bullet(this.pos.x, this.pos.y, dis));
	}

	this.hitvirus = function(){
		this.hitting = true
	}
}