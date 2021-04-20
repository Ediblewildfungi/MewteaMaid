const config = require("../config")

//补零
function pad(num, size) {
    let s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}

//随机数
function randomNum(minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
            break;
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
            break;
        default:
            return 0;
            break;
    }
}
//随机数2
function randomNum2(minNum, maxNum) {
    return Math.round(minNum + (maxNum - minNum) * Math.random())
}

//随机数3
function randomIntGenerator(maxNum) {
    function randomArrGenerator() {
        const arr = new Array(maxNum).fill(0).map((_, idx) => idx);
        let n = arr.length;
        let random = 0;
        while (n) {
            random = (Math.random() * n--) >>> 0;
            [arr[n], arr[random]] = [arr[random], arr[n]];
        }

        return arr;
    }

    let randomArr = randomArrGenerator();

    return function nextRandomInt() {
        if (!randomArr.length) {
            randomArr = randomArrGenerator(),3;
        }

        return pad(randomArr.pop(),3);
    };
}


const nextGenerator =  randomIntGenerator(config.server.SETU_NUM)
const randomNumPad =  pad(randomNum(0, config.server.SETU_NUM), 3)

// test
// console.log( nextGenerator() )
// console.log( randomNumPad )



//算法1
module.exports = pad(randomNum(0, config.server.SETU_NUM), 3)

//算法2
module.exports = randomIntGenerator(config.server.SETU_NUM)
