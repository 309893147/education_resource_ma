// v/bind/bind.js
Component({
  /**
   * Component properties
   */
  options: {

  },
  properties: {
    showbind: {
      type: Boolean,
      value:false,
      observer(newval, oldval, changedPath) {
        console.log(newval)
        if (!newval) {
          return
        }
        this.setData({
          show: newval
        })
      }
    }
  },

  /**
   * Component initial data
   */
  data: {
    show:false
  },

  /**
   * Component methods
   */
  methods: {
    close(){
      this.setData({
        show:false
      })
    }, show(){
      this.setData({
        show:true
      })
    },
    goBind(){
      this.close();
      wx.navigateTo({
        url: '/pages/login/index',
      })
    }
  }
})