// pages/payment/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current:"none",
    money:[
      "200",
      "500","1000","2000"
    ],
    order: null
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ house: getApp().getUtil("house").getCurrentHouse(),bill:getApp().getUtil("store").get("currentBill") || null})
    if(!this.data.bill){
      getApp().back()
    }
    this.calculateFee()
    this.getOrderInfo()
  },
  calculateFee() {
    let total = this.data.bill.reduce(this.addMoney,{Amount:0,LateFee:0})
    total.total = this.addTotal(total).toFixed(2)
    total.Amount  =total.Amount.toFixed(2)
    total.LateFee = total.LateFee.toFixed(2)
    this.setData({total: total })
  },
  addTotal(item) {
    return (item.Amount + item.LateFee)
  },
  addMoney(a, b) {
    return { Amount: (this.parseMoney(a.Amount) + this.parseMoney(b.Amount)), LateFee: (this.parseMoney(a.LateFee) + this.parseMoney(b.LateFee))}
  },
  parseMoney(money) {
    if (!money) {
      return 0;
    }
    return Number(money)
  },
  getOrderInfo(){
    getApp().api.get("WxMyMoneyInfo",{itemid: this.data.bill.ChargeId}).then(it=>{
      this.setData({order:it || {}})
    })
  },
  selectMoney(e){
    let index = getApp().ed(e,"index");
    this.setData({
      moneyIndex:index,
      inputMoney:null,
      current:this.data.money[index]
    })
  },
  onMoney(e){
      this.data.current = e.detail.value
      this.setData({current:this.data.current,inputMoney:this.data.current})
  },
  clearSelect(){
    this.setData({
      moneyIndex:null
    })
  },
   submit(){
     if(!this.data.bill || this.data.bill.length <= 0){
       getApp().toast("请输入金额")
       return
     }
     if(this.data.loading == true){
       return
     }
     this.data.loading = true
     let vm = this
     let amount = this.data.bill.map(it =>{
       return it.Amount+","+it.LateFee+","+it.ChargeId
     }).join(";")
     let name = this.data.bill.map(it =>{
       return it.Name + "," + it.UntiName + "," + it.bid
     }).join(";")
     getApp().api.post("WxPayApi", { typeName: name, payMoney: amount,id:this.data.house.oid}).then(it=>{
       this.data.loading = false
       vm.pay(it)
     }).catch((e)=>{
       getApp().toast(e,getApp().back)
       this.data.loading = false
     })
   },
   queryResult(order){
     getApp().api.get("WxPayOrderquery", { outno: order ||"219920190523165003200494"}).then(it =>{
       if (it && it.status){
         getApp().toast("支付成功",getApp().back)
       }
      }).catch(getApp().toast)
   },
   pay(data){
     let vm = this
     wx.requestPayment({
       timeStamp: data.timeStamp,
       nonceStr:data.nonceStr,
       package: data.package,
       signType: data.signType,
       paySign: data.paySign,
       success(res){
         vm.queryResult(data.out_trade_no)
       },
       fail(res){
         getApp().toast("支付失败,请稍候再试")
       }
     })
   }
})