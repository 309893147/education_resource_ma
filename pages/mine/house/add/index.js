// pages/mine/house/add/index.js
let types = [{ name: "业主·产权登记人", sid: 1 }, { name: "业主·家属", sid: 2 }, { name: "租户", sid: 3 }, { name: "保姆", sid: 4 }]
Page({

  /**
   * Page initial data
   */
  data: {
      host: getApp().api.getHttpUrl(),
     images:[],
    uName:"",
     contracts:[]
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    getApp().getUtil("event").on("chooseHouse",this.onHouse)
  },
  onUnload(){
    getApp().getUtil("event").remove("chooseHouse", this.onHouse)
  },
  //选择房屋回调
  onHouse(e){
    let type = this.data.type
    if(!type){
      type = types[0]
    }
    this.setData({house:e,type:type})
    
  },
  onText(e) {
    this.data.uName = e.detail.value
    this.setData({ uName:this.data.uName })
  },
  chooseType(){
    let vm = this
    wx.showActionSheet({

      itemList: types.map(it =>{
        return it.name
      }),
      success(res){
          vm.data.type = types[res.tapIndex]
          vm.setData({type:vm.data.type})
      }
    })
  },
  submit(){
    if(!this.data.house){
      getApp().toast("请选择房屋")
      return
    }
    if(!this.data.type){
      getApp().toast("请选择身份")
      return
    }
    if(this.data.type.sid > 1 && !this.data.uName){
      getApp().toast("请填写真实姓名")
      return
    }
    if(this.data.type.sid > 2){
      if (!this.data.images[0] || !this.data.images[1]) {
        getApp().toast("请选择上传身份证正反面")
        return
      }
      if (!this.data.contracts || !this.data.contracts.length) {
        getApp().toast("请上传合同照片")
        return
      }
    }
    getApp().api.post("ChooseRegisterMsg", { uName: this.data.uName,rid:this.data.house.id,sid:this.data.type.sid,isadd:1,url:this.data.images.concat(this.data.contracts).join(",")}).then(it =>{
      getApp().toast("添加成功",getApp().back)
    }).catch(getApp().toast)
  },
  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },
  chooseHouse(){
    wx.navigateTo({
      url: '/pages/register/area/index',
    })
  },
  addContract(){

  },
  deleteImage(e){
    let index = getApp().ed(e, "index")
    console.log(index)
    if(index < 2){
      this.data.images[index] = ""
    } else {
      this.data.contracts.splice(index, 1)
    }
    
    this.setData({ contracts: this.data.contracts,images:this.data.images})
  },
  deleteContactImage(e){
    let index = getApp().ed(e, "index")
    this.data.contracts.splice(index, 1)
    
    this.setData({ contracts: this.data.contracts})
  },
  addImage(e){
    let index = getApp().ed(e,"index")
    getApp().getUtil("util").uploadImage((url)=>{
      if(index){
        this.data.images[index] = url
      } else{
        this.data.contracts.push(url)
      }
      this.setData({images:this.data.images,contracts:this.data.contracts})
    })
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