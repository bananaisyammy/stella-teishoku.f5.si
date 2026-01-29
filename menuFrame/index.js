let nextButton;
let backButton;
const widthPercent = window.innerWidth/1920;
const heightPercent = window.innerHeight/1440;
let tabIndex = 0;

window.onload = function () {
    //imgクリック時に関数を呼び出す
    this.document.getElementById("nextButton").addEventListener("click", onNextButtonClick);
    document.getElementById("backButton").addEventListener("click", onBackButtonClick);
    document.getElementById("contactButton").addEventListener("click", onContactButtonClick);
    
    //button定義
    contactButton = this.document.getElementById("contactButton")
    nextButton = this.document.getElementById("nextButton")
    backButton = this.document.getElementById("backButton")

    //cards位置調整
    this.document.getElementById("cards").style.top = 345 * heightPercent + "px";
    this.document.getElementById("cards").style.left = 345 * widthPercent + "px";
    this.document.getElementById("cards").style.width = 1215 * widthPercent + "px";
    this.document.getElementById("cards").style.height = 900 * heightPercent + "px";
    //nextButton位置調整
    nextButton.style.width = 150 * widthPercent + "px";
    nextButton.style.height = 165 * heightPercent + "px";
    nextButton.style.left = 1575 * widthPercent + "px";
    nextButton.style.top = 660 * heightPercent + "px";

    //backButton位置調整
    backButton.style.width = 165 * widthPercent + "px";
    backButton.style.height = 180 * heightPercent + "px";
    backButton.style.left = 180 * widthPercent + "px";
    backButton.style.top = 660 * heightPercent + "px";

    //contactButton位置調整
    contactButton.style.width = 165 * widthPercent + "px";
    contactButton.style.height = 270 * heightPercent + "px";
    contactButton.style.left = 1560 * widthPercent + "px";
    contactButton.style.top = 345 * heightPercent + "px";

    //tab位置調整
    this.document.querySelectorAll(".tabs").forEach((tab, index) => {
        tab.style.height = 180 * heightPercent + "px";
        tab.style.top = 165 * heightPercent + "px";
        tab.addEventListener("click", () => onTabClick(index));
    });


    this.document.getElementById("tab0").style.width = 285 * widthPercent + "px";
    this.document.getElementById("tab0").style.left = 345 * widthPercent + "px";
    this.document.getElementById("tab0").style.backgroundColor = "#15474B";

    this.document.getElementById("tab1").style.width = 285 * widthPercent + "px";
    this.document.getElementById("tab1").style.left = 645 * widthPercent + "px";
    this.document.getElementById("tab1").style.backgroundColor = "#207070";

    this.document.getElementById("tab2").style.width = 285 * widthPercent + "px";
    this.document.getElementById("tab2").style.left = 945 * widthPercent + "px";
    this.document.getElementById("tab2").style.backgroundColor = "#207070";
    
    this.document.getElementById("tab3").style.width = 300 * widthPercent + "px";
    this.document.getElementById("tab3").style.left = 1245 * widthPercent + "px";
    this.document.getElementById("tab3").style.backgroundColor = "#207070";

    //shadow位置調整
    this.document.querySelectorAll(".shadow").forEach((shadow, index) => {
        shadow.style.width = 1920 * widthPercent + "px";
        shadow.style.height = 1440 * heightPercent + "px";
        shadow.style.left = (0) * widthPercent + "px";
        shadow.style.top = 0 * heightPercent + "px";
    });
    
    setTabs();
}

function onTabClick(index) {
    console.log("Tab " + index + " clicked!");
    // タブの背景色を更新
    document.querySelectorAll(".tabs").forEach((tab, i) => {
        tab.style.backgroundColor = (i === index) ? "#15474B" : "#207070";
    });
    tabIndex = index;
    itemFetch(tabIndex);
}
function onNextButtonClick() {
    alert("Next button clicked!");
}
function onBackButtonClick() {
    alert("Back button clicked!");
}
function onContactButtonClick() {
    // iframe内からparent（親ウィンドウ）のURLを変更
    window.parent.location.href = "/contact/";
}
async function setTabs() {
    const gridContentsJson = await fetch("/_static/media/gridContents.json").then(response => response.json());
    this.document.getElementById("tab0").querySelector("h3").innerHTML = gridContentsJson[0].tabName;
    this.document.getElementById("tab1").querySelector("h3").innerHTML = gridContentsJson[1].tabName;
    this.document.getElementById("tab2").querySelector("h3").innerHTML = gridContentsJson[2].tabName;
    this.document.getElementById("tab3").querySelector("h3").innerHTML = gridContentsJson[3].tabName;
    await onTabClick(0); // 初期タブの内容を表示
}