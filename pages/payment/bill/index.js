// pages/payment/bill/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    loading: false,
  },

  /**
   * Lifecycle function--Called when page load
  */
  onLoad: function (options) {
    this.setData({ house: getApp().getUtil("house").getCurrentHouse() })

   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getBill() {
    this.setData({ loading:true})
    getApp().api.get("PropertyLine", { id: this.data.house.oid }).then(it => {
      if(Array.isArray(it) && it.length > 0){
        it.forEach(item => {
          item.checked =true
        })
        this.setData({ hostName: it[0].OvName})
      }
      this.setData({bill:it,loading:false})
      this.calculateFee()
      wx.hideLoading()
    }).catch((msg)=>{
      this.setData({loading:false})
      getApp().toast(msg)
      wx.hideLoading()
    })
  },
  openDetail(e){
    let bill  =  this.data.bill
    getApp().getUtil("store").put("currentBill",bill.filter(it =>{return it.checked}))
    wx.navigateTo({
      url: '../index',
    })
  },
  checkAll(){
    let uncheck = this.data.bill.filter(it =>{
      return !it.checked
    })
    let hasUnCheck = uncheck && uncheck.length

    console.log(hasUnCheck)
    console.log(uncheck)
    this.data.bill.forEach(it =>{
      it.checked = hasUnCheck
    })
    this.setData({ bill: this.data.bill })
    this.calculateFee()
  },
  checkItem(e){
    let bill = this.data.bill[getApp().ed(e, "index")]
    bill.checked = !bill.checked
    this.setData({bill:this.data.bill})
    this.calculateFee()
  },
  calculateFee(){
    let vm = this
    let result = this.data.bill.filter(it=> {
      return it.checked
    }).reduce(this.addMoney, { Amount: 0, LateFee: 0 })
    result.total = this.addTotal(result).toFixed(2)
    let total = this.data.bill.reduce(this.addMoney, { Amount: 0, LateFee: 0 })
    total.total = this.addTotal(total).toFixed(2)
    this.setData({ selected: result, total: total})
  },
  addTotal(item){
    console.log(item)
    return (item.Amount+item.LateFee)
  },
  addMoney(a,b){
    // return { Amount: a.Amount + b.Amount,LateFee:a.LateFee+b.LateFee}
    return { Amount: (this.parseMoney(a.Amount) + this.parseMoney(b.Amount)), LateFee: (this.parseMoney(a.LateFee) + this.parseMoney(b.LateFee)) }
  },
  parseMoney(money){
    if(!money){
      return 0;
    }
    
    return Number(money);
    // return parseInt(parseFloat(money)*100);
  },

  onShow(){
    getApp().checkHouse(()=>{
      this.getBill()
    })
  }
 
})