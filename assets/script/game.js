var CHD = require("commonHandler");
cc.Class({
    extends: cc.Component,

    properties: {
        // graphics_node: cc.Graphics,

        scoreLable: cc.Label,
        soundBtn: cc.Node, 
        gameOverNode: cc.Node,

        ///////////////////////////////////////////
        gameNode: cc.Node,
        click_pad: cc.Node,
        horizontal_roadNode: cc.Node,
        vertical_roadNode: cc.Node,
        carNode: cc.Node,
        gasNode: cc.Node,

        bubble: cc.Prefab,
        
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.score = 0;
        this.isGameOver = false;
        this.soundOnTexture = cc.textureCache.addImage(cc.url.raw("resources/images/app/set/sound.png"));
        this.soundOffTexture = cc.textureCache.addImage(cc.url.raw("resources/images/app/set/mute.png"));

        this.backround1Texture = cc.textureCache.addImage(cc.url.raw("resources/images/game/background1.png"));
        this.backround2Texture = cc.textureCache.addImage(cc.url.raw("resources/images/game/background2.png"));

        //////////////////////////////////////

        this.first_time = true;

        this.delta_backround = 0;
        this.delta_car = 0;
        this.direction = 0;   //0 : car moved in horizontal road, 1: car moved in vertical road
        this.horizontal_road_x = 0;
        this.horizontal_road_y = -420,
        this.vertical_road_x = 0;
        this.vertical_road_y = 71;

        this.horizontal_roadNode.setPosition(this.horizontal_road_x, this.horizontal_road_y);
        this.vertical_roadNode.setPosition(this.vertical_road_x, this.vertical_road_y);

        this.roadpos_x = 0;
        this.roadpos_y = 0;

        this.carNode.rotation = 90;
        this.carNode.setPosition(cc.p(0, -420));
        this.carNode.scale = 0.8;

        this.car_direction = 1;// 1: right, up side, -1: left, down side

        this.gasNode.scaleX = 0.1;
        this.gasNode.scaleY = 0.2;

        // this.gas_circle = this.graphics_node;
        
        // this.gas_circle.clear();
        // this.gas_circle.fillColor = cc.hexToColor('#ff9a8e');
        // this.gas_circle.strokeColor = cc.hexToColor('#ff9a8e');
        // this.gas_circle.circle(0, 0, 50);
        // this.gas_circle.stroke();
        // this.gas_circle.fill();
        // this.gas_circle.close();

    },

    update(dt) {
        this.changeBackground(dt);

        if(!this.isGameOver)
            this.moveCar(dt);
    },

    moveCar(dt) {

        this.delta_car += dt;

        var speed_ratio = 0;
       
        speed_ratio = Math.ceil(this.score / 5) * 2;
        var move_offset = 0;
        var gas_move_offset = 0;
        if(this.direction == 0) {
            if(this.carNode.x >= (this.horizontal_roadNode.x + 420 - 87)) {
                // move_offset = -10;
                this.carNode.rotation = 270;
                this.car_direction = -1;
            }
            if(this.carNode.x <= (this.horizontal_roadNode.x - 420 + 87)) {
                // move_offset = 10;
                this.carNode.rotation = 90;
                this.car_direction = 1
            }
            if(this.car_direction == -1) {
                move_offset = -13 - speed_ratio;
                gas_move_offset = -(30 + 87);
            } else {
                move_offset = 13 + speed_ratio;
                gas_move_offset = 30 + 87;
            }
            this.carNode.setPosition(this.carNode.x + move_offset, this.carNode.y);
            this.gasNode.setPosition(this.carNode.x - gas_move_offset, this.carNode.y);
            if(this.gasNode.active == true)
                this.gasNode.active = false;
            else this.gameNode.active = true;
            
        }
        if(this.direction == 1) {
            if(this.carNode.y >= (this.vertical_roadNode.y + 420 - 87)) {
                this.carNode.rotation = 180;
                this.car_direction = -1;
            }
            if(this.carNode.y <= (this.vertical_roadNode.y - 420 + 87)) {
                this.carNode.rotation = 0;
                this.car_direction = 1;
            }
            if(this.car_direction == -1) {
                move_offset = -13 - speed_ratio;
                gas_move_offset = -(30 + 87);
            } else {
                move_offset = 13 + speed_ratio;
                gas_move_offset = 30 + 87;
            }
            this.carNode.setPosition(this.carNode.x, this.carNode.y + move_offset);
            this.gasNode.setPosition(this.carNode.x, this.carNode.y - gas_move_offset);

        }
        if(this.delta_car < 0.1)
            this.gasNode.active = false;
        else {
            this.delta_car = 0;
            this.gasNode.active = true;
        }

    },

    changeBackground(dt) {
        this.delta_backround += dt;
        if(this.delta_backround < 0.5) {
            this.gameNode.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.backround1Texture);
        }
        if((this.delta_backround > 0.5) && (this.delta_backround < 1)) {
            this.gameNode.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.backround2Texture);
        }
        if(this.delta_backround > 1) {
            this.delta_backround = 0;
        }
    },

    createPosition() {
        var random_decimal = Math.random() - 0.5;
        if(this.direction == 1) {
            this.roadpos_y = this.horizontal_roadNode.y + 420 + 71;
            if(random_decimal == 0)
                this.roadpos_x = this.horizontal_roadNode.x;
            if(random_decimal > 0)
                this.roadpos_x = Math.ceil(random_decimal * 840 + this.horizontal_roadNode.x - 71);
            if(random_decimal < 0)
                this.roadpos_x = Math.ceil(random_decimal * 840 + this.horizontal_roadNode.x + 71);
            
        } else {
            this.roadpos_x = this.vertical_roadNode.x + 420 + 71;
            if(random_decimal == 0)
                this.roadpos_y = this.vertical_roadNode.y;
            if(random_decimal > 0)
                this.roadpos_y = Math.ceil(random_decimal * 840 + this.vertical_roadNode.y - 71);
            if(random_decimal < 0)
                this.roadpos_y = Math.ceil(random_decimal * 840 + this.vertical_roadNode.y + 71);

        }
        
        return cc.p(this.roadpos_x, this.roadpos_y);
    },

    start () {
        this.click_pad.on("touchstart", function() {

            var offset_x = 0;
            var offset_y = 0;
            var dest_x = 0;
            var dest_y = 0;

            if (this.direction == 1) {//vertical road

                if(Math.abs(this.carNode.y - this.horizontal_roadNode.y) > 50) {
                    this.isGameOver = true;
                    if (CHD.getSoundStatus()) {
                        cc.audioEngine.play(cc.url.raw('resources/sounds/wrong.mp3'), false, 1);
                    }

                    // this.carNode.stopAllActions();
                    
                    var bubble = cc.instantiate(this.bubble);
                    bubble.setPosition(this.carNode.x + 71 + 50, this.carNode.y);
                    bubble.parent = this.node;
                    bubble.scale = 0.3;
                    bubble.rotation = 90;
                    bubble.runAction(cc.sequence(cc.scaleTo(0.5, 0.5), cc.removeSelf()));

                    this.carNode.runAction(cc.moveBy(0.5, 71 + 100, 0));
                    this.carNode.runAction(cc.rotateBy(0.5, 180));
                    this.carNode.runAction(cc.sequence(cc.scaleTo(0.5, 0.1), cc.callFunc(this.gameOver, this)));
                } else {
                    if (CHD.getSoundStatus()) {
                        cc.audioEngine.play(cc.url.raw('resources/sounds/right.mp3'), false, 1);
                    }

                    this.score ++;
                    this.scoreLable.string = this.score;
    
                    dest_x = this.vertical_roadNode.x;
                    dest_y = this.vertical_roadNode.y
                    this.vertical_roadNode.setPosition(this.createPosition());
                    offset_x = this.horizontal_roadNode.x - dest_x;
                    offset_y = this.horizontal_roadNode.y - dest_y;
    
                    this.carNode.setPosition(cc.p(dest_x + 71 + 87, this.horizontal_roadNode.y));
                    this.carNode.rotation = 90;
                    this.car_direction = 1;
    
                    this.horizontal_roadNode.runAction(cc.moveTo(0.5, dest_x, dest_y));
                    this.vertical_roadNode.runAction(cc.moveTo(0.5, this.vertical_roadNode.x - offset_x, this.vertical_roadNode.y - offset_y));
                    this.carNode.runAction(cc.moveTo(0.5, this.carNode.x - offset_x, this.carNode.y - offset_y));
                }

                
            } else {///horizontal road

                if(Math.abs(this.carNode.x - this.vertical_roadNode.x) > 50) {
                    if (CHD.getSoundStatus()) {
                        cc.audioEngine.play(cc.url.raw('resources/sounds/wrong.mp3'), false, 1);
                    }
                    this.isGameOver = true;

                    // this.carNode.stopAllActions();
                    
                    var bubble = cc.instantiate(this.bubble);
                    bubble.setPosition(this.carNode.x, this.carNode.y + 71 + 50);
                    bubble.parent = this.node;
                    bubble.scale = 0.3;
                    bubble.runAction(cc.sequence(cc.scaleTo(0.5, 0.5), cc.removeSelf()));

                    this.carNode.runAction(cc.moveBy(0.5, 0, 71 + 100));
                    this.carNode.runAction(cc.rotateBy(0.5, 180));
                    this.carNode.runAction(cc.sequence(cc.scaleTo(0.5, 0.1), cc.callFunc(this.gameOver, this)));
                } else {
                    if (CHD.getSoundStatus()) {
                        cc.audioEngine.play(cc.url.raw('resources/sounds/right.mp3'), false, 1);
                    }

                    this.score ++;
                    this.scoreLable.string = this.score;
    
                    dest_x = this.horizontal_roadNode.x;
                    dest_y = this.horizontal_roadNode.y;
                    this.horizontal_roadNode.setPosition(this.createPosition());
                    offset_x = this.vertical_roadNode.x - dest_x;
                    offset_y = this.vertical_roadNode.y - dest_y;
    
                    this.carNode.setPosition(cc.p(this.vertical_roadNode.x, dest_y + 71 + 87));
                    this.carNode.rotation = 0;
                    this.car_direction = 1;
                    if(this.first_time) {
                        this.first_time = false;
                    } else {
                        this.horizontal_roadNode.runAction(cc.moveTo(0.5, this.horizontal_roadNode.x - offset_x, this.horizontal_roadNode.y - offset_y));
                        this.vertical_roadNode.runAction(cc.moveTo(0.5, dest_x, dest_y));
                        this.carNode.runAction(cc.moveTo(0.5, this.carNode.x - offset_x, this.carNode.y - offset_y));
                    }
                }
                
            }


            if(this.direction == 0)
                this.direction = 1;
            else if(this.direction == 1) this.direction = 0;
            

        }, this),

       
        this.isloadSoundOn = true;
        if (!CHD.getSoundStatus()) {
            this.soundBtn.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.soundOffTexture);
            // cc.audioEngine.pauseAll();
        } else {
            cc.audioEngine.play(cc.url.raw('resources/sounds/HappyLevel.mp3'), true, 1);
            this.isloadSoundOn = false;
        }

        this.soundBtn.on('touchstart', function(){
            let isSound = CHD.getSoundStatus();
            isSound = !isSound;
            if (this.isloadSoundOn) {
                this.isloadSoundOn = false;
                cc.audioEngine.play(cc.url.raw('resources/sounds/HappyLevel.mp3'), true, 1);                
            }
            if (isSound) {
                this.soundBtn.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.soundOnTexture);
                cc.audioEngine.resumeAll();
            } else {
                this.soundBtn.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(this.soundOffTexture);
                cc.audioEngine.pauseAll();
            }
            CHD.setSoundStatus(isSound);
        }, this);

        this.node.on('touchstart', function(){}, this);
    },

    init() {
        this.score = 0;
        this.isGameOver = false;
        this.scoreLable.string = this.score;
        this.isComplex = false;
       
        ////////////////////////////////////////////
        this.first_time = true;

        this.delta_backround = 0;
        this.delta_car = 0;
        this.direction = 0;   //0 : car moved in horizontal road, 1: car moved in vertical road
        this.horizontal_road_x = 0;
        this.horizontal_road_y = -420,
        this.vertical_road_x = 0;
        this.vertical_road_y = 71;

        this.horizontal_roadNode.setPosition(this.horizontal_road_x, this.horizontal_road_y);
        this.vertical_roadNode.setPosition(this.vertical_road_x, this.vertical_road_y);

        this.roadpos_x = 0;
        this.roadpos_y = 0;

        this.carNode.rotation = 90;
        this.carNode.setPosition(cc.p(0, -420));
        this.carNode.scale = 0.8;


        this.car_direction = 1;// 1: right, up side, -1: left, down side

        if (CHD.getSoundStatus()) {
            cc.audioEngine.pauseAll();
            cc.audioEngine.play(cc.url.raw('resources/sounds/HappyLevel.mp3'), true, 1);
        }

    },

    runTimeAction() {
        this.timeNode.scale = 1;
        this.timeNode.stopAllActions();
        let s = cc.scaleTo(3, 0, 1);
        this.timeNode.runAction(cc.sequence(s, cc.callFunc(this.gameOver, this)));
    },

    gameOver() {

        this.node.active = false;
        this.gameOverNode.active = true;
        this.gameOverNode.getComponent('gameOver').setScore(this.score);
    }
});
