native window;
let print = window.console.log;
let subtotal = 0; // 合計金額の管理
let scanResult = new Array(3);
let scanProduct = [];
let receiptItems = document.getElementById('ReceiptItems');

let res = 0;

// 2次元配列のインデックス番号を取得する関数
function findIndex(funcIndex, value) {
    let cnt = 0;
    let index = -1;
    for(let Arr of funcIndex) {
        index = Arr.indexOf(value);
        if(index == -1) {
            cnt = cnt + 1;
            continue;
        }
        else {
            let dimIndex = new Array(0);
            dimIndex.push(cnt);
            dimIndex.push(index);
            return dimIndex;
            break;
        }
    }
    if(index == -1) {
        return index;
    }
}


// メインループ
while(1){
    JANCode = document.getElementById("result").textContent;
    if (JANCode === '') {
    } else {
        // URLのサーバー(Python)に対してJANコードを送信
        let res = callServer('https://run.eplang.jp/bitarrow/fs/pub/f396f115/dd.html', JANCode);
        print(res);
        
        if (res.indexOf('not found') == -1) {
            // 返ってきたデータを2次元配列にいれる
            scanResult = res.split(',');
            // print(findIndex(scanResult[0]));
            let indexTemp =findIndex(scanProduct, scanResult[0]);
            if(indexTemp == -1){
                // 個数を記録する要素を追加
                scanResult.push(1);
                scanProduct.push(scanResult);
                
                // 商品の要素を作成
                let itemElement = document.createElement('div');
                itemElement.classList.add('item');
                itemElement.setAttribute('id', 'item' + String(scanProduct.length));
                
                // 商品名
                let nameElement = document.createElement('span');
                nameElement.classList.add('item-details');
                nameElement.textContent = scanProduct[scanProduct.length - 1][1];
                itemElement.appendChild(nameElement);
                
                // 個数
                let quantityElement = document.createElement('span');
                quantityElement.classList.add('item-quantity');
                quantityElement.textContent = `1`;
                quantityElement.setAttribute('id', 'itemQuantity' + String(scanProduct.length));
                itemElement.appendChild(quantityElement);
                
                // 値段
                let priceElement = document.createElement('span');
                priceElement.classList.add('item-price');
                priceElement.textContent = scanProduct[scanProduct.length - 1][2];
                priceElement.setAttribute('id', 'itemPrice' + String(scanProduct.length));
                itemElement.appendChild(priceElement);
                
                // 商品要素を表示エリアに追加
                receiptItems.appendChild(itemElement);
            }else{
                // 同じ商品の書き換え処理
                scanProduct[indexTemp[0]][3] += 1;
                print('scanProduct：'+ scanProduct);
                scanProduct[indexTemp[0]][2] = scanResult[2]*scanProduct[indexTemp[0]][3];
                
                // 個数
                quantityElement = document.getElementById('itemQuantity'+ String(indexTemp[0]+1));
                quantityElement.textContent = String(scanProduct[indexTemp[0]][3]);
                
                // 値段
                priceElement = document.getElementById('itemPrice'+ String(indexTemp[0]+1));
                priceElement.textContent = String(scanProduct[indexTemp[0]][2]);
                
            }
            // 合計金額を更新
            subtotal = 0;
            for (let i = 0; i < scanProduct.length; i++) {
                subtotal = Number(subtotal) + Number(scanProduct[i][2]);
            }
            print(subtotal);
            document.getElementById('TotalPrice').textContent = `${subtotal}`;
        }
    }
    // JANCode をリセット
    JANCode = '';
    document.getElementById("result").textContent = '';
}

