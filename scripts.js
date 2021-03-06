// This file contains all of the canvas interactivety and drawing functions

var MAX_EVENT;

var canvasState;
var currentEvent = 0;
var currentSection;
var timelines = [];
var timelineColors = ["#FF0000", "#009900", "#0000FF", "#FF6600"];

var recapitulationEvents = [];
var developmentEvents = [];
var expositionEvents = [];

var expositionEventsText = [["Voice 1 enters at measure 4.  It closely mimics voice 2 with tonal answers until measure 16",
                        "Voice 1 becomes the leading voice until measure 22, at which point it mimics the other voice's rhytmic structure to reinforce the harmonies intil measure 32",
                        "Voice 1 works very closely with voice 2 to provide interesting contrapuntal melodic lines until measure 51, where there is a cadence to the key of A",
                        "Voice 1 is quiet until returning in measure 63, at which point it mimics voice 2 tonally.  It continues this until measure 70, where it pauses for 4 measures",
                        "Voice 1 repeats the primary subject reintroduced by voice 4 earlier and functions as the leading voice until measure 107 (it's obvious at some points but much less so at others). During this time, it is either the sole focus of the piece or the main focus working with other voices to provide interesting harmonies",
                        "Voice 1 works closely with the other voices to end the exposition."],
                        ["Voice 2 enters at measure 1.  It introduces the primary subject and acts as the leading voice until measure 16",
                        "Voice 2 works with voices 3 and 4 to harmonize the melody provided by voice 1 until measure 23, where it becomes the leading voice.  This continues until measure 28, at which point it returns to its previous form",
                        "Voice 2 mimics voice 1 with varying degrees of exactness (it is usually just a 3rd below voice 1) to creating interesting counterpoint.  It continues this until the cadence at measure 51",
                        "Voice 2 is quiet until measure 59, where it returns and mimics material introduced earlier by voice 4. It continues this until measure 69, where it begins to work closely with voice 3 to provide harmonic clarity",
                        "Voice 2 continues to work very closely with voice 3 until measure 107.  During this time, it mirrors voice 3 with varying degrees of closeness. Sometimes, it is almost exactly the same and in other situations, it differs from voice 3 in order to create a nice blend of the two",
                        "Voice 2 works closely with the other voices to end the exposition."],
                        ["Voice 3 enters at measure 13. It repeats the primary subject once before measure 16",
                        "Voice 3 uses the same rhythmic and harmonic structure as the other non-leading voices until measures 28-29, where it becomes the lead voice",
                        "Voice 3 slightly imitates voices 1 and 2 until measure 39, at which point it pedals on A until the cadence at measure 51",
                        "Voice 3 returns in measure 55 and repeats the material presented by voice 4 up to measure 69, where it begins to offer harmonic clarity in conjunction with voice 2",
                        "Voice 3 works closely with voice 2 until measure 107.  During this time, it acts as a pedal tone or has long duration notes to offer harmonic clarity",
                        "Voice 3 works closely with the other voices to end the exposition."],
                        ["Voice 4 enters at measure 9. It mimics voice 1 with real answers until measure 16",
                        "Voice 4 works with other non-leading voices to offer more harmonic clarity until measures 30-31, where it briefly becomes the lead voice",
                        "Voice 4 is the most independent voice from measures 33-51.  It begins by repeating the leading subject from the previous measures until measure 39, where it only comes in at various points briefly to emphasize those critical sections.",
                        "Voice 4 is the leading voice from measures 51-63, after which is remains quiet until measure 69, where it reintroduces the primary subject of the entire piece",
                        "Voice 4 is relatively independent up to measure 107, although it is not the focus of the piece.  It works with voices 2 and 3 at various points to harmonize voice 1 and sometimes it works with voice 1 to provide nice counterpoint",
                        "Voice 4 works closely with the other voices to end the exposition."]]; 

var developmentEventsText = [["Voice 1 reenters on measure 127 with a chromatic walkup that reminds the listener that it exists, before exclusively using whole notes (many of which are chromatic in nature).  It briefly harmonizes with the other voices at measure 140 to cadence on measure 141",
                            "Voice 1 reintroduces the primary subject, which then gets repeated by voice 4 in a call and response manner.  After reintroducing it, voice 1 either repeats it or rests until measure 158",
                            "Voice 1 works with the other voices to harmonize this section in interesting ways until measure 173",
                            "Voice 1 repeats its part from the recapitulation (with various alterations to reflect the differing keys) in measures 16-51 until measure 221",
                            "Voice 1 repeats the primary subject and then works with the other voices to create various sequences until measure 234",
                            "Voice 1 works with all the other voices to create a very homophonic section that closes out the development section"], 
                            ["Voice 2 exclusively harmonizes the other voices until the cadence on measure 141",
                            "Voice 2 works closely with voice 3 to harmonize the piece while voices 1 and 4 are the focus",
                            "Voice 2 works with the other voices to harmonize this section in interesting ways until measure 173",
                            "Voice 2 repeats its part from the recapitulation (with various alterations to reflect the differing keys) in measures 16-51 until measure 221",
                            "Voice 2 exclusively works with the other voices to create various sequences until measure 234",
                            "Voice 2 works with all the other voices to create a very homophonic section that closes out the development section"], 
                            ["Voice 3 starts the development section with a chromatic walkup that is imitated by voices 1 and 4 (but mostly 4) up til the cadence at measure 141",
                            "Voice 3 works with voice 2 to harmonize this section while voices 1 and 4 are the main focus",
                            "Voice 3 works with the other voices to harmonize this section in interesting ways until measure 173",
                            "Voice 3 repeats its part from the recapitulation (with various alterations to reflect the differing keys) in measures 16-51 until measure 221",
                            "Voice 3 exclusively works with the other voices to create various sequences until measure 234",
                            "Voice 3 works with all the other voices to create a very homophonic section that closes out the development section"], 
                            ["Voice 4 reenters on measure 129 with a chromatic walkup and begins a call and response section with voice 3.  It continues this until the cadence at measure 141",
                            "Voice 4 works with voice 1 to repeat the primary subject in altered keys.  It does this in a call and response fashion up until measure 158",
                            "Voice 4 works with the other voices to harmonize this section in interesting ways until measure 173",
                            "Voice 4 repeats its part from the recapitulation (with various alterations to reflect the differing keys) in measures 16-51 until measure 221",
                            "Voice 4 exclusively works with the other voices to create various sequences until measure 234",
                            "Voice 4 works with all the other voices to create a very homophonic section that closes out the development section"]];

var recapitulationEventsText = [["Voice 1 reenters on measure 272 and has a very chromatic melody.  It works with the other voices when it is not the focus to slow the piece down",
                                "Voice 1 repeats the primary subject at the beginning of 282 and works with other voices for the remaining few measures to conclude the piece by cadencing in G with a PAC"], 
                                ["Voice 2 never stops and almost exclusively works with the other voices to harmonize the focus of the piece for the next 16 measures",
                                "Voice 2 imitates voice 1 from measures 282-287 before working with every other voice to end the song"], 
                                ["Voice 3 reenters after a very brief pause before outlining the chromatic walkup that other voices imitate for the next 16 measures.  It also works with other voices to harmonize piece",
                                "Voice 3 repeats the primary subject and then harmonizes with the other 3 voices to finish the piece"], 
                                ["Voice 4 reenters at measure 270 and plays more chromatic walkups than any other voice in this section.  It does this until measure 282",
                                "Voice 4 mirrors voice 3 for the first ~6 measures and then works with all the other voices to end the piece"]];

var numEvents = 0;

function init(){
    canvasState = new CanvasState($("canvas#timelines")[0]);

    var ePos = 0;
    var dPos = 0;
    var rPos = 0;

    //initializes and draws timelines
    for (var i = 0; i < 4; i++){
        timelines[i] = new Timeline(0, (i * 100) + 72.5, 950, 5, timelineColors[i]);
        timelines[i].draw(canvasState.ctx);
    }
    for (var i = 0; i < 4; i++){
        var line = timelines[i];

        //initialize and draw expo events
        for (var k = 0; k < expositionEventsText[i].length; k++){
            var x = (line.w / expositionEventsText[i].length) * (k + .5);
            expositionEvents[ePos] = new FugueEvent(x - 10, line.y - 10, 25, 25, k, "#000", expositionEventsText[i][k]);
            expositionEvents[ePos].draw(canvasState.ctx);
            numEvents++;
            ePos++;
        }

        //just initialize dev + recap, no drawing
        for (var k = 0; k < developmentEventsText[i].length; k++){
            var x = (line.w / developmentEventsText[i].length) * (k + .5);
            developmentEvents[dPos] = new FugueEvent(x - 10, line.y - 10, 25, 25, k, "#000", developmentEventsText[i][k]);
            numEvents++;
            dPos++;
        }

        for (var k = 0; k < recapitulationEventsText[i].length; k++){
            var x = (line.w / recapitulationEventsText[i].length) * (k + .5);
            recapitulationEvents[rPos] = new FugueEvent(x - 10, line.y - 10, 25, 25, k, "#000", recapitulationEventsText[i][k]);
            numEvents++;
            rPos++;
        }
    }
    MAX_EVENT = numEvents;
    currentSection = expositionEvents;

    $("#eventInfo").html(expositionEvents[0].info);
    setButtonListeners();

    log("made it here");
}

// UPDATE THE INFO BOX AT THE BOTTOM AS WELL ONCE DATA IS THERE
function setButtonListeners(){
    $("#expoButton").on('click', function(e){
        e.preventDefault;
        currentEvent = 0;
        currentSection = expositionEvents;
        canvasState.redraw();
    });

    $("#devButton").on('click', function(e){
        e.preventDefault;
        currentSection = developmentEvents;
        currentEvent = 0;
        canvasState.redraw();
    });

    $("#recapButton").on('click', function(e){
        e.preventDefault;
        currentEvent = 0;
        currentSection = recapitulationEvents;
        canvasState.redraw();
    });
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

        for (var i = 0; i < 4; i++){
            for (var j = 0; j < currentSection.length; j++){
                if (currentSection[j].contains(e.pageX - xPos, e.pageY - yPos)){
                    $("#eventInfo").html(currentSection[j].info);
                    currentEvent = currentSection[j].id;
                }
            }
        }
    });
}

CanvasState.prototype.redraw = function(){
    var i;

    this.ctx.clearRect(0, 0, this.width, this.height);
    for (i = 0; i < 4; i++){
        timelines[i].draw(this.ctx);
    }
    for (i = 0; i < currentSection.length; i++){
        currentSection[i].draw(this.ctx);
    }
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
function FugueEvent(x, y, w, h, i, fill, info){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.id = i;
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