function showHint(msg){
  wx.showModal({
    title: '提示',
    content: msg,
    showCancel:false
  })
}
module.exports={
  showHint:showHint
}