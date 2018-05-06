function request(url,data,func) {
  wx.request({
    //获取openid接口  
    url: url,
    data: data,
    success: func
  })
}
module.exports = {
  request: request
}