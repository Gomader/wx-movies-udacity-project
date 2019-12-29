// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: 'movies-udacity-f36f2'
})
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const operate = event.operate
  if(operate=='publish'){
    const type = event.type
    const inner = event.inner
    const id = event.id
    const userInfo = event.userInfo
    const time = event.time
    await db.collection('comment').add({
      data: {
        openid: wxContext.OPENID,
        id: id,
        username: userInfo.name,
        avatar: userInfo.avatar,
        type: type,
        inner: inner,
        time: time
      }
    })
  }else if(operate=='delete'){
    const id = event.id
    await db.collection('comment').where({
      _id:id
    }).remove()
  }
}