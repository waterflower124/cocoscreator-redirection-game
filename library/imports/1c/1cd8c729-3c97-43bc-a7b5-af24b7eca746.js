"use strict";
cc._RF.push(module, '1cd8ccpPJdDvKe1ryS37KdG', 'scaleY');
// script/lib/scaleY.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad: function onLoad() {
        var screenSize = cc.sys.windowPixelResolution;
        var rY = screenSize.width / screenSize.height * 1.775;
        this.node.scaleY = rY;
    },
    start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();