Page({
  data: {
    clink:'',
    name:'',
    movieid:'',
    recommend:null
  },
  onPullDownRefresh(){
    this.getmovies()
    wx.stopPullDownRefresh()
  },
  onLoad: function (options) {
    this.getmovies()
  },
  getmovies(){
    var a = Math.floor(Math.random()*10).toString()
    var that = this
    wx.showLoading({
      title: '数据正在加载中...',
    })
    wx.cloud.callFunction({
      name: 'get',
      data:{
        x: 'rand',
        y: a,
        l:1
      },
      success: function (res) {
        wx.hideLoading()
        var res = res.result.data[0]
        that.setData({
          clink: res.clink,
          name: res.name,
          movieid: res._id
        })
        that.getrecommend(res._id)
      },
      fail: console.error
    })
  },
  getnew(){
    this.getmovies()
  },
  tohotmovie(){
    wx.navigateTo({
      url: '/pages/hotmovie/hotmovie'
    })
  },
  tomine() {
    wx.navigateTo({
      url: '/pages/mine/mine'
    })
  },
  tomovieinfo(a){
    var id = a.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/movieinfo/movieinfo?id=' + id
    })
  },
  getrecommend:function(id){
    var that = this
    wx.cloud.callFunction({
      name:'get',
      data:{
        l:3,
        x:'id',
        y:id
      },
      success:function(res){
        var len = res.result.data.length
        if(len>0){
          var a = Math.floor(Math.random()*len)
          that.setData({
            recommend:res.result.data[a]
          })
        }else{
          that.setData({
            recommend:null
          })
        }
      }
    })
  },
  tocommend:function(e){
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/comment/comment?commentid=' + id,
    })
  },
})