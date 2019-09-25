// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database({
  env: 'movies-udacity-f36f2'
})



// 云函数入口函数
exports.main = async (event, context) => {
  const x = String(event.x)
  const y = String(event.y)
  const data = await db.collection('movies').where({
    [x]:y
  }).get()
  
  return data
}