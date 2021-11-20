var small_start_action = images.read("/sdcard/脚本/Arknight/img/small_start_action.jpg");
var large_start_action = images.read("/sdcard/脚本/Arknight/img/large_start_action.jpg");
var in_battle = images.read("/sdcard/脚本/Arknight/img/in_battle.jpg");
var battle_completion = images.read("/sdcard/脚本/Arknight/img/battle_completion.jpg");
var yaoji = images.read("/sdcard/脚本/Arknight/img/yaoji.jpg");

var friendList1 = images.read("/sdcard/脚本/Arknight/img/friend_list_1.png");
var friendList2 = images.read("/sdcard/脚本/Arknight/img/friend_list_2.png");
var friendList3 = images.read("/sdcard/脚本/Arknight/img/friend_list_3.png");
var friendList4 = images.read("/sdcard/脚本/Arknight/img/friend_list_4.png");
var friendList5 = images.read("/sdcard/脚本/Arknight/img/friend_list_5.png");

var scene = {}

scene.getStatus = function() {
    
    let img = captureScreen();
    //let img = $automator.takeScreenshot();
    let p = findImage(img, small_start_action);

    if (p) {
        img.recycle();
        return "准备战斗";
    }
    p = findImage(img, large_start_action);
    if (p) {
        img.recycle();
        return "开始行动";
    }
    p = findImage(img, in_battle);
    if (p) {
        img.recycle();
        return "战斗中";
    }
    p = findImage(img, battle_completion);
    if (p) {
        img.recycle();
        return "战斗结束";
    }
    p = findImage(img, yaoji);
    if (p) {
        img.recycle();
        return "理智不足";
    }
    p = findImage(img, friendList1);
    if (p) {
        img.recycle();
        return "首页";
    }
    p = findImage(img, friendList2);
    if (p) {
        img.recycle();
        return "个人名片";
    }
    p = findImage(img, friendList3);
    if (p) {
        img.recycle();
        return "好友列表";
    }
    p = findImage(img, friendList4);
    if (p) {
        img.recycle();
        return "重复领取信用";
    }
    p = findImage(img, friendList5);
    if (p) {
        img.recycle();
        return "不能拜访";
    }



    img.recycle();
    return p;
}

module.export = scene