// miniprogram/pages/comment/comment.js
const innerAudioContext = wx.createInnerAudioContext()

Page({
  data: {
    clink: '',
    info: '',
    name: '',
    id: '',
    type: 0,
    text: '',
    author: null,
    speck_time: 0,
    duration: 0,
    commentid: '',
    commentinfo:null,
    favorite:false,
    favoriteid:''
  },

  onLoad: function (options) { 
    this.getcomment(options)
  },

  onReady: function () {

  },

  onShow: function () {

  },

  onHide: function () {

  },

  onUnload: function () {

  },

  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  },
  getMovieinfo: function (id) {
    var that = this
    wx.showLoading({
      title: '数据正在加载中...',
    })
    wx.cloud.callFunction({
      name: 'get',
      data: {
        x: '_id',
        y: id,
        l: 1
      },
      success: function (res) {
        wx.hideLoading()
        var res = res.result.data[0]
        that.setData({
          clink: res.clink,
          name: res.name,
          info: res.info,
        })
      },
      fail: console.error
    })
  },
  getcomment:function(options){
    var that = this
    wx.cloud.callFunction({
      name:'get',
      data:{
        l:3,
        x:'_id',
        y:options.commentid
      },
      success:function(res){
        if(res.result.data.length>0){
          that.setData({
            commentid:options.commentid
          })
          that.setcomment(res.result.data[0])
          that.checkfavorite(options.commentid)
        }else if(res.result.data.length==0){
          wx.showLoading({
            title: '该评论已不存在',
            duration:3000,
            mask:true
          })
          wx.cloud.callFunction({
            name:'addfavorite',
            data:{
              commentid:options.commentid,
              type:'check',
            },
            success:function(res){
              wx.hideLoading()
              wx.navigateBack()
            },
          })
        }
      }
    })
  },
  setcomment:function(res){
    this.setData({
      author:{
        avatar:res.avatar,
        openid:res.openid,
        username:res.username,
      },
      id:res.id,
      commentinfo:res
    })
    if (res.type == 0) {
      this.setData({
        type: 0,
        text: res.inner,
      })
    } else {
      this.setData({
        type: 1,
        text: res.inner,
        speck_time: res.time,
      })
    }
    this.getMovieinfo(res.id)
  },
  play() {
    innerAudioContext.src = this.data.text
    console.log(innerAudioContext.src)
    innerAudioContext.play()
  },
  addcomment:function(){
    wx.navigateTo({
      url: '/pages/editor/editor?id=' + this.data.id
    })
  },
  addfavorite:function(){
    var that = this
    if(that.data.favorite==false){
      wx.showLoading({
        title: '正在加入收藏...',
      })
      wx.cloud.callFunction({
        name:'addfavorite',
        data:{
          comment:that.data.commentinfo,
          type:'add',
        },
        success:function(res){
          wx.hideLoading()
          wx.navigateTo({
            url: '/pages/mine/mine',
          })
        },
      })
    }else if(that.data.favorite==true){
      wx.showLoading({
        title: '正在取消收藏...',
      })
      wx.cloud.callFunction({
        name:'addfavorite',
        data:{
          favoriteid:that.data.favoriteid,
          type:'delete',
        },
        success:function(res){
          wx.hideLoading()
          wx.navigateTo({
            url: '/pages/mine/mine',
          })
        },
      })
    }
  },
  checkfavorite:function(id){
    var that = this
    wx.cloud.callFunction({
      name:'get',
      data:{
        l:6,
        commentid: id
      },
      success:function(res){
        if(res.result.data.length==0){
          that.setData({
            favorite:false
          })
        }else if(res.result.data.length>0){
          that.setData({
            favorite:true,
            favoriteid:res.result.data[0]._id
          })
        }
      }
    })
  }
})