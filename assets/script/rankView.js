var CHD = require("commonHandler");
cc.Class({
    extends: cc.Component,

    properties: {
        subCanvas: {
            default: null,
            type: cc.Sprite
        },
        backBtn: {
            default: null,
            type: cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

    },

    start () {
        if (window.wx != undefined) {
            window.wx.showShareMenu({withShareTicket: true});
            this.tex = new cc.Texture2D();
            window.sharedCanvas.width = 1080;
            window.sharedCanvas.height = 1920;
        }
        this.backBtn.on('touchstart', function(){
            this.node.active = false;
        }, this);
       
        this.node.on('touchstart', function(){});
    },

    _updateSubCanvas() {
        if (window.sharedCanvas != undefined && this.tex) {
            this.tex.initWithElement(window.sharedCanvas);
            this.tex.handleLoadedTexture();
            this.subCanvas.spriteFrame = new cc.SpriteFrame(this.tex);
        }
    },
    update() {
        this._updateSubCanvas();
    },

    onEnable() {
        CHD.rankList();
        // CHD.groupRankList();
    }
});