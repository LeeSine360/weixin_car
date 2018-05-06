var c_showBox = require('../../utils/showBox')

var app = getApp()
var globalData = app.globalData

var cheJia = 0//车价
var shouFu = 0//首付比例
var baoZhengJin = 0//保证金比例
var qiXian = 0//贷款期限
var xbyj = 0//续保押金
var gps = 0//GPS
var dcf = 0//调查费
var sxf = 0//手续费
var dygzf = 0//抵押公正费
var bx = 0//保险费
var gzs = 0//购置税
var shf = 0//上户费
var yueHuanJinE = globalData.yueHuanJinE//月还金额

Page({
  data: {
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    if (options.cheJia) {
      cheJia = parseInt(options.cheJia)
      shouFu = options.shouFu
      baoZhengJin = options.baoZhengJin
      qiXian = options.qiXian
      yueHuanJinE = parseInt(options.yueHuanJinE)
      xbyj = parseInt(options.xbyj)
      gps = parseInt(options.gps)
      dcf = parseInt(options.dcf)
      sxf = parseInt(options.sxf)
      dygzf = parseInt(options.dygzf)
      bx = parseInt(options.bx)
      gzs = parseInt(options.gzs)
      shf = parseInt(options.shf)
    }
  },
  onShow: function () {
    cheJia = globalData.cheJia//车价
    shouFu = globalData.shouFu//首付比例
    baoZhengJin = globalData.baoZhengJin//保证金比例
    qiXian = globalData.qiXian//贷款期限
    xbyj = parseInt(globalData.xuBaoYaJin)//续保押金
    gps = parseInt(globalData.gps)//GPS
    dcf = parseInt(globalData.diaoChaFei)//调查费
    sxf = parseInt(globalData.shouXuFei)//手续费
    dygzf = parseInt(globalData.diYaGongZhengFei)//抵押公正费
    bx = parseInt(globalData.baoXianFei)//保险费
    gzs = parseInt(globalData.gouZhiShui)//购置税
    shf = parseInt(globalData.shangHuFei)//上户费
    yueHuanJinE = globalData.yueHuanJinE//月还金额

    this.setData({
      chejia: cheJia.toFixed(2),
      fangan: (shouFu * 100) + " + " + (baoZhengJin * 100),
      daiKuanJinE: ((1 - shouFu) * cheJia).toFixed(2),
      shouFu: (shouFu * cheJia).toFixed(2),
      baoZhengJin: (baoZhengJin * cheJia).toFixed(2),
      xbyj: xbyj.toFixed(2),
      gps: gps.toFixed(2),
      dcf: dcf.toFixed(2),
      sxf: sxf.toFixed(2),
      dygzf: dygzf.toFixed(2),
      bx: bx.toFixed(2),
      gzs: gzs.toFixed(2),
      shf: shf.toFixed(2),
      qixian: qiXian,
      yuehuan: yueHuanJinE,
      qianqiheji: (shouFu * cheJia + baoZhengJin * cheJia + xbyj + gps + dcf + sxf + dygzf + bx + gzs + shf).toFixed(2)
    })
  },

  onShareAppMessage: function (res) {
    var para = "cheJia=" + cheJia
    para += "&shouFu=" + shouFu
    para += "&baoZhengJin=" + baoZhengJin
    para += "&qiXian=" + qiXian
    para += "&yueHuanJinE=" + yueHuanJinE
    para += "&xbyj=" + xbyj
    para += "&gps=" + gps
    para += "&dcf=" + dcf
    para += "&sxf=" + sxf
    para += "&dygzf=" + dygzf
    para += "&bx=" + bx
    para += "&gzs=" + gzs
    para += "&shf=" + shf

    return {
      title: '车辆融资租赁方案明细表',
      path: '/pages/result/result?' + para,
      success: function (res) {
        c_showBox.showToast('转发成功', 'success', 2000)
      },
      fail: function (res) {
        c_showBox.showToast('转发失败', 'success', 2000)
      }
    }
  }
})
