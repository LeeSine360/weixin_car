var news_data = [{
  id: 'car',
  list_name: '车辆价格',//列表名称
  type: 'digit',//输入框类型
  Company: '万',//单位
  click: 'onInputClick',
  highLight: '',
  value: ''
}, {
  id: 'shouFu',
  list_name: '首付比例',
  type: 'digit',
  Company: '%',
  click: 'onInputClick',
  highLight: '',
  value: ''
}, {
  id: 'baoZhengJin',
  list_name: '保证金比例',
  type: 'digit',
  Company: '%',
  click: 'onInputClick',
  highLight: '',
  value: ''
}, {
  id: 'irr',
  list_name: 'IRR',
  type: 'digit',
  Company: '%',
  click: 'onInputClick',
  highLight: '',
  value: ''
}, {
  id: 'qiXian',
  list_name: '贷款期限',
  type: 'number',
  Company: '月',
  click: 'onInputClick',
  highLight: '',
  value: 24
}];

module.exports = {
  dataList: news_data
}