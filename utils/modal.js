function showModal(ob) {
  // 显示遮罩层
  ob.setData({
    modalButtonImg: '../../image/close.png'
  })
  var animation = wx.createAnimation({
    duration: 200,
    timingFunction: "linear",
    delay: 0
  })
  ob.animation = animation
  animation.translateY(0).step()
  ob.setData({
    animationData: animation.export(),
    showModalStatus: true
  })
  setTimeout(function () {
    animation.translateY(-animationShowHeight / 2.2).step()
    ob.setData({
      animationData: animation.export()
    })
  }.bind(this), 200)
}
function hideModal(ob) {
  // 隐藏遮罩层
  ob.setData({
    modalButtonImg: '../../image/open.png'
  })
  var animation = wx.createAnimation({
    duration: 200,
    timingFunction: "linear",
    delay: 0
  })
  ob.animation = animation;
  animation.translateY(-animationShowHeight / 2.2).step()
  ob.setData({
    animationData: animation.export(),
  })
  setTimeout(function () {
    animation.translateY(0).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: false
    })
  }.bind(this), 200)
}
module.exports = {
  showModal: showModal,
  hideModal: hideModal
}