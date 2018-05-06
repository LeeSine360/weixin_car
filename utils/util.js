var common = require('../utils/irr');
function getIrrArr(je, sf, bz, yh, qq, qx) {
  var jine = je,
    shoufu = sf,
    baozhengjin = bz * jine,
    yuehuan = yh,
    qianqifeiyong = qq,
    qixian = qx;
  var daikuane = (1 - shoufu) * jine;
  var yuehuanArr = new Array();
  var bzjArr = new Array();
  var resultArr = new Array();
  yuehuanArr.push(-daikuane + qianqifeiyong + baozhengjin);
  for (var i = 0; i < qixian; i++) {
    yuehuanArr.push(yuehuan);
  }
  for (var i = 0; i < qixian / 2; i++) {
    if (baozhengjin > 0) {
      if (baozhengjin >= yuehuan) {
        bzjArr.push(yuehuan);
      } else {
        bzjArr.push(baozhengjin);
      }
      baozhengjin = baozhengjin - yuehuan;
    }
  }
  var temp = yuehuanArr.length - 1;
  for (var i = 0; i < bzjArr.length; i++) {
    yuehuanArr[temp - i] = yuehuanArr[temp - i] - bzjArr[i]
  }
  //console.log(yuehuanArr);
  return yuehuanArr;
}
function testYueHuan(je, sf, bz, qq, qxy, irr) {
  var yuehuanTemp = je * (1 - sf) / qxy;
  var irrTemp = 0;
  var irr = parseInt(irr * 10000);
  while (irrTemp != irr) {
    irrTemp = (common.irr(getIrrArr(je, sf, bz, yuehuanTemp, qq, qxy)) * 12).toFixed(4);
    irrTemp = parseInt(irrTemp * 10000);

    console.log([irrTemp, yuehuanTemp]);

    if (irrTemp == irr) break;
    if(irrTemp > irr){
      yuehuanTemp = yuehuanTemp-0.1;
    }else{
      ++yuehuanTemp;
    }
  }
  return yuehuanTemp;
}
module.exports = {
  getIrrArr: getIrrArr,
  testYueHuan: testYueHuan
}
