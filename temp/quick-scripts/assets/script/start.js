(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/start.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '292bdKkq3hGa68pZj2eqRHm', 'start', __filename);
// script/start.js

'use strict';

var CHD = require("commonHandler");
cc.Class({
    extends: cc.Component,

    properties: {
        gameNode: cc.Node,
        startBtn: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {
        this.gameStorageCheck('watermaxScore', 0);
        this.gameStorageCheck('isSound', 'on');

        this.node.on('gameStart', function () {
            this.gameNode.active = true;
            this.gameNode.getComponent('game').init();
        }, this);
        this.startBtn.on('touchstart', function () {
            this.node.emit('gameStart');
        }, this);

        CHD.setInitValue();
    },
    gameStorageCheck: function gameStorageCheck(key, value) {
        var ls = cc.sys.localStorage;
        var r = ls.getItem(key);
        if (r == "" || r == null) {
            ls.setItem(key, value);
        }
    }
}

// update (dt) {},
);

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
        //# sourceMappingURL=start.js.map
        