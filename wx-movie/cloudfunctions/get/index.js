// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()



// 云函数入口函数
exports.main = async (event, context) => {
  const need = event.where
  const v = event.v
  const data = await db.collection('movies').where({
    rand:3
  }).get()
  const datas = data[0]
  

  return datas
}