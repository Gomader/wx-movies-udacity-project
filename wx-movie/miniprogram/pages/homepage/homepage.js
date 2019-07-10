
const db = wx.cloud.database({
  env: 'movies-udacity-f36f2'
})

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
    wx.showLoading({
      title: '数据正在加载中...',
    })
    db.collection('movies').where({
      rand:a
    }).get().then(result => {
      wx.hideLoading()
      var datas = result.data[0]
      this.setData({
        clink: datas.clink,
        name: datas.name,
        movieid:datas._id
      })
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