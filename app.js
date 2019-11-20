var c_login = require('utils/login.js')
var c_request = require('utils/request.js')
var c_version = require('utils/version.js')
var c_update = require('utils/update.js')
var c_showBox = require('utils/showBox.js')
var lang = require('utils/string.js')

App({
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    this.globalData.userInfo = wx.getStorageSync('userInfo') || {}
    this.globalData.userId = wx.getStorageSync('sessionId') || ''

    if (c_version.compareVersion('1.9.90') == 1) {
      c_update.update()
    }
  },
  onShow: function() {
    this.globalData.userInfo = this.globalData.userInfo || wx.getStorageSync('userInfo')
    this.globalData.userId = this.globalData.userId || wx.getStorageSync('sessionId')
  },
  checkLogin: function(fc) {
    //检查用户登陆
    var that = this;
    var func = function(res) {
      if (!res.data) {
        that.login(fc)
      } else {
        typeof fc == "function" && fc(that.globalData.userInfo)
      }
    }
    c_request.request(this.globalData.url_checkLogin, {
      session_id: that.globalData.userId
    }, func, that.err)
  },
  login: function(fc) {
    var that = this
    c_login.login(function(res_login, res_user) {
      //本地缓存用户信息
      wx.setStorageSync('userInfo', res_user.userInfo)
      that.globalData.userInfo = res_user.userInfo

      var userData = {
        code: res_login.code,
        userInfo: res_user.rawData
      }

      var func = function(res) {
        //把用户数据传送到IRR.js页面，用于更新计算按钮状态
        typeof fc == "function" && fc(res_user.userInfo)
        //本地缓存用户session_id
        wx.setStorageSync('sessionId', res.data)
        that.globalData.userId = res.data
        console.log('login() session_id:' + that.globalData.userId)
      }

      c_request.request(that.globalData.url_login, userData, func, that.err)
    })
  },
  getAUTH: function(func) {
    c_request.request(this.globalData.url_config, {
      session_id: this.globalData.userId
    }, func, this.err)
  },
  err: function(e) {
    c_showBox.showToast(lang.NETWORK_ERROR, 'none', 2000)
  },
  globalData: {
    url_login: "https://www.lee361.com/wxphp/login.php", //登录地址
    url_checkLogin: "https://www.lee361.com/wxphp/checkLogin.php", //检查用户登录状态地址
    url_config: "https://www.lee361.com/wxphp/getConfig.php", //获取用户授权信息地址

    url_update: 'https://www.lee361.com/wxphp/userQuery.php', //上传用户计算数据地址
    url_suggest: 'https://www.lee361.com/wxphp/suggest.php', //提交用户建议地址

    auth: {}, //判断用是否有可用权限
    userInfo: {}, //用户信息
    userId: '', //用户ID

    cheJia: 0, //车价
    shouFu: 0, //首付
    baoZhengJin: 0, //保证金
    qianQiFeiYong: 100, //默认前期费用100
    qiXian: 24, //贷款期限
    yueHuanJinE: 0, //月还金额
    irr: 0.00 //IRR
  }
})