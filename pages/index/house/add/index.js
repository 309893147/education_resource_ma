// pages/index/appointment/add/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    data:{
      addType: 0,
    }

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    getApp().getUtil("event").on("selectHouse",this.onHouse)
    this.onTypeIndex(0)
  },
  onUnload(){
    getApp().getUtil("event").remove("selectHouse", this.onHouse)
  },
  onHouse(house){
    this.data.data.rid = house.id
    this.setData({ house: house })
  },
  getValue(e){
    let key = getApp().ed(e,"key");
    let data = this.data.data;
    data[key] = e.detail.value;
    this.setData({
      data:data
    })
  },
  onTypeIndex(index){
    let data = this.data.data;
    data.type = index === 0 ? "卖房" : "租房";
    data.addType = index;
    data.price = ""
    this.setData({ data: data })
  },
  changeType(){
    let vm = this
    let house = this.data.houseInfo
    wx.showActionSheet({
      itemList: ["卖房","租房"],
      success(res){
        vm.onTypeIndex(res.tapIndex)
      }
    })
  },
  onText(e){
    this.data.data[getApp().ed(e,"key")] = e.detail.value
    this.setData({data:this.data.data})
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },
  chooseHouse(){
    wx.navigateTo({
      url: '/pages/mine/house/index?select=true',
    })
  },
  submit(){
    let msg =  null
    let data = this.data.data;
    if(!data.price){
      msg ="请输入预期价格"
    }
    if(!data.name){
      msg ="请输入姓名"
    }
    if(!data.tel){
      msg="输入联系电话"
    }
    if(!data.area){
      msg="请输入房屋大小"
    }
    if (!data.title){
      msg ="请输入地址"
    }
    if (!getApp().checkPhone(data.tel)){
      msg = "请输入正确的联系电话"
    }
    if(msg){
      getApp().toast(msg)
      return
    }
    getApp().api.post("WxRentalTabAPI",this.data.data).then(()=>{
      getApp().toast("添加成功",getApp().back)
    }).catch(getApp().toast)
  },
})