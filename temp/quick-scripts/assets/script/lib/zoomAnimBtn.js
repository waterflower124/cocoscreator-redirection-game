(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/lib/zoomAnimBtn.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ebc2bQjkRNDeLDyrBxpBZfa', 'zoomAnimBtn', __filename);
// script/lib/zoomAnimBtn.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        duration: 1,
        scale: 0.9

    },

    onLoad: function onLoad() {
        this.vibrateShape();
    },
    start: function start() {},
    update: function update(dt) {},
    vibrateShape: function vibrateShape() {
        var m_stepX1 = cc.scaleTo(this.duration, this.scale);
        var m_stepX2 = cc.scaleTo(this.duration, 1);
        var se = cc.sequence(m_stepX1, m_stepX2);

        var re = cc.repeatForever(se);
        this.node.runAction(re);
    }
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
        //# sourceMappingURL=zoomAnimBtn.js.map
        