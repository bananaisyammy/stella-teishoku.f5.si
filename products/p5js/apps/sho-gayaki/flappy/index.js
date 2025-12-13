
const canvasX = 1000;
const canvasY = 600;

const canvasColor = '#000000';

let squareX = 100
let squareY = 300
let squareX2 = 200
let squareY2 = 300
let fall = -9
let fall2 = -9
let up = false
let up2 = false
let upup = false
let upup2 = false 
let wallY = 0
let wallX = 1000
let wall = true
let score = -1
let hidari1 = true
let hidari2 = true
let migi1 = true
let migi2 = true
let jump1 = true
let jump2 = true
let hitori = false
let kyouryoku = false
let batoru = false
let modoru = true
var player1Img;
var player2Img;

function setup() {
  frameRate(40);
  createCanvas(canvasX, canvasY);
  player1Img = loadImage('player1.png');
  player2Img = loadImage('player2.png');
  woodFirstImg = loadImage('woodFirst.png');
  webImg = loadImage('web.png');
  background(canvasColor);
  alert("一人ならF、二人で協力ならG,二人でバトルならHを押してね。Rを押せば戻れるよ")
}


function draw() {
  if(keyIsDown("R".charCodeAt(0))){
    modoru = true
    hitori = false
    kyouryoku = false
    batoru = false
    background(canvasColor);
  }
  if(modoru){
    document.getElementById('target').textContent = "Fで一人、Gで二人で協力、Hで二人でバトル"
    if(keyIsDown("F".charCodeAt(0))){
      hitori = true
      squareX = 100
    squareY = 300
    squareX2 = 200
    squareY2 = 300
    fall = -9
    fall2 = -9
    up = false
    up2 = false
    upup = false
    upup2 = false 
    wallY = 0
    wallX = 1000
    wall = true
    score = -1
    hidari1 = true
    hidari2 = true
    migi1 = true
    migi2 = true
    jump1 = true
    jump2 = true
      modoru = false
    }
    if(keyIsDown("G".charCodeAt(0))){
      kyouryoku = true
      squareX = 100
    squareY = 300
    squareX2 = 200
    squareY2 = 300
    fall = -9
    fall2 = -9
    up = false
    up2 = false
    upup = false
    upup2 = false 
    wallY = 0
    wallX = 1000
    wall = true
    score = -1
    hidari1 = true
    hidari2 = true
    migi1 = true
    migi2 = true
    jump1 = true
    jump2 = true
      modoru = false
    }
    if(keyIsDown("H".charCodeAt(0))){
      batoru = true
      squareX = 100
    squareY = 300
    squareX2 = 200
    squareY2 = 300
    fall = -9
    fall2 = -9
    up = false
    up2 = false
    upup = false
    upup2 = false 
    wallY = 0
    wallX = 1000
    wall = true
    score = -1
    hidari1 = true
    hidari2 = true
    migi1 = true
    migi2 = true
    jump1 = true
    jump2 = true
      modoru = false
    }
  }
  if(batoru){
    document.getElementById('target').textContent = "SCORE"+score;
    background(canvasColor);
    if(wall){
      wallY = Math.floor( Math.random() * 300 ) + 0
      wall = false
      wallX = 1300
      score += 1
    }
    fill("#00ff00")
    //quad(wallX,0,wallX+250,0,wallX+250,wallY,wallX,wallY)
    //quad(wallX,wallY+300,wallX+250,wallY+300,wallX+250,600,wallX,600)
    image(woodFirstImg, wallX-100, wallY+210, 450, 600-wallY+210);
    image(webImg, wallX, (wallY<250) ? wallY-250 : 0, 250, 250);
    if(wallX<-250){
      wall = true
    }
    wallX -= 3
    noStroke();
    image(player1Img, squareX, squareY, 50, 50);
    image(player2Img, squareX2, squareY2, 50, 50);
    if(squareY<-20 || squareY>580){
      alert("水色の勝ち")
      squareX = 100
      squareY = 300
      squareX2 = 200
      squareY2 = 300
      fall = -9
      fall2 = -9
      up2 = false
      upup2 = false
      up = false
      upup = false
      wallY = 0
      wallX = 1000
      wall = true
      score = -1
    }
    if(squareX>wallX-45 && squareX<wallX+245){
      if(squareY+5<wallY || squareY+45>wallY+300){
        alert("水色の勝ち")
        squareX = 100
        squareY = 300
        squareX2 = 200
        squareY2 = 300
        fall = -9
        fall2 = -9
        up2 = false
        upup2 = false
        up = false
        upup = false
        wallY = 0
        wallX = 1000
        wall = true
        score = -1
      }
    }
    if(squareY2<-20 || squareY2>580){
      alert("黄色の勝ち")
      squareX = 100
      squareY = 300
      squareX2 = 200
      squareY2 = 300
      fall = -9
      fall2 = -9
      up2 = false
      upup2 = false
      up = false
      upup = false
      wallY = 0
      wallX = 1000
      wall = true
      score = -1
    }
    if(squareX2>wallX-45 && squareX2<wallX+245){
      if(squareY2+5<wallY || squareY2+45>wallY+300){
        alert("黄色の勝ち")
        squareX = 100
        squareY = 300
        squareX2 = 200
        squareY2 = 300
        fall = -9
        fall2 = -9
        up2 = false
        upup2 = false
        up = false
        upup = false
        wallY = 0
        wallX = 1000
        wall = true
        score = -1
      }
    }
    if(up){
      squareY += fall
      fall += 0.6
      if(upup){
        fall = -9
        upup = false
      }
    }
    if(up2){
      squareY2 += fall2
      fall2 += 0.6
      if(upup2){
        fall2 = -9
        upup2 = false
      }
    }
    if(squareX<squareX2+45 && squareX>squareX2-45){
      if(squareY<squareY2+10 && squareY>squareY2-60){
        squareY2 = squareY+52
      }
      if(squareY2<squareY+10 && squareY2>squareY-60){
        squareY = squareY2+60
      }
    }
    if(squareY<squareY2+45 && squareY>squareY2-45){
      if(squareX<squareX2+50 && squareX>squareX2){
        hidari1 = false
        migi2 = false
      }
      if(squareX2<squareX+50 && squareX2>squareX){
        hidari2 = false
        migi1 = false
      }
    }
    if(keyIsDown(LEFT_ARROW) && squareX>0 && hidari1){
      squareX -= 5; 
    }
    if(keyIsDown(RIGHT_ARROW) && squareX<canvasX-50 && migi1){
      squareX += 5;
    }
    if(keyIsDown(UP_ARROW) && jump1){
      up = true
      upup = true
    }
    if(keyIsDown("A".charCodeAt(0)) && squareX2>0 && hidari2){
      squareX2 -= 5; 
    }
    if(keyIsDown("D".charCodeAt(0)) && squareX2<canvasX-50 && migi2){
      squareX2 += 5;
    }
    if(keyIsDown("W".charCodeAt(0)) && jump2){
      up2 = true
      upup2 = true
    }
    hidari1 = true
    hidari2 = true
    migi1 = true
    migi2 = true
    jump1 = true
    jump2 = true
    }
  if(hitori){
    document.getElementById('target').textContent = "SCORE"+score;
    background(canvasColor);
    if(wall){
      wallY = Math.floor( Math.random() * 400 ) + 0
      wall = false
      wallX = 1300
      score += 1
    }
    quad(wallX,0,wallX+250,0,wallX+250,wallY,wallX,wallY)
    quad(wallX,wallY+200,wallX+250,wallY+200,wallX+250,600,wallX,600)
    image(woodFirstImg, wallX-100, wallY+210, 450, 600-wallY+210);
    image(webImg, wallX, (wallY<250) ? wallY-250 : 0, 250, (wallY<250) ? 2*wallY-250 : wallY);
    if(wallX<-250){
      wall = true
    }
    wallX -= 3
    noStroke();
    image(player1Img, squareX, squareY, 50, 50);
    if(squareY<-20 || squareY>580){
      alert("DEATH")
      squareX = 100
      squareY = 300
      fall = -9
      up = false
      upup = false
      wallY = 0
      wallX = 1000
      wall = true
      score = -1
    }
    if(squareX>wallX-45 && squareX<wallX+245){
      if(squareY+5<wallY || squareY+45>wallY+200){
        alert("DEATH")
        squareX = 100
        squareY = 300
        fall = -9
        up = false
        upup = false
        wallY = 0
        wallX = 1000
        wall = true
        score = -1
      }
    }
    if(keyIsDown(LEFT_ARROW) && squareX>0){
      squareX -= 5; 
    }
    if(keyIsDown(RIGHT_ARROW) && squareX<canvasX-50){
      squareX += 5;
    }
    if(keyIsDown(UP_ARROW)){
      up = true
      upup = true
    }
    if(up){
      squareY += fall
      fall += 0.7
      if(upup){
        fall = -9
        upup = false
      }
    }
    }
  if(kyouryoku){
    document.getElementById('target').textContent = "SCORE"+score;
    background(canvasColor);
    if(wall){
      wallY = Math.floor( Math.random() * 400 ) + 0
      wall = false
      wallX = 1300
      score += 1
    }
    //quad(wallX,0,wallX+250,0,wallX+250,wallY,wallX,wallY)
    //quad(wallX,wallY+200,wallX+250,wallY+200,wallX+250,600,wallX,600)
    image(woodFirstImg, wallX-100, wallY+210, 450, 600-wallY+210);
    image(webImg, wallX, (wallY<250) ? wallY-250 : 0, 250, 250);
    if(wallX<-250){
      wall = true
    }
    wallX -= 3
    noStroke();
    image(player1Img, squareX, squareY, 50, 50);
    image(player2Img, squareX2, squareY2, 50, 50);
    if(squareY<-20 || squareY>580){
      alert("DEATH")
      squareX = 100
      squareY = 300
      squareX2 = 200
      squareY2 = 300
      fall = -9
      fall2 = -9
      up2 = false
      upup2 = false
      up = false
      upup = false
      wallY = 0
      wallX = 1000
      wall = true
      score = -1
    }
    if(squareX>wallX-45 && squareX<wallX+245){
      if(squareY+5<wallY || squareY+45>wallY+200){
        alert("DEATH")
        squareX = 100
        squareY = 300
        squareX2 = 200
        squareY2 = 300
        fall = -9
        fall2 = -9
        up2 = false
        upup2 = false
        up = false
        upup = false
        wallY = 0
        wallX = 1000
        wall = true
        score = -1
      }
    }
    if(squareY2<-20 || squareY2>580){
      alert("DEATH")
      squareX = 100
      squareY = 300
      squareX2 = 200
      squareY2 = 300
      fall = -9
      fall2 = -9
      up2 = false
      upup2 = false
      up = false
      upup = false
      wallY = 0
      wallX = 1000
      wall = true
      score = -1
    }
    if(squareX2>wallX-45 && squareX2<wallX+245){
      if(squareY2+5<wallY || squareY2+45>wallY+200){
        alert("DEATH")
        squareX = 100
        squareY = 300
        squareX2 = 200
        squareY2 = 300
        fall = -9
        fall2 = -9
        up2 = false
        upup2 = false
        up = false
        upup = false
        wallY = 0
        wallX = 1000
        wall = true
        score = -1
      }
    }
    if(keyIsDown(LEFT_ARROW) && squareX>0){
      squareX -= 5; 
    }
    if(keyIsDown(RIGHT_ARROW) && squareX<canvasX-50){
      squareX += 5;
    }
    if(keyIsDown(UP_ARROW)){
      up = true
      upup = true
    }
    if(keyIsDown("A".charCodeAt(0)) && squareX2>25){
      squareX2 -= 5; 
    }
    if(keyIsDown("D".charCodeAt(0)) && squareX2<canvasX-25){
      squareX2 += 5;
    }
    if(keyIsDown("W".charCodeAt(0))){
      up2 = true
      upup2 = true
    }
    if(up){
      squareY += fall
      fall += 0.7
      if(upup){
        fall = -9
        upup = false
      }
    }
    if(up2){
      squareY2 += fall2
      fall2 += 0.7
      if(upup2){
        fall2 = -9
        upup2 = false
      }
    }
  }
}

