var fueraCover;
var fueraTrack;
var center;
var analyzer;

var myTextPlay = "CLICK TO PLAY";
var myTextStop = "- TO STOP";


function preload(){
  fueraCover = loadImage("./assets/brain-motel.png");
  center = loadImage("./assets/center.png");
  fueraTrack = loadSound("./assets/fuera.mp3");
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  background(206, 134, 86);

  analyzer = new p5.Amplitude();
  analyzer.setInput(fueraTrack);

  fueraTrack.pause();
  fueraTrack.playMode('sustain');
}

function draw() {
  textFont("VT323");
  textAlign(LEFT);
  textSize(33);
  fill(255);
  for ( y = 50; y < windowHeight ; y += 60) {
    text(myTextPlay, 0, y);
  }
  for ( y = 80; y < windowHeight ; y += 60) {
    text(myTextStop, windowWidth-150, y);
  }

  push();
  translate(width/2,height/2);
  imageMode(CENTER);
  image(center, 0, 0, 230, 230);
  if(fueraTrack.isPlaying() == true) {
      rotate(frameCount/30);
      image(center, 0, 0, 230, 230);
  }
  pop();

  push();
  translate(width/2,height/2);
  imageMode(CENTER);
  image(fueraCover, 0, 0);
  pop();


  push();
  translate(width/2, height/2);
  rotate(frameCount/100);
  stroke(lerpColor(color(252, 3, 252),color(3, 252, 232),frameCount/100));
  strokeWeight(2);
  noFill();
  if (fueraTrack.isPlaying() == true){
    var volume = 0;
    volume = analyzer.getLevel();
    volume = map(volume, 0, 1, 0, height);
    ellipse(0, 0, 150+volume*random(), 150+volume*random());
  } else {
    ellipse(0, 0, 150, 150);
  }
    pop();
}

function mouseClicked() {
      if (fueraTrack.isPlaying() == false) {
        fueraTrack.play();
      } else {
        fueraTrack.pause();
      }
    };

function keyPressed() {
      fueraTrack.playMode('restart');
      fueraTrack.play();
    }

function windowResized() {
      resizeCanvas(windowWidth, windowWidth);
    }
