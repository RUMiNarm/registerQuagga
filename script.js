// native window;
const print = window.console.log;
let subtotal = 0; // 合計金額の管理
let scanResult = new Array(3);
let scanProduct = [];
const receiptItems = document.getElementById('ReceiptItems');

let res = 0;

// \callCGI(url, stdin) {
//   const p = new window.Promise\(s) {
//     window.sendResult=\(r) {
//       ifrm.remove();
//       s(r);
//     };
//     const ifrm = window.$("<iframe>").attr{src:url+"?="+stdin, width:1,height:1}.appendTo("body");
//   };
//   const r=waitFor(p);
//   return r;
// }

while (1) {
  if (JANCode == '') {
    continue;
  }
  // URLのサーバー(Python)に対してJanCodeを送信
  let res = callCGI('https://run.eplang.jp/bitarrow/fs/pub/f396f115/dd.html', JANCode);
  console.log(res);
  if (res.indexOf('not found') != -1) {
  } else {
    // 返ってきたデータを2次元配列にいれる
    scanResult = res.split(',');
    scanProduct.push(scanResult);
    subtotal += Number(scanProduct[scanProduct.length() - 1][2]);

    // 商品の要素を作成
    const itemElement = document.createElement('div');
    itemElement.classList.add('item');
    itemElement.setAttribute('id', 'item' + str(scanProduct.length()));

    // 商品名
    const nameElement = document.createElement('span');
    nameElement.classList.add('item-details');
    nameElement.textContent = item.name;
    itemElement.appendChild(nameElement);

    // 個数
    const quantityElement = document.createElement('span');
    quantityElement.classList.add('item-quantity');
    quantityElement.textContent = `1`;
    itemElement.appendChild(quantityElement);

    // 小計
    const priceElement = document.createElement('span');
    priceElement.classList.add('item-price');
    priceElement.textContent = `${itemTotal}`;
    itemElement.appendChild(priceElement);

    // 商品要素を表示エリアに追加
    receiptItems.appendChild(itemElement);

    document.getElementById('TotalPrice').textContent = `${subtotal}`;
  }
}
