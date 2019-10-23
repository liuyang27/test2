var canvas = document.querySelector('canvas');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

var c =canvas.getContext('2d');


////***********c.fillRect(x,y,width,height);*****************
// c.fillStyle='rgba(255,0,0,0.5)';
// c.fillRect(100,100,100,100);
// c.fillStyle='rgba(0,0,255,0.5)';
// c.fillRect(400,100,100,100);
// c.fillStyle='rgba(0,255,0,0.5)';
// c.fillRect(300,300,100,100);

console.log(canvas);

////****************Line***************
// c.beginPath();
// c.moveTo(50,300);
// c.lineTo(300,100);
// c.lineTo(400,300);
// c.strokeStyle="blue";
// c.stroke();


////***************Arc /Circle*****************
// c.arc(x:Int,y:Int,r:Int,startAngle:
	// Float,endAngle:Float,
	// drawConterClockwies:bool(false));
	

// for(var i =0;i<300;i++){
	// var x=Math.random()*window.innerWidth;
	// var y=Math.random()*window.innerHeight;
	// c.beginPath();
	// c.arc(x,y,30,0,Math.PI*2,false);
	// c.strokeStyle="blue"
	// c.stroke();
// }


var mouse ={
	x:undefined,
	y:undefined,
}

var maxRadius = 40;
var minRadius = 2;

var corlorArray = ['#2C3E50','#E74C3C','#ECF0F1','#3498DB','#2980B9'];

window.addEventListener('mousemove',function(event){
	mouse.x=event.x;
	mouse.y=event.y;
	//console.log(mouse);
})

window.addEventListener('resize',function(){
	canvas.width=window.innerWidth;
	canvas.height=window.innerHeight;
	init();
})


function Circle(x,y,dx,dy,radius){
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.minRadius = radius;
	
	this.color=corlorArray[Math.floor(Math.random()*corlorArray.length)];
	
	this.draw = function(){
		c.beginPath();
		c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
		c.fillStyle=this.color;
		c.fill();
	}
	this.update = function(){
		if(this.x + this.radius >innerWidth || this.x - this.radius < 0){
			this.dx=-this.dx;
		}
			if(this.y + this.radius >innerHeight || this.y - this.radius < 0){
			this.dy=-this.dy;
		}
		this.x+=this.dx;
		this.y+=this.dy;	
		
		//interactivity
		if (mouse.x - this.x < 50 && mouse.x - this.x >-50
			&& mouse.y - this.y <50 && mouse.y - this.y>-50) {
				if(this.radius<maxRadius){
					this.radius +=1;
				}
			
		}else if(this.radius>this.minRadius){
			this.radius -=1;
		}
		
		
		
		this.draw();
	}
	
}



var circleArray=[];
function init(){
	circleArray=[];
	for(var i=0;i<500;i++){
		var radius = Math.random() * 3 + 1;
		var x = Math.random()* (window.innerWidth - radius*2) + radius;
		var y = Math.random()* (window.innerHeight- radius*2) + radius;
		var dx = (Math.random() -0.5);
		var dy = (Math.random() -0.5);

		circleArray.push(new Circle(x,y,dx,dy,radius));
		
	}
}
init();
//console.log(circleArray);



function animate(){
	requestAnimationFrame(animate);
	c.clearRect(1,1,innerWidth,innerHeight);

	for(var i=0;i<circleArray.length;i++){
		circleArray[i].update();
	}
	
}

animate();