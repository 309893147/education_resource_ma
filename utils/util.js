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
  uploadImage(cb){
    wx.chooseImage({
      success: function(res) {
        wx.showLoading({
          title: '上传中...',
        })
        wx.uploadFile({
          url: require("../api.js").getHttpUrl() +"/Handler/API.ashx?action=WxUpLoadAPI",
          filePath: res.tempFilePaths[0],
          name: 'image',
          success(bb){
            wx.hideLoading()
            let data = bb.data
            if(data){
              data = JSON.parse(bb.data)
            }
            cb && cb(data.Result)
          },
          fail(){
            wx.hideLoading()
            getApp.toast("上传失败")
          }
        })
      },
    })
  },
}
