
const db = wx.cloud.database({
  env: 'movies-udacity-f36f2'
})

Page({
  data: {
    pagenum: 1,
    movies:[]
  },
  onLoad: function (options) {
    this.getmovielist()
  },
  onReachBottom: function () {
    var times = this.data.pagenum + 1
    this.setData({
      pagenum: times
    })
    this.getnewovielist()
  },
  getnewovielist(){
    wx.showLoading({
      title: '数据正在加载中...',
    })
    var pn = this.data.pagenum*5
    db.collection('movies').skip(pn).limit(5).get().then(result => {
      wx.hideLoading()
      var datas = result.data
      const data = this.data.movies.concat(datas)
      this.setData({
        movies:data
      })
    })
  },
  getmovielist() {
    wx.showLoading({
      title: '数据正在加载中...',
    })
    var pn = this.data.pagenum * 5
    db.collection('movies').limit(5).get().then(result => {
      wx.hideLoading()
      var datas = result.data
      this.setData({
        movies: datas
      })
    })
  },
  
})