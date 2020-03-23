let formHeader = {
  'content-type': 'application/x-www-form-urlencoded'
}

let environment = 'online'
// let md5 = require('../utils/md5.min.js')

let currentUser;
let currentCity;

function getHttpUrl() {
  if (environment === 'online') {
    return 'http://192.168.10.171:8088'
  }
  if (environment === 'public') {
    return 'http://2h713068n4.qicp.vip:55982'
  }
  if (environment === 'prod') {
    return 'https://ma.rhctwy.com'
  }

}

function fetchData(url, payload, success, error, method, header) {
  let defaultHeader = {
    'content-type': 'application/json'
  }
  if (!header) {
    header = {}
  }
  header.accessToken = wx.getStorageSync("accessToken")
  let user = wx.getStorageSync("currentUser")
  wx.request({
    url: getHttpUrl() +"/api" + url,
    data: payload,
    method: method ? method : "GET",
    header: header || defaultHeader,
    success(res) {
      // wx.stopPullDownRefresh()
      wx.hideLoading()
      let data = res.data
      console.log(data)
      if (data.code == 200 || data.code == 204) {
        success && success(data.data)
      } else{
        let msg = data.ErrorMessage || data.Result
        error && error(msg||'服务器错误')
      } 
    },
    fail(res) {
      wx.hideLoading()
      wx.stopPullDownRefresh()
      error && error("网络错误或服务器暂不可用")
    }
  })
}

function showForbidden(msg) {
  wx.hideLoading()
  wx.showModal({
    title: '操作失败',
    content: msg,
    mask: true,
    showCancel: false,
    showConfirm: false
  })
}

function appendAccessToken(header, token) {
  header.accessToken = token

  return header
}

let api = {
  get: function(url, payload, noLoading) {
    if (!noLoading) {
      wx.showLoading({
        title: "加载中...",
        mask: true
      })
    }
    return new Promise((resolve, reject) => {
      fetchData(url, payload, resolve, reject)
    })

  },
  sget: function(url, success, error) {
    // wx.showLoading({
    //   title: '',
    // })
  },
  del: function(url, payload, json, noLoading) {
    if (!noLoading) {
      wx.showLoading({
        title: "加载中..."
      })
    }
    return new Promise((resolve, reject) => {
      if (json) {
        fetchData(url, payload, resolve, reject, "DELETE");
        return
      }
      fetchData(url, payload, resolve, reject, "DELETE");
    })
  },
  put: function(url, payload, json, noLoading) {
    if (!noLoading) {
      wx.showLoading({
        title: "加载中..."
      })
    }
    return new Promise((resolve, reject) => {
      if (json) {
        fetchData(url, payload, resolve, reject, "PUT");
        return
      }
      fetchData(url, payload, resolve, reject, "PUT");
    })
  },
  post: function(url, payload, json, noLoading) {
    if (!noLoading) {
      wx.showLoading({
        title: "加载中..."
      })
    }
    return new Promise((resolve, reject) => {
      if (json) {
        fetchData(url, payload, resolve, reject, "POST");
        return
      }
      fetchData(url, payload, resolve, reject, "POST");
    })
  },
  getConfig(cb) {
    this.get("config", (data) => {
      cb && cb(data)
    })
  },
  getHttpUrl() {
    return getHttpUrl();
  }
}

module.exports = api