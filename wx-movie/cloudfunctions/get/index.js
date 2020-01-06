// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: 'movies-udacity-f36f2'
})
const db = cloud.database()



// 云函数入口函数
exports.main = async (event, context) => {
  const l = event.l
  const wxContext = cloud.getWXContext()
  if(l==0){
    const np = event.np
    const data = await db.collection('movies').skip(np).limit(5).get()
    return data
  }else if(l==1){
    const x = String(event.x)
    const y = Number(event.y)
    const data = await db.collection('movies').where({
      [x]: y
    }).get()
    return data
  }else if(l==2){
    const id = event.id
    const np = event.np
    const data = await db.collection('comment').skip(np).limit(5).where({
      id: id
    }).get()
    return data
  }else if(l==3){
    const x = String(event.x)
    const y = String(event.y)
    const data = await db.collection('comment').where({
      [x]: y
    }).get()
    return data
  }else if(l==4){
    const data = await db.collection('favorite').where({
      openid:wxContext.OPENID
    }).get()
    return data
  }else if(l==5) {
    const data = await db.collection('comment').where({
      openid: wxContext.OPENID
    }).get()
    return data
  }else if(l==6){
    const data = await db.collection('favorite').where({
      openid:wxContext.OPENID,
      commentid:event.commentid
    }).get()
    return data
  }
}