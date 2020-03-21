function Rect(options){
	this._init(options);
}
Rect.prototype = {
	constructor:Rect,
	_init:function(options){
		var options = options || {};
		this.X = options.X || 0;
		this.Y = options.Y || 0;
		this.W = options.W || 0;
		this.H = options.H || 0;
		this.fillStyle = options.fillStyle || "000";
		this.strokeStyle = options.strokeStyle || "fff";
	},
	render:function(ctx){
		ctx.beginPath();
		ctx.fillStyle = this.fillStyle;
		ctx.strokeStyle = this.strokeStyle;
		ctx.rect(this.X,this.Y,this.W,this.H);
		ctx.fill();
		ctx.stroke();
	}
}