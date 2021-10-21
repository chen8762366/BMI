const height = document.querySelector(".height");
const weight = document.querySelector(".weight");
const send = document.querySelector(".send");
const dataLocalArr = JSON.parse(localStorage.getItem("listData")) || [];
const list = document.querySelector(".list");
const result = document.querySelector(".result"); //跨謀

result.addEventListener("click", calculate);
list.addEventListener("click", removeSingleRecord); //點擊後刪除單筆資料

// 初始化畫面載入存在localStorage 的資料
domRender(dataLocalArr);

// 計算 BMI
function calculate(e) {
    e.preventDefault();

    if (e.target.textContent === "看結果") {
        if (height.value == "" || weight.value == "") {
            alert("請輸入正確資訊");
            return;
        }
        let heightVal = Number(height.value / 100); //身高以米計算所以/100
        let heightValSquare = Math.round(heightVal * heightVal) / 100; //身高平方
        let weightVal = Number(weight.value); //輸入體重
        const BMI = Math.round(weightVal / heightValSquare) / 100; //體重除以身高平方

        // 算出的 BMI 傳入 addRelateInfo() 加入所有相關的資料
        if (BMI < 18.5) {
            addRelateInfo(BMI);
        } else if (BMI >= 18.5 && BMI < 24) {
            addRelateInfo(BMI);
        } else if (BMI >= 24 && BMI < 27) {
            addRelateInfo(BMI);
        } else if (BMI >= 27 && BMI < 30) {
            addRelateInfo(BMI);
        } else if (BMI >= 30 && BMI < 35) {
            addRelateInfo(BMI);
        } else {
            addRelateInfo(BMI);
        }

        // 輸入 input 的數字清空
        height.value = "";
        weight.value = "";

        time();

    }
}
// bmi輕重判斷
function judgeBMI(BMI) {
    if (BMI < 18.5) {
        return "過輕";
    } else if (BMI >= 18.5 && BMI < 24) {
        return "理想";
    } else if (BMI >= 24 && BMI < 27) {
        return "過重";
    } else if (BMI >= 27 && BMI < 30) {
        return "輕度肥胖";
    } else if (BMI >= 30 && BMI < 35) {
        return "中度肥胖";
    } else {
        return "重度肥胖";
    }
}
// BMI背景色判斷
function bgStatusColor(BMI) {
    let background = "";
    if (BMI < 18.5) {
        return (background = "ideal_bgcolor");
    } else if (BMI >= 18.5 && BMI < 24) {
        return (background = "too_light_bgcolor");
    } else if (BMI >= 24 && BMI < 27) {
        return (background = "overweight_bgcolor");
    } else if (BMI >= 27 && BMI < 30) {
        return (background = "mild_obesity_bgcolor");
    } else if (BMI >= 30 && BMI < 35) {
        return (background = "moderate_obesity_bgcolor");
    } else {
        return (background = "severe_obesity_bgcolor");
    }
}
//BMI邊框顏色判斷
function borderStatusColor(BMI) {
    let border = "";
    if (BMI < 18.5) {
        return (border = "ideal_border_color");
    } else if (BMI >= 18.5 && BMI < 24) {
        return (border = "too_light_border_color");
    } else if (BMI >= 24 && BMI < 27) {
        return (border = "overweight_border_color");
    } else if (BMI >= 27 && BMI < 30) {
        return (border = "mild_obesity_border_color");
    } else if (BMI >= 30 && BMI < 35) {
        return (border = "moderate_obesity_border_color");
    } else {
        return (border = "severe_obesity_border_color");
    }
}
//BMI顏色判斷
function showStatusColor(BMI) {
    let status = "";
    if (BMI < 18.5) {
        return (status = "ideal_color");
    } else if (BMI >= 18.5 && BMI < 24) {
        return (status = "too_light_color");
    } else if (BMI >= 24 && BMI < 27) {
        return (status = "overweight_color");
    } else if (BMI >= 27 && BMI < 30) {
        return (status = "mild_obesity_color");
    } else if (BMI >= 30 && BMI < 35) {
        return (status = "moderate_obesity_color");
    } else {
        return (status = "severe_obesity_color");
    }
}
//左側顏色判斷
function borderLeftStatusColor(BMI) {
    let borderLeft = "";
    if (BMI < 18.5) {
        return (borderLeft = "ideal_boL");
    } else if (BMI >= 18.5 && BMI < 24) {
        return (borderLeft = "too_light_boL");
    } else if (BMI >= 24 && BMI < 27) {
        return (borderLeft = "overweight_boL");
    } else if (BMI >= 27 && BMI < 30) {
        return (borderLeft = "mild_obesity_boL");
    } else if (BMI >= 30 && BMI < 35) {
        return (borderLeft = "moderate_obesity_boL");
    } else {
        return (borderLeft = "severe_obesity_boL");
    }
}

function addRelateInfo(BMI) {
    //建立一個要放在 dataLocalArr 陣列的物件
    let relateObjData = {
        heightData: height.value,
        weightData: weight.value,
        BMIData: BMI,
        dateData: time(),
        status: judgeBMI(BMI),
        statusColor: showStatusColor(BMI),
        background: bgStatusColor(BMI),
        border: borderStatusColor(BMI),
        borderLeft: borderLeftStatusColor(BMI)
    };

    dataLocalArr.push(relateObjData);
    console.log(dataLocalArr);
    domRender(dataLocalArr);

    // 將不同 BMI 狀態按鈕需要的資訊放在一個陣列裡
    let renderButtonData = [
        judgeBMI(BMI),
        showStatusColor(BMI),
        BMI,
        bgStatusColor(BMI)
    ];
    domButtonRender('result', renderButtonData);
    //將處理後的JSON字串更新到資料庫中
    localStorage.setItem("listData", JSON.stringify(dataLocalArr));
}

// 顯示 BMI 紀錄
function domRender(dataArr) {
    let str = "";

    dataArr.forEach(function(item, index) {
        str += `<li class="record ${item.borderLeft}">
                        <div class="judge">${item.status}</div>
                        <div class="info-b">
                            <h3 class="title">BMI</h3>
                            <p>${item.BMIData}</p>
                        </div>
                        <div class="info-w">
                            <h3 class="title">weight</h3>
                            <p>${item.weightData}</p>
                        </div>
                        <div class="info-h">
                            <h3 class="title">height</h3>
                            <p>${item.heightData}</p>
                        </div>
                        <div class="date-info">
                            ${item.dateData}
                        </div>
                        <div class="del">
                            <input type="button" value="刪除" data-num="${index}">
                        </div>
                    </li>`;
    });

    list.innerHTML = str;
}

// 顯示按鈕狀態
function domButtonRender(type, renderButtonData) {
    let str = "";
    if (type === "reset") {
        str = `<button type="button" class="send">看結果</button>`;
    } else {
        str = ` <button type="button" class="send-end  ${renderButtonData[1]}">
                <div class="button-show">
                    <div class="button-num">${renderButtonData[2]}</div>
                    <div class="button-bmi">BMI</div>
                    <div class="arrow-icon">
                        <img class="${renderButtonData[3]}" src="https://upload.cc/i1/2021/07/29/YynqD8.png" alt="">
                    </div>
                    <div class="button-judge ${renderButtonData[1]}">${renderButtonData[0]}</div>
                </div>
            </button>
            <button type="button" class="again">再測一次</button>
                `;
    }

    result.innerHTML = str;
}

//刪除單一紀錄
function removeSingleRecord(e) {
    e.preventDefault();
    if (e.target.nodeName !== "INPUT") {
        return;
    }
    let Num = e.target.dataset.num;
    dataLocalArr.splice(Num, 1);
    localStorage.setItem("listData", JSON.stringify(dataLocalArr));
    domRender(dataLocalArr);
}

// 時間
function time() {
    let date = new Date();
    let nowTime = `${date.getFullYear()} - ${date.getMonth() + 1} - ${date.getDate()}`;
    return nowTime;
}