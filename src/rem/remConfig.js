// export default function () {
//   (function (doc, win) {
//     var docEl = doc.documentElement,
//       resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
//       recalc = function () {
//         var clientWidth = docEl.clientWidth
//         if (!clientWidth) return
//         // 100 * () + 'px'
//         docEl.style.fontSize = 130 * (clientWidth / 750) + 'px'
//       }
//     if (!doc.addEventListener) return
//     win.addEventListener(resizeEvt, recalc, false)
//     doc.addEventListener('DOMContentLoaded',
//       recalc, false
//     )
//   })(document, window)
// }

export default function () {
  function placeholderPic() {
    //得到手机屏幕的宽度
    let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
    //得到html的Dom元素
    let htmlDom = document.getElementsByTagName('html')[0];
    //设置根元素字体大小 
    htmlDom.style.fontSize = htmlWidth / 7 + 'px';
  }
  placeholderPic();
  window.onresize = function () {  // 窗口改变时再次执行一次函数即可
    placeholderPic();
  }
}