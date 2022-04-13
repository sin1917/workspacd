function func1() {
    //jsondataの取得
    var txt = document.getElementById("inputBox").value;

    try {
        var data = JSON.parse(txt);
    } catch (err) {
        //console.log("not json");
        var element = document.getElementById("dist");
        element.textContent = "入力データが正常ではありません";
        return false;
    }

    ClearElementContents("dist");
    func3(data, "dist");
}

function func2(jsondata) {

}

function func3(jsonData, elementId) {
    var apiShip = jsonData.api_ship;
    var apiPort = jsonData.api_deck_port;
    var apiShipData = api_mst_ship;
    var parent = document.getElementById(elementId);


    for (let index = 0; index < apiPort.length; index++) {
        var block = document.createElement("div");

        //
        var fleetName = document.createElement("p");
        fleetName.textContent = apiPort[index].api_name;
        block.appendChild(fleetName);

        //
        var uniqueIDs = apiPort[index].api_ship;
        var shipList = document.createElement("ol");
        for (let i = 0; i < uniqueIDs.length; i++) {
            var Item = document.createElement("li");
            if (uniqueIDs[i] != -1) {
                var uniqueData = apiShip.find((v) => v.api_id == uniqueIDs[i]);
                //console.log(uniqueData);

                var lv = uniqueData.api_lv;
                var cnd = uniqueData.api_cond;
                var shipId = uniqueData.api_ship_id;
                var buff = apiShipData.find((v) => v.api_id == uniqueData.api_ship_id);
                var name = buff.api_name;
                // console.log(buff);

                Item.textContent = "lv." + lv + " / " + name + " / " + "cond:" + cnd;
            } else {
                Item.textContent = "-";
            }
            shipList.appendChild(Item);
        }
        block.appendChild(shipList);

        //
        parent.appendChild(block);
    }

}


//sort_id確認
function func5() {
    var data = api_data.api_mst_ship;
    var sortNumArray = [];
    for (let i = 0; i < data.length; i++) {
        const sortid = data[i].api_sort_id;
        if (sortid != 0)
            sortNumArray.push(sortid);
    }
    sortNumArray.sort(compare);

    var resultArray = [];
    for (let i = 0; i < sortNumArray.length; i++) {
        const sortid = sortNumArray[i];
        var x = data.find((v) => v.api_sort_id == sortNumArray[i]);
        resultArray.push({ "name": x.api_name, "id": x.api_id, "sortid": sortid });
    }
    console.log(resultArray);
}
function compare(a, b) {
    var r = 0;
    if (a < b) { r = -1; }
    else if (a > b) { r = 1; }

    return r;
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

