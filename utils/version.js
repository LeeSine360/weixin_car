function getSysVersion() {
  var res = wx.getSystemInfoSync()
  return res.SDKVersion
}

function compareVersion(ver) {
  var v1 = getSysVersion().split('.')
  var v2 = ver.split('.')
  var len = Math.max(v1.length, v2.length)

  while (v1.length < len) {
    v1.push('0')
  }
  while (v2.length < len) {
    v2.push('0')
  }

  for (var i = 0; i < len; i++) {
    var num1 = parseInt(v1[i])
    var num2 = parseInt(v2[i])

    if (num1 > num2) {
      return 1
    } else if (num1 < num2) {
      return -1
    }
  }
}

module.exports = {
  compareVersion: compareVersion
}
