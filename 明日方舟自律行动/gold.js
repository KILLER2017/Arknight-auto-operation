if(!requestScreenCapture()){
    toast("请求截图失败");
    exit();
}

launchApp("明日方舟")

setScreenMetrics(1080, 2340)

var small_start_action = images.read("/sdcard/脚本/明日方舟自律行动/img/small_start_action.jpg");
var large_start_action = images.read("/sdcard/脚本/明日方舟自律行动/img/large_start_action.jpg");
var in_battle = images.read("/sdcard/脚本/明日方舟自律行动/img/in_battle.jpg");
var battle_completion = images.read("/sdcard/脚本/明日方舟自律行动/img/battle_completion.jpg");
var yaoji = images.read("/sdcard/脚本/明日方舟自律行动/img/yaoji.jpg");

var friendList1 = images.read("/sdcard/脚本/明日方舟自律行动/img/friend_list_1.png");
var friendList2 = images.read("/sdcard/脚本/明日方舟自律行动/img/friend_list_2.png");
var friendList3 = images.read("/sdcard/脚本/明日方舟自律行动/img/friend_list_3.png");
var friendList4 = images.read("/sdcard/脚本/明日方舟自律行动/img/friend_list_4.png");
var friendList5 = images.read("/sdcard/脚本/明日方舟自律行动/img/friend_list_5.png");
var friendList6 = images.read("/sdcard/脚本/明日方舟自律行动/img/friendList7.png");

function getCurrentDate() {
    var date=new Date();
    var year=date.getFullYear();
    var month=date.getMonth()+1;
    var day=date.getDate();
    return year+"-"+formatZero(month)+"-"+formatZero(day);
}

function formatZero(n){
    if(n>=0&&n<=9){
        return "0"+n;
    }else{
        return n;
    }
}

var storage = $storages.create("ABC");
// storage.put("a", 123);
let key = getCurrentDate()
let count = storage.get(key)

if(typeof(count) == "undefined"){
    count = 0
} 

if (count >= 10) {
    toast("今日信用获取已达上限")
    exit()
}



// 点击首页的好友按钮
function clickFriendList1() {
    let btn = {
        "leftTop": {
            "x": 579,
            "y": 864
        },
        "rightBottom": {
            "x": 589,
            "y": 874
        }
    }
    clickRegion(btn)
}

// 点击我的信息页中的好友列表
function clickFriendList2() {
    let btn = {
        "leftTop": {
            "x": 45,
            "y": 300
        },
        "rightBottom": {
            "x": 300,
            "y": 400
        }
    }
    clickRegion(btn)
}

function clickFriend() {
    let btn = {
        "leftTop": {
            "x": 1436,
            "y": 224
        },
        "rightBottom": {
            "x": 1563,
            "y": 300
        }
    }
    clickRegion(btn)
}

function clickNext() {
    let btn = {
        "leftTop": {
            "x": 2087,
            "y": 889
        },
        "rightBottom": {
            "x": 2295,
            "y": 977
        }
    }
    clickRegion(btn)
}

function clickRegion(region) {
    let sleepTime = random(500, 3000)
    sleep(sleepTime)
    var x = random(region.leftTop.x, region.rightBottom.x)
    var y = random(region.leftTop.y, region.rightBottom.y)
    console.log("点击：" + x + "," + y)
    press(x, y, 300)

}

function getStatus() {
    
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
    p = findImage(img, friendList6);
    if (p) {
        img.recycle();
        return "可以领取信赖";
    }




    img.recycle();
    return p;
}

let num = 0
let limit = 1
while (num < limit) {
    let nowStatus = getStatus();
    toast(nowStatus)
    console.info(nowStatus)
    switch (nowStatus) {
        case "首页":
            console.log("首页")
            clickFriendList1()
            break;
        case "个人名片":
            console.log("个人名片")
            clickFriendList2()
            break;
        case "好友列表":
            console.log("好友列表")
            clickFriend()
            break;
        case "可以领取信赖":
            console.log("可以领取信赖")
            clickNext();
        case "重复领取信用":
            console.log("重复领取信用")
            //toast("重复领取信用，提前结束")
            //limit = num
            break;
        case "不能拜访":
            console.log("不能拜访")
            toast("不能拜访，提前结束")
            limit = num;
            break;
        default:
            sleep(3000);
    }
    sleep(500)
}

small_start_action.recycle()
large_start_action.recycle()
in_battle.recycle()
battle_completion.recycle()
yaoji.recycle()

friendList1.recycle()
friendList2.recycle()
friendList3.recycle()
friendList4.recycle()
friendList5.recycle()
friendList6.recycle()
toast("代理结束")