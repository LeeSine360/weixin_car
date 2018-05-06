var c_request = require('../../utils/request')

var app = getApp()
var globalData = app.globalData

Page({
  data: {
    content_list: [{
      id: 'xuBaoYaJin',
      list_name: '续保押金',//列表名称
      type: 'number',//输入框类型
      Company: '元',//单位
      click: 'onInputClick',
      highLight: '',
      value: '',
      showModal: false,//手续费对话框
    }, {
      id: 'gps',
      list_name: 'GPS',
      type: 'number',
      Company: '元',
      click: 'onInputClick',
      highLight: '',
      value: ''
    }, {
      id: 'diaoChaFei',
      list_name: '调查费',
      type: 'number',
      Company: '元',
      click: 'onInputClick',
      highLight: '',
      value: ''
    }, {
      id: 'shouXuFei',
      list_name: '手续费',
      type: 'number',
      Company: '元',
      click: 'onInputClick',
      highLight: '',
      value: ''
    }, {
      id: 'diYaGongZhengFei',
      list_name: '抵押公证费',
      type: 'number',
      Company: '元',
      click: 'onInputClick',
      highLight: '',
      value: ''
    }, {
      id: 'baoXianFei',
      list_name: '保险费',
      type: 'number',
      Company: '元',
      click: 'onInputClick',
      highLight: '',
      value: ''
    }, {
      id: 'gouZhiShui',
      list_name: '购置税',
      type: 'number',
      Company: '元',
      click: 'onInputClick',
      highLight: '',
      value: ''
    }, {
      id: 'shangHuFei',
      list_name: '上户费',
      type: 'number',
      Company: '元',
      click: 'onInputClick',
      highLight: '',
      value: ''
    }],

  },
  onLoad: function () {
  },
  onShow: function () {
    var num = parseFloat(globalData.cheJia) / 11.7
    this.setData({
      'content_list[6].value': (num).toFixed(2)
    })
    globalData.gouZhiShui = num
  },
  onInputClick: function (e) {
    var id = e.currentTarget.id
    var arr = this.data.content_list
    for (var i = 0; i < arr.length; i++) {
      var boderColor = "content_list[" + i + "].highLight"
      var inputValue = "content_list[" + i + "].value"
      if (arr[i].id == id && e.type == 'focus') {
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
    id == 'xuBaoYaJin' && (globalData.xuBaoYaJin = e.detail.value)
    id == 'gps' && (globalData.gps = e.detail.value)
    id == 'diaoChaFei' && (globalData.diaoChaFei = e.detail.value)
    
    id == 'diYaGongZhengFei' && (globalData.diYaGongZhengFei = e.detail.value)
    id == 'baoXianFei' && (globalData.baoXianFei = e.detail.value)
    id == 'gouZhiShui' && (globalData.gouZhiShui = e.detail.value)
    id == 'shangHuFei' && (globalData.shangHuFei = e.detail.value)
    if (id == 'shouXuFei' && e.type == 'focus') {
      this.showDialogBtn()
    }
  },
  onButtonClick: function (e) {
    var data = {
      userid: globalData.userId,
      act: 'car_other',
      xbyj: globalData.xuBaoYaJin,
      gps: globalData.gps,
      dcf: globalData.diaoChaFei,
      sxf: globalData.shouXuFei,
      dygzf: globalData.diYaGongZhengFei,
      bx: globalData.baoXianFei,
      gzs: globalData.gouZhiShui,
      shf: globalData.shangHuFei
    }

    c_request.request(globalData.url_update, data, function (res) { console.log(res) })

    wx.navigateTo({
      url: '../result/result'
    })
  },
  onResetClick: function (e) {
    //重置按钮
    var id = e.currentTarget.id
    var arr = this.data.content_list
    for (var i = 0; i < arr.length; i++) {
      var inputValue = "content_list[" + i + "].value"
      this.setData({
        [inputValue]: ''
      })
    }
  },
  /**
     * 弹窗
     */
  showDialogBtn: function () {
    this.setData({
      showModal: true
    })
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () {
  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function () {
    this.hideModal();
  },
  /**
   * 对话框输入框事件
   */
  inputChange: function (e) {
    var value = e.detail.value/100
    var result = globalData.cheJia * (1 - globalData.shouFu) * value
    this.setData({
      'content_list[3].value': (result).toFixed(2)
    })
    globalData.shouXuFei = (result).toFixed(2)
  }
})
