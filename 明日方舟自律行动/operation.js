var limit = rawInput("请输入代理次数", 99)



// var limit = 2


auto.waitFor()

if(!requestScreenCapture()){
    toast("请求截图失败");
    exit();
}

launchApp("明日方舟")

setScreenMetrics(1080, 2340)


// 常量配置
small_action_btn = {
    "leftTop": {
        "x": 2020,
        "y": 983
    },
    "rightBottom": {
        "x": 2260,
        "y": 1000
    }
}
large_action_btn = {
    "leftTop": {
        "x": 1800,
        "y": 610
    },
    "rightBottom": {
        "x": 1900,
        "y": 900
    }
}
battle_completion_btn = {
    "leftTop": {
        "x": 940,
        "y": 340
    },
    "rightBottom": {
        "x": 1700,
        "y": 630
    }
}


// 开始行动按钮坐标



var small_start_action = images.read("img/small_start_action.jpg");
var large_start_action = images.read("img/large_start_action.jpg");
var in_battle = images.read("img/in_battle.jpg");
var battle_completion = images.read("img/battle_completion.jpg");
var yaoji = images.read("img/yaoji.jpg");


function randomNum(minNum,maxNum){ 
    switch(arguments.length){ 
        case 1: 
            return parseInt(Math.random()*minNum+1,10); 
        break; 
        case 2: 
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
        break; 
            default: 
                return 0; 
            break; 
    } 
} 

function getStatus() {
    
    let img = captureScreen();
    // let img = automator.takeScreenshot();
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
    img.recycle();
    return p;
}


function clickRegion(region) {
    let sleepTime = randomNum(0, 3000)
    sleep(sleepTime)
    var x = randomNum(region.leftTop.x, region.rightBottom.x)
    var y = randomNum(region.leftTop.y, region.rightBottom.y)
    console.log("点击：" + x + "," + y)
    press(x, y, 300)

}

var lastStatus = ""
let nowStatus = ""

var num = 0
let newStage = false;
while (num < limit) {
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
        case "准备战斗":
            console.log("蓝色开始行动")
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
            }
            break;
        case "理智不足":
            console.log("理智不足")
            toast("理智不足，提前结束")
            limit = num;
            break;
        default:
            console.log('休息3秒')
            sleep(3000);
    }
    
    console.log("已完成代理次数：" + num)
}
small_start_action.recycle()
large_start_action.recycle()
in_battle.recycle()
battle_completion.recycle()
yaoji.recycle()
toast("代理结束")