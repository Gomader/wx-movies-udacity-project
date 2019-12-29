// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: 'movies-udacity-f36f2'
})
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const type = event.type
  if(type=='add'){
    await db.collection('favorite').add({
      data: {
        comment: event.comment,
        openid: wxContext.OPENID,
        commentid: event.comment._id
      }
    })
  }else if(type=='delete'){
    await db.collection('favorite').where({
      _id:event.favoriteid
    }).remove()
  }else if(type=='check'){
    await db.collection('favorite').where({
      commentid:event.commentid,
      openid:wxContext.OPENID
    }).remove()
  }
}