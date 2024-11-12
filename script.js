// native window;
let print = window.console.log;
let subtotal = 0; // 合計金額の管理
let scanResult = new Array(3);
let scanProduct = [];
let receiptItems = document.getElementById('ReceiptItems');

let res = 0;

setInterval(function () {
  let JANCode = window.document.getElementById('JANCode').textContent;
  if (JANCode === '') {
    return;
  } else {
    // URLのサーバー(Python)に対してJanCodeを送信
    let res = callServer('https://run.eplang.jp/bitarrow/fs/pub/f396f115/dd.html', JANCode);
    console.log(res);

    if (res.indexOf('not found') === -1) {
      // 返ってきたデータを2次元配列にいれる
      scanResult = res.split(',');
      scanProduct.push(scanResult);
      subtotal += Number(scanProduct[scanProduct.length() - 1][2]);

      // 商品の要素を作成
      let itemElement = document.createElement('div');
      itemElement.classList.add('item');
      itemElement.setAttribute('id', 'item' + str(scanProduct.length()));

      // 商品名
      let nameElement = document.createElement('span');
      nameElement.classList.add('item-details');
      nameElement.textContent = item.name;
      itemElement.appendChild(nameElement);

      // 個数
      let quantityElement = document.createElement('span');
      quantityElement.classList.add('item-quantity');
      quantityElement.textContent = `1`;
      itemElement.appendChild(quantityElement);

      // 小計
      let priceElement = document.createElement('span');
      priceElement.classList.add('item-price');
      priceElement.textContent = `${itemTotal}`;
      itemElement.appendChild(priceElement);

      // 商品要素を表示エリアに追加
      receiptItems.appendChild(itemElement);
      // 合計金額を更新
      document.getElementById('TotalPrice').textContent = `${subtotal}`;
    }

    // JANCode をリセット
    JANCode = '';
  }
}, 100); // 100ミリ秒ごとにチェック
