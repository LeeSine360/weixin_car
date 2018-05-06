function login(func) {
  //调用登录接口
  wx.login({
    success: function (res_login) {
      if (res_login.code) {
        wx.getUserInfo({
          success: function (res_user) {
            typeof func == "function" && func(res_login, res_user)
          }
        })
      }
    }
  })
}
module.exports = {
  login: login
}
