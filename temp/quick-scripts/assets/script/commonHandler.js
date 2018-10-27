(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/commonHandler.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '4049ae1uflFCqD3y/plviuZ', 'commonHandler', __filename);
// script/commonHandler.js

'use strict';

var commonHandler = {
    isSound: true,
    maxScore: 0,

    getScale: function getScale() {
        var screenSize = cc.sys.windowPixelResolution;
        return screenSize.width / screenSize.height / 0.5633;
    },
    setSoundStatus: function setSoundStatus(status) {
        if (status) {
            cc.sys.localStorage.setItem('isSound', 'on');
        } else {
            cc.sys.localStorage.setItem('isSound', 'off');
        }
        this.isSound = status;
    },
    getSoundStatus: function getSoundStatus() {
        // return false;
        return this.isSound;
    },
    getMaxScore: function getMaxScore() {
        return this.maxScore;
    },
    setMaxScore: function setMaxScore(score) {
        this.maxScore = score;
        cc.sys.localStorage.setItem('watermaxScore', score);
        this.submitScore(score);
    },
    setInitValue: function setInitValue() {
        var str1 = cc.sys.localStorage.getItem('isSound');
        if (str1 == 'on') {
            this.isSound = true;
        } else if (str1 == 'off') {
            this.isSound = false;
        }
        this.maxScore = parseInt(cc.sys.localStorage.getItem('watermaxScore'));
    },
    shareAppMessage: function shareAppMessage(title, shareImg) {
        if (window.wx != undefined) {
            console.log('share function');
            window.wx.shareAppMessage({ title: title, imageUrl: 'res/raw-assets/resources/images/' + shareImg, query: "from=group" });
        }
    },
    submitScore: function submitScore(score) {
        if (window.wx != undefined) {
            window.wx.postMessage({
                messageType: "sendScore",
                score: score
            });
        } else {
            cc.log("fail: x_total : " + score);
        }
    },
    rankList: function rankList() {
        if (window.wx != undefined) {
            window.wx.postMessage({
                messageType: "rankList"
            });
        } else {
            cc.log("fail rank list:");
        }
    },
    groupRankList: function groupRankList() {
        if (window.wx != undefined) {
            window.wx.shareAppMessage({
                success: function success(res) {
                    if (res.shareTickets != undefined && res.shareTickets.length > 0) {
                        console.log(res.shareTicket);
                        window.wx.postMessage({
                            messageType: 'groupList',
                            shareTicket: res.shareTickets[0]
                        });
                    }
                }
            });
        }
    }

    // playSound:function(name) {
    //     if (this.isSound) {
    //         if (window.wx != undefined) {
    //             // name = 'crash';
    //             let audio = wx.createInnerAudioContext();
    //             audio.src = "res/raw-assets/resources/sounds/" + name + ".mp3"
    //             audio.play()
    //         }
    //     }
    // },

};
module.exports = commonHandler;

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
        //# sourceMappingURL=commonHandler.js.map
        