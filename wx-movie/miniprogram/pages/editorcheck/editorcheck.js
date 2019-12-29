// miniprogram/pages/editorcheck/editorcheck.js
const innerAudioContext = wx.createInnerAudioContext()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    clink: '',
    info: '',
    name: '',
    id: '',
    type: 0,
    text:'',
    userInfo:null,
    speck_time:0,
    duration:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.gettype(options)
    this.getMovieinfo(options)
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

  },
  getMovieinfo: function (options) {
    var that = this
    wx.showLoading({
      title: '数据正在加载中...',
    })
    wx.cloud.callFunction({
      name: 'get',
      data: {
        x: '_id',
        y: options.id,
        l:1
      },
      success: function (res) {
        wx.hideLoading()
        var res = res.result.data[0]
        that.setData({
          clink: res.clink,
          name: res.name,
          info: res.info,
          id: options.id
        })
      },
      fail: console.error
    })
  },
  gettype: function (options) {
    if (options.type == 't') {
      this.setData({
        type: 0,
        text:options.inner,
      })
    } else {
      this.setData({
        type: 1,
        text:options.inner,
        speck_time: options.time,
        duration:options.duration
      })
    }
    var that = this
    wx.cloud.callFunction({
      name:'user',
      success:function(res){
        that.setData({
          userInfo: res.result.data[0]
        })
      }
    })
  },
  play(){
    innerAudioContext.src = this.data.text//这个地方在微信端测试时和开发者工具上不一样,在开发者工具上显示VM682:1 uploadFile:fail createUploadTask:fail file not found，但是在微信端是可以使用的
    console.log(innerAudioContext.src)
    innerAudioContext.play()
  },
  back:function(){
    wx.navigateBack()
  },
  publish:function(){
    var that = this
    wx.showLoading({
      title: '正在发布中...',
    })
    if(that.data.type==1){
      var filename = Date.parse(new Date()) + '.mp3'
      console.log(that.data.text)
      wx.cloud.uploadFile({
        cloudPath:filename,
        filePath:that.data.text,
        config:{
          env: 'movies-udacity-f36f2'
        },
        success:res=>{
          wx.cloud.callFunction({
            name: 'publish',
            data: {
              operate:'publish',
              id: that.data.id,
              userInfo: that.data.userInfo,
              inner: res.fileID,
              type: that.data.type,
              time: that.data.speck_time
            },
            success: function (res) {
              wx.hideLoading()
              wx.navigateTo({
                url: '/pages/commentlist/commentlist?id=' + that.data.id
              })
            },
            fail: console.error
          })
        },
      })
    }else{
      wx.cloud.callFunction({
        name: 'publish',
        data: {
          operate:'publish',
          id: that.data.id,
          userInfo: that.data.userInfo,
          inner: that.data.text,
          type: that.data.type,
          time: that.data.speck_time
        },
        success: function (res) {
          wx.hideLoading()
          wx.navigateTo({
            url: '/pages/commentlist/commentlist?id=' + that.data.id
          })
        },
        fail: console.error
      })
    }
  }
})