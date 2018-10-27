var CHD = require("commonHandler");
cc.Class({
    extends: cc.Component,

    properties: {
        gameNode: cc.Node,
        startBtn: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.gameStorageCheck('watermaxScore', 0);
        this.gameStorageCheck('isSound', 'on');

        this.node.on('gameStart', function(){
            this.gameNode.active = true;
            this.gameNode.getComponent('game').init();

        }, this);
        this.startBtn.on('touchstart', function() {
            this.node.emit('gameStart');
        }, this);

        CHD.setInitValue();

    },

    gameStorageCheck(key, value) {
        var ls = cc.sys.localStorage;
        var r = ls.getItem(key);
        if (r == "" || r == null) {
            ls.setItem(key, value);
        }
    },

    // update (dt) {},
});
