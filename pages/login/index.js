// pages/login/index.js
Page({

  /**
   * Page initial data
   */
  data: {
      mode:'password',
      timeout: 0,
      loading:false
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },
  switchTab(e){
    let tab = getApp().ed(e,"tab")
    this.setData({mode:tab})
  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },
  getPhoneCode(){
    if(!this.data.mobile || this.data.mobile.length != 11){
      getApp().toast("请输入手机号")
      return
    }
    getApp().api.get("WxLoginSmsSend",{tel:this.data.mobile}).then(it =>{
        this.setData({timeout:60})
        this.startTimeout()
        getApp().toast("获取成功")
    }).catch(getApp().toast)
  },
  startTimeout(){
    if(this.data.timeout<=0){
      return
    }
    this.setData({timeout:this.data.timeout -1})
    this.timeout = setTimeout(()=>{
      this.startTimeout()
    },1000)
  },
  onPhone(e){
    this.setData({mobile:e.detail.value})
  },
  onCode(e){
    console.log(e)
    this.setData({vcode:e.detail.value})
  },
  login(){
    let vm = this
    if(!this.data.mobile || this.data.mobile.length  != 11){
      getApp().toast("请输入手机号")
      return
    }
    if(!this.data.vcode){
      getApp().toast("请输入验证码")
      return
    }
    wx.login({
      success(res){
        vm.setData({code:res.code})
        vm.doLogin()
      }
    })
  },
  doLogin(){
    if(!this.data.code){
      return
    }
    if(this.data.loading){
      return
    }
    this.data.loading = true
    getApp().api.post("DecryptUserInfo", { json_code: this.data.code, phoneNumber: this.data.mobile, semCode: this.data.vcode,encryptedData:this.data.encryptedData,iv:this.data.iv}).then(it =>{
        this.data.loading = false
        wx.setStorageSync("currentUser",it)
        getApp().toast("登录成功",()=>{
          wx.navigateBack({})
        })
        
    }).catch(it =>{
      this.data.loading = false
      getApp().toast(it)
    })
  },
  onUserInfo(e){
    let detail = e.detail
    let iv =  detail.iv
    let encryptedData = detail.encryptedData
    this.setData({iv:iv||null,encryptedData:encryptedData || null})
    let vm = this
    if (!this.data.mobile || this.data.mobile.length != 11) {
      getApp().toast("请输入手机号")
      return
    }
    if (!this.data.vcode) {
      getApp().toast("请输入验证码")
      return
    }
    wx.login({
      success(res) {
        vm.setData({ code: res.code })
        vm.doLogin()
      }
    })
   
  },
  loginWithCode(){
    getApp().api.get("")
  },
  loginWithPassword(){

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {
    clearTimeout(this.timeout)
  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})