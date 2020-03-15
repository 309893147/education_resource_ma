// pages/mine/house/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: getApp().getUser(),
    currentRoom:null,
    allHouse:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.currentHouse = getApp().getUtil("house").getCurrentHouse(null,true);
      this.setData({user:getApp().getUser(),selectMode:options.select === "true"})
  },
  goThisHouse(e){
    getApp().getUtil("store").put("currentHouse", this.data.currentRoom)
    if (this.data.currentRoom.status == 1 || this.data.currentRoom.status == 2) {
      wx.navigateTo({
        url: '/pages/mine/house/people/index?id=' + this.data.currentRoom.id,
      })
    }
  },
  getWxHouse(){
    getApp().api.post("WxMyRoom", { tel: this.data.user.tel }).then(it =>{
      this.setData({
        allHouse: it
      })
    })
  },
  getMyHouse(){
    getApp().api.post("MyRoom",{tel:this.data.user.tel}).then(it=>{
        let currentRoom = null
        it.RoomUse.forEach(item=>{
          if (!currentRoom && it.CurrentID === item.id){
            currentRoom = item
            currentRoom.totalHouse = it.RoomUse.length
            wx.setStorageSync("currentHouse",currentRoom)
          }
        })
        this.setData({
          allHouse: it && it.RoomUse || [],
          currentRoom:currentRoom
        })
      }
    )
  },
  showActions(e){
    let room = this.data.allHouse[getApp().ed(e,"index")]
    if(this.data.selectMode){
      getApp().getUtil("event").emit("selectHouse",room)
      wx.navigateBack({
        
      })
      return
    }
    let vm =  this
    let actions = [{ name: "移出", type: "remove" }]
    if (room.UseStatus == 2){
      actions.unshift({name:"选为当前房屋",type:"select"})
    }
    if (room.status === 1 && room.UseStatus == 2){
        actions.unshift({ name: "查看详情", type: "detail" })
    }
    
    wx.showActionSheet({
      itemList: actions.map(it =>{return it.name}),
      success(res){
        let type = actions[res.tapIndex].type

        if(type ==='detail'){
          getApp().getUtil("store").put("currentHouse", room)
          wx.navigateTo({
            url: "/pages/mine/house/people/index?id=" + room.id
          })
          return
        }
      
        if(type === 'select'){
            vm.changeRoom(room)
            return
        }
        if(type  === 'remove'){
         vm.removeHouse(room)
        }
      }
    })
  },
  removeHouse(room){
    let vm = this
    let currentHouse = wx.getStorageSync("currentHouse")
    getApp().confirm(()=>{
      getApp().api.post("deleteRoom",{id:room.id}).then(it =>{
        if (currentHouse && room.id == currentHouse.id){
          wx.removeStorageSync("currentHouse")
        }
          getApp().toast("移出成功",()=>{
            vm.getMyHouse()
          })
      }).catch(getApp().toast)
    })
  },
  changeRoom(room){
    getApp().api.post("ChanngeRoom",{id:room.id,tel:this.data.user.tel}).then(()=>{
      this.getMyHouse()
    }).catch(getApp().toast)
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
    
    if(this.data.selectMode){
      this.getWxHouse()
    } else {
      this.getMyHouse();
    }
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
    this.getMyHouse()
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