game.PlayScreen = me.ScreenObject.extend({
	/**
	 *  action to perform on state change
	 */
	onResetEvent: function() {
		// reset the score
		game.data.score = 0;
                //calling upon the level we made in tiled.
                me.levelDirector.loadLevel("level01");
                //reseting player
                this.resetPlayer(0, 420);
                //calling up on game timer manager
                var gameTimerManager = me.pool.pull("GameTimerManager", 0, 0, {});
                me.game.world.addChild(gameTimerManager, 0);
                //calling upon hero death manager
                var heroDeathManager = me.pool.pull("HeroDeathManager", 0, 0, {});
                me.game.world.addChild(heroDeathManager, 0);
                //calling upon exp manager
                var experienceManager = me.pool.pull("ExperienceManager", 0, 0, {});
                me.game.world.addChild(experienceManager, 0);
                //calling upon spend gold 
                var spendGold = me.pool.pull("SpendGold", 0, 0, {});
                me.game.world.addChild(spendGold, 0);
                //caling upon minimap
                game.data.minimap = me.pool.pull("minimap", 10, 10, {});
                me.game.world.addChild(game.data.minimap, 30);
                //starts us off with 10 gold
                game.data.gold = 10;
                //binding keys for attack and all that jazz
                me.input.bindKey(me.input.KEY.B, "buy");
                me.input.bindKey(me.input.KEY.Q, "skill1");
                me.input.bindKey(me.input.KEY.W, "skill2");
                me.input.bindKey(me.input.KEY.E, "skill3");
                me.input.bindKey(me.input.KEY.RIGHT, "right");
                me.input.bindKey(me.input.KEY.LEFT, "left");
                me.input.bindKey(me.input.KEY.SPACE, "jump");
                me.input.bindKey(me.input.KEY.A, "attack");

		// add our HUD to the game world
		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD);
	},


	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		// remove the HUD from the game world
		me.game.world.removeChild(this.HUD);
	},
        //reseting player and everything else.
        resetPlayer: function(x, y){
            game.data.player = me.pool.pull("player", x, y, {});
            me.game.world.addChild(game.data.player, 5);
            
            game.data.miniPlayer = me.pool.pull("miniplayer", x, y, {});
            me.game.world.addChild(game.data.miniPlayer, 31);
        }
});
