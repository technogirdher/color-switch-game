let board;
let pen;
let jump=false;
let gravity=true;
let vel =0;
let wid=window.innerWidth;
let hig=window.innerHeight;
let enter=false;
let velsc=0;
spd=2;
let score=0;
keyd=true;
change=0;
let intervalId;

function startInterval(spd) {
    this.x=spd;
    if(spd>3){
        this.x=this.x-0.5;
    }
    if(spd>4){
        this.x=4;
    }
    clearInterval(intervalId);
    intervalId = setInterval(() => {
        change = (change + 1) % 4;
    }, 1000 / (this.x / 4));
}
document.addEventListener('keydown',function(e){
    if(e.key===' ' && keyd){
        keyd=false;
        jump=true;
        vel=-7;
        console.log('jumped');
    }
  
        enter=true;
});
document.addEventListener('keyup',function(e){
    if(e.key===' ' ){
        keyd=true;
        
    }
});
document.addEventListener('touchstart', function () {
    if (keyd) {
        keyd = false;
        jump = true;
        vel = -7;
        console.log('jumped (touch)');
    }
    enter = true;
});

document.addEventListener('touchend', function () {
    keyd = true;
});

console.log(window.innerHeight);
window.onload = function () {
    board = document.querySelector('#board');
    board.width = window.innerWidth;
    board.height = window.innerHeight;
    pen=board.getContext('2d');
    update();
};
const imgreen = new Image();
imgreen.src = 'green.png';
const imblue = new Image();
imblue.src = 'blue.png';
const impink = new Image();
impink.src = 'pink.png';
const imyellow = new Image();
imyellow.src = 'yellow.png';
const imfood = new Image();
imfood.src = 'food.png';

class figure {
    static all = [];
    constructor(image,x, y, width, height,color) {
        this.image = image;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        figure.all.push(this);
    }
}
class trap{
    static all = [];
    constructor(j){
        this.j=j-150;
        this.k=j+150;
        this.food = new figure(imfood, window.innerWidth/2, this.j-100, 50, 50,5);
        this.block=[
            new figure(imgreen,  window.innerWidth/2 - 150, -100, 50, 50, 0),
            new figure(imblue,   window.innerWidth/2 + 150, -100, 50, 50, 1),
            new figure(impink,   window.innerWidth/2 + 150,   -100, 50, 50, 2),
            new figure(imyellow, window.innerWidth/2 - 150,   -100, 50, 50, 3)
        ];
        this.change=0;
        this.linecomlete=1;
        trap.all.push(this);
        this.flag=true;

        
    }
    
    movement(){
        if(this.flag){
            this.flag=false;
            this.block[0].y=this.j;
            this.block[1].y=this.j;
            this.block[2].y=this.k;
            this.block[3].y=this.k;
            this.block[0].x= window.innerWidth/2 - 150;
            this.block[1].x= window.innerWidth/2 + 150;
            this.block[2].x= window.innerWidth/2 + 150;
            this.block[3].x= window.innerWidth/2 - 150;

        }
        for(let i=0;i<this.block.length;i++){
            let obj=this.block[i];
            if((i+this.change)%4==0){
                obj.x+=spd;
            }
            else if((i+this.change)%4==2){
                obj.x-=spd;
            }
            else if((i+this.change)%4==1){
                obj.y+=spd;
            }
            else if((i+this.change)%4==3){
                obj.y-=spd;
            }
        }
        
        this.linecomlete+=spd;
        if(this.linecomlete/300>=1){
            this.linecomlete=1;
            this.change=(this.change+1)%4;
             
        }
        if((this.block[0].y>=hig&&this.block[1].y>=hig&&this.block[2].y>=hig&&this.block[3].y>=hig)){
            
            this.block[0].y=-300;
            this.block[0].x= window.innerWidth/2 - 150;
            this.block[1].x= window.innerWidth/2 + 150;
            this.block[1].y=-300;
            this.block[2].x= window.innerWidth/2 + 150;
            this.block[2].y=0;
            this.block[3].x= window.innerWidth/2 - 150;
            this.block[3].y=0;
            this.change=0;
            this.linecomlete=1;
            this.change=0;
            this.food = new figure(imfood, window.innerWidth/2, -400, 50, 50,5);
            spd++;
            
        } 
        

    }
    movement2(g){
        if(this.flag){
            startInterval(spd);
            this.flag=false;
            this.block[0].y=this.j+150;
            this.block[1].y=this.j+150;
            this.block[2].y=this.j+150;
            this.block[3].y=this.j+150;
            
        }
        if (change%4==0){
            this.block[0].x= window.innerWidth/2;;
            this.block[1].x=-100;
            this.block[2].x=-100;
            this.block[3].x=-100;
        }
        else if(change%4==1){
            this.block[1].x= window.innerWidth/2;;
            this.block[0].x=-100;
            this.block[2].x=-100;
            this.block[3].x=-100;
        }
        else if(change%4==2){
            this.block[2].x= window.innerWidth/2;;
            this.block[1].x=-100;
            this.block[0].x=-100;
            this.block[3].x=-100;
        }
        else if(change%4==3){
            this.block[3].x= window.innerWidth/2;;
            this.block[1].x=-100;
            this.block[2].x=-100;
            this.block[0].x=-100;
        }
        if((this.block[0].y>=hig&&this.block[1].y>=hig&&this.block[2].y>=hig&&this.block[3].y>=hig)){
            
            this.block[0].y=-300;
            this.block[1].y=-300;
            this.block[2].y=-300;
            this.block[3].y=-300;
            this.food = new figure(imfood, window.innerWidth/2, -400, 50, 50,5);
            spd++;
            startInterval(spd);
            
        }
    }
};

trap1=new trap(150);
trap2=new trap(-500);

let player = new figure(imyellow, window.innerWidth/2, 700, 50, 50,3);
figure.all.pop(); 

function update() {
    
    collision();
    draw();
    move();
    requestAnimationFrame(update);
}
function draw(){
    pen.clearRect(0, 0, board.width, board.height);
    pen.drawImage(player.image, player.x, player.y, player.width, player.height);
    for(let i=0;i<figure.all.length;i++){
        let obj=figure.all[i];
        pen.drawImage(obj.image, obj.x, obj.y, obj.width, obj.height);
    }
    
        pen.fillStyle = "white";
        pen.font = "24px Arial";
        pen.fillText("Score: " + score, 20, 40);
    
    
}
function move(){
    if(gravity && enter){
        vel+=0.25;
    }
    if(player.y<=window.innerHeight/2){
        velsc=-vel;
        if(vel>=0){
            velsc=0;
        }
    }
    player.y+=vel+velsc;
    for(let i=0;i<figure.all.length;i++){
        let obj=figure.all[i];
        obj.y+=velsc;
        
    }
    for (let i = 0; i < trap.all.length; i++) {
        if(i==0){
        trap.all[i].movement();
        }
        else{
        trap.all[i].movement2(trap.all[i].block[0].y);
        }
    }
}
function collision(){
    if(player.y+player.height>=window.innerHeight){
        console.log('game over');
        document.location.reload();
    }
    for(let i=0;i<figure.all.length;i++){
        let obj=figure.all[i];
        if(player.x + 3 < obj.x + obj.width - 3 &&
            player.x + player.width - 5 > obj.x + 3 &&
            player.y + 3 < obj.y + obj.height - 5 &&
            player.y + player.height - 5 > obj.y + 3){
                if(player.color==obj.color){
                }
                else{
                    if(obj.color==5){
                        score++;
                        figure.all.splice(i,1);
                        delete obj;
                        continue;
                    }
                    console.log('game over');
                    document.location.reload();
                }
            }
    }
}
    

