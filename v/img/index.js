// v/img/index.js
Component({
  /**
   * Component properties
   */
  options: {
    addGlobalClass: true
  },
  properties: {
    src: {
      type: String,
      observer(res,re){
        if(res.indexOf("http") === -1 && res.indexOf("/r/")!==0){
          this.setData({src:getApp().api.getHttpUrl()+res})
        }
      }
    },
    mode: {
      type: String
    },
    sty: {
      type: String
    },
    clazz: {
      type: String,
      value:"",
      observer(newval, oldval, changedPath) {
        if(!newval){
          return
        }
        this.setData({
          clazz:newval
        })
      }
    }
  },

  /**
   * Component initial data
   */
  data: {
    src:"",
    clazz:""
  },

  /**
   * Component methods
   */
  methods: {

  }
})