var CHD = require("commonHandler");
cc.Class({
    extends: cc.Component,

    properties: {
        startNode: cc.Node,
        rankViewNode: cc.Node,
        againBtn: cc.Node,
        rankBtn: cc.Node,
        restartBtn: cc.Node,
        shareBtn: cc.Node,
        maxScoreLabel: cc.Label,
        scoreLabel: cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.rankBtn.on('touchstart', function(){
            this.rankViewNode.active = true;
        }, this);
        this.restartBtn.on('touchstart', function() {
            this.node.active = false;
        }, this);

        this.shareBtn.on('touchstart', function(){
            CHD.shareAppMessage('Redirection', 'redirection.jpg');
        }, this);

        this.againBtn.on('touchstart', function() {
            // this.node.active = true;
            // var event = new cc.Event.EventCustom("gameStart", true);
            // this.node.dispatchEvent(event);
            this.node.active = false;
        }, this);

        this.node.on('touchstart', function(){}, this);
    },

    setScore(score) {
        let maxScore = CHD.getMaxScore();
        if (maxScore < score) {
            maxScore = score;
            CHD.setMaxScore(score);
        }
        this.maxScoreLabel.string = "Best Score " + maxScore;
        this.scoreLabel.string = score;
    }

    // update (dt) {},
});
