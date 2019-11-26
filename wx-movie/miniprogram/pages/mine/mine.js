// miniprogram/pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null,
    tomycomment:false,
    btn:"点击查看我的影评",
    id:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  onTapLogin(event) {
    this.setData({
      userInfo: event.detail.userInfo
    })
    wx.cloud.callFunction({
      name: 'getopenid',
      complete: res => {
        var id = res.result.openid
        id:id
      }
    })
  },
  changeinner(){
    if(this.data.tomycomment==false){
      this.setData({
        tomycomment:true,
        btn:"点击查看我的收藏"
      })
    }else{
      this.setData({
        tomycomment: false,
        btn: "点击查看我的影评"
      })
    }
  }
})