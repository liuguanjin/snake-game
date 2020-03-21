const LEFT=37;
const UP=38;
const RIGHT=39;
const DOWM=40;
function Snake(options,canvas){
	this._init(options,canvas);
}
Snake.prototype = {
	constructor:Snake,
	_init:function(options,canvas){
		var options = options || {};
		this.dir = options.dir || RIGHT;
		this.len = options.len || 4;
		this.wh = options.wh || 20;
		this.color = options.color || "#000";
		this.snakeBady = [];
		this.isChangeDir = options.isChangeDir || true;
		for (var i = 0; i < this.len; i++) {
			var rect = new Rect({
				X:i * this.wh,
				Y:0,
				W:this.wh,
				H:this.wh,
				fillStyle:this.color
			});
			this.snakeBady.splice(0,0,rect);
		}
		this.head = this.snakeBady[0];
		this.head.fillStyle = "red";
		this.creatFood();
	},
	creatFood:function(){
		var maxHor = parseInt(canvas.width/ this.wh);  
		var maxVir = parseInt(canvas.height/ this.wh);  
		var isCover = true;
		while(isCover){
			isCover=false;
			var foodX = parseInt(Math.random()*maxHor)*this.wh;
			var foodY = parseInt(Math.random()*maxVir)*this.wh;
			for(var i in this.snakeBady){
				var obj=this.snakeBady[i];
				if (obj.X == foodX
					&&obj.Y == foodY) {
					isCover = true;
					break;
				};
			};
		}
		this.food = new Rect({
			X:foodX,
			Y:foodY,
			W:this.wh,
			H:this.wh,
			fillStyle:this.color
		})
	},
	draw:function(ctx,canvas){
		canvas.width = canvas.width;
		canvas.height = canvas.height;
		for (var i in this.snakeBady) {
			this.snakeBady[i].render(ctx);
		}
		this.food.render(ctx);
	},
	run:function(ctx,canvas){
		var that = this;
		var timer=setInterval(function(){
			var x=that.head.X;
			var Y=that.head.Y;
			var rect = new Rect({
				X:x,
				Y:Y,
				W:that.wh,
				H:that.wh,
				fillStyle:that.color
			});
			that.snakeBady.splice(1,0,rect);
			if (that.dir==LEFT) {
				that.head.X-=that.wh;
			}else if(that.dir==RIGHT){
				that.head.X+=that.wh;
			}else if(that.dir==UP){
				that.head.Y-=that.wh;
			}else{
				that.head.Y+=that.wh;
			}
			if (that.head.X == that.food.X
				&&that.head.Y == that.food.Y){
				that.creatFood();
			}else{
				that.snakeBady.pop();
			};
			that.draw(ctx,canvas);
			that.isChangeDir = true;
			var isOver = that.gameIsOver(canvas);
			if (isOver) {
				clearInterval(timer);
				if (confirm("游戏结束，是否重新开始")) {
					location.reload();
				}
			}
		},250)
	},
	changeDir:function(dir){
		if ((this.dir==LEFT&&dir==RIGHT)
			||(this.dir==RIGHT&&dir==LEFT)
			||(this.dir==UP&&dir==DOWM)
			||(this.dir==DOWM&&dir==UP)) {
			return;
		};
		if (this.isChangeDir) {
			this.dir = dir;
			this.isChangeDir = false;	
		};
	},
	gameIsOver:function(canvas){
		if (this.head.X<0
			||this.head.X>=canvas.width
			||this.head.Y<0
			||this.head.Y>canvas.height) {
			return true;
		};
		for (var i = 1; i < this.snakeBady.length; i++) {
			if (this.head.X == this.snakeBady[i].X
				&& this.head.Y == this.snakeBady[i].Y) {
				return true;
			}
		};
		return false;
	}
}