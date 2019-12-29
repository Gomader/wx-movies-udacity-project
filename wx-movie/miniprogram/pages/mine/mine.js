// miniprogram/pages/mine/mine.js
const util = require('../../utils/userinfo.js')
const innerAudioContext = wx.createInnerAudioContext()
const db = wx.cloud.database({
  env: 'movies-udacity-f36f2'
})
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null,
    tomycomment:false,
    btn:"点击查看我的影评",
    id:null,
    favorite:[],
    mycomment:[]
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
    util.getUserInfo().then(userInfo => {
      this.setData({
        userInfo
      })
    })
    this.getfandm()
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
    var that = this
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
  },
  getfandm:function(){
    var that = this
    wx.showLoading({
      title: '正在加载数据',
    })
    wx.cloud.callFunction({
      name:'get',
      data:{
        l:4
      },
      success:function(res){
        wx.hideLoading()
        that.setData({
          favorite:res.result.data
        })
      }
    })
    wx.cloud.callFunction({
      name:'get',
      data:{
        l:5,
      },
      success:function(res){
        that.setData({
          mycomment: res.result.data
        })
      }
    })
  },
  play: function (e) {
    innerAudioContext.src = e.target.dataset.inner
    innerAudioContext.play()
    innerAudioContext.onError((res) => {
      console.log(res)
    })
  },
  tocomment: function (e) {
    var id = e.currentTarget.dataset.id
    wx.cloud.callFunction({
      name:'get',
      data:{
        l:3,
        x:'_id',
        y:id
      },
      success:function(res){
        if(res.result.data.length==0){
          wx.navigateTo({
            url: '/pages/mine/mine'
          })
        }else{
          wx.navigateTo({
            url: '/pages/comment/comment?commentid=' + id
          })
        }
      }
    })
    
  },
  dcomment:function(e){
    var id = e.currentTarget.dataset.id
    wx.showLoading({
      title: '正在删除',
    })
    wx.cloud.callFunction({
      name:'publish',
      data:{
        id: id,
        operate:'delete'
      },
      success:function(res){
        wx.hideLoading()
        wx.navigateTo({
          url: '/pages/mine/mine',
        })
      }
    })
  },
  dfavorite:function(e){
    var id = e.currentTarget.dataset.id
    wx.showLoading({
      title: '正在删除',
    })
    wx.cloud.callFunction({
      name:'addfavorite',
      data:{
        favoriteid: id,
        type:'delete'
      },
      success:function(res){
        wx.hideLoading()
        wx.navigateTo({
          url: '/pages/mine/mine',
        })
      }
    })
  },
})