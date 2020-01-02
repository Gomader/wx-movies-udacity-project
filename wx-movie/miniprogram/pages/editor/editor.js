// miniprogram/pages/editor/editor.js
const recorderManager = wx.getRecorderManager()
const util = require('../../utils/userinfo.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clink: '',
    info: '',
    name: '',
    id: '',
    record:' ',
    type:0,
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
    util.getUserInfo().then(userInfo => {
      this.setData({
        userInfo
      })
    })
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
  gettype: function (options) {
    if(options.type=='t'){
      this.setData({
        type:0
      })
    }else{
      this.setData({
        type:1
      })
    }
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
          id: options.id,
        })
      },
      fail: console.error
    })
  },
  start:function(){
    const options = {
      duration: 60000,
      sampleRate: 8000,
      numberOfChannels: 2,
      encodeBitRate: 16000,
      format: 'mp3'
    }
    recorderManager.start(options)
    var that = this
    that.data.setInter = setInterval(
      function(){
        var speck_time = parseInt(that.data.speck_time + 1);
        that.setData({
          speck_time:speck_time
        })
        if(that.data.speck_time>=59){
          this.end()
        }
      },1000
    )
  },
  end:function(){
    recorderManager.stop()
    clearInterval(this.data.setInter);
    recorderManager.onStop((res) => {
      console.log(res)
      this.setData({
        record:res.tempFilePath,
        duration:res.duration
      })
    })
  },
  innertext:function(e){
    var inner = e.detail.value.inner
    wx.navigateTo({
      url: '/pages/editorcheck/editorcheck?id=' + this.data.id + '&inner=' + inner + '&type=t'
    })
  },
  innerrecord: function (e) {
    wx.navigateTo({
      url: '/pages/editorcheck/editorcheck?id=' + this.data.id + '&inner=' + this.data.record + '&type=r&time=' + this.data.speck_time + '&duration=' + this.data.duration
    })
  },
  onTapLogin(event) {
    var that = this
    if(event.detail.userInfo.avatar==""){
      event.detail.userInfo.avatar = "/images/test.jpg"
    }
    wx.cloud.callFunction({
      name:'user',
      data:{
        userInfo:event.detail.userInfo
      },
      success: function (res){
        console.log(res)
        that.setData({
          userInfo:res.result
        })
      }
    })
  },
})