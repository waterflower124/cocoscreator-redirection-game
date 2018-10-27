(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/lib/zoomBtn.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '516dc72lntAabZIS7E3yqGc', 'zoomBtn', __filename);
// script/lib/zoomBtn.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad: function onLoad() {},
    start: function start() {

        this.node.on("touchstart", function () {
            this.startZoom();
        }, this);
    },
    startZoom: function startZoom() {
        this.node.pauseSystemEvents(true);
        var _stepX1 = cc.scaleTo(0.1, 0.8, 0.8).easing(cc.easeCubicActionOut());
        var _stepX2 = cc.scaleTo(0.1, 1).easing(cc.easeCubicActionOut());
        var se = cc.sequence(_stepX1, _stepX2, cc.callFunc(this.endZoom, this));
        this.node.runAction(se);
    },
    endZoom: function endZoom() {
        this.node.resumeSystemEvents(true);
        this.node.dispatchEvent(new cc.Event.EventCustom("btnClicked", true));
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
        //# sourceMappingURL=zoomBtn.js.map
        