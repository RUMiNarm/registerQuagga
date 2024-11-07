// native window;
const print = window.console.log;
const tbl = document.createElement('table');
const tblBody = document.createElement('tbody');
tbl.style.fontSize = '55px';
let subtotal = 0;

const isbn = window.document.getElementById('isbn').textContent;

// \callCGI(url, stdin) {
//   const p = new window.Promise\(s) {
//     window.sendResult=\(r) {
//       ifrm.remove();
//       s(r);
//     };
//     const ifrm = window.$("<iframe>").attr{src:url+"?stdin="+stdin, width:1,height:1}.appendTo("body");
//   };
//   const r=waitFor(p);
//   return r;
// }

while (1) {
  if (isbn == '') {
    continue;
  }
  res = callCGI('https://run.eplang.jp/bitarrow/fs/pub/ca57a0ab/zemi.html', isbn);
  if (res.indexOf('not found') != -1) {
    // const isbn = window.document.getElementById('isbn').textContent;
    setText('message', '商品が見つかりません');
  } else {
    let [isbn, productName, productCost] = res.split(',');
    // let productName = data[1];
    // let productCost = data[2].split('\n')[0];
    window.console.log(productName + 'のお値段は' + productCost + '円です');
    subtotal += Number(productCost);
    print('合計は' + subtotal + '円です');
    setText('message', productName + 'のお値段は' + productCost + '円です\n合計は' + subtotal + '円です');

    sweets.push(productName);
  }

  window.document.getElementById('isbn').textContent = '';
  wait(5000);
}
