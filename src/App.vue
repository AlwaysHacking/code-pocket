<script>
export default {
  created () {
    // 调用API从本地缓存中获取数据
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    // console.log('app created and cache logs by setStorageSync')
  }
  // onLaunch () {
  //   // 从缓存中获取token，判断是否显示登录页
  //   const token = wx.getStorageSync('authToken') || ''
  //   if (token) {
  //     console.log('已认证，跳转到首页')
  //     wx.switchTab({
  //       url: '/pages/profile/main'
  //     })
  //   }
  // }
}
</script>

<style>
@import url("./octicons/build.css");
page {
  background-color: #F5F5F5;
  height: 100%;
}

.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
