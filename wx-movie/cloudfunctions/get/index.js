// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: 'movies-udacity-f36f2'
})
const db = cloud.database()



// 云函数入口函数
exports.main = async (event, context) => {
  const l = event.l
  if(l==0){
    const np = event.np
    const data = await db.collection('movies').skip(np).limit(5).get()
    return data
  }else if(l==1){
    const x = String(event.x)
    const y = String(event.y)
    const data = await db.collection('movies').where({
      [x]: y
    }).get()
    return data
  }else if(l == 2){
    const id = event.id
    const np = event.np
    const data = await db.collection('comment').skip(np).limit(5).where({
      id: id
    }).get()
    return data
  }
}