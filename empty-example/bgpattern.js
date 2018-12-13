function bgpattern(){
	f += 0.01;
	var waveH = 300;
	  for (var h = 10; h < height ; h += 40) {
	    beginShape();
	    strokeWeight(2)
	    stroke(50, 10, map(h, 0, height, 0, 255));

	    //temporary variable for drawing curves
	    var x = 0;
	    //height scale is perlin noise calculated by three factors
	    var y = h + waveH * noise(noiseX, noiseY + h * 0.01, noiseF + f);
	    //first vertex
	    curveVertex(x, y);

	    //intermediate vertex
	    for (var w = 0; w <= width; w += 100) {
	      x = w;
	      y = h+waveH * noise(noiseX + w * 0.001, noiseY + h * 0.01, noiseF + f)
	      curveVertex(x, y);
	    }

	    //last vertex
	    x = width;
	    y = h+waveH * noise(noiseX + width, noiseY + h * 0.01, noiseF + f);
	    curveVertex(x, y);
	
	    endShape();
	  }
}