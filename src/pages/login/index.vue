<template>
  <div class="container">
    <section class="login">
      <header>
        <h2>Github</h2>
        <h4>Login</h4>
      </header>
      <form class="login-form">
            <input v-model="username" type="text" class="login-input" placeholder="User" />
            <input v-model="password" type="password" class="login-input" placeholder="Password" />
            <button type="submit" @click="login" class="login-button">SIGN IN</button>
      </form>
    </section>
  </div>
</template>
<script>
import { Base64 } from '../../utils/base64'
import { put } from '../../utils/index'

export default {
  onLoad () {},
  mounted () {},
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login () {
      let vm = this

      if (!vm.username || !vm.password) {
        wx.showToast({
          title: '输入不能为空!',
          icon: 'loading',
          duration: 1200
        })
        return
      }
      this.makeAuthorization()

      wx.switchTab({
        url: '/pages/notification/main'
      })
    },
    async makeAuthorization () {
      var vm = this
      // 将用户名密码编码为base64格式
      var b = new Base64()
      var str = b.encode(vm.username + ':' + vm.password)
      // console.log('base64 encode:' + str)

      // ajax请求url,header,data,method
      var url = '/authorizations/clients/9d7164ee0946a239ef03'
      var header = {
        Authorization: 'Basic ' + str,
        'Content-Type': 'application/json',
        Accept: 'application/vnd.github.v3+json'
      }
      var data = {
        client_secret: '2f989ed1641f52e5ca01c3400555a0acfb0e5150',
        scopes: ['public_repo'],
        note: 'admin script'
      }

      const response = await put(url, data, header)
      if (response) {
        wx.setStorageSync('auth', response)
        wx.setStorageSync('user', vm.username)
      }
    }
  }
}
</script>

<style lang='scss' scoped>
@import "./style.scss"
</style>
