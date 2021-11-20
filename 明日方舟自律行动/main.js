var limit = rawInput("请输入代理次数", 99)
auto.waitFor()
// var limit = 2

if(!requestScreenCapture()){
    toast("请求截图失败");
    exit();
}

// 常量配置
var startGameRegion = [1140, 987, 1194, 1045]
var shortcutRegion = [335, 26, 469, 79]
var homeShortcutRegion = [325, 391, 369, 437]

var terminalRegion = [1696, 182, 1887, 282]
var lastFightRegion = [1665, 799, 2072, 923]
var small_action_btn = [2020, 983, 2260, 1000]
var large_action_btn = [1800, 610, 1900, 900]
var battle_completion_btn = [940, 340, 1700, 630]


var personInfo = [579, 864, 589, 874]
var friendList = [45, 300, 300, 400]

var friendRoom = [1436, 224, 1563, 300]

var clickNextFriend = [2087, 889, 2295, 977]

// 首页基建按钮
var infrastructureRegion = [1753, 875, 1923, 1012]
// 基建一键领取TIP
var tipRegion = [2186, 110, 2275, 165]
// 基建贸易站TIP
var gainOrderRegion = [248, 1017, 428, 1057]
// 基建制造站TIP
var gainProductionRegion = [525, 1017, 657, 1057]



// 是否完成信赖领取
var isFinishGainTrustCredits = false
// 是否完成基建收获
var isFinishGainInfrastructure = false
var isFinishOperationPlan = false
// 是否完成领取任务奖励
var isFinishGainQuestRewards = true

launchApp("明日方舟")

setScreenMetrics(1080, 2340)

var gamePicture = [
    {
        "image": images.read("img/startGame.png"),
        "tip": "开始游戏" 
    },
    {
        "image": images.read("img/shortcut.png"),
        "tip": "快捷方式" 
    },
    {
        "image": images.read("img/lastFight.png"),
        "tip": "终端" 
    },
    {
        "image": images.read("img/small_start_action.jpg"), 
        "tip": "准备战斗"
    },
    {
        "image": images.read("img/large_start_action.jpg"), 
        "tip": "开始行动"
    },
    {
        "image": images.read("img/in_battle.jpg"),
        "tip": "战斗中"
    },
    {
        "image": images.read("img/battle_completion.jpg"),
        "tip": "战斗结束"
    },
    {
        "image": images.read("img/yaoji.jpg"),
        "tip": "理智不足"
    },
    {
        "image": images.read("img/friend_list_1.png"),
        "tip": "首页"
    },
    {
        "image": images.read("img/friend_list_2.png"),
        "tip": "个人名片"
    },
    {
        "image": images.read("img/friend_list_3.png"),
        "tip": "好友列表"
    },
    {
        "image": images.read("img/friend_list_4.png"),
        "tip": "重复领取信用"
    },
    {
        "image": images.read("img/friend_list_5.png"),
        "tip": "不能拜访"
    },
    {
        "image": images.read("img/friendList7.png"),
        "tip": "可以领取信赖"
    },
    {
        "image": images.read("img/基建TIP.png"),
        "tip": "基建一键领取TIP"
    },
    {
        "image": images.read("img/基建制造站TIP.png"),
        "tip": "基建制造站TIP"
    },
    {
        "image": images.read("img/基建贸易站TIP.png"),
        "tip": "基建贸易站TIP"
    },
    {
        "image": images.read("img/基建干员疲劳TIP.png"),
        "tip": "基建干员疲劳TIP"
    },
    {
        "image": images.read("img/基建处理完毕.png"),
        "tip": "基建处理完毕"
    }
]



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



// 点击开始游戏

// 收获基建

// 收获信赖

// 继续刷上一张图

// 领取任务奖励



function getStatus() {
    let img = captureScreen();
    //let img = $automator.takeScreenshot();

    for (element of gamePicture) {
        let p = findImage(img, element.image);
        if (p) {
            img.recycle();
            return element.tip;
        }
    }

    img.recycle();
    return null;
}

function clickRegion(region) {
    let sleepTime = random(80, 180)
    sleep(sleepTime)
    var x = random(region[0], region[2])
    var y = random(region[1], region[3])
    console.log("点击：" + x + "," + y)

    let pressTime = random(200, 300)
    press(x, y, pressTime)
}

var lastStatus = ""
let nowStatus = ""

var num = 0
let newStage = false;
while (!isFinishGainTrustCredits || !isFinishGainInfrastructure || !isFinishOperationPlan || !isFinishGainQuestRewards) {
    sleep(1000)
    nowStatus = getStatus();
    console.log("当前状态：" + nowStatus)

    if (!nowStatus) {
        console.log("休息3秒");
        sleep(3000);
        continue;
    }

    if (nowStatus != lastStatus) {
        lastStatus = nowStatus;
        toast(nowStatus)
    }

    
    switch (nowStatus) {
        case "开始游戏":
            clickRegion(startGameRegion);
            break;
        case "首页":
            if (!isFinishGainTrustCredits) {
                clickRegion(personInfo)
            } else if (!isFinishGainInfrastructure) {
                clickRegion(infrastructureRegion)
            } else if (!isFinishOperationPlan) {
                clickRegion(terminalRegion)
            }
            
            break;
        case "快捷方式":
            clickRegion(homeShortcutRegion)
            break;
        case "个人名片":
            clickRegion(friendList)
            break;
        case "好友列表":
            clickRegion(friendRoom)
            break;
        case "可以领取信赖":
            clickRegion(clickNextFriend)
            break;
        case "重复领取信用":
            console.log("重复领取信用")
            //toast("重复领取信用，提前结束")
            //limit = num
            break;
        case "不能拜访":
            isFinishGainTrustCredits = true
            clickRegion(shortcutRegion)
            break;
        case "终端":
            clickRegion(lastFightRegion);
            break;
        case "准备战斗":
            clickRegion(small_action_btn)
            break;
        case "开始行动":
            console.log("点击红色开始行动")
            clickRegion(large_action_btn)
            newStage = true
            break;
        case "战斗中":
            console.log("代理战斗中，等待")
            sleep(3000)
            break;
        case "战斗结束":
            console.log("战斗结束")
            clickRegion(battle_completion_btn)
            if (newStage) {
                newStage = false
                num = num + 1;
                if (num >= limit) {
                    isFinishOperationPlan = true;
                    toast("作战计划执行完毕")
                    clickRegion(shortcutRegion)
                }
            }
            break;
        case "理智不足":
            isFinishOperationPlan =true
            clickRegion(shortcutRegion)
            break;
        case "基建一键领取TIP":
            clickRegion(tipRegion)
            break
        case "基建制造站TIP":
            clickRegion(gainOrderRegion)
            break
        case "基建贸易站TIP":
            clickRegion(gainOrderRegion)
            isFinishGainInfrastructure = true
            toast("基建处理完毕")
            clickRegion(shortcutRegion)
            break
        case "基建干员疲劳TIP":
            isFinishGainInfrastructure = true
            toast("基建处理完毕")
            clickRegion(shortcutRegion)
            break
        case "基建处理完毕":
            isFinishGainInfrastructure = true
            toast("基建处理完毕")
            clickRegion(shortcutRegion)
            break
        default:
            console.log('休息3秒')
            sleep(3000);
            break;
    }
}

// 回收图片资源
gamePicture.forEach((element, index) => {
    element.image.recycle()
})

toast("代理结束")