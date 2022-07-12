const cvs = document.getElementById("mycanvas")
const ctx = cvs.getContext("2d");
var bird = new Image();
var fg = new Image();
var bg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();
bird.src = "images/bird.JPG";
fg.src = "images/fg.png";
bg.src = "images/bg.png";
pipeNorth.src = "images/pipeNorth.JPG"
pipeSouth.src = "images/pipeSouth.JPG";
var gap = 85;
var bird_x = 10;
var bird_y = 150;
var gravity = 1;
var constant = pipeNorth.height + gap
var score=0

document.addEventListener("keydown", moveUp)


function moveUp() {
    bird_y -= 25

}
var pipe = [];
pipe[0] = {
    x: cvs.width,
    y: 0
};
console.log(pipe[0]);


function draw() {
    ctx.drawImage(bg, 0, 0)
    for (let i = 0; i < pipe.length; i++) {
        
        ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y)
        ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant)
        pipe[i].x--
            if (pipe[i].x === 125) {
                pipe.push({
                    x: cvs.width,
                    y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
                });


            }
        if (pipe[i].x == 0) {
            pipe.shift()
        }
        if (pipe[i].x == 5) {
            score++;
  
        }
        if (bird_x + bird.width >= pipe[i].x &&
            bird_x <= pipe[i].x + pipeNorth.width &&
            (bird_y <= pipe[i].y + pipeNorth.height || bird_y + bird.height >= pipe[i].y + constant) ||
            bird_y + bird.height >= cvs.height - fg.height) {
            location.reload();
            break;

        }
        ctx.drawImage(fg, 0, cvs.height - fg.height)
        ctx.drawImage(bird, bird_x, bird_y)
        bird_y += gravity
        ctx.fillStyle = "black";
        ctx.fillText("Score : " + score, 10, cvs.height - 20);

    }
    requestAnimationFrame(draw)

}
draw()