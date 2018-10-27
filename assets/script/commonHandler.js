
var commonHandler = {
    isSound: true,
    maxScore:0,

    getScale(){
        var screenSize = cc.sys.windowPixelResolution;
        return screenSize.width / screenSize.height / 0.5633;
    },

    setSoundStatus(status) {
        if (status) {
            cc.sys.localStorage.setItem('isSound', 'on');
        } else {
            cc.sys.localStorage.setItem('isSound', 'off');
        }
        this.isSound = status;
    },
    getSoundStatus() {
        // return false;
        return this.isSound;
    },    
    getMaxScore() {
        return this.maxScore;
    },

    setMaxScore(score) {
        this.maxScore = score;
        cc.sys.localStorage.setItem('watermaxScore', score);
        this.submitScore(score);
    },
    setInitValue() {
        let str1 = cc.sys.localStorage.getItem('isSound');
        if (str1 == 'on') {
            this.isSound = true;
        } else if (str1 == 'off') {
            this.isSound = false;
        }
        this.maxScore = parseInt(cc.sys.localStorage.getItem('watermaxScore'));
    },

    shareAppMessage(title, shareImg) {
        if (window.wx != undefined) {
            console.log('share function');
            window.wx.shareAppMessage({title: title, imageUrl: 'res/raw-assets/resources/images/' + shareImg, query: "from=group"});
        }
    },
    submitScore(score){
        if (window.wx != undefined) {
            window.wx.postMessage({
                messageType: "sendScore",
                score: score,
            });
        } else {
            cc.log("fail: x_total : " + score)
        }
    },
    rankList() {
        if (window.wx != undefined) {
            window.wx.postMessage({
                messageType: "rankList",
            });
        } else {
            cc.log("fail rank list:");
        }
    },

    groupRankList() {
        if (window.wx != undefined) {                
            window.wx.shareAppMessage({
                success: (res) => {
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