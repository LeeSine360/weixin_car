
function request(url,data,func,err) {
  wx.request({
    //获取openid接口  
    url: url,
    data: data,
    success: func,
    fail:err
  })
}
module.exports = {
  request: request
}