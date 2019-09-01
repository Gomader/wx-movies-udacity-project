// 云函数入口文件
const cloud = require('wx-server-sdk')
const db = wx.cloud.database({
  env: 'movies-udacity-f36f2'
})


cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const need = event.where
  const v = event.v
  wx.showLoading({
    title: '数据正在加载中...',
  })
  db.collection('movies').where({
    'need': v
  }).get().then(result => {
    wx.hideLoading()
    var datas = result.data[0]
  })

  return {
    datas
  }
}