# api_dataから名前取得に必要な情報だけ取り出してjsファイル形式で出力
# - 取得したAPIdataをmakeFileディレクトリ下にファイル名"api_data"として保存
# - maleFile.py(このファイル)を実行
# - 出力された"kcShipData.js"をjsディレクトリに移動

from encodings import utf_8
import datetime
import json

# open readFile
with open('.\\api_data', encoding="utf_8") as f:
    apiData = json.load(f)
    shipData = apiData["api_mst_ship"]


# 省略型ship_data形成
strdata=""
for sd in shipData:
    if "api_sortno" in sd:
        s_id = sd["api_id"]
        s_sortno = sd["api_sortno"]
        s_sortid = sd['api_sort_id']
        s_name = sd["api_name"]
        tmp ={
            'api_id':s_id,
            'api_sortno':s_sortno,
            'api_sort_id':s_sortid,
            'api_name': s_name
        }
        strdata += (json.dumps(tmp, ensure_ascii=False) + ',\n')

strdata = strdata[:-2] #末尾行の改行文字とカンマを省く


# open writeFile
with open('kcShipData.js', 'w', encoding="utf_8") as wf:
    date = datetime.datetime.now()
    wf.write('//==============\n')
    wf.write('// ' + date.strftime('%Y.%m.%d') + '\n' )
    wf.write('//==============\n\n')

    wf.write('api_mst_ship = [\n')
    wf.write(strdata + '\n') 
    wf.write(']\n')

print("success.")