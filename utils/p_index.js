var c_request = require('request')
var animationShowHeight = 0; //对话框高度

const app = getApp()
var globalData = app.globalData

function showModal(that, animationShowHeight) {
  // 显示遮罩层
  that.setData({
    modalButtonImg: '../../image/close.png'
  })
  var animation = wx.createAnimation({
    duration: 200,
    timingFunction: "linear",
    delay: 0
  })
  this.animation = animation
  animation.translateY(0).step()
  that.setData({
    animationData: animation.export(),
    showModalStatus: true
  })
  setTimeout(function () {
    animation.translateY(-animationShowHeight / 2.2).step()
    that.setData({
      animationData: animation.export()
    })
  }.bind(that), 200)
}
function hideModal(that, animationShowHeight) {
  // 隐藏遮罩层
  that.setData({
    modalButtonImg: '../../image/open.png'
  })
  var animation = wx.createAnimation({
    duration: 200,
    timingFunction: "linear",
    delay: 0
  })
  that.animation = animation;
  animation.translateY(-animationShowHeight / 2.2).step()
  that.setData({
    animationData: animation.export(),
  })
  setTimeout(function () {
    animation.translateY(0).step()
    that.setData({
      animationData: animation.export(),
      showModalStatus: false
    })
  }.bind(that), 200)
}
function suggestClick(that, animationShowHeight,userId,text) {
  //提交建议按钮
  hideModal(that, animationShowHeight)
  var data = {
    userid: userId,
    text: text
  }
  var success = function (e) {
    console.log(e)
    wx.showToast({
      title: '发送成功',
      icon: 'success',
      duration: 2000,
      success: function (e) {
        setTimeout(function () {
          wx.navigateBack({
            delta: 1
          })
        }, 2000)
      }
    })
  }
  c_request.request(globalData.url_suggest, data, success)
}
module.exports = {
  showModal: showModal,
  hideModal: hideModal,
  suggestClick: suggestClick
}