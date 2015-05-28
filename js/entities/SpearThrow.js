//this is all the code for the special ablility spear throw.
game.SpearThrow = me.Entity.extend({
    init: function(x, y, settings, facing){
        this._super(me.Entity, 'init', [x, y, {
                image: "spear",
                //here's all the dimensions for the spear.
                width: 32,
                height: 64,
                spritewidth: "32",
                spriteheight: "64",
                getShape: function(){
                    return (new me.Rect(0, 0, 32, 64)).toPolygon();
                }
        }]);
        //here's the update stuff saying how fast the spear will go.
        this.alwaysUpdate = true;
        this.attack = game.data.ablility3*3;
        this.body.setVelocity(10, 0);
        this.addAnimation();
        //makes the spear go the way your player is facing.
        this.type = "spear";
        this.facing = facing;
        this.renderable.setCurrentAnimation("walk");   
    },
    addAnimation: function(){
      this.renderable.addAnimation("walk", [9, 10, 11, 12, 13, 14, 15, 16, 17], 80);  
    },
    
    //the update function for spear throw is here
    update: function(delta){
        if(this.facing === "left"){
            this.flipX(true);
            //here's a lot of timer stuff for the spear.
            this.body.vel.x -= this.body.accel.x * me.timer.tick;
        }else{
            this.flipX(false);
            this.body.vel.x += this.body.accel.x * me.timer.tick;
        }
        //this is code for collision because collision is important
        me.collision.check(this, true, this.collideHandler.bind(this), true);
        //update delta which is a keyword in update functions        
        this.body.update(delta);
        //the return true function ends the update function.
        this._super(me.Entity, "update", [delta]);
        return true;    
    },

    collideHandler: function(response) {
        //here's code for killing a creep with the spear. It's like, important man...
        if (response.b.type === 'EnemyBaseEntity' || response.b.type === 'EnemyCreep') {
            response.b.loseHealth(game.data.spearAttack);
            me.game.world.removeChild(this);
        }
    }
});