// miniprogram/pages/commentlist/commentlist.js
const innerAudioContext = wx.createInnerAudioContext()
const db = wx.cloud.database({
  env: 'movies-udacity-f36f2'
})
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    comment:[],
    pagenum: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setmovieid(options)
    this.setcomment()
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
  onPullDownRefresh() {
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var times = this.data.pagenum + 1
    this.setData({
      pagenum: times
    })
    this.setcomment()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  setmovieid:function(options){
    this.setData({
      id: options.id
    })
  },
  setcomment:function(){
    wx.showLoading({
      title: '数据正在加载中...',
    })
    var that = this
    var pn = this.data.pagenum * 5
    wx.cloud.callFunction({
      name:'get',
      data:{
        l:2,
        id:that.data.id,
        np:pn
      },
      success:function(res){
        wx.hideLoading()
        var datas = res.result.data
        const data = that.data.comment.concat(datas)
        that.setData({
          comment: data
        })
      }
    })
  },
  play:function(e){
    innerAudioContext.src = e.target.dataset.inner
    innerAudioContext.play()
    innerAudioContext.onError((res) => {
      console.log(res)
    })
  },
  showcomment:function(e){
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/comment/comment?commentid=' + id
    })
  },
  backtohome:function(){
    wx.navigateTo({
      url: '/pages/homepage/homepage',
    })
  }
})