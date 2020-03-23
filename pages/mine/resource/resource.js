// pages/mine/house/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allResource: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.currentHouse = getApp().getUtil("house").getCurrentHouse(null, true);
    this.setData({
      // user: getApp().getUser(),
      selectMode: options.select === "true",
      // currentRoom: this.currentHouse || null
    })
    this.getMyResource();

  },
  goThisResource(e) {
    getApp().getUtil("store").put("currentHouse", this.data.currentRoom)
    if (this.data.currentRoom.status == 1 || this.data.currentRoom.status == 2) {
      wx.navigateTo({
        url: '/pages/mine/house/people/index?id=' + this.data.currentRoom.id,
      })
    }
  },
 
  getMyResource() {
    getApp().api.get("/resource/my").then(it => {
      this.setData({
        allResource: it.content
      })
      // if (it && it.length && it[0].status == 'ACTIVE') {
      //   this.setData({
      //     currentRoom: it[0]
      //   })
      //   // this.changeRoom(it[0])
      // }
    })
  },
  showActions(e) {
    let room = this.data.allResource[getApp().ed(e, "index")]
    // if (this.data.selectMode) {
    //   getApp().getUtil("event").emit("selectHouse", room)
    //   wx.navigateBack({

    //   })
    //   return
    // }
    let vm = this
    let actions = [{
      name: "删除",
      type: "remove"
    }]

    actions.unshift({
      name: "查看详情",
      type: "detail"
    })

    wx.showActionSheet({
      itemList: actions.map(it => {
        return it.name
      }),
      success(res) {
        let type = actions[res.tapIndex].type

        if (type === 'detail') {
          wx.navigateTo({
            url: "/pages/mine/house/people/index?id=" + room.id
          })
          return
        }

        if (type === 'select') {
          vm.changeRoom(room)
          return
        }
        if (type === 'remove') {
          vm.removeResource(room)
        }
      }
    })
  },
  removeResource(room) {
    let vm = this
    // let currentHouse = wx.getStorageSync("currentHouse")
    getApp().confirm(() => {
      getApp().api.del("/resource?id=" + room.id).then(it => {
       
        getApp().toast("删除成功", () => {
          vm.getMyResource()
        })
      }).catch(getApp().toast)
    })
  },

  changeRoom(room) {
    getApp().api.post("/ma/user/house/current?id=" + room.propertyId).then((it) => {
      wx.setStorageSync("currentHouse", it)
      this.setData({
        currentRoom: it
      })
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