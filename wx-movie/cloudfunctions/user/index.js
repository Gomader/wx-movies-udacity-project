// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: 'movies-udacity-f36f2'
})
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openid = wxContext.OPENID
  const user = await db.collection('user').where({
    openid:openid
  }).get()
  if(user.data.length==0){
    const userInfo = event.userInfo
    await db.collection('user').add({
      data: {
        openid: openid,
        name: userInfo.nickName,
        avatar: userInfo.avatarUrl
      }
    })
    return userInfo
  }else{
    return user
  }
}