// This file contains all of the canvas interactivety and drawing functions

var canvasState;
var timelines = [];
var timelineColors = ["#FF0000", "#009900", "#0000FF", "#FF6600"];
var fugueEvents = [];
var fugueEventsText = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
                        "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"];
var numEvents = 0;

function init(){
    canvasState = new CanvasState($("canvas#timelines")[0]);

    //initializes and draws timelines
    for (var i = 0; i < 4; i++){
        timelines[i] = new Timeline(0, (i * 100) + 72.5, 950, 5, timelineColors[i]);
        timelines[i].draw(canvasState.ctx);
    }

    var count = 0;
    //initializes and draws fugue events
    for (var i = 0; i < 4; i++){
        var line = timelines[i];

        for (var j = 0; j < 5; j++){
            var x = (line.w / 5) * (j + .5);
            fugueEvents[count] = new FugueEvent(x - 10, line.y - 10, 25, 25, "#000", fugueEventsText[count]);
            fugueEvents[count].draw(canvasState.ctx);
            count++;
            numEvents++;
        }
    }
    log("made it here");
}

//CanvasState constructor, holds information about the canvas
function CanvasState(canvas){
    this.canvas = canvas;
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = canvas.getContext('2d');

    $("#timelines").on("click", function(e){
        var xPos = $("#timelines").offset().left;
        var yPos = $("#timelines").offset().top;
        var mx = e.pageX;
        var my = e.pageY;
        for (var i = 0; i < numEvents; i++){
            if (fugueEvents[i].contains(mx - xPos, my - yPos)){
                log("found it " + i);
                log($("#eventInfo").text());
                $("#eventInfo").html(fugueEvents[i].info);
            }
        }
    });
}

//Timeline constructor, hold coordinates of timelines on canvas
function Timeline(x, y, w, h, fill) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.fill = fill;
}
 
// Draws this shape to a given context
Timeline.prototype.draw = function(ctx) {
    ctx.fillStyle = this.fill;
    ctx.fillRect(this.x, this.y, this.w, this.h);
}

//FugueEvent constructor, hold information about interactable fugue events
function FugueEvent(x, y, w, h, fill, info){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.fill = fill;
    this.info = info;
}

FugueEvent.prototype.draw = function(ctx){
    ctx.fillStyle = this.fill;
    ctx.fillRect(this.x, this.y, this.w, this.h);
}

FugueEvent.prototype.contains = function(mx, my) {
    return  (this.x <= mx) && (this.x + this.w >= mx) &&
          (this.y <= my) && (this.y + this.h >= my);
}

//Debug shorthand function
function log(message){
    console.log(message);
}