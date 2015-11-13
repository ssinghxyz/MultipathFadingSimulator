var startAnimation = function(){

    if( numVectors <= 0)
        return;
    setIntervalId = window.setInterval(animate,animationInterval);
}

var animate = function () {
        
        PhasorPlot.updateGeometry();
        AudioManager.adjustVolume();
        if(magPlotVisible) 
            MagPlot.updateGeometry(); 

    }

var stopAnimation = function(){

    if( setIntervalId !== -1)
    {
        setIntervalId = window.clearInterval(setIntervalId);
        setIntervalId = -1;
    }
}

var isAnimationStopped = function(){

    return setIntervalId === -1;
}
