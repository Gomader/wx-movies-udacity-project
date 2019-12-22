
const db = wx.cloud.database({
  env: 'movies-udacity-f36f2'
})

Page({
  data: {
    pagenum: 0,
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
    this.getmovielist()
  },
  getmovielist(){
    var that = this
    wx.showLoading({
      title: '数据正在加载中...',
    })
    var pn = this.data.pagenum*5
    wx.cloud.callFunction({
      name:'get',
      data:{
        l:0,
        np:pn,
      },
      success: function (res) {
        wx.hideLoading()
        var datas = res.result.data
        const data = that.data.movies.concat(datas)
        that.setData({
          movies: data
        })
      }
    })
  },
  tomovieinfo(a){
    var id = a.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/movieinfo/movieinfo?id=' + id
    })
  }
})