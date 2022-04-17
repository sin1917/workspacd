function func1(inputBox, destElement) {
    //jsondataの取得
    const textData = document.getElementById(inputBox).value;

    try {
        var jsonData = JSON.parse(textData);
    } catch (err) {
        //console.log("not json");
        document.getElementById(destElement).textContent="入力データが正常ではありません";
        return false;
    }

    //入力されたデータが正しいかチェック
    if (false == CheckInputText(jsonData)) {
        //console.log("data fault");
        document.getElementById(destElement).textContent="入力データが正常ではありません";
        return false;
    }

    ClearElementContents(destElement);
    func3(jsonData, destElement);

    
}

function CheckInputText(inputJson) {
    //構造確認 (艦隊と個艦の情報があればいいはず？)
    if ("api_deck_port" in inputJson && "api_ship" in inputJson) {
        //console.log("ok");
        return true;
    }
    
    //console.log("false");
    return false;
}   

function func3(jsonData, elementId) {
    const apiShip = jsonData.api_ship;
    const apiPort = jsonData.api_deck_port;
    var parent = document.getElementById(elementId);

    var block = document.createElement("div");
    block.classList.add("fleet-data");

    for (let index = 0; index < apiPort.length; index++) {
        var fleet = document.createElement("div");
        fleet.classList.add("fleet")

        //
        var fleetName = document.createElement("div");
        fleetName.classList.add("fleet-name");
        fleetName.textContent = (index+1)+". "+apiPort[index].api_name;
        fleet.appendChild(fleetName);

        //
        var uniqueIDs = apiPort[index].api_ship;
        var shipList = document.createElement("div");
        shipList.classList.add("fleet-ship-list");
        for (let i = 0; i < uniqueIDs.length; i++) {
            var listItem = func4(uniqueIDs[i],apiShip);
            shipList.appendChild(listItem);
        }
        fleet.appendChild(shipList);

        //
        block.appendChild(fleet);
    }
    parent.appendChild(block)
}

function func4(uniqueID, apiShip){
    var Item = document.createElement("div");
    Item.classList.add("fleet-ship-data");

    if (uniqueID != -1) {
        var uniqueData = apiShip.find((v) => v.api_id == uniqueID);

        const lv = uniqueData.api_lv;
        const cnd = uniqueData.api_cond;
        const name = GetShipNameById(uniqueData.api_ship_id);

        var shipLv = document.createElement("div");
        shipLv.classList.add("fleet-ship-lv");
        shipLv.textContent = "lv." + lv;
        var shipName = document.createElement("div");
        shipName.classList.add("fleet-ship-name");
        shipName.textContent = name;
        var shipCond = document.createElement("div");
        shipCond.classList.add("fleet-ship-cond");
        shipCond.textContent = "cond:" + cnd;

        Item.appendChild(shipLv);
        Item.appendChild(shipName);
        Item.appendChild(shipCond);

        //Item.textContent = "lv." + lv + " / " + name + " / " + "cond:" + cnd;
    } else {
        Item.textContent = "-";
    }

    return Item;
}

// //sort_id確認
// function func0() {
//     var data = api_mst_ship;
//     var sortNumArray = [];
//     for (let i = 0; i < data.length; i++) {
//         const sortid = data[i].api_sort_id;
//         if (sortid != 0)
//             sortNumArray.push(sortid);
//     }
//     sortNumArray.sort(compare);

//     var resultArray = [];
//     for (let i = 0; i < sortNumArray.length; i++) {
//         const sortid = sortNumArray[i];
//         var x = data.find((v) => v.api_sort_id == sortNumArray[i]);
//         resultArray.push({ "name": x.api_name, "id": x.api_id, "sortid": sortid });
//     }
//     console.log(resultArray);
// }
// function compare(a, b) {
//     var r = 0;
//     if (a < b) { r = -1; }
//     else if (a > b) { r = 1; }

//     return r;
// }

//=============================================================

//ship_idから名前を取得
function GetShipNameById(shipId){
    const shipData = api_mst_ship.find((v) => v.api_id == shipId);
    return shipData.api_name;
}

//==============================================================

//Elementの子要素をすべて削除
function ClearElementContents(elementId) {
    var element = document.getElementById(elementId);
    while (element.lastChild) {
        element.removeChild(element.lastChild);
    }
}
//テキストボックスクリア
function ClearTextbox(id) {
    var textbox = document.getElementById(id);
    textbox.value = "";
}
//
function CheckRadioElement(elementId){
    var radio = document.getElementById(elementId);
    radio.checked = true;
}