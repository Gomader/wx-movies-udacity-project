// miniprogram/pages/movieinfo/movieinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clink: '',
    info: '',
    name:'',
    id:'',
    showaddcomment:false
  },

  onLoad: function (options) {
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
  getMovieinfo:function(options){
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
          id:options.id
        })
      },
      fail: console.error
    })
  },
  tocommentlist(){
    wx.navigateTo({
      url: '/pages/commentlist/commentlist?id=' + this.data.id
    })
  },
  addcomment(){
    if(this.data.showaddcomment==true){
      this.setData({
        showaddcomment:false
      })
    }else{
      this.setData({
        showaddcomment:true
      })
    }
  },
  gotoaddtext(){
    wx.navigateTo({
      url: '/pages/editor/editor?id=' + this.data.id + '&type=t'
    })
  },
  gotoaddrecord(){
    wx.navigateTo({
      url: '/pages/editor/editor?id=' + this.data.id + '&type=r'
    })
  }
})