const db = wx.cloud.database()

Page({
  data: {
    clink:'',
    name:'',
    movieid:''
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
    wx.cloud.callFunction({
      name: 'get',
      data:{
        where:'rand',
        v:a
      },
      success: function (res) {
        console.log(res.result)
        this.setData({
          clink: res.clink,
          name: res.name,
          movieid: res._id
        })
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
  }
})