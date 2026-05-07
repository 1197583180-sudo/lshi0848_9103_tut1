let img;
let numSegments = 50;
let segments = [];
//let pixelColour = null;
let drawSegments = true;

function preload() {
  img = loadImage("assets/Mona_Lisa_by_Leonardo_da_Vinci_500_x_700.jpg");
}

function setup() {
  createCanvas(img.width, img.height);
  let segmentWidth = img.width / numSegments;
  let segmentHeight = img.height / numSegments;
  pixelColour = color(0);
  for (let segYPos = 0; segYPos < img.height; segYPos += segmentHeight) {
    for (let segXPos = 0; segXPos < img.width; segXPos += segmentWidth) {
      let segmentColour = img.get(segXPos + segmentWidth / 2, segYPos + segmentHeight / 2);
      let segment = new ImageSegment(segXPos, segYPos, segmentWidth, segmentHeight, segmentColour);
      segments.push(segment);
    }
  }
}

/*function draw() {
  background(220);
  image(img, 0, 0);
  for (const segment of segments) {
    segment.draw();
  }
  fill(pixelColour);
  stroke(255);
  circle(mouseX, mouseY, 40);
}*/

function mouseMoved() {
  pixelColour = img.get(mouseX, mouseY);
}

function draw() {
  background(0);
  if (drawSegments) {
    for (const segment of segments) {
      //segment.scale = dist(segment.srcImgSegXPos, segment.srcImgSegYPos, mouseX, mouseY) / 100;
      let targetScale = dist(segment.srcImgSegXPos, segment.srcImgSegYPos, mouseX, mouseY) / 100;
      segment.scale = lerp(segment.scale, targetScale, 0.1);
      segment.draw();
    }
  } else {
    image(img, 0, 0);
  }
}
function keyPressed() {
  if (key == "s") {
    drawSegments = !drawSegments;
  }
}

class ImageSegment {
  constructor(srcImgSegXPosIn, srcImgSegYPosIn, srcImgSegWidthIn, srcImgSegHeightIn, srcImgSegColourIn) {
    this.srcImgSegXPos = srcImgSegXPosIn;
    this.srcImgSegYPos = srcImgSegYPosIn;
    this.srcImgSegWidthIn = srcImgSegWidthIn;
    this.srcImgSegHeightIn = srcImgSegHeightIn;
    this.srcImgSegColourIn = srcImgSegColourIn;
    this.scale = 1;
  }

  draw() {
    fill(this.srcImgSegColourIn);
    stroke(0);
    rect(this.srcImgSegXPos, this.srcImgSegYPos, this.srcImgSegWidthIn * this.scale, this.srcImgSegHeightIn * this.scale);
  }
}