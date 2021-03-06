var c_util = require('../../utils/util')
var c_request = require('../../utils/request')
var c_showBox = require('../../utils/showBox')
var d_index_data = require('../../data/index_data')
var p_index = require('../../utils/p_index')
var c_modal = require('../../utils/modal')
var c_hint = require('../../utils/hint.js')
var lang = require('../../utils/string.js')

const app = getApp()
var globalData = app.globalData

var cheJia = globalData.cheJia //车价
var shouFu = globalData.shouFu //首付比例
var baoZhengJin = globalData.baoZhengJin //保证金比例
var qianQiFeiYong = globalData.qianQiFeiYong //前期费用
var qiXian = globalData.qiXian //贷款期限
var irr = globalData.irr //IRR系数

var suggestText ='' //建议输入框
var nextButton = false //判断计算按钮状态
var animationShowHeight = 0//建议对话框动画

var auth = {} //用户权限

Page({
  data: {
    huanKuanZongE: 0,//还款总额
    daiKuanJinE: 0,//贷款金额
    liXi: 0,//利息
    yueHuanJinE: 0,//月还金额
    yueLiLv: 0,//月利率
    userInfo: {},//用户信息

    jiSuanButton: {
      calLoading: lang.START_CAL,//点击计算按钮的文字提示
      jsClass: 'footer_cal_bg'
    },

    content_list: d_index_data.dataList,

    animationData: "",
    showModalStatus: false,
    modalButtonImg: '../../image/open.png'
  },
  userInfoHandler: function (e) {
    //点击授权按钮时触发
    var that = this
    app.checkLogin(function (res) {
      that.setData({
        userInfo: res
      })
    })
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onShow: function () {
    var that = this
    //检查登陆状态是否有效
    app.checkLogin(function (res) {
      that.setData({
        userInfo: res
      })
    })
    wx.showShareMenu({
      withShareTicket: true
    })
    wx.getSystemInfo({
      success: function(res) {
        animationShowHeight=res.screenHeight
      },
    })
  },
  onShareAppMessage: function (res) {
    //点击转发时触发
    return {
      title: lang.SHARE_TITLE,
      imageUrl: '/image/share.jpg',
      success: function (res) {
        c_showBox.showToast(lang.SHARE_CONTEXT_OK, 'success', 2000)
      },
      fail: function (res) {
        c_showBox.showToast(lang.SHARE_CONTEXT_ERR, 'success', 2000)
      }
    }
  },
  shareButton: function (e) {
    //点击方案分享是触发
    wx.navigateTo({
      url: '../second/second'
    })
  },
  onInputClick: function (e) {
    var id = e.detail.value
    if (e.type == 'input') {
      switch (e.currentTarget.id) {
        case 'car': cheJia = parseFloat(e.detail.value) * 10000; break;
        case 'shouFu': shouFu = parseInt(e.detail.value) / 100; break;
        case 'baoZhengJin': baoZhengJin = parseInt(e.detail.value) / 100; break;
        case 'irr': irr = parseFloat(e.detail.value) / 100; break;
        case 'qiXian': qiXian = parseInt(e.detail.value); break;
      }
    }
    var arr = this.data.content_list
    for (var i = 0; i < arr.length; i++) {
      var boderColor = "content_list[" + i + "].highLight"
      var inputValue = "content_list[" + i + "].value"
      if (e.type == 'focus' && arr[i].id == e.currentTarget.id) {
        this.setData({
          [boderColor]: 'content_list_item_border_color',
          [inputValue]: ''
        })
      }
      if (e.type == 'blur') {
        this.setData({
          [boderColor]: ''
        })
      }
    }
  },
  resetOnClick: function (e) {
    //重置按钮
    var arr = this.data.content_list
    for (var i = 0; i < arr.length; i++) {
      var inputValue = "content_list[" + i + "].value"
      var value = arr[i].id == 'qiXian' ? arr[i].value : ''
      this.setData({
        [inputValue]: value,
        'jiSuanButton.calLoading': lang.START_CAL
      })
    }
    nextButton = false
  },
  checkAUTH: function () {
    //检查用户使用权限
    var that = this
    app.getAUTH(function (res) {
      qianQiFeiYong = res.data.qianQiFeiYong
      auth = res.data.auth
      if (!auth.isOk) {
        c_showBox.showAUTH('提示', auth.msg)
        return
      } else {
        that.setData({ 'jiSuanButton.calLoading': lang.STARTING_CAL })
        that.calculate()
      }
    })
  },
  calculate: function () {
    //计算月还
    var that = this

    var yhje = c_util.testYueHuan(cheJia, shouFu, baoZhengJin, qianQiFeiYong, qiXian, irr)
    var hkze = (yhje * qiXian).toFixed(2)
    var dkje = (cheJia * (1 - shouFu)).toFixed(2)
    var lx = (yhje * qiXian - (1 - shouFu) * cheJia).toFixed(2)
    yhje = yhje.toFixed(2)
    var yll = lx / dkje / qiXian
    yll = (yll * 100).toFixed(2)

    that.setData({
      huanKuanZongE: hkze,
      daiKuanJinE: dkje,
      liXi: lx,
      yueHuanJinE: yhje,
      yueLiLv: yll
    })

    c_request.request(globalData.url_update, {
      userid: globalData.userId,
      act: 'car',
      chejia: cheJia,
      shoufu: shouFu,
      baozhengjin: baoZhengJin,
      qixian: qiXian,
      irr: irr
    }, function (res) {
      //nextButton = true
      that.setData({
        'jiSuanButton.calLoading': lang.START_CAL
      })
    },app.err)

    globalData.cheJia = cheJia//车价
    globalData.shouFu = shouFu//首付
    globalData.baoZhengJin = baoZhengJin//保证金
    globalData.qianQiFeiYong = qianQiFeiYong//前期费用
    globalData.qiXian = qiXian//贷款期限
    globalData.yueHuanJinE = yhje//月还金额
    globalData.irr = irr//IRR
  },
  jiSuanButton: function (e) {
    //点击计算按钮是触发
    
    if (!cheJia || !irr || !qiXian) {
      c_showBox.showToast(lang.INPUT_ERR, 'none', 2000)
      return
    }
    if (cheJia > 5000000 || shouFu >= 1 || baoZhengJin >= 1 || qiXian >=60 || irr >= 30) {
      c_showBox.showToast(lang.INPUT_DATA_ERR, 'none', 2000)
      return
    }
    /*if (nextButton) {
      wx.navigateTo({
        url: '../second/second'
      })
    }else{
      this.checkAUTH()
    }*/
    this.checkAUTH()
  },
  openModal:function(){
    //建议对话框打开按钮
    var status = this.data.showModalStatus
    if(!status){
      p_index.showModal(this, animationShowHeight)
    }else{
      p_index.hideModal(this, animationShowHeight)
    }
  },
  textAreaInput: function (e) {
    //获取建议文本输入框
    suggestText = e.detail.value
  },
  onSuggestClick: function (e) {
    //提交建议按钮
    p_index.suggestClick(this, animationShowHeight, globalData.userId, suggestText)
  }
})
