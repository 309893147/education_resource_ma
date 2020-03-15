
module.exports = {
 getCurrentHouse(cb,notForce){
   //从缓存获取
   let house = wx.getStorageSync("currentHouse");
   let user = getApp().getUser()
   //从服务器获取
   getApp().api.post("MyRoom", { tel: user.tel }).then(it => {
     let currentRoom = null
     it.RoomUse.forEach(item => {
       if (!currentRoom && it.CurrentID === item.id) {
         currentRoom = item
         currentRoom.totalHouse = it.RoomUse.length
         wx.setStorageSync("currentHouse", currentRoom)
         cb && cb(currentRoom)
       }
     })
     //去添加房屋
     if (!currentRoom && !notForce){
          wx.navigateTo({
         url: '/pages/mine/house/index',
       })
     }
   }
   )
   if (house) {
     return house
   }
   
   
 },
 onUserInfo(user){

 }
}