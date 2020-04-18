export default function () {
  (function (doc, win) {
    var docEl = doc.documentElement,
      resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
      recalc = function () {
        var clientWidth = docEl.clientWidth
        if (!clientWidth) return
        // 100 * () + 'px'
        docEl.style.fontSize = 75 * (clientWidth / 750) + 'px'
      }
    if (!doc.addEventListener) return
    win.addEventListener(resizeEvt, recalc, false)
    doc.addEventListener('DOMContentLoaded',
      recalc, false
    )
  })(document, window)
}