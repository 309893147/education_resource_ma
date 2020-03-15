// pages/mine/house/people/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentMenu:"",
    currentList:[],
    menu: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.id = options.id
    this.setData({ house: getApp().getUtil("store").get("currentHouse")})
    this.getDetail()
    this.getNumber()
  },
  changeMenu(e){
    let menu = getApp().ed(e,"menu");
    this.setData({menu:menu})
    let currentList = []
    if(menu == 0){
      currentList = this.data.current
    } else {
      currentList = this.data.unbind
    }
    this.setData({currentList:currentList})
  },
  goThisPeople(e){
    let id = getApp().ed(e,"index");
    let item = this.data.currentList[id]
    let vm = this
    if(this.data.menu != 0){
      wx.showActionSheet({
        itemList: ["恢复"],
        success(res){
          vm.remove(item,0)
        }
      })
      return
    }
    if(item.status == 1){
      return
    }
    let actions = [{name:"移出",type:"remove"}]
    if(item.UseStatus === 1 && item.status == 2){
      actions.unshift({name:"认证通过",type:"pass"})
    }
    
    wx.showActionSheet({
      itemList: actions.map(it =>{return it.name}),
      success(res){
        let menu = actions[res.tapIndex]
        if(menu.type =='remove'){
          vm.remove(item,1)
        }
        if(menu.type =='pass'){
          vm.pass(item)
        }
        
      }
    })
  },
  remove(item,st){
    let vm = this
    getApp().api.post("OwnerCurrDelRegain", { tuid: item.id, st: st, uid: this.data.house.id }).then(it => {
      vm.getDetail()
      vm.getNumber()
    }).catch(getApp().toast)
  },
  pass(item){
  let vm = this
    getApp().api.post("OwnerValid", { tuid:item.id,uid:this.data.house.id}).then(it =>{
      getApp().toast("激活成功",vm.getDetail())
    }).catch(getApp().toast)
  },

  getDetail(){
    
    getApp().api.post("OwnerCurrUser", { uid:this.data.id,st:0}).then(it =>{
        getApp().processHouse(it)
        this.setData({current:it,currentList:it})
    })
    getApp().api.post("OwnerCurrUser", { uid: this.data.id, st:1 }).then(it => {
      getApp().processHouse(it)
      this.setData({unbind:it})
    })
  },
  getNumber(){
    getApp().api.get("OwnerCurrNum",{uid:this.data.id}).then(it =>{
      this.setData({numbers:it})
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})