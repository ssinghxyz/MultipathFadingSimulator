function MagPlot(){
}

MagPlot.create = function(){

	this.height = canvasHeight;
	this.width = canvasWidth;
    this.timeShift = this.width * timeShiftSpeed; // Move x coordinate by timeShift on each frame
    this.currentTime = 0; // Current time position
	this.svg = Raphael("magCanvas", this.width, this.height);
}


MagPlot.init = function(){
    this.initOrigin();
    this.initGeometry();
    this.initAxes();
}


MagPlot.initOrigin = function(){
		var circle = this.svg.circle( this.width/2, this.height/2, 4);
	    circle.attr("fill", "black");
	    circle.attr("stroke", "#fff");
	}

MagPlot.resize = function(){
	this.svg.clear();
	this.height = canvasHeight;
	this.width = canvasWidth;
	this.svg.setSize(this.width, this.height);
	this.init();
}

MagPlot.initAxes = function(){

    var yAxisPath = "M " + this.width/2 + "," + 0 + " L " + this.width/2 + "," + this.height;
    var yAxis = this.svg.path(yAxisPath);
    yAxis.attr({"stroke-width" : 1, 'arrow-end':  'classic-wide-long' , 'arrow-start':  'classic-wide-long' });

    var xAxisPath = "M " + 0 + "," + this.height/2 + " L " + this.width + "," + this.height/2;
    var xAxis = this.svg.path(xAxisPath);
    xAxis.attr({"stroke-width" : 1, 'arrow-end':  'classic-wide-long' , 'arrow-start':  'classic-wide-long' });

    this.currentTime = 0;
}

MagPlot.initGeometry = function(){

    this.prevResPoint = {x:0,y:0};      
    // Create circles for resultant
    this.resultantMag = this.svg.circle( this.width/2, this.height/2, 6);
    this.resultantMag.attr("fill", "green");
    this.resultantMag.attr("stroke", "#fff");

    // Start from extreme left on the time axis
    this.currentTime = 0;
}

MagPlot.updateGeometry = function(){

    this.currentTime += this.timeShift;
    if(this.currentTime > this.width){
        this.currentTime = 0;
        this.svg.clear();
        this.init();
        return;
        // dont draw the trace back
    }

    this.currentTime %= this.width;
    MagPlot.updateMag(resultant, this.resultantMag, this.prevResPoint);
}

MagPlot.calculatePowerDb = function(vector){
        var voltage = MagPlot.calculateVoltageLinear(vector);
        var power = voltage * voltage;
        var powerDb;
        if(power === 0)
        {
            powerDb = -this.height/2 + 5;
        }
        else
        {
            powerDb = 10 * Math.log(power) * dbScale / Math.log(10);
        }

        return powerDb;
}


MagPlot.calculateResultantMagnitude = function(vector){
    var x = -vector.xshift + Math.round(vector.matrix.x(vector.head[0], vector.head[1]));
    var y = -canvasHeight/2 + Math.round(vector.matrix.y(vector.head[0], vector.head[1]));
    var mag = Math.sqrt(x*x + y*y);
    return mag;
}

MagPlot.calculateRealComponent = function(vector){
    var cosComponent = -vector.xshift + Math.round(vector.matrix.x(vector.head[0], vector.head[1]));        
    cosComponent = Math.abs(cosComponent) < zeroMagThreshold ? 0 : cosComponent;
    return cosComponent;        
}


MagPlot.calculateVoltageLinear = function(vector){
    var mag=0;
    switch(magQuantity)
    {
        case "resultant":
        {
            mag = this.calculateResultantMagnitude(vector);
            break;
        }
        case "real":
        {
            mag = this.calculateRealComponent(vector);
            break;
        }        
    }
    return mag;
}


MagPlot.updateMag = function(vector, magPoint, prevPoint){
    
    var color = "green";
    var mag;
    if (magType === "db")
    {
        mag = this.calculatePowerDb(vector);
        if(mag < fadingThresholdPower)
            color = "red";
    }
    else if (magType === "linear")
    {
        mag = this.calculateVoltageLinear(vector);
        if(Math.abs(mag) < fadingThresholdVoltage)
            color = "red"
    }
    
    mag = this.height / 2 - mag;
    magPoint.attr({ "cx": this.currentTime, "cy": mag });

    var line = this.svg.path(["M", prevPoint.x, prevPoint.y, "L", this.currentTime, mag]);
    line.attr("stroke", color)
    
    prevPoint.x = this.currentTime;
    prevPoint.y = mag;
}
