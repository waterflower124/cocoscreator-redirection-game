"use strict";
cc._RF.push(module, 'ebc2bQjkRNDeLDyrBxpBZfa', 'zoomAnimBtn');
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