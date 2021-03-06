var onUpdateNumComponents = function(event){
    event.stopPropagation();
    stopAnimation();
    emptyElement("componentDefinition");
    numVectors = getTextBoxValue("numComponents");
    for( var i = 0; i < numVectors; i++)
    {
        addComponentUI(i);
    }
}

var onNumComponentsKeyUp = function(event){
  if (event.keyCode == 13){
    onUpdateNumComponents(event);
  }
}

var onEdit = function(){

      hideEditor();
      reinit();
}


var onHideEditor = function(){
    if(isAnimationStopped())
      reinit();
}

var onWindowResize = function(){
  if(!isAnimationStopped())
      reinit();
}

var onKeyUp = function(event){

     if (event.keyCode == 13 && event.target.id !== "numComponentsButton") {
        hideEditor();
        reinit();
    }
}

var magPlotVisible = false;
onToggleMagnitude = function( show){
  if(!magPlotVisible){
      magPlotVisible = true;
      $("#magPlot").show();
      $("#phasorPlot").removeClass("col-md-12").addClass("col-md-6");
      $('button#toggleMagnitude').text('Hide Magnitude').removeClass("btn-primary").addClass("btn-default");
  }
  else{
      magPlotVisible = false;
      $("#magPlot").hide();
      $("#phasorPlot").removeClass("col-md-6").addClass("col-md-12");
      $('button#toggleMagnitude').text('Show Magnitude').removeClass("btn-default").addClass("btn-primary");
  }
  reinit();
}

onToggleMagType = function () {
    var magTypeElem = document.getElementById('toggleMagType');
    if (magTypeElem.checked)
        magType = "db";
    else
        magType = "linear";
    reinit();
  
}

onToggleMagQuantity = function () {
    var magTypeElem = document.getElementById('toggleMagQuantity');
    if (magTypeElem.checked)
        magQuantity = "resultant";
    else
        magQuantity = "real";
    reinit();
  
}

onToggleAbout = function () {
    
    var toggleAboutElem = $("#toggleAbout");
    var visible = toggleAboutElem.data("visible");
    if(!visible)
    {
      $("#about").show();
      stopAnimation();
      $("#canvas").hide();
      $("#editButton").hide();
      $("#toggleMagnitude").hide();
      toggleAboutElem.text("Go Back");
      toggleAboutElem.data("visible", true);
    }
    else{
      $("#about").hide();
      $("#canvas").show();
      $("#editButton").show();
      $("#toggleMagnitude").show();
      toggleAboutElem.data("visible", false);
      toggleAboutElem.text("About");
      reinit();

    }
    
}


var onToggleAudio = function(){
  AudioManager.toggleAudio();
}
