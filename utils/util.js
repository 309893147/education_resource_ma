const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  uploadImage(cb) {
    wx.chooseImage({
      success: function (res) {
        wx.showLoading({
          title: '上传中...',
          mask: true
        })
        console.log(res)
        wx.uploadFile({
          header: {
            accessToken: wx.getStorageSync("accessToken")
          },
          url: require("../api.js").getHttpUrl() + "/api/upload",
          filePath: res.tempFilePaths[0],
          name: 'file',
          success(bb) {
            wx.hideLoading()
            let data = bb.data
            if (data) {
              data = JSON.parse(bb.data)
            }
            if (data.code !== 200) {
              getApp().toast(data.msg)
              return
            }
            cb && cb(data.data)
          },
          fail() {
            wx.hideLoading()
            getApp.toast("上传失败")
          }
        })
      },
    })
  },
}
