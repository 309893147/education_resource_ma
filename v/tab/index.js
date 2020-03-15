// components/tab/index.js
Component({
  /**
   * Component properties
   */
  options: {
    addGlobalClass: true
  },
  properties: {
    tabs:{
      type: Array,
      value: []
    }
  },



  /**
   * Component initial data
   */
  data: {

  },

  /**
   * Component methods
   */
  methods: {
      onItem(e){
        let index = getApp().ed(e,"index")
        if(index === this.data.index){
          return
        }
        this.data.index = index
        this.triggerEvent("on",index)
      }
  }
})
