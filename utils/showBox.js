function showToast(title, icon, duration) {
  wx.showToast({
    title: title,
    icon: icon,
    duration: duration
  })
}

function showAUTH(title, content) {
  wx.showModal({
    title: title,
    content: content,
    showCancel: false,
    success: function (res) {
      if (res.confirm) {
        console.log('用户点击确定')
      }
    }
  })
}
module.exports = {
  showToast: showToast,
  showAUTH:showAUTH
}