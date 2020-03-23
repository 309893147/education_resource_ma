import {
  $init,
  $digest
} from '../../utils/common.util'
var app = getApp();
Page({
  data: {
    // host: getApp().api.getHttpUrl(),
    formats: {},
    readOnly: false,
    placeholder: '开始输入...',
    editorHeight: 300,
    keyboardHeight: 0,
    isIOS: false,
    title: '',
    titleCount: 0,
    contentCount: 0,
    tagCount: 0,
    content: '',
    tag: '',
    options: [],
    selected: {},
    ruleFrom: {
      tag: '',
      title: '',
      content: '',
    },
    hasRegist: false, //是否注册
    path: '', 
    filename: '',
    link:'',
  },
  readOnlyChange() {
    this.setData({
      readOnly: !this.data.readOnly
    })
  },
  onLoad() {
    const platform = wx.getSystemInfoSync().platform
    const isIOS = platform === 'ios'
    this.setData({
      isIOS
    })
    const that = this
    that.getResourceType()
    this.updatePosition(0)
    let keyboardHeight = 0
    wx.onKeyboardHeightChange(res => {
      if (res.height === keyboardHeight) return
      const duration = res.height > 0 ? res.duration * 1000 : 0
      keyboardHeight = res.height
      setTimeout(() => {
        wx.pageScrollTo({
          scrollTop: 0,
          success() {
            that.updatePosition(keyboardHeight)
            that.editorCtx.scrollIntoView()
          }
        })
      }, duration)

    })
  },

  change(e) {
    this.setData({
      selected: { ...e.detail
      }
    })
    wx.showToast({
      title: `${this.data.selected.id} - ${this.data.selected.name}`,
      icon: 'success',
      duration: 1000
    })
  },
  close() {
    // 关闭select
    this.selectComponent('#select').close()
  },
  getResourceType() {
    getApp().api.get("/resource/type", true, true).then(it => {
      console.log(it)
      this.setData({
        options: it
      })
    })
  },

  updatePosition(keyboardHeight) {
    const toolbarHeight = 50
    const {
      windowHeight,
      platform
    } = wx.getSystemInfoSync()
    let editorHeight = keyboardHeight > 0 ? (windowHeight - keyboardHeight - toolbarHeight) : windowHeight
    this.setData({
      editorHeight,
      keyboardHeight
    })
  },
  calNavigationBarAndStatusBar() {
    const systemInfo = wx.getSystemInfoSync()
    const {
      statusBarHeight,
      platform
    } = systemInfo
    const isIOS = platform === 'ios'
    const navigationBarHeight = isIOS ? 44 : 48
    return statusBarHeight + navigationBarHeight
  },
  onEditorReady() {
    const that = this
    wx.createSelectorQuery().select('#editor').context(function(res) {
      that.editorCtx = res.context
    }).exec()
  },
  blur() {
    this.editorCtx.blur()
  },
  format(e) {
    let {
      name,
      value
    } = e.target.dataset
    if (!name) return
    // console.log('format', name, value)
    this.editorCtx.format(name, value)

  },
  onStatusChange(e) {
    const formats = e.detail
    this.setData({
      formats
    })
  },
  insertDivider() {
    this.editorCtx.insertDivider({
      success: function() {
        console.log('insert divider success')
      }
    })
  },
  clear() {
    this.editorCtx.clear({
      success: function(res) {
        console.log("clear success")
      }
    })
  },
  removeFormat() {
    this.editorCtx.removeFormat()
  },
  insertDate() {
    const date = new Date()
    const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    this.editorCtx.insertText({
      text: formatDate
    })
  },
  insertImage() {
    const that = this
    wx.chooseImage({
      count: 6,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        const images = that.data.images.concat(res.tempFilePaths)
        console.log(res.tempFilePaths)
        that.data.images = images.length <= 6 ? images : images.slice(0, 6)
        $digest(that)
        const arr = []
        // console.log(that.data.images)
        for (let path of that.data.images) {
          arr.push(

            getApp().api.post("upload", {
              filePath: path
            }).then(it => {
              this.data.loading = false
              // vm.pay(it)
            }).catch((e) => {
              getApp().toast(e, getApp().back)
              this.data.loading = false
            })
          )
        }
        // console.log(arr)
        Promise.all(arr).then(res => {
          return res.map(item => JSON.parse(item.data).link)
        }).catch(err => {
          console.log(">>>> upload images error:", err)
        }).then(urls => {
          // console.log(urls)
          for (let i = 0; i < urls.length; ++i) {
            that.editorCtx.insertImage({
              src: config.attachmenturl + urls[i],
              // data: {
              //   id: 'abcd',
              //   role: 'god'
              // },
              success: function() {
                console.log('insert image success')
                that.setData({
                  images: [] //这里清0，否则总是将上次的图片带上
                })
                // console.log(that.data.images)
              }
            })
          }
        })
      }
    })
  },

  handleTitleInput(e) {
    const value = e.detail.value
    this.data.title = value
    this.data.titleCount = value.length
    // $digest(this)
  },

  handleTagInput(e) {
    const value = e.detail.value
    this.data.tag = value
    this.data.tagCount = value.length
  },

  handleContentInput(e) {
    const value = e.detail.value
    this.data.content = value
    this.data.contentCount = value.length
  
  },

  submitForm(e) {
    var that = this


    let params = {
      title: that.data.title,
      content: that.data.content,
      tag: that.data.tag,
      link: that.data.link,
    }

    getApp().api.post("/resource", params).then(it => {
      this.data.loading = false
      wx.showToast({
        title: "上传成功,等待管理员审核",
        duration: 30000,
        icon: "none"
      })
      
    }).catch((e) => {
      console.log(e)
      // getApp().toast(e, getApp().back)
      this.data.loading = false
    })

  },


  //选择要上传的上传文件
  choosefilefun() {
    var that =this
    wx.chooseMessageFile({
      count: 1,     //能选择文件的数量
      type: 'file',   //能选择文件的类型,我这里只允许上传文件.还有视频,图片,或者都可以
      success(res) {
        var size = res.tempFiles[0].size;
        var filename = res.tempFiles[0].name;
        console.log(filename)
        console.log(size)
        console.log(res.tempFiles[0])

        
        that.setData({
            path: res.tempFiles[0].path, //将文件的路径保存在页面的变量上,方便 wx.uploadFile调用
            filename: filename              //渲染到wxml方便用户知道自己选择了什么文件
          })
        
      }
    })
  },
 
  // 上传  upfilefun
  upfilefun() {
    
    let path = this.data.path;
    console.log(path)
    let that = this;
    var serverUrl = app.serverUrl;
    wx.uploadFile({
      url: serverUrl + '/api/upload', // 请求服务端文件,
      filePath: path,
      name: 'file',
      header: {
        "content-type": "multipart/form-data;charset=UTF-8",
      },
      success: function (res) {
        let data = JSON.parse(res.data)
        console.log(data)
        console.log(data.data)
        that.data.link = data.data
      },
      fail: function (res) {
        console.log(res, " :失败res")
      },

    })
  },

  //删除要上传的文件
  delfile(e) {
    let path = e.currentTarget.dataset.path;
    let name = e.currentTarget.dataset.name;
    let { downloadFile, upfilelist } = this.data;
    upfilelist.forEach((k, index) => {
      if (k.path == path) {
        upfilelist.splice(index, 1) // 删除上传文件
        downloadFile.forEach((item) => {   //更新页面状态
          if (item.path == path) {
            item.sel = false;
          }
        })

      }
    })

    this.setData({
      downloadFile,
      upfilelist,
    })
  },
 
})