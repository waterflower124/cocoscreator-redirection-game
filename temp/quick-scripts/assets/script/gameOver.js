(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/gameOver.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '382c49j/05E34HHTEh2zKJo', 'gameOver', __filename);
// script/gameOver.js

'use strict';

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

    start: function start() {
        this.rankBtn.on('touchstart', function () {
            this.rankViewNode.active = true;
        }, this);
        this.restartBtn.on('touchstart', function () {
            this.node.active = false;
        }, this);

        this.shareBtn.on('touchstart', function () {
            CHD.shareAppMessage('Redirection', 'redirection.jpg');
        }, this);

        this.againBtn.on('touchstart', function () {
            // this.node.active = true;
            // var event = new cc.Event.EventCustom("gameStart", true);
            // this.node.dispatchEvent(event);
            this.node.active = false;
        }, this);

        this.node.on('touchstart', function () {}, this);
    },
    setScore: function setScore(score) {
        var maxScore = CHD.getMaxScore();
        if (maxScore < score) {
            maxScore = score;
            CHD.setMaxScore(score);
        }
        this.maxScoreLabel.string = "Best Score " + maxScore;
        this.scoreLabel.string = score;
    }

    // update (dt) {},

});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=gameOver.js.map
        