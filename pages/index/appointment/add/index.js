// pages/index/appointment/add/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    sum:200,
    length:0,
    service:{
      type:"",
      selectTime:"",
      remark:""
    },
    read:false,
    showTime:false,
    days:["日","一","二","三","四","五","六"],
    currentDays:"",
    toDay:{
      date:"",
      month:"",
      year:""
    },
    currentDate:"",
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.getDays()
    this.getDate()
    this.getServiceType()
  },
  getServiceType(){
    let payLoad={
      fw:2
    }
    getApp().api.get("WxHousingServer",payLoad).then(
      (res)=>{
        this.setData({
          types: res
        })
      }
    ).catch(getApp().toast)
  },
  getDays(){
    let days = new Date().getDay();
    let day = "";
    if(days==1){
      day="一"
    }else if(days==2){
      day="二"
    }else if(days==3){
      day="三"
    }else if(days==4){
      day="四"
    }else if(days==5){
      day="五"
    }else if(days==6){
      day="六"
    }else{
      day="日"
    }
    this.setData({
      currentDays:day,
    })
    console.log(days)
  },
  getDate(){
    let time = new Date();
    let year = time.getFullYear();
    let month = time.getMonth()+1;
    let date = time.getDate();
    let toDay = this.data.toDay;
    toDay.year = year;
    toDay.month = month;
    toDay.date = date;
    this.setData({
      currentYear: year,
      currentMonth:month,
      currentDate: date,
      toDay:toDay
    })
    this.createDate();
  },
  changeMonth(e){
    let type = getApp().ed(e,"type");
    let month = this.data.currentMonth;
    let year = this.data.currentYear;
    if(type== 'add'){
      if(month != 12){
        month = month + 1;
      }else{
        month = 1;
        year = year +1;
      }
    }else{
      if(month!=1){
        month = month-1;
      }else{
        month = 12;
        year = year -1
      }
    }
    this.setData({
      currentMonth:month,
      currentYear:year,
      currentDate:""
    })
    this.createDate()
  },
  confrimTime(){
    let year = this.data.currentYear;
    let month = this.data.currentMonth;
    let date = this.data.currentDate;
    let time = year+"/"+month+"/"+date;
    this.closeShowTime();
    let service = this.data.service;
    service.selectTime = time
    this.setData({
      service: service
    })
  },
  selectDate(e){
    let value = getApp().ed(e,"value");
    let year = this.data.currentYear;
    let month = this.data.currentMonth;
    let time = new Date(year+"/"+month+"/"+value+" 00:00:00").getTime()
    let newTime = new Date().getTime()
    console.log(value, time,newTime)
    if(time<newTime){
      getApp().toast("选择时间需大于当前时间")
      return
    }
    this.setData({
      currentDate:value
    })
  },
  createDate(){
    let year = this.data.currentYear;
    let month = this.data.currentMonth;
    let date = 0;
    if( month == 2){
      if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0){
        date = 29
      }else{
        date = 28
      }
    }else if(month == 4 || month == 6 ||month == 9 || month==11){
      date = 30
    }else {
      date = 31
    }
    let dates = [];
    let time = year + "/" + month+"/1";
    let day = new Date(time).getDay();
    console.log(day)
    if(day!=7){
      for (let i = 1; i <= day; i++) {
        dates.push("")
      }
    }
    for(let i =1;i<=date;i++){
      dates.push(i)
    }
    this.setData({
      dates:dates
    })
    console.log(dates)
  },
  getValue(e){
    let service = this.data.service;
    service.remark = e.detail.value;
    this.setData({
      service:service,
      length:e.detail.value.length
    })
  },
  selectType(){
    let types = this.data.types;
    let type = types.map((it)=>{
      return it.DeskTitle
    })
    let vm = this;
    let service = this.data.service;
    wx.showActionSheet({
      itemList: type,
      success(res){
        service.uuid = types[res.tapIndex].Uuid
        service.type = type[res.tapIndex]
        vm.setData({
          service:service
        })
      }
    })
  },  
  closeShowTime(){
    this.setData({
      showTime:false
    })
  },
  openShowTime(){
    this.setData({
      showTime:true
    })
  },
  read(e){
    console.log(e.detail.value)
    if(e.detail.value=='yes'){
      this.setData({
        read:true
      })
    }
  },
  submit(){
    let s = this.data.service;
    let payload = {
      deskId:s.uuid,
      time:s.selectTime,
      title:s.remark
    }
    let m = ""
    if (!payload.deskId ){
      m ="请选择预约类型"
    }
    if (!payload.time){
      m = "请选择预约时间"
    }
    if (!payload.title){
      m = "请输入备注"
    }
    if(m){
      getApp().toast(m)
      return
    }

    getApp().api.post("WxMakeAppointment",payload).then(
      res=>{
        getApp().toast("预约成功");
        setTimeout(()=>{
          wx.navigateBack()
        },500)
      }
    ).catch(getApp().toast)
  },
  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

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